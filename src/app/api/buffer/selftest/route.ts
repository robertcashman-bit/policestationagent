import { NextResponse } from 'next/server';
import { isCronRequestAuthorized } from '@/lib/auth/cron';
import { runCustodyNoteBufferSelfTest } from '@/lib/buffer/engine-run';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = isCronRequestAuthorized(request);
  if (auth === 'misconfigured') {
    return NextResponse.json({ ok: false, error: 'Cron not configured' }, { status: 503 });
  }
  if (!auth) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  try {
    const result = await runCustodyNoteBufferSelfTest();
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
