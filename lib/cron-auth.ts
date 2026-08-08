import { timingSafeEqual } from 'crypto';

function timingSafeSecretEqual(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);
  if (providedBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(providedBuf, expectedBuf);
}

export function isCronAuthorized(request: Request, secret = process.env.CRON_SECRET): boolean {
  if (!secret) {
    return process.env.NODE_ENV !== 'production';
  }
  const auth = request.headers.get('authorization') || '';
  const xSecret = request.headers.get('x-cron-secret') || '';
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  return timingSafeSecretEqual(bearer, secret) || timingSafeSecretEqual(xSecret, secret);
}

/** Cron auth or one-off bootstrap secret (for operator scripts). */
export function isOutreachBootstrapAuthorized(request: Request): boolean {
  if (isCronAuthorized(request)) return true;
  const bootstrapSecret = process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim();
  if (!bootstrapSecret) return false;
  const header = request.headers.get('x-firm-outreach-bootstrap-secret') || '';
  return timingSafeSecretEqual(header, bootstrapSecret);
}
