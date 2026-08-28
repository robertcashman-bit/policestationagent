import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import { PSA_OUTREACH_EMAILS_DISABLED_REASON } from '@/lib/firm-outreach/outreach-emails-disabled';
import { runFirmOutreachPipeline } from '@/lib/firm-outreach/run-pipeline';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/**
 * Morning pipeline full cron — inventory only.
 * Never sends firm email or operator approval/digest mail.
 */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runFirmOutreachPipeline({
    skipDiscovery: true,
    skipEnrich: true,
    skipSend: true,
    skipDigest: true,
  });

  return NextResponse.json({
    ok: true,
    mode: 'inventory_only_send_disabled',
    reason: 'psa_outreach_emails_disabled',
    message: PSA_OUTREACH_EMAILS_DISABLED_REASON,
    ...result,
  });
}
