import { randomBytes } from 'node:crypto';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'dotenv';

const PSA_BASE_URL = (
  process.env.FIRM_OUTREACH_VERIFY_URL ?? 'https://www.policestationagent.com'
).replace(/\/$/, '');

/** Probe the production audit endpoint (15s timeout). */
export async function probePsaBootstrapSecret(secret: string): Promise<boolean> {
  const res = await fetch(`${PSA_BASE_URL}/api/cron/firm-outreach-bootstrap?auditToday=1`, {
    headers: { 'x-firm-outreach-bootstrap-secret': secret },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) return false;
  const json = (await res.json().catch(() => null)) as { audit?: unknown } | null;
  return Boolean(json?.audit);
}

function loadBootstrapFromFiles(psaRoot: string): string {
  for (const file of ['.env.local', '.env.vercel.production', '.env.psa.secrets']) {
    try {
      const env = parse(readFileSync(join(psaRoot, file)));
      const secret = env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim().replace(/^"|"$/g, '');
      if (secret && secret.length > 8) return secret;
    } catch {
      // skip
    }
  }
  return process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim() || '';
}

/** Merge bootstrap secret into gitignored .env.local without clobbering other keys. */
export function savePsaBootstrapSecret(psaRoot: string, secret: string): void {
  const envPath = join(psaRoot, '.env.local');
  let content = '';
  try {
    content = readFileSync(envPath, 'utf8');
  } catch {
    // new file
  }
  const line = `FIRM_OUTREACH_BOOTSTRAP_SECRET=${secret}`;
  content = /^FIRM_OUTREACH_BOOTSTRAP_SECRET=/m.test(content)
    ? content.replace(/^FIRM_OUTREACH_BOOTSTRAP_SECRET=.*$/m, line)
    : `${content.trimEnd()}${content ? '\n' : ''}${line}\n`;
  writeFileSync(envPath, content);
}

function latestReadyProductionUrl(psaRoot: string): string {
  const out = execSync('npx vercel ls --prod', {
    cwd: psaRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const match = out.match(/https:\/\/web44ai-[a-z0-9]+-robert-cashmans-projects\.vercel\.app\s+● Ready/);
  if (!match) {
    throw new Error('No ready production deployment found for redeploy');
  }
  return match[0].split(/\s+/)[0];
}

async function sleep(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

/**
 * Return a working bootstrap secret for policestationagent.com production audit.
 * Rotates + redeploys only when no saved secret authorizes the endpoint.
 */
export async function ensurePsaBootstrapSecret(psaRoot: string): Promise<string> {
  const existing = loadBootstrapFromFiles(psaRoot);
  if (existing && (await probePsaBootstrapSecret(existing))) {
    return existing;
  }

  const secret = randomBytes(24).toString('hex');
  savePsaBootstrapSecret(psaRoot, secret);
  console.log('[psa-auth] Rotating FIRM_OUTREACH_BOOTSTRAP_SECRET on Vercel production…');
  execSync(
    `npx vercel env add FIRM_OUTREACH_BOOTSTRAP_SECRET production --value ${secret} --sensitive --yes --force`,
    { cwd: psaRoot, stdio: 'inherit' },
  );

  if (await probePsaBootstrapSecret(secret)) {
    console.log('[psa-auth] New secret is live (no redeploy needed).');
    return secret;
  }

  const deploymentUrl = latestReadyProductionUrl(psaRoot);
  console.log(`[psa-auth] Redeploying production (${deploymentUrl}) so the new secret is active…`);
  execSync(`npx vercel redeploy ${deploymentUrl}`, { cwd: psaRoot, stdio: 'inherit' });

  for (let attempt = 1; attempt <= 24; attempt++) {
    await sleep(10_000);
    if (await probePsaBootstrapSecret(secret)) {
      console.log('[psa-auth] Production audit endpoint authorized.');
      return secret;
    }
    console.log(`[psa-auth] Waiting for redeploy… (${attempt}/24)`);
  }

  throw new Error('Bootstrap secret still unauthorized after production redeploy');
}
