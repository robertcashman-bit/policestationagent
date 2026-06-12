import { redirect } from 'next/navigation';
import { getSessionEmail } from '@/lib/admin-session';
import { getKV } from '@/lib/kv';

const DEFAULT_ADMIN_EMAIL = 'robertdavidcashman@gmail.com';

const ADMIN_EMAILS = new Set(
  [
    DEFAULT_ADMIN_EMAIL,
    ...(process.env.ADMIN_EMAILS || process.env.OWNER_EMAIL || '')
      .split(/[,;]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  ],
);

export interface AdminSession {
  role: 'admin';
  email: string;
}

export type AdminCheckResult =
  | { ok: true; email: string }
  | { ok: false; status: 401 | 403; error: string };

/** Whether KV is available for admin sessions (required in production). */
export function isAdminAuthConfigured(): boolean {
  if (process.env.NODE_ENV !== 'production') return true;
  return Boolean(getKV());
}

/** @deprecated Use isAdminAuthConfigured */
export function isJWTSecretConfigured(): boolean {
  return isAdminAuthConfigured();
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.toLowerCase());
}

export function getDefaultAdminEmail(): string {
  return DEFAULT_ADMIN_EMAIL;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const email = await getSessionEmail();
  if (!email || !isAdminEmail(email)) return null;
  return { role: 'admin', email };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  return (await getAdminSession()) !== null;
}

export async function requireAdmin(): Promise<AdminCheckResult> {
  const email = await getSessionEmail();
  if (!email) return { ok: false, status: 401, error: 'Not authenticated' };

  if (process.env.NODE_ENV === 'production' && !getKV()) {
    return { ok: false, status: 403, error: 'Admin login not configured (Upstash Redis required)' };
  }

  if (!isAdminEmail(email)) {
    return { ok: false, status: 403, error: 'Not authorised' };
  }
  return { ok: true, email };
}

export async function requireAdminAuth(): Promise<AdminSession> {
  const auth = await requireAdmin();
  if (!auth.ok) {
    redirect('/admin');
  }
  return { role: 'admin', email: auth.email };
}

export type AdminApiCheckResult =
  | { ok: true; session: AdminSession }
  | { ok: false; status: 401 | 403; error: string };

export async function requireAdminApi(): Promise<AdminApiCheckResult> {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return { ok: false, status: auth.status, error: auth.error };
  }
  return { ok: true, session: { role: 'admin', email: auth.email } };
}
