import { NextRequest, NextResponse } from 'next/server';
import { signGateToken } from '@/lib/gate-token';

const GATE_COOKIE_NAME = 'psr_gate';
const GATE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const code = typeof body?.code === 'string' ? body.code.trim() : '';
    const expected = process.env.APP_ACCESS_CODE?.trim();

    if (!expected) {
      return NextResponse.json(
        { error: 'Access gate is not configured' },
        { status: 503 }
      );
    }

    if (code !== expected) {
      return NextResponse.json(
        { error: 'Incorrect codeword' },
        { status: 401 }
      );
    }

    const token = await signGateToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set(GATE_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: GATE_COOKIE_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
