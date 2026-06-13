import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import { getOutreachConfigStatus } from '@/lib/firm-outreach/config-status';
import { buildOutreachActivityReport } from '@/lib/firm-outreach/outreach/activity-report';
import { getOutreachPauseSummary } from '@/lib/firm-outreach/pause-state';
import { getKV } from '@/lib/kv';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

/** Read-only outreach health snapshot for cron-authenticated verification. */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const config = await getOutreachConfigStatus();
  const pause = await getOutreachPauseSummary();

  if (!getKV()) {
    return NextResponse.json({
      ok: true,
      kvConfigured: false,
      warning: 'Upstash Redis not configured',
      config,
      pause,
      summary: null,
      counts: null,
    });
  }

  const { report, prospectCounts } = await buildOutreachActivityReport();

  return NextResponse.json({
    ok: true,
    kvConfigured: true,
    config,
    pause,
    summary: report.summary,
    counts: prospectCounts,
    generatedAt: report.generatedAt,
  });
}
