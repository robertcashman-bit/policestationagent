import { getAccessSnapshot } from '@/lib/auth/access';
import { NextRequest, NextResponse } from 'next/server';

type PaidAccessResult =
  | { ok: true; access: Awaited<ReturnType<typeof getAccessSnapshot>> }
  | { ok: false; response: NextResponse };

/** Require authenticated user with paid training access (or admin). */
export async function requirePaidTrainingAccess(): Promise<PaidAccessResult> {
  const access = await getAccessSnapshot();
  if (!access.isAuthenticated) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  if (!access.hasPaidAccess && !access.isAdmin) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Subscription required' }, { status: 403 }),
    };
  }
  return { ok: true, access };
}

/** Sanitize user search input for PostgREST `.or()` filters. */
export function sanitizePaceSearch(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[,()%.\\]/g, ' ').trim().slice(0, 120);
  return cleaned.length > 0 ? cleaned : null;
}

/** Fail closed on cron routes in production when CRON_SECRET is unset. */
export function isCronRequestAuthorized(request: Request): boolean | 'misconfigured' {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return process.env.NODE_ENV === 'production' ? 'misconfigured' : true;
  }
  const auth = request.headers.get('authorization') ?? '';
  return auth === `Bearer ${secret}`;
}
