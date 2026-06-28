import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FirmProspect } from '@/lib/firm-outreach/types';

const mockGetProspect = vi.fn();
const mockSaveProspect = vi.fn();
const mockListIds = vi.fn();
const mockDuplicate = vi.fn();

vi.mock('@/lib/legal-directory/laa-fetch', () => ({
  readLaaCrimeJson: () => [],
}));
vi.mock('@/lib/dscc-register-lookup', () => ({
  ensureDsccRegisterCache: () => ({ entries: [] }),
}));
vi.mock('@/lib/firm-outreach/storage', () => ({
  getProspect: (...args: unknown[]) => mockGetProspect(...args),
  saveProspect: (...args: unknown[]) => mockSaveProspect(...args),
  listAllProspectIds: (...args: unknown[]) => mockListIds(...args),
  isDuplicateInitialSend: (...args: unknown[]) => mockDuplicate(...args),
}));

const base: FirmProspect = {
  id: 'fop_kent_1',
  firmName: 'Kent Crime LLP',
  firmKey: 'kent-crime',
  email: 'crime@kentcrime.co.uk',
  status: 'discovered',
  prospectType: 'firm',
  campaignId: 'agent_cover_kent_v1',
  sequenceStep: 0,
  county: 'Kent',
  sources: ['laa'],
  priorityScore: 10,
  enrichAttempts: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('requalifyAllProspects promote discovered', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockListIds.mockResolvedValue(['fop_kent_1']);
    mockGetProspect.mockResolvedValue({ ...base });
    mockSaveProspect.mockImplementation(async (p: FirmProspect) => p);
    mockDuplicate.mockResolvedValue(false);
  });

  it('promotes qualified discovered prospects with email to ready_to_send', async () => {
    const { requalifyAllProspects } = await import('@/lib/firm-outreach/requalify-prospects');
    const result = await requalifyAllProspects({ verifyWebsites: false });
    expect(result.promotedToReady).toBe(1);
    expect(mockSaveProspect).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ready_to_send' }),
      'discovered',
    );
  });
});
