import { NextRequest, NextResponse } from 'next/server';
import { verifyPsaBufferSchedule } from '@/lib/buffer/engine-run';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  return req.headers.get('authorization') === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    const result = await verifyPsaBufferSchedule({ gapFill: true });
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
