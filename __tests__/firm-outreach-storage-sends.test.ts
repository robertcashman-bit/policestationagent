import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { FirmOutreachSend } from '@/lib/firm-outreach/types';

const mockGet = vi.fn();
const mockMget = vi.fn();

vi.mock('@/lib/kv', () => ({
  getKV: () => ({ get: mockGet, mget: mockMget }),
  skipKVInPrerender: () => false,
}));

function makeSend(id: string): FirmOutreachSend {
  return {
    id,
    prospectId: `fop_${id}`,
    firmName: 'Test LLP',
    prospectType: 'firm',
    email: 'test@example.co.uk',
    campaignId: 'agent_cover_kent_v1',
    sequenceStep: 0,
    subject: 'Subject',
    status: 'sent',
    createdAt: '2026-01-01T00:00:00Z',
  };
}

describe('listAllSends batch reads', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('loads sends with mget batches instead of per-id get', async () => {
    const ids = ['fos_a', 'fos_b', 'fos_c'];
    mockGet.mockResolvedValue(ids);
    mockMget.mockResolvedValue(ids.map((id) => makeSend(id)));

    const { listAllSends } = await import('@/lib/firm-outreach/storage');
    const sends = await listAllSends();

    expect(sends).toHaveLength(3);
    expect(mockMget).toHaveBeenCalledTimes(1);
    expect(mockMget.mock.calls[0]).toHaveLength(3);
  });

  it('listRecentSends only mgets the requested limit', async () => {
    const ids = ['fos_1', 'fos_2', 'fos_3', 'fos_4', 'fos_5'];
    mockGet.mockResolvedValue(ids);
    mockMget.mockResolvedValue([makeSend('fos_5'), makeSend('fos_4')]);

    const { listRecentSends } = await import('@/lib/firm-outreach/storage');
    const sends = await listRecentSends(2);

    expect(sends).toHaveLength(2);
    expect(mockMget).toHaveBeenCalledTimes(1);
    expect(mockMget.mock.calls[0]).toHaveLength(2);
  });
});
