import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import {
  PSA_OUTREACH_EMAILS_DISABLED_REASON,
  arePsaOutreachEmailsDisabled,
} from '@/lib/firm-outreach/outreach-emails-disabled';
import { runFirmOutreachPipeline } from '@/lib/firm-outreach/run-pipeline';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/** Send-only cron tick (no enrich, no owner digest). Permanently gated off for PSA. */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (arePsaOutreachEmailsDisabled()) {
    return NextResponse.json({
      ok: true,
      mode: 'send-only',
      skipped: true,
      reason: 'psa_outreach_emails_disabled',
      message: PSA_OUTREACH_EMAILS_DISABLED_REASON,
    });
  }

  const url = new URL(request.url);
  const sendLimit = Number(url.searchParams.get('limit') || 0) || undefined;
  const sendDryRun = url.searchParams.get('dryRun') === '1';
  const result = await runFirmOutreachPipeline({
    skipDiscovery: true,
    skipEnrich: true,
    skipDigest: true,
    skipKentCorrection: true,
    skipCleanup: true,
    sendLimit,
    sendDryRun,
  });
  return NextResponse.json({ ok: true, mode: 'send-only', dryRun: sendDryRun, ...result });
}
