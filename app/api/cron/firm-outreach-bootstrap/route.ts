import { NextResponse } from 'next/server';
import { isOutreachBootstrapAuthorized } from '@/lib/cron-auth';
import { bootstrapOutreach } from '@/lib/firm-outreach/bootstrap-outreach';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/** Unpause sends (if admin-paused) and run several enrich batches. */
export async function GET(request: Request) {
  if (!isOutreachBootstrapAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);

  if (url.searchParams.get('auditToday') === '1') {
    const { buildOutreachTodayAudit } = await import('@/lib/firm-outreach/audit-today');
    const audit = await buildOutreachTodayAudit();
    return NextResponse.json({ ok: true, mode: 'auditToday', audit });
  }

  if (url.searchParams.get('setupResendWebhook') === '1') {
    const { configureResendOutreachWebhook } = await import(
      '@/lib/firm-outreach/resend-webhook-setup'
    );
    const webhook = await configureResendOutreachWebhook();
    return NextResponse.json({ ok: webhook.ok, mode: 'setupResendWebhook', webhook });
  }

  const unpauseOnly = url.searchParams.get('unpause') === '1';
  const reindex = url.searchParams.get('reindex') === '1';
  const reindexOnly = url.searchParams.get('reindexOnly') === '1';
  const sendApproval = url.searchParams.get('sendApproval') === '1';
  const sendKentCorrection = url.searchParams.get('sendKentCorrection') === '1';
  const forceApproval = url.searchParams.get('force') === '1';
  const batches = Number(url.searchParams.get('batches') || 2) || 2;
  const limit = Number(url.searchParams.get('limit') || 25) || 25;

  if (sendKentCorrection) {
    const dryRun = url.searchParams.get('dryRun') === '1';
    const limit = Number(url.searchParams.get('limit') || 0) || undefined;
    const { runKentCorrectionEmails } = await import(
      '@/lib/firm-outreach/outreach/run-kent-corrections'
    );
    const correction = await runKentCorrectionEmails({ dryRun, limit });
    return NextResponse.json({ ok: true, mode: 'sendKentCorrection', dryRun, correction });
  }

  if (sendApproval) {
    if (url.searchParams.get('unpause') === '1') {
      await bootstrapOutreach({ unpauseOnly: true, batches: 0, limit: 0 });
    }
    const { sendOutreachApprovalRequestEmail } = await import(
      '@/lib/firm-outreach/outreach/approval-request-email'
    );
    const approval = await sendOutreachApprovalRequestEmail({ force: forceApproval });
    const { countProspectsByStatus } = await import('@/lib/firm-outreach/storage');
    const counts = await countProspectsByStatus();
    const { isOutreachSendAllowed } = await import('@/lib/firm-outreach/pause-state');
    return NextResponse.json({
      ok: true,
      mode: 'sendApproval',
      approval,
      sendAllowed: await isOutreachSendAllowed(),
      counts,
    });
  }

  const result = await bootstrapOutreach({
    batches,
    limit,
    totalMaxElapsedMs: 240_000,
    maxElapsedMs: 110_000,
    unpauseOnly,
    reindex,
    reindexOnly,
  });
  return NextResponse.json({ ok: true, mode: 'bootstrap', ...result });
}
