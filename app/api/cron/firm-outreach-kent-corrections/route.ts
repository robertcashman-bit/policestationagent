import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import { PSA_OUTREACH_EMAILS_DISABLED_REASON } from '@/lib/firm-outreach/outreach-emails-disabled';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

/** Kent correction sends permanently off — route is a no-op. */
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
