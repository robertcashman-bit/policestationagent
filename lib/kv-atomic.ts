import { getKV } from '@/lib/kv';

/** Atomic SET NX — returns true when this caller claimed the key. */
export async function claimKey(
  key: string,
  ttlSeconds: number,
  value = new Date().toISOString(),
): Promise<boolean> {
  const kv = getKV();
  if (!kv) return false;
  const result = await kv.set(key, value, { nx: true, ex: ttlSeconds });
  // @upstash/redis returns "OK"; some clients/mocks return true.
  return result === 'OK' || (result as unknown) === true;
}

/** Increment a counter with TTL refresh (uses Redis INCR when available). */
export async function incrementCounter(
  key: string,
  ttlSeconds: number,
): Promise<number> {
  const kv = getKV();
  if (!kv) return 0;
  const next = await kv.incr(key);
  if (next === 1) {
    await kv.expire(key, ttlSeconds);
  }
  return next;
}

function isWrongTypeError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /WRONGTYPE/i.test(msg);
}

type KvLike = NonNullable<ReturnType<typeof getKV>>;

async function safeDel(kv: KvLike, key: string): Promise<boolean> {
  if (typeof kv.del !== 'function') return false;
  try {
    await kv.del(key);
    return true;
  } catch {
    return false;
  }
}

async function writeSetMembers(kv: KvLike, key: string, members: string[]): Promise<void> {
  if (members.length === 0) return;
  if (typeof kv.sadd === 'function' && typeof kv.pipeline === 'function') {
    const pipeline = kv.pipeline();
    for (const member of members) pipeline.sadd(key, member);
    await pipeline.exec();
    return;
  }
  if (typeof kv.sadd === 'function') {
    for (const member of members) {
      await kv.sadd(key, member);
    }
    return;
  }
  // Test mocks / limited clients — persist as JSON array.
  await kv.set(key, members);
}

/**
 * Read string index — Redis SET (SMEMBERS) with legacy JSON array fallback.
 * Never deletes a Redis SET on WRONGTYPE from GET (shared-KV safe with RepUK).
 */
export async function readIndexMembers(key: string): Promise<string[]> {
  const kv = getKV();
  if (!kv) return [];

  let smembersOk = false;
  if (typeof kv.smembers === 'function') {
    try {
      const members = await kv.smembers(key);
      if (Array.isArray(members)) {
        smembersOk = true;
        if (members.length > 0) return members.map(String);
      }
    } catch {
      // Key may be legacy JSON array type — fall through to GET.
    }
  }

  try {
    const raw = await kv.get<string[]>(key);
    if (!Array.isArray(raw) || raw.length === 0) return [];

    // Legacy JSON array — migrate to Redis SET when possible.
    if (typeof kv.sadd === 'function') {
      const deleted = await safeDel(kv, key);
      if (deleted) {
        await writeSetMembers(kv, key, raw.map(String));
      }
    }
    return raw.map(String);
  } catch (err) {
    if (isWrongTypeError(err) || smembersOk) {
      // Key is a Redis SET (possibly empty) — SMEMBERS is authoritative. Never DEL.
      if (typeof kv.smembers === 'function') {
        try {
          const members = await kv.smembers(key);
          return Array.isArray(members) ? members.map(String) : [];
        } catch {
          return [];
        }
      }
      return [];
    }
    throw err;
  }
}

/** Atomically add a unique id to a string index (Redis SADD, JSON-array fallback). */
export async function addToIndexSet(key: string, id: string): Promise<void> {
  const kv = getKV();
  if (!kv) return;

  if (typeof kv.sadd === 'function') {
    try {
      await kv.sadd(key, id);
      return;
    } catch {
      // Key may be legacy JSON array — migrate then SADD.
    }
  }

  let legacy: string[] = [];
  try {
    const raw = await kv.get<string[]>(key);
    if (Array.isArray(raw)) legacy = raw.map(String);
  } catch (err) {
    if (!isWrongTypeError(err)) throw err;
    if (typeof kv.sadd === 'function') {
      try {
        await kv.sadd(key, id);
        return;
      } catch {
        /* fall through to JSON recreate */
      }
    }
    // Mock/legacy clients without SMEMBERS: replace the bad key with a JSON array.
    await safeDel(kv, key);
    await kv.set(key, [id]);
    return;
  }

  const members = legacy.includes(id) ? legacy : [...legacy, id];

  if (typeof kv.sadd !== 'function') {
    await kv.set(key, members);
    return;
  }

  const deleted = await safeDel(kv, key);
  if (!deleted) {
    try {
      await kv.sadd(key, id);
    } catch {
      await kv.set(key, members);
    }
    return;
  }

  await writeSetMembers(kv, key, members);
}

/** @deprecated Use addToIndexSet — kept for callers migrating from RMW append. */
export async function appendUniqueToIndex(
  key: string,
  id: string,
): Promise<void> {
  await addToIndexSet(key, id);
}
