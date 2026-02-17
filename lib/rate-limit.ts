/**
 * Simple in-memory rate limiter.
 * Note: In serverless, each instance has its own store; consider Upstash Redis for production-scale.
 */

const store = new Map<string, { count: number; resetAt: number }>();
const CLEANUP_INTERVAL = 60_000; // 1 min

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";
  return ip;
}

function cleanup() {
  const now = Date.now();
  for (const [key, v] of store.entries()) {
    if (v.resetAt < now) store.delete(key);
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanup, CLEANUP_INTERVAL);
}

/**
 * Check rate limit. Returns true if allowed, false if rate limited.
 * @param key - unique key (e.g. IP)
 * @param maxRequests - max requests per window
 * @param windowMs - window in ms
 */
export function checkRateLimit(
  request: Request,
  maxRequests: number = 5,
  windowMs: number = 60_000
): { allowed: boolean; retryAfter?: number } {
  const key = getClientKey(request);
  const now = Date.now();
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}
