import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getRequestOrigin } from '@/lib/auth/request-origin';
import { safeInternalNextPath } from '@/lib/auth/safe-next-path';

/**
 * Hardened sign-in callback.
 *
 * Handles ?code=... (PKCE) and ?token_hash=... (email confirmation).
 * Always lands the user on a real page — never a blank screen.
 *
 *   success                       → ${next}     (default /dashboard)
 *   no token in url               → /auth?error=missing_token
 *   exchange / verify failure     → /auth?error=auth_callback_error&detail=...
 *   no env config                 → /auth?error=not_configured
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteOrigin = getRequestOrigin(request);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as
    | 'magiclink'
    | 'recovery'
    | 'invite'
    | 'email'
    | 'signup'
    | null;
  const nextParam = searchParams.get('next');
  // Recovery (password reset) links must always land on /auth/reset, even if
  // the email template's `next` was set to something else.
  const next = (() => {
    if (type === 'recovery') return '/auth/reset';
    return safeInternalNextPath(nextParam, '/dashboard');
  })();

  const failRedirect = (reason: string, detail?: string) => {
    const url = new URL('/auth', siteOrigin);
    url.searchParams.set('error', reason);
    if (detail) url.searchParams.set('detail', detail.slice(0, 200));
    if (next !== '/dashboard') url.searchParams.set('next', next);
    return NextResponse.redirect(url);
  };

  if (!code && !tokenHash) {
    return failRedirect('missing_token');
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch (err) {
    return failRedirect(
      'not_configured',
      err instanceof Error ? err.message : 'init_failed',
    );
  }

  try {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return failRedirect('auth_callback_error', error.message);
      }
    } else if (tokenHash) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type ?? 'email',
      });
      if (error) {
        return failRedirect('auth_callback_error', error.message);
      }
    }
  } catch (err) {
    return failRedirect(
      'auth_callback_error',
      err instanceof Error ? err.message : 'unknown',
    );
  }

  return NextResponse.redirect(`${siteOrigin}${next}`);
}
