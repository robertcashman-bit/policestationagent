import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('@/lib/firm-outreach/storage', () => ({
  CURSOR_ENRICH: 'firmoutreach:cursor:enrich',
  setCursor: vi.fn(),
}));

describe('advanceEnrichCursor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('advances cursor by processed count after partial batch', async () => {
    const { advanceEnrichCursor } = await import('@/lib/firm-outreach/enrichment/run-enrich');
    const { setCursor } = await import('@/lib/firm-outreach/storage');

    const next = await advanceEnrichCursor(100, 10, 500);
    expect(next).toBe(110);
    expect(setCursor).toHaveBeenCalledWith('firmoutreach:cursor:enrich', 110);
  });

  it('wraps cursor to zero when batch reaches end of list', async () => {
    const { advanceEnrichCursor } = await import('@/lib/firm-outreach/enrichment/run-enrich');
    const { setCursor } = await import('@/lib/firm-outreach/storage');

    const next = await advanceEnrichCursor(490, 25, 500);
    expect(next).toBe(0);
    expect(setCursor).toHaveBeenCalledWith('firmoutreach:cursor:enrich', 0);
  });

  it('does not advance when nothing processed and cursor still in range', async () => {
    const { advanceEnrichCursor } = await import('@/lib/firm-outreach/enrichment/run-enrich');
    const { setCursor } = await import('@/lib/firm-outreach/storage');

    const next = await advanceEnrichCursor(50, 0, 500);
    expect(next).toBe(50);
    expect(setCursor).not.toHaveBeenCalled();
  });

  it('resets cursor when timed out at end of list with zero processed', async () => {
    const { advanceEnrichCursor } = await import('@/lib/firm-outreach/enrichment/run-enrich');
    const { setCursor } = await import('@/lib/firm-outreach/storage');

    const next = await advanceEnrichCursor(500, 0, 500);
    expect(next).toBe(0);
    expect(setCursor).toHaveBeenCalledWith('firmoutreach:cursor:enrich', 0);
  });
});

describe('runFirmEnrichment saveProspect indexing', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('passes pre-enrich status to saveProspect so indexes update', async () => {
    const saveProspect = vi.fn();
    const prospect = {
      id: 'p1',
      status: 'discovered' as const,
      priorityScore: 10,
      sources: ['laa'],
      enrichAttempts: 0,
      firmName: 'A',
      firmKey: 'a',
      prospectType: 'firm' as const,
      campaignId: 'agent_cover_kent_v1',
      createdAt: '',
      updatedAt: '',
      regulatoryNumber: '123',
      websiteUrl: 'https://example.co.uk',
    };

    vi.doMock('@/lib/firm-outreach/storage', () => ({
      CURSOR_ENRICH: 'firmoutreach:cursor:enrich',
      listProspectIdsByRecordStatus: vi.fn(async (status: string) =>
        status === 'discovered' ? ['p1'] : [],
      ),
      getProspect: vi.fn().mockResolvedValue({ ...prospect }),
      saveProspect,
      getCursor: vi.fn().mockResolvedValue(0),
      setCursor: vi.fn(),
      isDuplicateInitialSend: vi.fn().mockResolvedValue(false),
    }));

    vi.doMock('@/lib/firm-outreach/constants', () => ({
      enrichBatchSize: () => 5,
    }));

    vi.doMock('@/lib/dscc-register-lookup', () => ({
      ensureDsccRegisterCache: vi.fn().mockResolvedValue({ entries: [] }),
    }));

    vi.doMock('@/lib/legal-directory/laa-fetch', () => ({
      readLaaCrimeJson: vi.fn().mockReturnValue([]),
    }));

    vi.doMock('@/lib/firm-outreach/enrichment/resolve-prospect-website', () => ({
      resolveProspectWebsite: vi.fn().mockResolvedValue(undefined),
    }));

    vi.doMock('@/lib/firm-outreach/enrichment/email-crawler', () => ({
      crawlEmailsForProspect: vi.fn().mockResolvedValue({
        best: { address: 'info@example.co.uk', confidence: 'high', score: 90 },
        alternatives: [],
      }),
    }));

    vi.doMock('@/lib/firm-outreach/enrichment/paid-enrichment', () => ({
      paidEnrichEmails: vi.fn().mockResolvedValue([]),
    }));

    vi.doMock('@/lib/firm-outreach/crime-website-verify', () => ({
      websiteIndicatesCrimePractice: vi.fn().mockResolvedValue(false),
    }));

    vi.doMock('@/lib/firm-outreach/qualification', () => ({
      buildCrimeRegistry: vi.fn().mockReturnValue({ laa: new Set(), dscc: new Set() }),
      resolveStatusWithQualification: vi.fn().mockReturnValue('ready_to_send'),
    }));

    const { runFirmEnrichment } = await import('@/lib/firm-outreach/enrichment/run-enrich');
    await runFirmEnrichment({ limit: 5 });

    expect(saveProspect).toHaveBeenCalledTimes(1);
    expect(saveProspect.mock.calls[0][1]).toBe('discovered');
    expect(saveProspect.mock.calls[0][0].status).toBe('ready_to_send');
  });
});

describe('runFirmEnrichment cursor on timeout', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('does not advance cursor when maxElapsedMs stops before any processing', async () => {
    const setCursor = vi.fn();
    const getCursor = vi.fn().mockResolvedValue(0);
    const prospect = {
      id: 'p1',
      status: 'discovered',
      priorityScore: 10,
      sources: ['laa'],
      enrichAttempts: 0,
      firmName: 'A',
      firmKey: 'a',
      prospectType: 'firm' as const,
      campaignId: 'c',
      createdAt: '',
      updatedAt: '',
      regulatoryNumber: '123',
      websiteUrl: 'https://example.co.uk',
    };

    vi.doMock('@/lib/firm-outreach/storage', () => ({
      CURSOR_ENRICH: 'firmoutreach:cursor:enrich',
      listProspectIdsByRecordStatus: vi.fn(async (status: string) =>
        status === 'discovered' ? ['p1'] : [],
      ),
      getProspect: vi.fn().mockResolvedValue(prospect),
      saveProspect: vi.fn(),
      getCursor,
      setCursor,
    }));

    vi.doMock('@/lib/dscc-register-lookup', () => ({
      ensureDsccRegisterCache: vi.fn().mockResolvedValue({ entries: [] }),
    }));

    vi.doMock('@/lib/legal-directory/laa-fetch', () => ({
      readLaaCrimeJson: vi.fn().mockReturnValue([]),
    }));

    vi.doMock('@/lib/firm-outreach/sra-org-lookup', () => ({
      lookupSraOrganisationByName: vi.fn(),
    }));

    vi.doMock('@/lib/firm-outreach/enrichment/email-crawler', () => ({
      crawlEmailsForProspect: vi.fn().mockResolvedValue({ best: null, alternatives: [] }),
    }));

    vi.doMock('@/lib/firm-outreach/enrichment/paid-enrichment', () => ({
      paidEnrichEmails: vi.fn().mockResolvedValue([]),
    }));

    vi.doMock('@/lib/firm-outreach/crime-website-verify', () => ({
      websiteIndicatesCrimePractice: vi.fn().mockResolvedValue(false),
    }));

    const { runFirmEnrichment } = await import('@/lib/firm-outreach/enrichment/run-enrich');
    const stats = await runFirmEnrichment({ limit: 5, maxElapsedMs: 0 });

    expect(stats.processed).toBe(0);
    expect(stats.stoppedEarly).toBe(true);
    expect(setCursor).not.toHaveBeenCalled();
  });
});

describe('shouldEnrichProspect', () => {
  const base = {
    id: 'p1',
    firmKey: 'k',
    firmName: 'Test',
    prospectType: 'firm' as const,
    campaignId: 'c',
    sources: ['laa'],
    priorityScore: 10,
    createdAt: '',
    updatedAt: '',
  };

  it('includes discovered prospects under max attempts', async () => {
    const { shouldEnrichProspect } = await import('@/lib/firm-outreach/enrichment/enrich-candidates');
    expect(
      shouldEnrichProspect({
        ...base,
        status: 'discovered',
        enrichAttempts: 0,
      }),
    ).toBe(true);
  });

  it('retries no_email after 30 days when attempts remain', async () => {
    const { shouldEnrichProspect } = await import('@/lib/firm-outreach/enrichment/enrich-candidates');
    const now = Date.parse('2026-06-12T12:00:00.000Z');
    const last = '2026-05-01T12:00:00.000Z';
    expect(
      shouldEnrichProspect(
        {
          ...base,
          status: 'no_email',
          enrichAttempts: 3,
          lastEnrichAttemptAt: last,
        },
        now,
      ),
    ).toBe(true);
  });

  it('skips no_email within 30-day cooldown', async () => {
    const { shouldEnrichProspect } = await import('@/lib/firm-outreach/enrichment/enrich-candidates');
    const now = Date.parse('2026-06-12T12:00:00.000Z');
    const last = '2026-06-01T12:00:00.000Z';
    expect(
      shouldEnrichProspect(
        {
          ...base,
          status: 'no_email',
          enrichAttempts: 3,
          lastEnrichAttemptAt: last,
        },
        now,
      ),
    ).toBe(false);
  });

  it('stops after max enrich attempts', async () => {
    const { shouldEnrichProspect, MAX_ENRICH_ATTEMPTS } = await import(
      '@/lib/firm-outreach/enrichment/enrich-candidates'
    );
    expect(
      shouldEnrichProspect({
        ...base,
        status: 'no_email',
        enrichAttempts: MAX_ENRICH_ATTEMPTS,
        lastEnrichAttemptAt: '2020-01-01T00:00:00.000Z',
      }),
    ).toBe(false);
  });
});
