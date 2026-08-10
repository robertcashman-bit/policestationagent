import { Resend } from 'resend';
import { cleanEnvValue } from '@/lib/env';
import { getAuditConfig } from './config';
import type { AuditFinding, AuditRunResult } from './types';

function isDeclined(f: AuditFinding): boolean {
  return f.severity === 'auto_fixed' || f.severity === 'fail';
}

function isNeedsReview(f: AuditFinding): boolean {
  return f.severity === 'review';
}

export function formatAuditDigestBody(
  result: AuditRunResult,
  opts: { skippedDuplicate?: boolean; llmSkippedReason?: string } = {},
): { subject: string; text: string } {
  const date = new Date().toISOString().slice(0, 10);
  const actionable = result.findings.filter((f) => f.severity !== 'info');
  const declined = actionable.filter(isDeclined);
  const needsReview = actionable.filter(isNeedsReview);

  const subject =
    declined.length > 0
      ? `[PSR Train Audit] ${declined.length} declined, ${needsReview.length} flagged — ${date}`
      : needsReview.length > 0
        ? `[PSR Train Audit] ${needsReview.length} flagged for review — ${date}`
        : `[PSR Train Audit] All clear — ${date}`;

  const lines: string[] = [
    `PSR Train editorial audit — daily decisions — ${date}`,
    '',
    'This email summarises what the automated audit approved, declined, or flagged today, and why.',
    '',
    `Batch checked: ${result.batchLabels.join(', ')}`,
    `Rotation: ${result.cursorAfter}/${result.totalUnits} units (next offset)`,
    '',
  ];

  lines.push('=== APPROVED (passed audit) ===');
  if (result.approvedUnits.length > 0) {
    for (const label of result.approvedUnits) {
      lines.push(`  ✓ ${label} — no issues found`);
    }
  } else {
    lines.push('  (none — every checked unit had at least one finding)');
  }
  lines.push('');

  lines.push('=== DECLINED (action taken or blocked) ===');
  if (declined.length > 0) {
    for (const f of declined) {
      const action =
        f.severity === 'auto_fixed'
          ? 'quarantined / removed from live content'
          : 'blocked — requires fix before approval';
      lines.push(`  ✗ [${f.category}] ${f.message}${f.location ? ` (${f.location})` : ''}`);
      lines.push(`    Why: ${action}`);
    }
  } else {
    lines.push('  (none today)');
  }
  lines.push('');

  lines.push('=== FLAGGED (needs your review — not auto-approved) ===');
  if (needsReview.length > 0) {
    for (const f of needsReview) {
      lines.push(`  ? [${f.category}] ${f.message}${f.location ? ` (${f.location})` : ''}`);
      lines.push('    Why: flagged for manual review; no automatic change applied');
    }
  } else {
    lines.push('  (none today)');
  }
  lines.push('');

  if (result.autoFixedDb > 0) {
    lines.push(`Questions quarantined (status → pending): ${result.autoFixedDb}`, '');
  }
  if (result.prUrl) {
    lines.push(`PR opened: ${result.prUrl}`, '');
  }
  if (opts.llmSkippedReason) {
    lines.push(`LLM: ${opts.llmSkippedReason}`, '');
  }
  lines.push(`LLM calls this run: ${result.llmCalls}`, '');

  if (opts.skippedDuplicate) {
    lines.push('(Duplicate email suppressed — already sent today)');
  }

  return { subject, text: lines.join('\n') };
}

export async function sendAuditDigest(
  result: AuditRunResult,
  opts: { skippedDuplicate?: boolean; llmSkippedReason?: string } = {},
): Promise<{ sent: boolean; error?: string }> {
  const cfg = getAuditConfig();
  const apiKey = cleanEnvValue(process.env.RESEND_API_KEY);
  if (!apiKey) return { sent: false, error: 'RESEND_API_KEY not set' };

  const { subject, text } = formatAuditDigestBody(result, opts);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: 'PSR Train Audit <noreply@psrtrain.com>',
    to: [cfg.emailTo],
    subject,
    text,
  });

  if (error) return { sent: false, error: String(error) };
  return { sent: true };
}
