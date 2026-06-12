import { NextResponse } from 'next/server';

/** Legacy username/password login — replaced by magic-code auth at /api/auth/send-code */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Username/password login is disabled. Go to /admin and sign in with your email login code.',
    },
    { status: 410 },
  );
}
