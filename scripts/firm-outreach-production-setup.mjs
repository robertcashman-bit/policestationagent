#!/usr/bin/env node
/**
 * Production setup: autosend env, deploy, audit today, configure Resend webhook secret.
 *
 * Usage:
 *   node scripts/firm-outreach-production-setup.mjs
 */
import { randomBytes } from 'crypto';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE =
  process.env.FIRM_OUTREACH_VERIFY_URL?.replace(/\/$/, '') ||
  'https://www.policestationagent.com';

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts });
}

async function bootstrapGet(secret, params) {
  const res = await fetch(`${SITE}/api/cron/firm-outreach-bootstrap?${params}`, {
    headers: { 'x-firm-outreach-bootstrap-secret': secret },
  });
  const json = await res.json().catch(async () => ({ raw: await res.text() }));
  if (!res.ok) {
    throw new Error(`Bootstrap ${params} HTTP ${res.status}: ${JSON.stringify(json).slice(0, 500)}`);
  }
  return json;
}

async function main() {
  console.log('[setup] Setting FIRM_OUTREACH_REQUIRE_APPROVAL=false on production…');
  run(
    'npx vercel env add FIRM_OUTREACH_REQUIRE_APPROVAL production --value false --yes --force',
  );

  const bootstrapSecret = randomBytes(24).toString('hex');
  console.log('[setup] Rotating FIRM_OUTREACH_BOOTSTRAP_SECRET for operator access…');
  run(
    `npx vercel env add FIRM_OUTREACH_BOOTSTRAP_SECRET production --value ${bootstrapSecret} --sensitive --yes --force`,
  );

  console.log('[setup] Deploying production…');
  run('npx vercel deploy --prod --yes');

  console.log('[setup] Auditing today’s outreach…');
  const audit = await bootstrapGet(bootstrapSecret, 'auditToday=1');
  console.log(JSON.stringify(audit.audit, null, 2));

  console.log('[setup] Configuring Resend webhook…');
  const webhook = await bootstrapGet(bootstrapSecret, 'setupResendWebhook=1');
  const signingSecret = webhook.webhook?.signingSecret;
  if (!signingSecret) {
    console.warn('[setup] No signing secret returned — webhook may already exist without GET access');
  } else {
    console.log('[setup] Setting RESEND_WEBHOOK_SECRET on production…');
    run(
      `npx vercel env add RESEND_WEBHOOK_SECRET production --value ${signingSecret} --sensitive --yes --force`,
    );
    console.log('[setup] Redeploying so webhook secret is active…');
    run('npx vercel deploy --prod --yes');
  }

  console.log('[setup] Done.');
  console.log(`Save locally if needed: FIRM_OUTREACH_BOOTSTRAP_SECRET=${bootstrapSecret}`);
}

main().catch((err) => {
  console.error('[firm-outreach-production-setup]', err.message || err);
  process.exit(1);
});
