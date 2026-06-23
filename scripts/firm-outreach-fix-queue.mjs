#!/usr/bin/env node
/**
 * Fix firm outreach queue: deploy, reindex, requalify, enrich, Resend webhook.
 * Usage: node scripts/firm-outreach-fix-queue.mjs
 */
import { randomBytes } from 'crypto';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE =
  process.env.FIRM_OUTREACH_VERIFY_URL?.replace(/\/$/, '') ||
  'https://www.policestationagent.com';

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
}

async function bootstrap(secret, params) {
  const res = await fetch(`${SITE}/api/cron/firm-outreach-bootstrap?${params}`, {
    headers: { 'x-firm-outreach-bootstrap-secret': secret },
  });
  const json = await res.json().catch(async () => ({ raw: await res.text() }));
  if (!res.ok) {
    throw new Error(`${params} → HTTP ${res.status}: ${JSON.stringify(json).slice(0, 800)}`);
  }
  return json;
}

async function main() {
  const secret = randomBytes(24).toString('hex');
  console.log('[fix-queue] Rotating bootstrap secret…');
  run(
    `npx vercel env add FIRM_OUTREACH_BOOTSTRAP_SECRET production --value ${secret} --sensitive --yes --force`,
  );

  console.log('[fix-queue] Raising enrich batch size to 50…');
  run(
    'npx vercel env add FIRM_OUTREACH_CRON_ENRICH_BATCH production --value 50 --yes --force',
  );

  console.log('[fix-queue] Deploying production…');
  run('npx vercel deploy --prod --yes');

  console.log('[fix-queue] Audit (before)…');
  const auditBefore = await bootstrap(secret, 'auditToday=1');
  console.log(JSON.stringify(auditBefore.audit, null, 2));

  console.log('[fix-queue] Reindex…');
  await bootstrap(secret, 'reindexOnly=1');

  console.log('[fix-queue] Requalify (promote discovered → ready)…');
  const requalify = await bootstrap(secret, 'requalifyOnly=1');
  console.log('requalify', JSON.stringify(requalify.requalify, null, 2));
  console.log('countsAfter requalify', requalify.countsAfter);

  console.log('[fix-queue] Enrich batches (3 passes × 8×60)…');
  let last;
  for (let pass = 1; pass <= 3; pass++) {
    console.log(`[fix-queue] Enrich pass ${pass}/3…`);
    last = await bootstrap(secret, 'unpause=1&reindex=1&batches=8&limit=60');
    console.log('totals', last.totals, 'ready', last.countsAfter?.ready_to_send);
    if ((last.totals?.processed ?? 0) === 0) break;
  }

  console.log('[fix-queue] Resend webhook…');
  const webhook = await bootstrap(secret, 'setupResendWebhook=1');
  if (webhook.webhook?.signingSecret) {
    run(
      `npx vercel env add RESEND_WEBHOOK_SECRET production --value ${webhook.webhook.signingSecret} --sensitive --yes --force`,
    );
    console.log('[fix-queue] Redeploying with webhook secret…');
    run('npx vercel deploy --prod --yes');
  } else {
    console.log('[fix-queue] Webhook:', webhook.webhook?.action ?? webhook.webhook?.error);
  }

  console.log('[fix-queue] Audit (after)…');
  const auditAfter = await bootstrap(secret, 'auditToday=1');
  console.log(JSON.stringify(auditAfter.audit, null, 2));

  console.log('[fix-queue] Done. Save locally if needed:');
  console.log(`FIRM_OUTREACH_BOOTSTRAP_SECRET=${secret}`);
}

main().catch((err) => {
  console.error('[fix-queue]', err.message || err);
  process.exit(1);
});
