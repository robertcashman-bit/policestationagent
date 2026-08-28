import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import { PSA_OUTREACH_EMAILS_DISABLED_REASON } from '@/lib/firm-outreach/outreach-emails-disabled';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Cross-workspace morning/evening operator digest.
 * Permanently no-op — never emails. Removed from vercel.json schedule.
 * Route kept so accidental hits / stale Vercel cron configs return safely.
 */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    mode: 'permanently_disabled',
    skipped: true,
    reason: 'psa_outreach_emails_disabled',
    message: PSA_OUTREACH_EMAILS_DISABLED_REASON,
  });
}
