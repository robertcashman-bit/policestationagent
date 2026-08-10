import { NextResponse } from 'next/server';
import { isCronRequestAuthorized } from '@/lib/auth/cron';
import { runBufferScheduler } from '@/lib/buffer/engine-run';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Server-side Buffer scheduler for custodynote.com promo pages.
 * Auth: Bearer ${CRON_SECRET}
 * Query: dryRun=1 | force=1 | slug=... | limit=N
 */
export async function GET(request: Request) {
  const auth = isCronRequestAuthorized(request);
  if (auth === 'misconfigured') {
    return NextResponse.json({ ok: false, error: 'Cron not configured' }, { status: 503 });
  }
  if (!auth) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const dryRun = url.searchParams.get('dryRun') === '1';
  const force = url.searchParams.get('force') === '1';
  const slugs = url.searchParams.getAll('slug').filter(Boolean);
  const limitParamRaw = url.searchParams.get('limit');
  const limit = limitParamRaw ? Number(limitParamRaw) : undefined;

  try {
    const result = await runBufferScheduler({
      dryRun,
      force,
      slugs: slugs.length ? slugs : undefined,
      limit: Number.isFinite(limit) ? limit : undefined,
    });
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (e) {
    console.error('[api/buffer/schedule]', e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
