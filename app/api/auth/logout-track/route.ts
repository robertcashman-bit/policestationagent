import { NextRequest, NextResponse } from 'next/server';
import { endSession } from '@/lib/session-tracker';

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const sessionId = (body as { sessionId?: unknown })?.sessionId;
    if (typeof sessionId !== 'string' || sessionId.length < 8) {
      return NextResponse.json({ error: 'Bad session id' }, { status: 400 });
    }

    await endSession(sessionId);
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error('logout-track error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
