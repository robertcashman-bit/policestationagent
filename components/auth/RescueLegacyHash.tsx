'use client';

import { useEffect } from 'react';

/**
 * Safety net for old Supabase email links sent before we switched the
 * templates to the PKCE token-hash flow. Those legacy links route through
 * `/auth/v1/verify` which 302-redirects to the Site URL with the session in
 * a URL fragment (#access_token=…&refresh_token=…). The fragment is invisible
 * server-side, so without this rescue the user lands on whatever page and
 * sees nothing happen.
 *
 * On any page mount, if we detect a Supabase-shaped hash fragment, we
 * forward the user to `/auth/confirm` (which already knows how to consume
 * the hash and call setSession), preserving the destination via ?next=.
 *
 * Mounted once in the root layout. No-op on every normal navigation.
 */
export default function RescueLegacyHash() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#')) return;

    const params = new URLSearchParams(hash.slice(1));
    const isAuthHash =
      params.has('access_token') ||
      params.has('refresh_token') ||
      params.has('error') ||
      params.has('error_code');
    if (!isAuthHash) return;

    // Don't bounce when we're already on the page that handles the hash.
    if (window.location.pathname.startsWith('/auth/confirm')) return;

    const next =
      window.location.pathname === '/' || window.location.pathname === ''
        ? '/dashboard'
        : window.location.pathname + window.location.search;

    const target =
      `/auth/confirm?next=${encodeURIComponent(next)}` +
      window.location.hash;
    window.location.replace(target);
  }, []);

  return null;
}
