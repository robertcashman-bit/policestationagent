'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { safeInternalNextPath } from '@/lib/auth/safe-next-path';

/**
 * Legacy magic-link landing page. Magic links sent before the new
 * /auth/callback route was deployed land here with tokens in the URL
 * hash (#access_token=...). We finish the session client-side, then
 * forward to the requested destination. Failures redirect to /auth
 * with an actionable error message — never leave the user stuck.
 */
function AuthConfirmInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ranRef = useRef(false);
  const [status, setStatus] = useState<'working' | 'error'>('working');
  const [message, setMessage] = useState('Finishing sign-in…');

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const next = safeInternalNextPath(searchParams.get('next'));
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get('type');
    const code = searchParams.get('code');

    // Modern PKCE / OTP — let the server route do the work.
    if (code || tokenHash) {
      const url = new URL('/auth/callback', window.location.origin);
      if (code) url.searchParams.set('code', code);
      if (tokenHash) url.searchParams.set('token_hash', tokenHash);
      if (type) url.searchParams.set('type', type);
      url.searchParams.set('next', next);
      window.location.replace(url.toString());
      return;
    }

    // Legacy implicit (hash) flow.
    const hash = window.location.hash.startsWith('#')
      ? window.location.hash.substring(1)
      : '';
    if (!hash) {
      router.replace(`/auth?error=missing_token&next=${encodeURIComponent(next)}`);
      return;
    }

    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (!accessToken || !refreshToken) {
      router.replace(`/auth?error=missing_token&next=${encodeURIComponent(next)}`);
      return;
    }

    const supabase = createClient();
    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) {
          setStatus('error');
          setMessage(error.message);
          return;
        }
        router.replace(next);
      })
      .catch((err: unknown) => {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Sign-in failed.');
      });
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-border shadow-card p-8 text-center">
        {status === 'working' ? (
          <>
            <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-lg font-bold text-foreground mb-1">Signing you in…</h1>
            <p className="text-sm text-muted-foreground">{message}</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-lg font-bold text-foreground mb-1">
              Sign-in didn&apos;t finish
            </h1>
            <p className="text-sm text-muted-foreground mb-5">{message}</p>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Request a new code
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f7f6f2] p-6">
          <div className="w-full max-w-md bg-white rounded-2xl border border-border shadow-card p-8 text-center">
            <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-lg font-bold text-foreground mb-1">Loading…</h1>
          </div>
        </div>
      }
    >
      <AuthConfirmInner />
    </Suspense>
  );
}
