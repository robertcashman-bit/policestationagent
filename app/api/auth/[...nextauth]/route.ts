import { NextResponse } from 'next/server';

/** Google OAuth login disabled — use magic-code auth at /admin */
export async function GET() {
  return NextResponse.json(
    {
      error:
        'Google OAuth login is disabled. Go to /admin and sign in with your email login code.',
    },
    { status: 410 },
  );
}

export async function POST() {
  return NextResponse.json(
    {
      error:
        'Google OAuth login is disabled. Go to /admin and sign in with your email login code.',
    },
    { status: 410 },
  );
}
