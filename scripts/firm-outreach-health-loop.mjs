#!/usr/bin/env node
/**
 * Production health loop: repair when drifted/empty, then verify until green.
 *
 *   FIRM_OUTREACH_VERIFY_URL=https://www.policestationagent.com \
 *   CRON_SECRET=... FIRM_OUTREACH_BOOTSTRAP_SECRET=... \
 *   node scripts/firm-outreach-health-loop.mjs
 */
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const baseUrl = (process.env.FIRM_OUTREACH_VERIFY_URL ?? 'https://www.policestationagent.com').replace(
  /\/$/,
  '',
);
const cronSecret = process.env.CRON_SECRET?.trim() || '';
const bootstrapSecret = process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim() || '';
const maxAttempts = Number(process.env.FIRM_OUTREACH_HEALTH_ATTEMPTS || 5);

function run(cmd, args, env = process.env) {
  const result = spawnSync(cmd, args, { cwd: root, env, stdio: 'inherit', shell: false });
  return result.status ?? 1;
}

async function fetchStatus() {
  if (!cronSecret) return null;
  const res = await fetch(`${baseUrl}/api/cron/firm-outreach-status`, {
    headers: { Authorization: `Bearer ${cronSecret}` },
  });
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function needsRepair(status) {
  if (!status) return true;
  const ready = status.summary?.readyToSend ?? status.counts?.ready_to_send ?? 0;
  const sendAllowed = status.config?.sendAllowed;
  const drifted = status.indexHealth?.drifted;
  return drifted === true || ready <= 0 || sendAllowed === false;
}

async function main() {
  console.log(`Health loop → ${baseUrl} (max ${maxAttempts} cycles)`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`\n=== Health attempt ${attempt}/${maxAttempts} ===`);

    const repoExit = run('npm', ['run', 'verify:firm-outreach']);
    if (repoExit !== 0) {
      console.error('Repo verify failed');
      if (attempt === maxAttempts) process.exit(1);
      continue;
    }

    const status = await fetchStatus();
    if (needsRepair(status)) {
      const ready = status?.summary?.readyToSend ?? status?.counts?.ready_to_send ?? '?';
      const drifted = status?.indexHealth?.drifted;
      console.log(`Repair needed (ready=${ready}, drifted=${drifted})`);
      if (!bootstrapSecret) {
        console.error('Set FIRM_OUTREACH_BOOTSTRAP_SECRET to run repair-loop');
        process.exit(1);
      }
      const repairExit = run('node', ['scripts/firm-outreach-repair-loop.mjs'], {
        ...process.env,
        FIRM_OUTREACH_VERIFY_URL: baseUrl,
        FIRM_OUTREACH_BOOTSTRAP_SECRET: bootstrapSecret,
        CRON_SECRET: cronSecret,
      });
      if (repairExit !== 0 && attempt === maxAttempts) process.exit(1);
    }

    const httpEnv = {
      ...process.env,
      FIRM_OUTREACH_VERIFY_URL: baseUrl,
      CRON_SECRET: cronSecret,
      FIRM_OUTREACH_BOOTSTRAP_SECRET: bootstrapSecret,
    };
    const httpExit = run('npm', ['run', 'verify:firm-outreach'], httpEnv);
    if (httpExit === 0) {
      console.log('\nHealth loop OK — all checks passed');
      return;
    }

    if (attempt === maxAttempts) {
      console.error('\nHealth loop FAILED after max attempts');
      process.exit(1);
    }

    console.log('Retrying after 10s…');
    await new Promise((r) => setTimeout(r, 10_000));
  }
}

main().catch((err) => {
  console.error('[firm-outreach-health-loop]', err.message ?? err);
  process.exit(1);
});
