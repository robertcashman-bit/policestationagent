import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET as crossDigestGet } from '@/app/api/cron/firm-outreach-cross-digest/route';

const mockSendCrossDigest = vi.fn();

vi.mock('@/lib/firm-outreach/cross-workspace-digest', () => ({
  sendCrossWorkspaceOutreachDigest: (...args: unknown[]) => mockSendCrossDigest(...args),
}));

const ENV = process.env;

describe('firm-outreach-cross-digest cron', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...ENV, CRON_SECRET: 'cron-test' };
  });

  afterEach(() => {
    process.env = { ...ENV };
  });

  it('returns 401 without cron secret', async () => {
    const res = await crossDigestGet(
      new Request('http://localhost/api/cron/firm-outreach-cross-digest?phase=morning'),
    );
    expect(res.status).toBe(401);
    expect(mockSendCrossDigest).not.toHaveBeenCalled();
  });

  it('is a permanent no-op and never calls the digest sender', async () => {
    const res = await crossDigestGet(
      new Request('http://localhost/api/cron/firm-outreach-cross-digest?phase=morning', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.mode).toBe('permanently_disabled');
    expect(json.skipped).toBe(true);
    expect(json.reason).toBe('psa_outreach_emails_disabled');
    expect(mockSendCrossDigest).not.toHaveBeenCalled();
  });

  it('no-ops for evening and force=1 as well', async () => {
    const res = await crossDigestGet(
      new Request('http://localhost/api/cron/firm-outreach-cross-digest?phase=evening&force=1', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.skipped).toBe(true);
    expect(mockSendCrossDigest).not.toHaveBeenCalled();
  });
});
