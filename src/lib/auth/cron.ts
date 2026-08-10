/** Fail closed on cron routes in production when CRON_SECRET is unset. */
export function isCronRequestAuthorized(request: Request): boolean | 'misconfigured' {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return process.env.NODE_ENV === 'production' ? 'misconfigured' : true;
  }
  const auth = request.headers.get('authorization') ?? '';
  return auth === `Bearer ${secret}`;
}
