import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET as fullGet } from '@/app/api/cron/firm-outreach-pipeline/full/route';
import { GET as digestGet } from '@/app/api/cron/firm-outreach-digest/route';

const mockPipeline = vi.fn();

vi.mock('@/lib/firm-outreach/run-pipeline', () => ({
  runFirmOutreachPipeline: (...args: unknown[]) => mockPipeline(...args),
}));

const ENV = process.env;

describe('firm-outreach approval crons (permanently email-off)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ENV, CRON_SECRET: 'cron-test' };
    mockPipeline.mockResolvedValue({ skipped: false, send: { sent: 0 } });
  });

  afterEach(() => {
    process.env = { ...ENV };
  });

  describe('firm-outreach-pipeline/full', () => {
    it('returns 401 without cron secret', async () => {
      const res = await fullGet(new Request('http://localhost/api/cron/firm-outreach-pipeline/full'));
      expect(res.status).toBe(401);
    });

    it('runs inventory-only and never sends or emails', async () => {
      const res = await fullGet(
        new Request('http://localhost/api/cron/firm-outreach-pipeline/full', {
          headers: { authorization: 'Bearer cron-test' },
        }),
      );
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.mode).toBe('inventory_only_send_disabled');
      expect(json.reason).toBe('psa_outreach_emails_disabled');
      expect(mockPipeline).toHaveBeenCalledWith(
        expect.objectContaining({
          skipDiscovery: true,
          skipEnrich: true,
          skipSend: true,
          skipDigest: true,
        }),
      );
    });
  });

  describe('firm-outreach-digest', () => {
    it('is a permanent no-op', async () => {
      const res = await digestGet(
        new Request('http://localhost/api/cron/firm-outreach-digest', {
          headers: { authorization: 'Bearer cron-test' },
        }),
      );
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.mode).toBe('permanently_disabled');
      expect(json.skipped).toBe(true);
      expect(json.reason).toBe('psa_outreach_emails_disabled');
    });
  });
});
