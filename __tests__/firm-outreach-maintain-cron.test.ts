import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET as maintainGet } from '@/app/api/cron/firm-outreach-pipeline/maintain/route';

const mockPipeline = vi.fn();
const mockRequeue = vi.fn();

vi.mock('@/lib/firm-outreach/run-pipeline', () => ({
  runFirmOutreachPipeline: (...args: unknown[]) => mockPipeline(...args),
}));

vi.mock('@/lib/firm-outreach/enrichment/requeue-no-email', () => ({
  requeueNoEmailProspects: (...args: unknown[]) => mockRequeue(...args),
}));

const ENV = process.env;

describe('firm-outreach-pipeline/maintain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ENV, CRON_SECRET: 'cron-test' };
    mockPipeline.mockResolvedValue({ skipped: false, discovery: {}, requalify: {} });
    mockRequeue.mockResolvedValue({ requeued: 0 });
  });

  afterEach(() => {
    process.env = { ...ENV };
  });

  it('returns 401 without cron secret', async () => {
    const res = await maintainGet(
      new Request('http://localhost/api/cron/firm-outreach-pipeline/maintain'),
    );
    expect(res.status).toBe(401);
  });

  it('skips kent corrections and timeboxes discovery/requalify', async () => {
    const res = await maintainGet(
      new Request('http://localhost/api/cron/firm-outreach-pipeline/maintain', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    expect(res.status).toBe(200);
    expect(mockPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        skipSend: true,
        skipDigest: true,
        skipEnrich: true,
        skipKentCorrection: true,
        maintainMaxElapsedMs: 240_000,
        requalifyVerifyWebsites: new Date().getUTCDay() === 0,
      }),
    );
  });
});

describe('outreachRequireApproval default', () => {
  afterEach(() => {
    process.env = { ...ENV };
  });

  it('defaults to require approval when env unset', async () => {
    process.env = { ...ENV };
    delete process.env.FIRM_OUTREACH_REQUIRE_APPROVAL;
    const { outreachRequireApproval } = await import('@/lib/firm-outreach/constants');
    expect(outreachRequireApproval()).toBe(true);
  });

  it('requires approval when env is true', async () => {
    process.env = { ...ENV, FIRM_OUTREACH_REQUIRE_APPROVAL: 'true' };
    const { outreachRequireApproval } = await import('@/lib/firm-outreach/constants');
    expect(outreachRequireApproval()).toBe(true);
  });

  it('allows autosend only when env is false', async () => {
    process.env = { ...ENV, FIRM_OUTREACH_REQUIRE_APPROVAL: 'false' };
    const { outreachRequireApproval } = await import('@/lib/firm-outreach/constants');
    expect(outreachRequireApproval()).toBe(false);
  });
});
