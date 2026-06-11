import { getKV } from '@/lib/kv';

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const buckets = new Map<string, number[]>();

export function getClientIp(request: Request): string {
  const xf = request.headers.get('x-forwarded-for');
  if (xf) {
    const first = xf.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

function inMemoryRateLimitOk(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const prev = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (prev.length >= max) return false;
  prev.push(now);
  buckets.set(key, prev);
  return true;
}

export async function rateLimitOk(opts: {
  ip: string;
  scope: string;
  max?: number;
  windowMs?: number;
}): Promise<{ ok: boolean; remaining: number }> {
  const max = opts.max ?? RATE_MAX;
  const windowMs = opts.windowMs ?? RATE_WINDOW_MS;
  const ip = opts.ip || 'unknown';
  const kv = getKV();

  if (!kv) {
    const ok = inMemoryRateLimitOk(`${opts.scope}:${ip}`, max, windowMs);
    return { ok, remaining: ok ? max - 1 : 0 };
  }

  const key = `rate:${opts.scope}:${ip}`;
  const now = Date.now();
  const cutoff = now - windowMs;

  try {
    const pipeline = kv.pipeline();
    pipeline.zremrangebyscore(key, 0, cutoff);
    pipeline.zcard(key);
    pipeline.zadd(key, { score: now, member: `${now}-${Math.random().toString(36).slice(2, 8)}` });
    pipeline.pexpire(key, windowMs);
    const results = (await pipeline.exec()) as unknown as [number, number, number, number];
    const countBeforeInsert = Number(results[1] ?? 0);
    if (countBeforeInsert >= max) {
      try {
        await kv.zremrangebyscore(key, now - 1, now);
      } catch {
        /* noop */
      }
      return { ok: false, remaining: 0 };
    }
    return { ok: true, remaining: Math.max(0, max - 1 - countBeforeInsert) };
  } catch (err) {
    console.warn('[rate-limit] KV failure, falling back to in-memory:', err);
    const ok = inMemoryRateLimitOk(`${opts.scope}:${ip}`, max, windowMs);
    return { ok, remaining: ok ? max - 1 : 0 };
  }
}
