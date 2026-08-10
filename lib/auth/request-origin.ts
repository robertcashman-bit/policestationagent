/**
 * Canonical origin for redirects from Route Handlers behind proxies (e.g. Vercel).
 */
export function getRequestOrigin(request: Request): string {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get('x-forwarded-host');
  if (!forwardedHost) {
    return url.origin;
  }
  const host = forwardedHost.split(',')[0]?.trim();
  if (!host) return url.origin;

  const forwardedProto = request.headers.get('x-forwarded-proto');
  const proto =
    forwardedProto?.split(',')[0]?.trim() ||
    url.protocol.replace(/:$/, '') ||
    'https';

  return `${proto}://${host}`;
}
