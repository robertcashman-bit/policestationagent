import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

const PROSPECT_COUNTS_CACHE = 'firmoutreach:cache:prospect_counts';

describe('prospect status snapshot cache', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-18T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns cached counts when fresh', async () => {
    const cache = {
      counts: { discovered: 10, ready_to_send: 2 },
      masterIndexCount: 12,
      computedAt: '2026-06-18T11:58:00.000Z',
    };
    const kv = {
      get: vi.fn(async (key: string) => (key === PROSPECT_COUNTS_CACHE ? cache : null)),
      set: vi.fn(),
      del: vi.fn(),
      mget: vi.fn(),
    };

    vi.doMock('@/lib/kv', () => ({
      getKV: () => kv,
      skipKVInPrerender: () => false,
    }));

    const { getProspectStatusSnapshot } = await import('@/lib/firm-outreach/storage');
    const snapshot = await getProspectStatusSnapshot();

    expect(snapshot.fromCache).toBe(true);
    expect(snapshot.counts.discovered).toBe(10);
    expect(kv.get).toHaveBeenCalledWith(PROSPECT_COUNTS_CACHE);
    expect(kv.mget).not.toHaveBeenCalled();
  });

  it('returns stale cache without rescanning when TTL expired', async () => {
    const cache = {
      counts: { discovered: 10, ready_to_send: 2 },
      masterIndexCount: 12,
      computedAt: '2026-06-18T11:00:00.000Z',
    };
    const kv = {
      get: vi.fn(async (key: string) => (key === PROSPECT_COUNTS_CACHE ? cache : null)),
      set: vi.fn(),
      del: vi.fn(),
      mget: vi.fn(),
    };

    vi.doMock('@/lib/kv', () => ({
      getKV: () => kv,
      skipKVInPrerender: () => false,
    }));

    const { getProspectStatusSnapshot } = await import('@/lib/firm-outreach/storage');
    const snapshot = await getProspectStatusSnapshot();

    expect(snapshot.fromCache).toBe(false);
    expect(snapshot.counts.discovered).toBe(10);
    expect(kv.mget).not.toHaveBeenCalled();
  });

  it('invalidates cache via invalidateProspectCountsCache', async () => {
    const kvStore = new Map<string, unknown>([
      [
        PROSPECT_COUNTS_CACHE,
        {
          counts: { discovered: 1 },
          masterIndexCount: 1,
          computedAt: new Date().toISOString(),
        },
      ],
    ]);
    const kv = {
      get: vi.fn(async (key: string) => kvStore.get(key) ?? null),
      set: vi.fn(async (key: string, value: unknown) => {
        kvStore.set(key, value);
      }),
      del: vi.fn(async (key: string) => {
        kvStore.delete(key);
      }),
    };

    vi.doMock('@/lib/kv', () => ({
      getKV: () => kv,
      skipKVInPrerender: () => false,
    }));

    const { invalidateProspectCountsCache } = await import('@/lib/firm-outreach/storage');
    await invalidateProspectCountsCache();

    expect(kvStore.has(PROSPECT_COUNTS_CACHE)).toBe(false);
  });
});

describe('countProspectsByStatusFromIndexes', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns list lengths without record mget', async () => {
    vi.doMock('@/lib/kv', () => ({
      getKV: () => ({
        get: vi.fn(async (key: string) => {
          if (key === 'firmprospect:status:discovered') return ['a', 'b'];
          if (key === 'firmprospect:status:ready_to_send') return ['c'];
          return [];
        }),
      }),
      skipKVInPrerender: () => false,
    }));

    const { countProspectsByStatusFromIndexes } = await import('@/lib/firm-outreach/storage');
    const counts = await countProspectsByStatusFromIndexes();

    expect(counts.discovered).toBe(2);
    expect(counts.ready_to_send).toBe(1);
  });
});
