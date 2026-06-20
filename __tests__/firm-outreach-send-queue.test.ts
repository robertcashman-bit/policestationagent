import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { FirmProspect } from '@/lib/firm-outreach/types';
import {
  checkRepairLoopRequiresReady,
  checkSendUsesRecordStatus,
} from '@/lib/firm-outreach/verify-checks';

const kvRef = vi.hoisted(() => ({ kv: null as ReturnType<typeof makeKvStore> | null }));

vi.mock('@/lib/kv', () => ({
  getKV: () => kvRef.kv,
  skipKVInPrerender: () => false,
}));

function readyProspect(id: string, email = 'crime@example.co.uk'): FirmProspect {
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
    email,
    postcode: 'ME14 1AB',
  };
}

function makeKvStore(initial: Record<string, unknown> = {}) {
  const store = new Map<string, unknown>(Object.entries(initial));
  return {
    get: async (key: string) => store.get(key),
    set: async (key: string, value: unknown) => {
      store.set(key, value);
    },
    mget: async (...keys: string[]) => keys.map((k) => store.get(k) ?? null),
    store,
  };
}

describe('listProspectsByRecordStatus', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns prospects whose stored record matches status', async () => {
    const p1 = readyProspect('p1');
    const p2 = { ...readyProspect('p2'), status: 'discovered' as const };
    kvRef.kv = makeKvStore({
      'firmprospect:index': ['p1', 'p2'],
      'firmprospect:p1': p1,
      'firmprospect:p2': p2,
      'firmprospect:status:ready_to_send': [],
    });

    const { listProspectsByRecordStatus } = await import('@/lib/firm-outreach/storage');
    const ready = await listProspectsByRecordStatus('ready_to_send');
    expect(ready.map((p) => p.id)).toEqual(['p1']);
  });

  it('ignores index membership when record status differs', async () => {
    const p1 = readyProspect('p1');
    kvRef.kv = makeKvStore({
      'firmprospect:index': ['p1'],
      'firmprospect:p1': p1,
      'firmprospect:status:ready_to_send': ['p1'],
      'firmprospect:status:discovered': [],
    });

    const { listProspectsByStatus, listProspectsByRecordStatus } = await import(
      '@/lib/firm-outreach/storage'
    );
    expect((await listProspectsByStatus('discovered')).map((p) => p.id)).toEqual([]);
    expect((await listProspectsByRecordStatus('ready_to_send')).map((p) => p.id)).toEqual(['p1']);
  });
});

describe('runFirmOutreach record-based queue', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.FIRM_OUTREACH_DRY_RUN;
  });

  async function loadRunOutreachMocks(
    overrides: Record<string, unknown> = {},
    opts?: { sendAllowed?: boolean },
  ) {
    const ready = [readyProspect('p1')];
    const mockSend = vi.fn().mockResolvedValue({
      ok: true,
      subject: 'Test subject',
      messageId: 'msg_1',
    });

    vi.doMock('@/lib/firm-outreach/pause-state', () => ({
      isOutreachSendAllowed: vi.fn().mockResolvedValue(opts?.sendAllowed ?? true),
    }));
    vi.doMock('@/lib/firm-outreach/storage', () => ({
      listProspectsByRecordStatus: vi.fn(async (status: string) => {
        if (status === 'ready_to_send') return ready;
        if (status === 'sent') return [];
        return [];
      }),
      listProspectsForFirmKey: vi.fn().mockResolvedValue([]),
      getDailySendCount: vi.fn().mockResolvedValue(0),
      isSuppressed: vi.fn().mockResolvedValue(false),
      isDuplicateInitialSend: vi.fn().mockResolvedValue(false),
      saveProspect: vi.fn(),
      saveSend: vi.fn(),
      createSendRecord: vi.fn().mockReturnValue({ id: 'fos_1', status: 'pending' }),
      incrementDailySendCount: vi.fn(),
      excludeProspectDuplicateEmail: vi.fn(),
      addSuppression: vi.fn(),
      ...overrides,
    }));
    vi.doMock('@/lib/firm-outreach/enrichment/validator', () => ({
      validateEmailForSend: vi.fn().mockResolvedValue({ ok: true }),
    }));
    vi.doMock('@/lib/firm-outreach/outreach/send', () => ({
      sendOutreachEmail: mockSend,
    }));

    const { runFirmOutreach } = await import('@/lib/firm-outreach/outreach/run-outreach');
    return { runFirmOutreach, mockSend, ready };
  }

  it('queues sends from record-based ready list when status index is empty', async () => {
    const { runFirmOutreach, mockSend } = await loadRunOutreachMocks();
    const stats = await runFirmOutreach({ dryRun: true });
    expect(stats.queued).toBe(1);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('does not call listProspectsByStatus for ready pool', async () => {
    const listByStatus = vi.fn().mockResolvedValue([]);
    const listByRecord = vi.fn(async (status: string) =>
      status === 'ready_to_send' ? [readyProspect('p1')] : [],
    );
    await loadRunOutreachMocks({
      listProspectsByStatus: listByStatus,
      listProspectsByRecordStatus: listByRecord,
    });
    const { runFirmOutreach } = await import('@/lib/firm-outreach/outreach/run-outreach');
    await runFirmOutreach({ dryRun: true });
    expect(listByRecord).toHaveBeenCalledWith('ready_to_send', 2000);
    expect(listByStatus).not.toHaveBeenCalled();
  });

  it('returns zero sends when outreach is paused', async () => {
    const { runFirmOutreach, mockSend } = await loadRunOutreachMocks({}, { sendAllowed: false });
    const stats = await runFirmOutreach();
    expect(stats.sent).toBe(0);
    expect(stats.queued).toBe(0);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('respects daily send cap', async () => {
    const { runFirmOutreach, mockSend } = await loadRunOutreachMocks({
      getDailySendCount: vi.fn().mockResolvedValue(50),
    });
    const stats = await runFirmOutreach({ dryRun: true });
    expect(stats.sent).toBe(0);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('honours explicit limit below daily cap', async () => {
    const ready = [readyProspect('p1'), readyProspect('p2', 'info@other.co.uk')];
    const { runFirmOutreach, mockSend } = await loadRunOutreachMocks({
      listProspectsByRecordStatus: vi.fn(async (status: string) =>
        status === 'ready_to_send' ? ready : [],
      ),
    });
    const stats = await runFirmOutreach({ dryRun: true, limit: 1 });
    expect(stats.queued).toBe(1);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('skips duplicate initial email addresses', async () => {
    const { runFirmOutreach, mockSend } = await loadRunOutreachMocks({
      isDuplicateInitialSend: vi.fn().mockResolvedValue(true),
      excludeProspectDuplicateEmail: vi.fn(),
    });
    const stats = await runFirmOutreach({ dryRun: true });
    expect(stats.skipped).toBeGreaterThan(0);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('skips suppressed emails', async () => {
    const { runFirmOutreach, mockSend } = await loadRunOutreachMocks({
      isSuppressed: vi.fn().mockResolvedValue(true),
      saveProspect: vi.fn(),
    });
    const stats = await runFirmOutreach({ dryRun: true });
    expect(stats.suppressed).toBe(1);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('queues when three records are ready but status index is empty', async () => {
    const ready = [readyProspect('p1'), readyProspect('p2', 'a@x.co.uk'), readyProspect('p3', 'b@x.co.uk')];
    const { runFirmOutreach, mockSend } = await loadRunOutreachMocks({
      listProspectsByRecordStatus: vi.fn(async (status: string) =>
        status === 'ready_to_send' ? ready : [],
      ),
      listProspectsByStatus: vi.fn().mockResolvedValue([]),
    });
    const stats = await runFirmOutreach({ dryRun: true, limit: 3 });
    expect(stats.queued).toBe(3);
    expect(mockSend).toHaveBeenCalledTimes(3);
  });
});

describe('runFirmOutreach follow-ups from record-based sent list', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('includes sent prospects loaded by record status for follow-up evaluation', async () => {
    const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();
    const sentProspect: FirmProspect = {
      ...readyProspect('sent1'),
      status: 'sent',
      sequenceStep: 0,
      lastEmailAt: eightDaysAgo,
    };
    const listByRecord = vi.fn(async (status: string) => {
      if (status === 'ready_to_send') return [];
      if (status === 'sent') return [sentProspect];
      return [];
    });
    const mockSend = vi.fn().mockResolvedValue({ ok: true, subject: 'FU', messageId: 'm1' });

    vi.doMock('@/lib/firm-outreach/pause-state', () => ({
      isOutreachSendAllowed: vi.fn().mockResolvedValue(true),
    }));
    vi.doMock('@/lib/firm-outreach/storage', () => ({
      listProspectsByRecordStatus: listByRecord,
      listProspectsForFirmKey: vi.fn().mockResolvedValue([]),
      getDailySendCount: vi.fn().mockResolvedValue(0),
      isSuppressed: vi.fn().mockResolvedValue(false),
      isDuplicateInitialSend: vi.fn().mockResolvedValue(false),
      saveProspect: vi.fn(),
      saveSend: vi.fn(),
      createSendRecord: vi.fn().mockReturnValue({ id: 'fos_1', status: 'pending' }),
      incrementDailySendCount: vi.fn(),
      excludeProspectDuplicateEmail: vi.fn(),
      addSuppression: vi.fn(),
    }));
    vi.doMock('@/lib/firm-outreach/enrichment/validator', () => ({
      validateEmailForSend: vi.fn().mockResolvedValue({ ok: true }),
    }));
    vi.doMock('@/lib/firm-outreach/outreach/send', () => ({
      sendOutreachEmail: mockSend,
    }));

    const { runFirmOutreach } = await import('@/lib/firm-outreach/outreach/run-outreach');
    const stats = await runFirmOutreach({ dryRun: true });
    expect(listByRecord).toHaveBeenCalledWith('sent', 2000);
    expect(stats.queued).toBe(1);
    expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({ step: 1 }));
  });

  it('does not queue follow-up when sent list is index-only empty', async () => {
    const sentProspect: FirmProspect = {
      ...readyProspect('sent1'),
      status: 'sent',
      sequenceStep: 0,
      lastEmailAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    };
    const mockSend = vi.fn();

    vi.doMock('@/lib/firm-outreach/pause-state', () => ({
      isOutreachSendAllowed: vi.fn().mockResolvedValue(true),
    }));
    vi.doMock('@/lib/firm-outreach/storage', () => ({
      listProspectsByRecordStatus: vi.fn(async () => []),
      listProspectsByStatus: vi.fn(async (status: string) =>
        status === 'sent' ? [sentProspect] : [],
      ),
      listProspectsForFirmKey: vi.fn().mockResolvedValue([]),
      getDailySendCount: vi.fn().mockResolvedValue(0),
      isSuppressed: vi.fn().mockResolvedValue(false),
      isDuplicateInitialSend: vi.fn().mockResolvedValue(false),
      saveProspect: vi.fn(),
      saveSend: vi.fn(),
      createSendRecord: vi.fn(),
      incrementDailySendCount: vi.fn(),
      excludeProspectDuplicateEmail: vi.fn(),
      addSuppression: vi.fn(),
    }));
    vi.doMock('@/lib/firm-outreach/enrichment/validator', () => ({
      validateEmailForSend: vi.fn().mockResolvedValue({ ok: true }),
    }));
    vi.doMock('@/lib/firm-outreach/outreach/send', () => ({
      sendOutreachEmail: mockSend,
    }));

    const { runFirmOutreach } = await import('@/lib/firm-outreach/outreach/run-outreach');
    const stats = await runFirmOutreach({ dryRun: true });
    expect(stats.queued).toBe(0);
    expect(mockSend).not.toHaveBeenCalled();
  });
});

describe('repair loop and repo guards', () => {
  it('repair loop script requires ready_to_send and sendAllowed', () => {
    expect(checkRepairLoopRequiresReady().ok).toBe(true);
  });

  it('run-outreach uses record-based list helper', () => {
    expect(checkSendUsesRecordStatus().ok).toBe(true);
  });
});
