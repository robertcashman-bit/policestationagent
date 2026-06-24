import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import {
  cronEnrichBatchSize,
  enrichMaxElapsedMs,
} from '@/lib/firm-outreach/constants';
import { getOutreachPauseSummary, setAdminPauseState } from '@/lib/firm-outreach/pause-state';
import { runFirmOutreachPipeline } from '@/lib/firm-outreach/run-pipeline';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/** Enrich-only cron tick (no discovery refresh, no sends). */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pause = await getOutreachPauseSummary();
  if (pause.adminPaused === true && !pause.envPaused) {
    await setAdminPauseState(false);
  }

  const { maybeRunPostDeployKick } = await import('@/lib/firm-outreach/post-deploy-kick');
  const postDeployKick = await maybeRunPostDeployKick();

  const result = await runFirmOutreachPipeline({
    skipDiscovery: true,
    skipSend: true,
    skipDigest: true,
    enrichLimit: cronEnrichBatchSize(),
    enrichMaxElapsedMs: enrichMaxElapsedMs(),
  });

  return NextResponse.json({ ok: true, mode: 'enrich-only', postDeployKick, ...result });
}
