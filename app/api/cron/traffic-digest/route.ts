import { NextResponse } from 'next/server';
import { isCronRequestAuthorized } from '@/lib/auth/api-guards';
import { runTrafficDigest } from '@/lib/traffic-digest/runner';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  const auth = isCronRequestAuthorized(request);
  if (auth === 'misconfigured') {
    return NextResponse.json({ error: 'Cron not configured' }, { status: 503 });
  }
  if (!auth) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const result = await runTrafficDigest();
    return NextResponse.json({
      ok: true,
      gscClicks: result.gsc.totalClicks,
      gscImpressions: result.gsc.totalImpressions,
      ga4Sessions: result.ga4.sessions,
      ga4Organic: result.ga4.organicSessions,
      indexableUrls: result.indexableUrls,
      emailSent: result.emailSent,
      emailError: result.emailError ?? null,
      gscError: result.gsc.error ?? null,
      ga4Error: result.ga4.error ?? null,
      at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('[traffic-digest]', e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
