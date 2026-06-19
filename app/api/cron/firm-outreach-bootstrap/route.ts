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
  const unpauseOnly = url.searchParams.get('unpause') === '1';
  const reindex = url.searchParams.get('reindex') === '1';
  const reindexOnly = url.searchParams.get('reindexOnly') === '1';
  const batches = Number(url.searchParams.get('batches') || 2) || 2;
  const limit = Number(url.searchParams.get('limit') || 25) || 25;

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
