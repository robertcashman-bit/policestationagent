#!/usr/bin/env tsx
/**
 * Audit today's firm outreach email activity (KV send records + approval state).
 *
 * Usage:
 *   npx tsx scripts/firm-outreach-audit-today.ts
 *   FIRM_OUTREACH_VERIFY_URL=https://www.policestationagent.com \
 *     FIRM_OUTREACH_BOOTSTRAP_SECRET=... npx tsx scripts/firm-outreach-audit-today.ts
 */
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });
config();

const baseUrl = (
  process.env.FIRM_OUTREACH_VERIFY_URL ?? 'https://www.policestationagent.com'
).replace(/\/$/, '');

type Audit = Awaited<
  ReturnType<typeof import('../lib/firm-outreach/audit-today').buildOutreachTodayAudit>
>;

function printAudit(audit: Audit) {
  console.log('\n=== Firm outreach audit — today ===');
  console.log('UTC date:', audit.utcDate);
  console.log('London date (approval/digest):', audit.londonDate);
  console.log('');
  console.log('Config:');
  console.log('  requireApproval:', audit.config.requireApproval);
  console.log('  sendAllowed:', audit.config.sendAllowed);
  console.log('  effectivePaused:', audit.pause.effectivePaused);
  console.log('  dryRun:', audit.config.dryRun);
  console.log('  dailyCap:', audit.config.dailyCap);
  console.log('');
  console.log('Queue:');
  console.log('  ready_to_send:', audit.readyToSend);
  console.log('  sentToday (report):', audit.sentTodayReport);
  console.log('  sentToday (KV counter):', audit.sentTodayKv);
  console.log('  sentLast7Days:', audit.sentLast7Days);
  console.log('');
  console.log('Owner approval email today:', audit.approvalEmailSentToday ? 'yes' : 'no');
  if (audit.approvalEmailSentAt) {
    console.log('  sentAt:', audit.approvalEmailSentAt);
  }
  console.log('');
  console.log(`Firm outreach sends today (${audit.todaySends.length}):`);
  if (audit.todaySends.length === 0) {
    console.log('  (none — no prospect emails recorded in KV for UTC today)');
  } else {
    for (const s of audit.todaySends) {
      console.log(
        `  - ${s.sentAt} | ${s.firmName} | ${s.email} | step ${s.sequenceStep} | ${s.subject}`,
      );
    }
  }
  console.log('');
  console.log('Interpretation:', audit.interpretation);
}

async function auditViaHttp(): Promise<boolean> {
  const secret = process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim();
  if (!secret) return false;

  const res = await fetch(`${baseUrl}/api/cron/firm-outreach-bootstrap?auditToday=1`, {
    headers: { 'x-firm-outreach-bootstrap-secret': secret },
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.audit) {
    console.error('[audit-today] HTTP audit failed:', res.status, json?.error ?? json);
    process.exit(1);
  }
  printAudit(json.audit);
  return true;
}

async function main() {
  const { getKV } = await import('../lib/kv');
  if (!getKV()) {
    const ok = await auditViaHttp();
    if (!ok) {
      console.error(
        '[audit-today] KV not configured locally — set UPSTASH creds or FIRM_OUTREACH_BOOTSTRAP_SECRET + FIRM_OUTREACH_VERIFY_URL',
      );
      process.exit(1);
    }
    return;
  }

  const { buildOutreachTodayAudit } = await import('../lib/firm-outreach/audit-today');
  printAudit(await buildOutreachTodayAudit());
}

main().catch((err) => {
  console.error('[audit-today] failed:', err);
  process.exit(1);
});
