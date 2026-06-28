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
    mockSendCrossDigest.mockResolvedValue({
      sent: true,
      date: '2026-06-28',
      phase: 'morning',
      combined: 99,
    });
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

  it('returns 400 when phase is missing or invalid', async () => {
    const res = await crossDigestGet(
      new Request('http://localhost/api/cron/firm-outreach-cross-digest', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    expect(res.status).toBe(400);
    expect(mockSendCrossDigest).not.toHaveBeenCalled();
  });

  it('sends morning digest when authorized', async () => {
    const res = await crossDigestGet(
      new Request('http://localhost/api/cron/firm-outreach-cross-digest?phase=morning', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.mode).toBe('cross-workspace-digest');
    expect(json.phase).toBe('morning');
    expect(mockSendCrossDigest).toHaveBeenCalledWith({ phase: 'morning', force: false });
  });

  it('sends evening digest when authorized', async () => {
    mockSendCrossDigest.mockResolvedValue({
      sent: true,
      date: '2026-06-28',
      phase: 'evening',
      combined: 150,
    });
    const res = await crossDigestGet(
      new Request('http://localhost/api/cron/firm-outreach-cross-digest?phase=evening', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.phase).toBe('evening');
    expect(mockSendCrossDigest).toHaveBeenCalledWith({ phase: 'evening', force: false });
  });

  it('passes force=1 to digest sender', async () => {
    await crossDigestGet(
      new Request('http://localhost/api/cron/firm-outreach-cross-digest?phase=morning&force=1', {
        headers: { authorization: 'Bearer cron-test' },
      }),
    );
    expect(mockSendCrossDigest).toHaveBeenCalledWith({ phase: 'morning', force: true });
  });
});
