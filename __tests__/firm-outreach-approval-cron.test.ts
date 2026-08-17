import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET as fullGet } from '@/app/api/cron/firm-outreach-pipeline/full/route';
import { GET as digestGet } from '@/app/api/cron/firm-outreach-digest/route';

const mockPipeline = vi.fn();
const mockApprovalEmail = vi.fn();
const mockDigest = vi.fn();
const mockArePsaOutreachEmailsDisabled = vi.fn(() => false);

vi.mock('@/lib/firm-outreach/run-pipeline', () => ({
  runFirmOutreachPipeline: (...args: unknown[]) => mockPipeline(...args),
}));

vi.mock('@/lib/firm-outreach/outreach/approval-request-email', () => ({
  sendOutreachApprovalRequestEmail: (...args: unknown[]) => mockApprovalEmail(...args),
}));

vi.mock('@/lib/firm-outreach/outreach/digest-email', () => ({
  sendDailyOutreachDigest: (...args: unknown[]) => mockDigest(...args),
}));

vi.mock('@/lib/firm-outreach/outreach-emails-disabled', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/firm-outreach/outreach-emails-disabled')>();
  return {
    ...actual,
    arePsaOutreachEmailsDisabled: (...args: unknown[]) => mockArePsaOutreachEmailsDisabled(...args),
  };
});

const ENV = process.env;

describe('firm-outreach approval crons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ENV, CRON_SECRET: 'cron-test', FIRM_OUTREACH_REQUIRE_APPROVAL: 'true' };
    mockArePsaOutreachEmailsDisabled.mockReturnValue(false);
    mockPipeline.mockResolvedValue({ skipped: false, send: { sent: 0 } });
    mockApprovalEmail.mockResolvedValue({ sent: true, date: '2026-06-13' });
    mockDigest.mockResolvedValue({ sent: true, date: '2026-06-13' });
  });

  afterEach(() => {
    process.env = { ...ENV };
  });

  describe('firm-outreach-pipeline/full', () => {
    it('returns 401 without cron secret', async () => {
      const res = await fullGet(new Request('http://localhost/api/cron/firm-outreach-pipeline/full'));
      expect(res.status).toBe(401);
    });

    it('short-circuits when PSA outreach emails are disabled', async () => {
      mockArePsaOutreachEmailsDisabled.mockReturnValue(true);
      const res = await fullGet(
        new Request('http://localhost/api/cron/firm-outreach-pipeline/full', {
          headers: { authorization: 'Bearer cron-test' },
        }),
      );
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.mode).toBe('send-disabled');
      expect(json.skipped).toBe(true);
      expect(json.reason).toBe('psa_outreach_emails_disabled');
      expect(mockPipeline).not.toHaveBeenCalled();
      expect(mockApprovalEmail).not.toHaveBeenCalled();
    });

    it('auto-sends when approval is disabled', async () => {
      process.env.FIRM_OUTREACH_REQUIRE_APPROVAL = 'false';
      mockPipeline.mockResolvedValue({ skipped: false, send: { sent: 12 } });
      const res = await fullGet(
        new Request('http://localhost/api/cron/firm-outreach-pipeline/full', {
          headers: { authorization: 'Bearer cron-test' },
        }),
      );
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.mode).toBe('send-only');
      expect(mockPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ skipDiscovery: true, skipEnrich: true }),
      );
      expect(mockApprovalEmail).not.toHaveBeenCalled();
    });

    it('sends approval email without auto-send when approval required', async () => {
      const res = await fullGet(
        new Request('http://localhost/api/cron/firm-outreach-pipeline/full', {
          headers: { authorization: 'Bearer cron-test' },
        }),
      );
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.mode).toBe('approval-only');
      expect(mockPipeline).toHaveBeenCalledWith(
        expect.objectContaining({ skipSend: true, skipDigest: true }),
      );
      expect(mockApprovalEmail).toHaveBeenCalledOnce();
    });

    it('passes force=1 to approval email', async () => {
      await fullGet(
        new Request('http://localhost/api/cron/firm-outreach-pipeline/full?force=1', {
          headers: { authorization: 'Bearer cron-test' },
        }),
      );
      expect(mockApprovalEmail).toHaveBeenCalledWith({ force: true });
    });
  });

  describe('firm-outreach-digest', () => {
    it('sends approval reminder when approval required', async () => {
      const res = await digestGet(
        new Request('http://localhost/api/cron/firm-outreach-digest', {
          headers: { authorization: 'Bearer cron-test' },
        }),
      );
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.mode).toBe('approval-reminder');
      expect(mockApprovalEmail).toHaveBeenCalledWith({ reminder: true });
      expect(mockDigest).not.toHaveBeenCalled();
    });
  });
});

describe('firm-outreach legacy digest cron', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ENV, CRON_SECRET: 'cron-test', FIRM_OUTREACH_REQUIRE_APPROVAL: 'false' };
    mockDigest.mockResolvedValue({ sent: true, date: '2026-06-13' });
  });

  afterEach(() => {
    process.env = { ...ENV };
  });

  it('runs legacy digest when approval disabled', async () => {
    const res = await digestGet(
      new Request('http://localhost/api/cron/firm-outreach-digest', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    const json = await res.json();
    expect(json.mode).toBe('digest');
    expect(mockDigest).toHaveBeenCalledOnce();
  });
});
