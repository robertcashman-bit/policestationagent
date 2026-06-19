import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { FirmOutreachSend, FirmProspect } from '@/lib/firm-outreach/types';

const mockCountProspectsByStatus = vi.fn();
const mockGetDailySendCount = vi.fn();
const mockListAllSends = vi.fn();
const mockListAllSuppressions = vi.fn();
const mockGetProspectsByIds = vi.fn();
const mockGetSuppressionsByEmails = vi.fn();
const mockListProspectIdsByStatus = vi.fn();
const mockListProspectIdsByRecordStatus = vi.fn();
const mockQueueRowsForProspects = vi.fn();
const mockExcludedRowsForProspects = vi.fn();

vi.mock('@/lib/firm-outreach/outreach/admin-actions', () => ({
  queueRowsForProspects: (...args: unknown[]) => mockQueueRowsForProspects(...args),
  excludedRowsForProspects: (...args: unknown[]) => mockExcludedRowsForProspects(...args),
}));

vi.mock('@/lib/firm-outreach/storage', () => ({
  countProspectsByStatus: (...args: unknown[]) => mockCountProspectsByStatus(...args),
  getDailySendCount: (...args: unknown[]) => mockGetDailySendCount(...args),
  listAllSends: (...args: unknown[]) => mockListAllSends(...args),
  listAllSuppressions: (...args: unknown[]) => mockListAllSuppressions(...args),
  getProspectsByIds: (...args: unknown[]) => mockGetProspectsByIds(...args),
  getSuppressionsByEmails: (...args: unknown[]) => mockGetSuppressionsByEmails(...args),
  listProspectIdsByStatus: (...args: unknown[]) => mockListProspectIdsByStatus(...args),
  listProspectIdsByRecordStatus: (...args: unknown[]) => mockListProspectIdsByRecordStatus(...args),
}));

describe('buildOutreachActivityReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDailySendCount.mockResolvedValue(0);
    mockQueueRowsForProspects.mockResolvedValue([]);
    mockExcludedRowsForProspects.mockResolvedValue([]);
    mockCountProspectsByStatus.mockResolvedValue({
      discovered: 4547,
      ready_to_send: 42,
      sent: 1,
      excluded: 4,
      no_email: 0,
      joined_whatsapp: 0,
      bounced: 0,
      unsubscribed: 0,
      enriched: 0,
    });
    mockListAllSuppressions.mockResolvedValue([]);
    mockGetProspectsByIds.mockResolvedValue(new Map());
    mockGetSuppressionsByEmails.mockResolvedValue(new Map());
    mockListProspectIdsByStatus.mockResolvedValue([]);
    mockListProspectIdsByRecordStatus.mockResolvedValue([]);
  });

  it('loads ready-to-send prospect ids for admin queue (batched mget)', async () => {
    mockListAllSends.mockResolvedValue([]);
    mockListProspectIdsByRecordStatus.mockImplementation((status: string) => {
      if (status === 'ready_to_send') return Promise.resolve(['fop_ready1']);
      return Promise.resolve([]);
    });
    mockGetProspectsByIds.mockImplementation((ids: string[]) => {
      if (ids.includes('fop_ready1')) {
        return Promise.resolve(
          new Map([
            [
              'fop_ready1',
              {
                id: 'fop_ready1',
                prospectType: 'firm',
                firmName: 'Crime Defence LLP',
                firmKey: 'crime-defence',
                email: 'crime@defence.co.uk',
                sources: ['laa'],
                status: 'ready_to_send',
                priorityScore: 80,
                sequenceStep: 0,
                campaignId: 'agent_cover_kent_v1',
                createdAt: '2026-01-01T00:00:00Z',
                updatedAt: '2026-01-02T00:00:00Z',
                enrichAttempts: 0,
              },
            ],
          ]),
        );
      }
      return Promise.resolve(new Map());
    });
    mockQueueRowsForProspects.mockResolvedValue([
      {
        prospectId: 'fop_ready1',
        firmName: 'Crime Defence LLP',
        prospectType: 'firm',
        sources: ['laa'],
        priorityScore: 80,
        updatedAt: '2026-01-02T00:00:00Z',
        suppressed: false,
      },
    ]);

    const { buildOutreachActivityReport } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    const { report } = await buildOutreachActivityReport();

    expect(mockListProspectIdsByRecordStatus).toHaveBeenCalledWith('ready_to_send');
    expect(report.readyToSendProspects).toHaveLength(1);
    expect(report.readyToSendProspects[0].firmName).toBe('Crime Defence LLP');
  });

  it('loads excluded prospect ids for admin excluded tab (batched mget)', async () => {
    mockListAllSends.mockResolvedValue([]);
    mockListProspectIdsByStatus.mockImplementation((status: string) => {
      if (status === 'sent') return Promise.resolve([]);
      if (status === 'excluded') return Promise.resolve(['fop_ex1']);
      return Promise.resolve([]);
    });
    mockGetProspectsByIds.mockImplementation((ids: string[]) => {
      if (ids.includes('fop_ex1')) {
        return Promise.resolve(
          new Map([
            [
              'fop_ex1',
              {
                id: 'fop_ex1',
                prospectType: 'firm',
                firmName: 'Brachers LLP',
                firmKey: 'brachers',
                email: 'info@brachers.co.uk',
                sources: ['archive'],
                status: 'excluded',
                excludedReason: 'archive_only_not_on_laa_or_dscc',
                priorityScore: 0,
                sequenceStep: 0,
                campaignId: 'agent_cover_kent_v1',
                createdAt: '2026-01-01T00:00:00Z',
                updatedAt: '2026-01-02T00:00:00Z',
                enrichAttempts: 0,
              },
            ],
          ]),
        );
      }
      return Promise.resolve(new Map());
    });
    mockExcludedRowsForProspects.mockResolvedValue([
      {
        prospectId: 'fop_ex1',
        firmName: 'Brachers LLP',
        prospectType: 'firm',
        excludedReason: 'archive_only_not_on_laa_or_dscc',
        sources: ['archive'],
        updatedAt: '2026-01-02T00:00:00Z',
        suppressed: false,
      },
    ]);

    const { buildOutreachActivityReport } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    const { report } = await buildOutreachActivityReport();

    expect(mockListProspectIdsByStatus).toHaveBeenCalledWith('excluded');
    expect(report.excludedProspects).toHaveLength(1);
    expect(report.excludedProspects[0].excludedReason).toBe('archive_only_not_on_laa_or_dscc');
  });

  it('uses countProspectsByStatus for summary counts, not bulk discovered loads', async () => {
    mockListAllSends.mockResolvedValue([]);

    const { buildOutreachActivityReport } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    const { report } = await buildOutreachActivityReport();

    expect(mockCountProspectsByStatus).toHaveBeenCalledTimes(1);
    expect(mockListProspectIdsByStatus).not.toHaveBeenCalledWith('discovered');
    expect(mockListProspectIdsByRecordStatus).toHaveBeenCalledWith('ready_to_send');
    expect(report.summary.discovered).toBe(4547);
    expect(report.summary.readyToSend).toBe(42);
  });

  it('loads sent, excluded, and ready prospect ids (batched mget)', async () => {
    mockListAllSends.mockResolvedValue([]);
    mockListProspectIdsByStatus.mockImplementation((status: string) => {
      if (status === 'sent') return Promise.resolve(['fop_a', 'fop_b']);
      if (status === 'excluded') return Promise.resolve([]);
      if (status === 'ready_to_send') return Promise.resolve([]);
      return Promise.resolve([]);
    });

    const { buildOutreachActivityReport } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    await buildOutreachActivityReport();

    expect(mockListProspectIdsByStatus).toHaveBeenCalledWith('sent');
    expect(mockListProspectIdsByStatus).toHaveBeenCalledWith('excluded');
    expect(mockListProspectIdsByRecordStatus).toHaveBeenCalledWith('ready_to_send');
    expect(mockGetProspectsByIds).toHaveBeenCalledWith(['fop_a', 'fop_b']);
  });

  it('builds send rows with batched prospect and suppression lookups', async () => {
    const send: FirmOutreachSend = {
      id: 'fos_test1',
      prospectId: 'fop_abc',
      firmName: 'Test LLP',
      prospectType: 'firm',
      email: 'crime@test.co.uk',
      campaignId: 'agent_cover_kent_v1',
      sequenceStep: 0,
      subject: 'Police station cover',
      status: 'sent',
      createdAt: '2026-01-01T00:00:00Z',
      sentAt: '2026-01-02T00:00:00Z',
    };
    const prospect: FirmProspect = {
      id: 'fop_abc',
      prospectType: 'firm',
      firmName: 'Test LLP',
      firmKey: 'test-llp',
      county: 'Kent',
      sources: ['archive'],
      status: 'sent',
      priorityScore: 80,
      sequenceStep: 0,
      campaignId: 'agent_cover_kent_v1',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-02T00:00:00Z',
      enrichAttempts: 0,
    };

    mockListAllSends.mockResolvedValue([send]);
    mockGetProspectsByIds.mockResolvedValue(new Map([['fop_abc', prospect]]));
    mockGetSuppressionsByEmails.mockResolvedValue(new Map());

    const { buildOutreachActivityReport } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    const { report } = await buildOutreachActivityReport();

    expect(mockGetProspectsByIds).toHaveBeenCalledWith(['fop_abc']);
    expect(mockGetSuppressionsByEmails).toHaveBeenCalledWith(['crime@test.co.uk']);
    expect(report.sends).toHaveLength(1);
    expect(report.sends[0].county).toBe('Kent');
    expect(report.sends[0].sendStatus).toBe('sent');
  });

  it('completes quickly with large discovered count (no per-prospect fetches for counts)', async () => {
    mockListAllSends.mockResolvedValue([]);
    mockCountProspectsByStatus.mockResolvedValue({
      discovered: 5000,
      ready_to_send: 100,
      sent: 0,
      excluded: 0,
      no_email: 0,
      joined_whatsapp: 0,
      bounced: 0,
      unsubscribed: 0,
      enriched: 0,
    });

    const { buildOutreachActivityReport } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );

    const start = Date.now();
    await buildOutreachActivityReport();
    expect(Date.now() - start).toBeLessThan(500);
  });

  it('computes sentToday and sentLast7Days from send timestamps', async () => {
    const now = new Date();
    const todayIso = now.toISOString();
    const oldIso = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString();

    mockListAllSends.mockResolvedValue([
      {
        id: 'fos_today',
        prospectId: 'fop_1',
        firmName: 'A',
        prospectType: 'firm',
        email: 'a@test.co.uk',
        campaignId: 'agent_cover_kent_v1',
        sequenceStep: 0,
        subject: 's',
        status: 'sent',
        createdAt: todayIso,
        sentAt: todayIso,
      },
      {
        id: 'fos_old',
        prospectId: 'fop_2',
        firmName: 'B',
        prospectType: 'firm',
        email: 'b@test.co.uk',
        campaignId: 'agent_cover_kent_v1',
        sequenceStep: 0,
        subject: 's',
        status: 'sent',
        createdAt: oldIso,
        sentAt: oldIso,
      },
    ]);

    const { buildOutreachActivityReport } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    const { report } = await buildOutreachActivityReport();

    expect(report.summary.sentToday).toBe(1);
    expect(report.summary.sentLast7Days).toBe(1);
  });
});

describe('buildOutreachDashboardSummary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDailySendCount.mockResolvedValue(5);
    mockCountProspectsByStatus.mockResolvedValue({
      discovered: 100,
      ready_to_send: 12,
      sent: 3,
      excluded: 1,
      no_email: 0,
      joined_whatsapp: 0,
      bounced: 0,
      unsubscribed: 0,
      enriched: 0,
    });
    mockListAllSends.mockResolvedValue([
      {
        id: 'fos_1',
        prospectId: 'fop_1',
        firmName: 'A',
        prospectType: 'firm',
        email: 'a@test.co.uk',
        campaignId: 'agent_cover_kent_v1',
        sequenceStep: 0,
        subject: 's',
        status: 'delivered',
        createdAt: '2026-01-01T00:00:00Z',
        sentAt: '2026-01-01T00:00:00Z',
      },
    ]);
    mockListProspectIdsByStatus.mockResolvedValue([]);
    mockGetProspectsByIds.mockResolvedValue(new Map());
  });

  it('uses getDailySendCount for sentToday and skips queue row builders', async () => {
    const { buildOutreachDashboardSummary } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    const { report } = await buildOutreachDashboardSummary();

    expect(mockGetDailySendCount).toHaveBeenCalled();
    expect(report.summary.sentToday).toBe(5);
    expect(mockListAllSuppressions).not.toHaveBeenCalled();
    expect(mockGetSuppressionsByEmails).not.toHaveBeenCalled();
    expect(mockQueueRowsForProspects).not.toHaveBeenCalled();
    expect(mockExcludedRowsForProspects).not.toHaveBeenCalled();
    expect(report.sends).toEqual([]);
    expect(report.readyToSendProspects).toEqual([]);
    expect(report.excludedProspects).toEqual([]);
    expect(report.suppressions).toEqual([]);
  });

  it('does not load excluded or ready prospect queues', async () => {
    const { buildOutreachDashboardSummary } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    await buildOutreachDashboardSummary();

    expect(mockListProspectIdsByStatus).toHaveBeenCalledWith('sent');
    expect(mockListProspectIdsByStatus).not.toHaveBeenCalledWith('excluded');
    expect(mockListProspectIdsByRecordStatus).not.toHaveBeenCalledWith('ready_to_send');
  });
});

describe('computeSendWindowCounts', () => {
  it('counts sends in UTC day and 7-day window', async () => {
    const { computeSendWindowCounts } = await import(
      '@/lib/firm-outreach/outreach/activity-report'
    );
    const now = Date.now();
    const today = new Date(now).toISOString();
    const threeDaysAgo = new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString();
    const tenDaysAgo = new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString();

    const counts = computeSendWindowCounts([
      { sentAt: today },
      { sentAt: threeDaysAgo },
      { sentAt: tenDaysAgo },
    ]);

    expect(counts.sentToday).toBe(1);
    expect(counts.sentLast7Days).toBe(2);
  });
});

describe('GET /api/admin/firm-outreach', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  function mockIndexHealthModule() {
    vi.doMock('@/lib/firm-outreach/index-health', () => ({
      getProspectIndexHealth: vi.fn().mockResolvedValue({
        masterIndexCount: 10,
        indexedTotal: 12,
        prospectCounts: { discovered: 10, ready_to_send: 2 },
        drifted: false,
      }),
    }));
  }

  it('returns ok payload with report and counts when admin authorised', async () => {
    const mockBuildSummary = vi.fn().mockResolvedValue({
      prospectCounts: { discovered: 10, ready_to_send: 2 },
      report: {
        generatedAt: '2026-06-11T12:00:00Z',
        summary: {
          totalSends: 1,
          sentToday: 0,
          sentLast7Days: 0,
          uniqueRecipients: 1,
          bySendStatus: { sent: 1 },
          waClicks: 0,
          joinedWhatsApp: 0,
          bounced: 0,
          complained: 0,
          unsubscribed: 0,
          pendingFollowUp1: 0,
          pendingFollowUp2: 0,
          readyToSend: 2,
          discovered: 10,
          noEmail: 0,
          excluded: 0,
        },
        sends: [],
        readyToSendProspects: [],
        excludedProspects: [],
        suppressions: [],
      },
    });
    vi.doMock('@/lib/admin-auth', () => ({
      requireAdminApi: vi.fn().mockResolvedValue({
        ok: true,
        session: { role: 'admin', email: 'admin@test.co.uk' },
      }),
    }));
    vi.doMock('@/lib/kv', () => ({
      getKV: vi.fn().mockReturnValue({}),
    }));
    vi.doMock('@/lib/firm-outreach/outreach/activity-report', () => ({
      buildOutreachActivityReport: vi.fn(),
      buildOutreachDashboardSummary: mockBuildSummary,
      emptyOutreachActivityReport: vi.fn(),
      activityReportToCsv: vi.fn(),
    }));
    vi.doMock('@/lib/firm-outreach/pause-state', () => ({
      getOutreachPauseSummary: vi.fn().mockResolvedValue({ effectivePaused: false }),
    }));
    vi.doMock('@/lib/firm-outreach/config-status', () => ({
      getOutreachConfigStatus: vi.fn().mockResolvedValue({ sendAllowed: true }),
    }));
    vi.doMock('@/lib/firm-outreach/constants', () => ({
      dailySendCap: () => 30,
      outreachEnabled: () => true,
      countyAllowlist: () => ['kent'],
      outreachPaused: () => false,
      outreachSendEnabled: () => true,
    }));
    mockIndexHealthModule();

    const { GET } = await import('@/app/api/admin/firm-outreach/route');
    const res = await GET(new Request('http://localhost/api/admin/firm-outreach'));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.scope).toBe('summary');
    expect(mockBuildSummary).toHaveBeenCalledTimes(1);
    expect(json.counts.discovered).toBe(10);
    expect(json.report.summary.totalSends).toBe(1);
  });

  it('uses full report when scope=full', async () => {
    const mockBuildFull = vi.fn().mockResolvedValue({
      prospectCounts: { discovered: 10 },
      report: {
        generatedAt: '2026-06-11T12:00:00Z',
        summary: { totalSends: 3 },
        sends: [{ sendId: 'fos_1' }],
        readyToSendProspects: [{ prospectId: 'fop_1' }],
        excludedProspects: [],
        suppressions: [],
      },
    });
    vi.doMock('@/lib/admin-auth', () => ({
      requireAdminApi: vi.fn().mockResolvedValue({
        ok: true,
        session: { role: 'admin', email: 'admin@test.co.uk' },
      }),
    }));
    vi.doMock('@/lib/kv', () => ({
      getKV: vi.fn().mockReturnValue({}),
    }));
    vi.doMock('@/lib/firm-outreach/outreach/activity-report', () => ({
      buildOutreachActivityReport: mockBuildFull,
      buildOutreachDashboardSummary: vi.fn(),
      emptyOutreachActivityReport: vi.fn(),
      activityReportToCsv: vi.fn(),
    }));
    vi.doMock('@/lib/firm-outreach/pause-state', () => ({
      getOutreachPauseSummary: vi.fn().mockResolvedValue({ effectivePaused: false }),
    }));
    vi.doMock('@/lib/firm-outreach/config-status', () => ({
      getOutreachConfigStatus: vi.fn().mockResolvedValue({ sendAllowed: true }),
    }));
    vi.doMock('@/lib/firm-outreach/constants', () => ({
      dailySendCap: () => 30,
    }));
    mockIndexHealthModule();

    const { GET } = await import('@/app/api/admin/firm-outreach/route');
    const res = await GET(new Request('http://localhost/api/admin/firm-outreach?scope=full'));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.scope).toBe('full');
    expect(mockBuildFull).toHaveBeenCalledTimes(1);
    expect(json.report.sends).toHaveLength(1);
  });
});
