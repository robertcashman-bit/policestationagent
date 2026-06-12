import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, destroySession } from '@/lib/admin-session';

const LEGACY_AUTH_COOKIE = 'auth-token';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    await destroySession(token);
  }
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  cookieStore.delete(LEGACY_AUTH_COOKIE);

  const response = NextResponse.json({ success: true });
  response.cookies.set(LEGACY_AUTH_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
