import { safeInternalNextPath } from './safe-next-path';

const CHECKOUT_PLANS = new Set(['monthly', 'annual']);

/**
 * Decide where an already-signed-in user should land when they hit an
 * auth-entry page (`/auth`, `/login`, `/signup`).
 *
 * Prefers an explicit `next` param. Falls back to `plan=monthly|annual`
 * (how pricing's "Get started" buttons link to `/signup?plan=monthly`) by
 * sending the user straight to billing for that plan instead of blindly
 * defaulting to `/dashboard` and dropping their intent to subscribe.
 */
export function resolveAuthEntryRedirect(
  searchParams: Pick<URLSearchParams, 'get'>,
  fallback = '/dashboard',
): string {
  const rawNext = searchParams.get('next');
  if (rawNext != null && rawNext.trim() !== '') {
    return safeInternalNextPath(rawNext, fallback);
  }

  const plan = searchParams.get('plan');
  if (plan && CHECKOUT_PLANS.has(plan)) {
    return `/billing?plan=${plan}`;
  }

  return fallback;
}

/**
 * Split a resolved destination that may itself contain a query string
 * (e.g. `/billing?plan=monthly`) into pathname + search. Needed because
 * assigning a raw string containing `?` directly to `URL.pathname`
 * percent-encodes it into the path instead of being treated as a query
 * string, producing a broken 404 URL like `/billing%3Fplan%3Dmonthly`.
 */
export function buildAuthNextFromRequest(pathname: string, search: string): string {
  return search ? `${pathname}${search}` : pathname;
}

export function splitPathAndSearch(dest: string): { pathname: string; search: string } {
  const [pathname, search] = dest.split('?');
  return { pathname: pathname || '/', search: search ? `?${search}` : '' };
}
