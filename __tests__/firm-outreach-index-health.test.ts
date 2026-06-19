import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  buildIndexDriftWarning,
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
  it('warns when master index has ids but status counts are all zero', () => {
    const warning = buildIndexDriftWarning(3774, 0);
    expect(warning).toContain('3774');
    expect(warning).toContain('empty');
  });

  it('returns undefined when counts match storage', () => {
    expect(buildIndexDriftWarning(100, 100)).toBeUndefined();
  });

  it('warns on severe partial drift', () => {
    const warning = buildIndexDriftWarning(1000, 100);
    expect(warning).toContain('incomplete');
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
          campaignId: 'c',
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
          campaignId: 'c',
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
    }));

    const { reindexProspectStatuses } = await import('@/lib/firm-outreach/reindex-prospects');
    const result = await reindexProspectStatuses();

    expect(result.scanned).toBe(2);
    expect(result.byStatus.discovered).toBe(1);
    expect(result.byStatus.excluded).toBe(1);
    expect(sets.get('firmprospect:status:discovered')).toEqual(['p1']);
    expect(sets.get('firmprospect:status:excluded')).toEqual(['p2']);
  });
});

describe('getProspectIndexHealth', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('detects drift when master list is populated but status counts are zero', async () => {
    vi.doMock('@/lib/firm-outreach/storage', () => ({
      listAllProspectIds: vi.fn().mockResolvedValue(['p1', 'p2']),
      countProspectsByStatus: vi.fn().mockResolvedValue({
        discovered: 0,
        ready_to_send: 0,
        excluded: 0,
      }),
    }));

    const { getProspectIndexHealth } = await import('@/lib/firm-outreach/index-health');
    const health = await getProspectIndexHealth();

    expect(health.drifted).toBe(true);
    expect(health.masterIndexCount).toBe(2);
    expect(health.indexedTotal).toBe(0);
    expect(health.warning).toContain('empty');
  });
});
