import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

/**
 * Three-state result of asking "who is logged in right now?".
 *
 * `unavailable` distinguishes "auth provider can't be reached"
 * (network / Supabase paused) from "no session" — protected layouts
 * use this to render a maintenance screen instead of a silent
 * redirect-to-/auth loop the user can't break out of.
 */
export type AuthStatus =
  | { status: 'authenticated'; user: User }
  | { status: 'unauthenticated' }
  | { status: 'unavailable'; reason: 'not_configured' | 'network' };

function looksLikeNetworkError(err: unknown): boolean {
  if (!err) return false;
  const msg = (
    err instanceof Error ? err.message : String(err)
  ).toLowerCase();
  return (
    msg.includes('failed to fetch') ||
    msg.includes('fetch failed') ||
    msg.includes('network') ||
    msg.includes('enotfound') ||
    msg.includes('econnrefused') ||
    msg.includes('etimedout') ||
    msg.includes('socket hang up')
  );
}

export async function getAuthStatus(): Promise<AuthStatus> {
  if (!isSupabaseConfigured()) {
    return { status: 'unavailable', reason: 'not_configured' };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      // Network-style errors surface here as e.g. AuthRetryableFetchError.
      if (looksLikeNetworkError(error) || error.status === 0) {
        console.warn('[auth] provider unreachable:', error.message);
        return { status: 'unavailable', reason: 'network' };
      }
      // Anything else (no session, bad JWT, etc.) → just unauthenticated.
      return { status: 'unauthenticated' };
    }

    if (!data?.user) return { status: 'unauthenticated' };
    return { status: 'authenticated', user: data.user };
  } catch (err) {
    if (looksLikeNetworkError(err)) {
      console.warn('[auth] provider unreachable:', err);
      return { status: 'unavailable', reason: 'network' };
    }
    console.warn('[auth] unexpected getCurrentUser error:', err);
    return { status: 'unauthenticated' };
  }
}

/** Backwards-compatible helper used by most pages. */
export async function getCurrentUser(): Promise<User | null> {
  const s = await getAuthStatus();
  return s.status === 'authenticated' ? s.user : null;
}
