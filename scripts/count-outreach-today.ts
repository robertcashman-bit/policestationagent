#!/usr/bin/env tsx
/**
 * Show what outreach emails each workspace has sent today, per domain + total.
 *
 * Data source: each site logs outreach sends as FirmOutreachSend records in its
 * own Upstash KV store (`firmoutreach:send:index` + `firmoutreach:send:<id>`).
 *
 *   - policestationrepuk.org  -> read directly from its local KV creds.
 *   - policestationagent.com  -> read from local KV creds if present, else fetch
 *     the existing production endpoint
 *     GET /api/cron/firm-outreach-bootstrap?auditToday=1 (write-only KV in Vercel).
 *
 * Run:  npm run count:outreach-today
 *
 * policestationrepuk.org is read from Policestationrepuk/.env.local.
 * policestationagent.com uses local KV if available; otherwise the script
 * auto-ensures a bootstrap secret (rotate + redeploy if needed) and reads
 * today's sends from the production audit endpoint.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'dotenv';
import {
  listOutreachSentToday,
  type OutreachDomainSource,
  type OutreachSentRecord,
} from '../lib/firm-outreach/count-today';
import { ensurePsaBootstrapSecret } from '../lib/firm-outreach/ensure-psa-bootstrap';

const PSA_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOME = dirname(PSA_ROOT);
const PSA_BASE_URL = (
  process.env.FIRM_OUTREACH_VERIFY_URL ?? 'https://www.policestationagent.com'
).replace(/\/$/, '');

/** Merge env vars from the given files (later files win). */
function loadEnv(...files: string[]): Record<string, string> {
  const merged: Record<string, string> = {};
  for (const file of files) {
    try {
      Object.assign(merged, parse(readFileSync(file)));
    } catch {
      // Missing/unreadable file — skip.
    }
  }
  return merged;
}

/** Upstash creds from a dotenv file only (avoids PSA empty vars shadowing REPUK). */
function kvCredsFromFile(env: Record<string, string>): { url: string; token: string } {
  const url = (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || '').replace(/^"|"$/g, '');
  const token = (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || '').replace(/^"|"$/g, '');
  return { url, token };
}

/** Upstash creds from the current process (vercel env run injects sensitive vars here). */
function kvCredsFromProcess(): { url: string; token: string } {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
  return { url, token };
}

function hasKvCreds(creds: { url: string; token: string }): boolean {
  return creds.url.length > 12 && creds.token.length > 12;
}

function printSends(domain: string, records: OutreachSentRecord[], via: string): void {
  console.log(`\n${domain} — ${records.length} sent today (${via}):`);
  if (records.length === 0) {
    console.log('  (none)');
    return;
  }
  for (const r of records) {
    const time = r.sentAt.slice(11, 19);
    console.log(`  ${time}  ${r.firmName}  <${r.email}>  step ${r.sequenceStep}  "${r.subject}"`);
  }
}

/** Fetch policestationagent.com today's sends via the production audit endpoint. */
async function psaSendsViaEndpoint(secret: string): Promise<OutreachSentRecord[]> {
  const res = await fetch(`${PSA_BASE_URL}/api/cron/firm-outreach-bootstrap?auditToday=1`, {
    headers: { 'x-firm-outreach-bootstrap-secret': secret },
  });
  const json = (await res.json().catch(() => null)) as
    | { audit?: { todaySends?: OutreachSentRecord[] }; error?: string }
    | null;
  if (!res.ok || !json?.audit) {
    throw new Error(`HTTP ${res.status}: ${json?.error ?? 'unexpected response'}`);
  }
  return (json.audit.todaySends ?? []).map((s) => ({ ...s, domain: 'policestationagent.com' }));
}

async function main(): Promise<void> {
  const psaEnv = loadEnv(join(PSA_ROOT, '.env.local'), join(PSA_ROOT, '.env.vercel.production'));
  const repukEnv = loadEnv(join(HOME, 'Policestationrepuk', '.env.local'));

  const repukSource: OutreachDomainSource = {
    domain: 'policestationrepuk.org',
    ...kvCredsFromFile(repukEnv),
  };
  const psaFileCreds = kvCredsFromFile(psaEnv);
  const psaProcessCreds = kvCredsFromProcess();
  const psaSource: OutreachDomainSource = {
    domain: 'policestationagent.com',
    ...(hasKvCreds(psaProcessCreds) ? psaProcessCreds : psaFileCreds),
  };

  const perDomain: Record<string, number> = {};

  // policestationrepuk.org — local KV.
  const repukSends = await listOutreachSentToday(repukSource);
  perDomain[repukSource.domain] = repukSends.length;
  printSends(repukSource.domain, repukSends, 'local KV');

  // policestationagent.com — local KV if available, else production audit endpoint.
  if (hasKvCreds(psaSource)) {
    const psaSends = await listOutreachSentToday(psaSource);
    perDomain[psaSource.domain] = psaSends.length;
    printSends(psaSource.domain, psaSends, 'local KV');
  } else {
    try {
      const secret = await ensurePsaBootstrapSecret(PSA_ROOT);
      const psaSends = await psaSendsViaEndpoint(secret);
      perDomain[psaSource.domain] = psaSends.length;
      printSends(psaSource.domain, psaSends, 'production endpoint');
    } catch (err) {
      perDomain[psaSource.domain] = 0;
      console.warn(`\npolicestationagent.com — could not fetch: ${(err as Error).message}`);
    }
  }

  const combined = Object.values(perDomain).reduce((sum, n) => sum + n, 0);
  const date = new Date().toISOString().slice(0, 10);

  console.log(`\n=== Outreach emails sent today (${date}, UTC) ===`);
  console.log(`Policestationrepuk.org emails today: ${perDomain['policestationrepuk.org'] ?? 0}`);
  console.log(`Policestationagent.com emails today: ${perDomain['policestationagent.com'] ?? 0}`);
  console.log(`Combined outreach emails today: ${combined}`);
}

main().catch((err) => {
  console.error('count-outreach-today failed:', err);
  process.exit(1);
});
