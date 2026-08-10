import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { safeInternalNextPath } from '@/lib/auth/safe-next-path';

const COOLDOWN_SECONDS = 60;
const COOKIE_PREFIX = 'psr_otp_cooldown_';

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) &&
    value.length < 320
  );
}

function emailKey(email: string): string {
  return Buffer.from(email.trim().toLowerCase()).toString('base64url').slice(0, 32);
}

/**
 * Server-side guard around Supabase signInWithOtp.
 *
 * Goals:
 *   - Stop spam-clicks from ever reaching Supabase (which has a strict
 *     per-email rate limit that locks users out for an hour).
 *   - Always return JSON the unified /auth page can render — never
 *     leave the user on a dead screen.
 *
 * Cooldown is tracked per-browser with an httpOnly cookie keyed by email.
 * It pairs with the localStorage cooldown on the client, so even
 * private-mode / refresh users still get the same 60s window.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const rawEmail = (body as { email?: unknown })?.email;
  if (!isValidEmail(rawEmail)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 },
    );
  }

  const email = rawEmail.trim().toLowerCase();
  const cookieName = `${COOKIE_PREFIX}${emailKey(email)}`;
  const existing = request.cookies.get(cookieName)?.value;
  if (existing) {
    const until = Number(existing);
    if (Number.isFinite(until) && until > Date.now()) {
      const retryAfter = Math.ceil((until - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: `You requested a code very recently. Try again in ${retryAfter}s.`,
          retryAfter,
        },
        { status: 429 },
      );
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!supabaseUrl || !supabaseAnon) {
    return NextResponse.json(
      { error: 'Sign-in is temporarily unavailable. Please try again shortly.' },
      { status: 503 },
    );
  }

  // Use a stateless client (no cookies) — we only need to call signInWithOtp.
  const supabase = createClient(supabaseUrl, supabaseAnon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const origin = request.nextUrl.origin;
  const next = (body as { next?: unknown })?.next;
  const safeNext = safeInternalNextPath(
    typeof next === 'string' ? next : null,
    '/dashboard',
  );

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
    },
  });

  if (error) {
    const message = error.message?.toLowerCase() ?? '';
    if (
      message.includes('rate limit') ||
      message.includes('over_email_send_rate_limit') ||
      message.includes('too many requests')
    ) {
      // We're now sending through Resend (custom SMTP), so the limit is much
      // higher (~30/hour). When we still trip it, ask the user to wait a few
      // minutes — not the old "one hour" cap.
      const upstreamRetry = 5 * 60; // 5 minutes
      const response = NextResponse.json(
        {
          error:
            'Too many code emails in a short window. Wait a few minutes, or sign in with your password to skip the email step.',
          retryAfter: upstreamRetry,
        },
        { status: 429 },
      );
      response.cookies.set({
        name: cookieName,
        value: String(Date.now() + upstreamRetry * 1000),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: upstreamRetry,
      });
      return response;
    }
    console.error('request-code signInWithOtp error:', error);
    return NextResponse.json(
      { error: 'We could not send the email. Please try again.' },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ ok: true, retryAfter: COOLDOWN_SECONDS });
  response.cookies.set({
    name: cookieName,
    value: String(Date.now() + COOLDOWN_SECONDS * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOLDOWN_SECONDS,
  });
  return response;
}
