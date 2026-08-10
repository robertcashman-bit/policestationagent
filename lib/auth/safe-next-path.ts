/**
 * Validates redirect targets for post-login / post-logout navigation.
 * Blocks protocol-relative URLs (`//evil.com`) and schemes — they pass a naive
 * `path.startsWith('/')` check but are not safe same-origin paths.
 */
export function safeInternalNextPath(
  raw: string | null | undefined,
  fallback = '/dashboard',
): string {
  if (raw == null || typeof raw !== 'string') return fallback;
  const t = raw.trim();
  if (t === '') return fallback;
  if (!t.startsWith('/') || t.startsWith('//')) return fallback;
  const pathOnly = t.split(/[?#]/)[0] ?? t;
  if (pathOnly.includes(':')) return fallback;
  return t;
}
