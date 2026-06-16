import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getKV } from './kv';

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days
const MAGIC_CODE_TTL = 60 * 10; // 10 minutes
const MAX_VERIFY_ATTEMPTS = 5;
export const ADMIN_SESSION_COOKIE = 'admin-token';

interface SessionData {
  email: string;
  created: number;
}

interface MagicCodeData {
  code: string;
  attempts: number;
}

export async function getSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const kv = getKV();
  if (!kv) return null;

  const session = await kv.get<SessionData>(`admin:session:${token}`);
  return session?.email ?? null;
}

export async function createSession(email: string): Promise<string> {
  const kv = getKV();
  if (!kv) throw new Error('KV not configured');

  const token = crypto.randomUUID();
  await kv.set<SessionData>(
    `admin:session:${token}`,
    { email: email.toLowerCase(), created: Date.now() },
    { ex: SESSION_TTL },
  );
  return token;
}

export async function destroySession(token: string): Promise<void> {
  const kv = getKV();
  if (!kv) return;
  await kv.del(`admin:session:${token}`);
}

export async function storeMagicCode(email: string, code: string): Promise<void> {
  const kv = getKV();
  if (!kv) throw new Error('KV not configured');
  await kv.set<MagicCodeData>(
    `admin:magic:${email.toLowerCase()}`,
    { code, attempts: 0 },
    { ex: MAGIC_CODE_TTL },
  );
}

export async function verifyMagicCode(
  email: string,
  code: string,
): Promise<{ ok: boolean; error?: string }> {
  const kv = getKV();
  if (!kv) return { ok: false, error: 'Login system not configured' };

  const key = `admin:magic:${email.toLowerCase()}`;
  const stored = await kv.get<MagicCodeData>(key);

  if (!stored) {
    return { ok: false, error: 'Code expired or not found. Please request a new one.' };
  }

  if (stored.attempts >= MAX_VERIFY_ATTEMPTS) {
    await kv.del(key);
    return { ok: false, error: 'Too many attempts. Please request a new code.' };
  }

  if (!timingSafeEqual(stored.code, code)) {
    await kv.set<MagicCodeData>(
      key,
      { ...stored, attempts: stored.attempts + 1 },
      { keepTtl: true },
    );
    return { ok: false, error: 'Incorrect code. Please try again.' };
  }

  await kv.del(key);
  return { ok: true };
}
