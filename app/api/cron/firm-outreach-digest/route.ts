import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import { outreachRequireApproval } from '@/lib/firm-outreach/constants';
import {
  PSA_OUTREACH_EMAILS_DISABLED_REASON,
  arePsaOutreachEmailsDisabled,
} from '@/lib/firm-outreach/outreach-emails-disabled';
import { sendOutreachApprovalRequestEmail } from '@/lib/firm-outreach/outreach/approval-request-email';
import { sendDailyOutreachDigest } from '@/lib/firm-outreach/outreach/digest-email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 120;

/**
 * Legacy 17:00 Kent agent-cover digest / approval reminder.
 * Permanently no-op while PSA outreach emails are disabled — RepUK owns digests now.
 * Route kept for auth/verify; not scheduled in vercel.json.
 */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (arePsaOutreachEmailsDisabled()) {
    return NextResponse.json({
      ok: true,
      mode: 'digest-disabled',
      skipped: true,
      reason: 'psa_outreach_emails_disabled',
      message: PSA_OUTREACH_EMAILS_DISABLED_REASON,
    });
  }

  if (outreachRequireApproval()) {
    const result = await sendOutreachApprovalRequestEmail({ reminder: true });
    return NextResponse.json({ ok: true, mode: 'approval-reminder', ...result });
  }

  const result = await sendDailyOutreachDigest();
  return NextResponse.json({ ok: true, mode: 'digest', ...result });
}
