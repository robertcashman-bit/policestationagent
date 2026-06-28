import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  buildIndexDriftWarning,
  buildProspectIndexHealth,
  getProspectIndexHealth,
  sumIndexedProspectCounts,
} from '@/lib/firm-outreach/index-health';
import {
  assertSafeReindexWrite,
  ReindexSafetyError,
} from '@/lib/firm-outreach/reindex-prospects';

describe('sumIndexedProspectCounts', () => {
  it('sums all status bucket counts', () => {
    expect(
      sumIndexedProspectCounts({
        discovered: 3770,
        ready_to_send: 0,
        excluded: 4,
      }),
    ).toBe(3774);
  });
});

describe('buildIndexDriftWarning', () => {
  it('warns when record counts exist but index totals are zero', () => {
    const warning = buildIndexDriftWarning(3774, 0);
    expect(warning).toContain('3774');
    expect(warning).toContain('empty');
  });

  it('returns undefined when index and record totals align', () => {
    expect(buildIndexDriftWarning(100, 100)).toBeUndefined();
  });

  it('warns on severe partial drift', () => {
    const warning = buildIndexDriftWarning(1000, 100);
    expect(warning).toContain('incomplete');
  });

  it('does not warn when master index is larger than active records', () => {
    expect(buildIndexDriftWarning(3774, 3774)).toBeUndefined();
  });
});

describe('buildProspectIndexHealth', () => {
  it('compares index totals against record totals', () => {
    const health = buildProspectIndexHealth({
      prospectCounts: { discovered: 10, ready_to_send: 2 },
      masterIndexCount: 8367,
      indexCounts: { discovered: 10, ready_to_send: 2 },
    });

    expect(health.drifted).toBe(false);
    expect(health.recordTotal).toBe(12);
    expect(health.indexedTotal).toBe(12);
    expect(health.masterIndexCount).toBe(8367);
  });
});

describe('assertSafeReindexWrite', () => {
  it('allows empty master list (no prospects yet)', () => {
    expect(() => assertSafeReindexWrite([], {}, 0)).not.toThrow();
  });

  it('refuses when master ids exist but no records loaded', () => {
    expect(() => assertSafeReindexWrite(['a', 'b'], {}, 0)).toThrow(ReindexSafetyError);
  });

  it('refuses when buckets would be empty despite records', () => {
    expect(() =>
      assertSafeReindexWrite(['a'], { discovered: 1 }, 0),
    ).toThrow(/empty status indexes/);
  });

  it('allows valid rebuild', () => {
    expect(() =>
      assertSafeReindexWrite(['a', 'b'], { discovered: 2 }, 2),
    ).not.toThrow();
  });
});

describe('reindexProspectStatuses batch write', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('writes one KV set per status from loaded records', async () => {
    const sets = new Map<string, string[]>();
    const prospects = new Map([
      [
        'p1',
        {
          id: 'p1',
          status: 'discovered' as const,
          firmKey: 'a',
          firmName: 'A',
          prospectType: 'firm' as const,
          campaignId: 'agent_cover_kent_v1',
          sources: ['laa'],
          priorityScore: 1,
          enrichAttempts: 0,
          createdAt: '',
          updatedAt: '',
        },
      ],
      [
        'p2',
        {
          id: 'p2',
          status: 'excluded' as const,
          firmKey: 'b',
          firmName: 'B',
          prospectType: 'firm' as const,
          campaignId: 'agent_cover_kent_v1',
          sources: ['laa'],
          priorityScore: 1,
          enrichAttempts: 0,
          createdAt: '',
          updatedAt: '',
        },
      ],
    ]);

    vi.doMock('@/lib/kv', () => ({
      getKV: () => ({
        set: async (key: string, value: string[]) => {
          sets.set(key, value);
        },
      }),
    }));

    vi.doMock('@/lib/firm-outreach/storage', () => ({
      listAllProspectIds: vi.fn().mockResolvedValue(['p1', 'p2']),
      getProspectsByIds: vi.fn().mockResolvedValue(prospects),
      writeProspectCountsCache: vi.fn().mockResolvedValue(undefined),
    }));

    const { reindexProspectStatuses } = await import('@/lib/firm-outreach/reindex-prospects');
    const result = await reindexProspectStatuses();

    expect(result.scanned).toBe(2);
    expect(result.byStatus.discovered).toBe(1);
    expect(result.byStatus.excluded).toBe(1);
    expect(result.activeByStatus.discovered).toBe(1);
    expect(sets.get('firmprospect:status:discovered')).toEqual(['p1']);
    expect(sets.get('firmprospect:status:excluded')).toEqual(['p2']);
  });
});

describe('getProspectIndexHealth', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('detects drift when record counts exist but index totals are zero', async () => {
    vi.doMock('@/lib/firm-outreach/storage', () => ({
      getProspectStatusSnapshot: vi.fn().mockResolvedValue({
        counts: { discovered: 2, ready_to_send: 0, excluded: 0 },
        masterIndexCount: 8367,
        computedAt: new Date().toISOString(),
        fromCache: false,
      }),
      countProspectsByStatusFromIndexes: vi.fn().mockResolvedValue({
        discovered: 0,
        ready_to_send: 0,
        excluded: 0,
      }),
    }));

    const { getProspectIndexHealth } = await import('@/lib/firm-outreach/index-health');
    const health = await getProspectIndexHealth();

    expect(health.drifted).toBe(true);
    expect(health.masterIndexCount).toBe(8367);
    expect(health.recordTotal).toBe(2);
    expect(health.indexedTotal).toBe(0);
    expect(health.warning).toContain('empty');
  });

  it('reuses injected snapshot without calling getProspectStatusSnapshot', async () => {
    const mockSnapshot = vi.fn();
    const mockIndexCounts = vi.fn().mockResolvedValue({
      discovered: 2,
      ready_to_send: 1,
    });

    vi.doMock('@/lib/firm-outreach/storage', () => ({
      getProspectStatusSnapshot: mockSnapshot,
      countProspectsByStatusFromIndexes: mockIndexCounts,
    }));

    const { getProspectIndexHealth } = await import('@/lib/firm-outreach/index-health');
    const health = await getProspectIndexHealth({
      counts: { discovered: 2, ready_to_send: 1 },
      masterIndexCount: 10,
    });

    expect(mockSnapshot).not.toHaveBeenCalled();
    expect(mockIndexCounts).toHaveBeenCalledTimes(1);
    expect(health.drifted).toBe(false);
    expect(health.recordTotal).toBe(3);
    expect(health.indexedTotal).toBe(3);
  });
});
