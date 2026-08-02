import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { FirmProspect } from '@/lib/firm-outreach/types';

function makeKvStore(initial: Record<string, unknown> = {}) {
  const store = new Map<string, unknown>(Object.entries(initial));
  return {
    get: async (key: string) => store.get(key),
    set: async (key: string, value: unknown) => {
      store.set(key, value);
    },
    mget: async (...keys: string[]) => keys.map((k) => store.get(k) ?? null),
    del: async (key: string) => {
      store.delete(key);
    },
    store,
  };
}

const kvRef = vi.hoisted(() => ({ kv: null as ReturnType<typeof makeKvStore> | null }));

vi.mock('@/lib/kv', () => ({
  getKV: () => kvRef.kv,
  skipKVInPrerender: () => false,
}));

function readyProspect(id: string): FirmProspect {
  return {
    id,
    firmKey: `firm-${id}`,
    firmName: `Firm ${id}`,
    prospectType: 'firm',
    status: 'ready_to_send',
    sequenceStep: 0,
    sources: ['laa'],
    priorityScore: 10,
    campaignId: 'agent_cover_kent_v1',
    enrichAttempts: 0,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    email: 'crime@example.co.uk',
    postcode: 'ME14 1AB',
  };
}

describe('saveProspect stale-index cleanup', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('removes prospect from discovered index when promoted to ready_to_send', async () => {
    const p = readyProspect('p1');
    kvRef.kv = makeKvStore({
      'firmprospect:index': ['p1'],
      'firmprospect:p1': { ...p, status: 'discovered' },
      'firmprospect:status:discovered': ['p1'],
      'firmprospect:status:ready_to_send': [],
    });

    const { saveProspect, listProspectsByStatus } = await import('@/lib/firm-outreach/storage');
    await saveProspect(p, 'discovered');

    expect((await listProspectsByStatus('discovered')).map((x) => x.id)).toEqual([]);
    expect((await listProspectsByStatus('ready_to_send')).map((x) => x.id)).toEqual(['p1']);
  });

  it('keeps record and index aligned after status change', async () => {
    const p = readyProspect('p2');
    kvRef.kv = makeKvStore({
      'firmprospect:index': ['p2'],
      'firmprospect:p2': { ...p, status: 'discovered' },
      'firmprospect:status:discovered': ['p2', 'p2'],
      'firmprospect:status:ready_to_send': ['p2'],
    });

    const { saveProspect, listProspectsByRecordStatus } = await import('@/lib/firm-outreach/storage');
    await saveProspect(p, 'discovered');

    const ready = await listProspectsByRecordStatus('ready_to_send');
    expect(ready).toHaveLength(1);
    expect(ready[0].status).toBe('ready_to_send');
  });

  it('recovers from WRONGTYPE on index keys without throwing', async () => {
    const base = makeKvStore({
      'firmoutreach:suppression:index': 'not-an-array',
    });
    const wrongTypeKeys = new Set(['firmoutreach:suppression:index']);
    kvRef.kv = {
      ...base,
      get: async (key: string) => {
        if (wrongTypeKeys.has(key)) {
          throw new Error('WRONGTYPE Operation against a key holding the wrong kind of value');
        }
        return base.get(key);
      },
      del: async (key: string) => {
        wrongTypeKeys.delete(key);
        return base.del(key);
      },
    };

    const { addSuppression, listAllSuppressions } = await import('@/lib/firm-outreach/storage');
    await expect(addSuppression('bounce@example.co.uk', 'bounce')).resolves.toBeUndefined();

    const rows = await listAllSuppressions();
    expect(rows.some((r) => r.email === 'bounce@example.co.uk')).toBe(true);
    expect(wrongTypeKeys.size).toBe(0);
  });

  it('wipes non-array index values and recreates as JSON arrays', async () => {
    kvRef.kv = makeKvStore({
      'firmoutreach:suppression:index': { bad: true },
    });

    const { addSuppression, listAllSuppressions } = await import('@/lib/firm-outreach/storage');
    await expect(addSuppression('wipe@example.co.uk', 'bounce')).resolves.toBeUndefined();

    const rows = await listAllSuppressions();
    expect(rows.some((r) => r.email === 'wipe@example.co.uk')).toBe(true);
    expect(Array.isArray(kvRef.kv!.store.get('firmoutreach:suppression:index'))).toBe(true);
  });
});
