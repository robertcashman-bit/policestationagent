import { NextResponse } from 'next/server';
import { isCronRequestAuthorized } from '@/lib/auth/api-guards';
import { runBufferScheduler } from '@/lib/buffer/engine-run';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Server-side Buffer scheduler for psrtrain.com blog posts.
 *
 * Auth: Bearer ${CRON_SECRET}. Query params:
 *   - dryRun=1   plan + dedup only, no Buffer writes
 *   - slug=...   schedule a single post (repeatable) — used for the test post
 *   - limit=N    cap number of source posts scheduled
 *
 * Credentials (BUFFER_ACCESS_TOKEN, BUFFER_ORGANIZATION_ID, BUFFER_CHANNEL_*_ID)
 * are read from env server-side only and never exposed to the client.
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
  const slugs = url.searchParams.getAll('slug').filter(Boolean);
  const limitParamRaw = url.searchParams.get('limit');
  const limit = limitParamRaw ? Number(limitParamRaw) : undefined;

  try {
    const result = await runBufferScheduler({
      dryRun,
      slugs: slugs.length ? slugs : undefined,
      limit: Number.isFinite(limit) ? limit : undefined,
    });
    const status = result.ok ? 200 : 422;
    return NextResponse.json(result, { status });
  } catch (e) {
    console.error('[api/buffer/schedule]', e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
