import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import { dailySendCap } from '@/lib/firm-outreach/constants';
import { runPendingKentCorrections } from '@/lib/firm-outreach/outreach/run-kent-corrections';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/** Send Kent-only correction emails for legacy nationwide initial sends (auto until queue empty). */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const dryRun = url.searchParams.get('dryRun') === '1';
  const limitParam = Number(url.searchParams.get('limit') || 0);
  const limit = limitParam > 0 ? limitParam : dailySendCap();

  const correction = await runPendingKentCorrections({ dryRun, limit });

  if (correction.nonePending) {
    return NextResponse.json({
      ok: true,
      mode: 'kent-corrections',
      nonePending: true,
      candidates: 0,
    });
  }

  return NextResponse.json({ ok: true, mode: 'kent-corrections', dryRun, correction });
}
