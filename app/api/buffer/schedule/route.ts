import { NextRequest, NextResponse } from 'next/server';
import { runBufferScheduler } from '@/lib/buffer/engine-run';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  return req.headers.get('authorization') === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const dryRun = url.searchParams.get('dryRun') === '1';
  const force = url.searchParams.get('force') === '1';

  try {
    const result = await runBufferScheduler({ dryRun, force });
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (e) {
    console.error('[api/buffer/schedule]', e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
