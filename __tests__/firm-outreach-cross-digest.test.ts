import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockListSent = vi.fn();
const mockQueueCounts = vi.fn();
const mockKvGet = vi.fn();
const mockKvSet = vi.fn();
const mockResendSend = vi.fn();

vi.mock('@/lib/firm-outreach/count-today', () => ({
  listOutreachSentToday: (...args: unknown[]) => mockListSent(...args),
}));

vi.mock('@/lib/firm-outreach/queue-health', () => ({
  getCampaignQueueCounts: (...args: unknown[]) => mockQueueCounts(...args),
}));

vi.mock('@/lib/kv', () => ({
  getKV: () => ({ get: mockKvGet, set: mockKvSet }),
}));

vi.mock('resend', () => ({
  Resend: vi.fn(function ResendMock() {
    return { emails: { send: (...args: unknown[]) => mockResendSend(...args) } };
  }),
}));

describe('cross-workspace digest module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = 're_test';
    process.env.FIRM_OUTREACH_DIGEST_EMAIL = 'robertdavidcashman@gmail.com';
    process.env.UPSTASH_REDIS_REST_URL = 'https://kv.example.com';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'token_test';
    mockKvGet.mockResolvedValue(null);
    mockQueueCounts.mockResolvedValue([
      {
        campaignId: 'whatsapp_invite_v1',
        total: 100,
        byStatus: { ready_to_send: 41, sent: 50 },
      },
      {
        campaignId: 'agent_cover_kent_v1',
        total: 80,
        byStatus: { ready_to_send: 10, sent: 30 },
      },
    ]);
    mockListSent.mockImplementation(async (source: { domain: string }) => {
      if (source.domain === 'policestationrepuk.org') {
        return [
          {
            domain: 'policestationrepuk.org',
            sentAt: '2026-06-28T09:32:38.000Z',
            firmName: 'Tuckers LLP',
            email: 'info@tuckers.com',
            sequenceStep: 0,
            subject: 'WhatsApp invite',
          },
        ];
      }
      return [
        {
          domain: 'policestationagent.com',
          sentAt: '2026-06-28T09:30:46.000Z',
          firmName: 'Frazer Bradshaw',
          email: 'office@fblaw.co.uk',
          sequenceStep: 1,
          subject: 'Kent agent cover',
        },
      ];
    });
    mockResendSend.mockResolvedValue({ data: { id: 'msg_1' } });
  });

  it('uses independent dedup keys for morning and evening', async () => {
    vi.resetModules();
    const mod = await import('@/lib/firm-outreach/cross-workspace-digest');
    expect(mod.crossDigestDedupKey('2026-06-28', 'morning')).toBe(
      'firmoutreach:cross-digest:sent:2026-06-28:morning',
    );
    expect(mod.crossDigestDedupKey('2026-06-28', 'evening')).toBe(
      'firmoutreach:cross-digest:sent:2026-06-28:evening',
    );
    expect(mod.crossDigestDedupKey('2026-06-28', 'morning')).not.toBe(
      mod.crossDigestDedupKey('2026-06-28', 'evening'),
    );
  });

  it('builds HTML with per-workspace counts and recipients', async () => {
    vi.resetModules();
    const { buildCrossWorkspaceDigestData, buildCrossWorkspaceDigestHtml } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const data = await buildCrossWorkspaceDigestData(
      'morning',
      new Date('2026-06-28T12:00:00.000Z'),
    );
    expect(data.combined).toBe(2);
    expect(data.workspaces).toHaveLength(2);
    expect(data.workspaces[0]?.sentToday).toBe(1);
    expect(data.workspaces[1]?.sentToday).toBe(1);
    expect(data.workspaces[0]?.readyToSend).toBe(41);
    expect(data.workspaces[1]?.readyToSend).toBe(10);

    const html = buildCrossWorkspaceDigestHtml(data);
    expect(html).toContain('Morning status');
    expect(html).toContain('info@tuckers.com');
    expect(html).toContain('office@fblaw.co.uk');
    expect(html).toContain('policestationrepuk.org');
    expect(html).toContain('policestationagent.com');
  });

  it('builds subject with combined count', async () => {
    vi.resetModules();
    const { buildCrossWorkspaceDigestData, buildCrossWorkspaceDigestSubject } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const data = await buildCrossWorkspaceDigestData(
      'evening',
      new Date('2026-06-28T19:00:00.000Z'),
    );
    const subject = buildCrossWorkspaceDigestSubject(data);
    expect(subject).toContain('End of day');
    expect(subject).toContain('2 sent');
    expect(subject).toContain('2026-06-28');
  });

  it('handles empty send day in subject', async () => {
    vi.resetModules();
    mockListSent.mockResolvedValue([]);
    const { buildCrossWorkspaceDigestData, buildCrossWorkspaceDigestSubject } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const data = await buildCrossWorkspaceDigestData(
      'morning',
      new Date('2026-06-28T11:00:00.000Z'),
    );
    expect(data.combined).toBe(0);
    const subject = buildCrossWorkspaceDigestSubject(data);
    expect(subject).toContain('no sends yet');
  });

  it('skips when digest already sent for that phase', async () => {
    vi.resetModules();
    mockKvGet.mockResolvedValue('2026-06-28T11:00:00.000Z');
    const { sendCrossWorkspaceOutreachDigest } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const result = await sendCrossWorkspaceOutreachDigest({
      phase: 'morning',
      now: new Date('2026-06-28T11:00:00.000Z'),
    });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('already_sent');
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('emails owner with cross-workspace summary', async () => {
    vi.resetModules();
    const { sendCrossWorkspaceOutreachDigest } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const result = await sendCrossWorkspaceOutreachDigest({
      phase: 'morning',
      now: new Date('2026-06-28T11:00:00.000Z'),
    });
    expect(result.sent).toBe(true);
    expect(result.combined).toBe(2);
    expect(mockResendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'robertdavidcashman@gmail.com',
        subject: expect.stringContaining('Morning'),
        html: expect.stringContaining('Combined sent today'),
      }),
    );
    expect(mockKvSet).toHaveBeenCalledWith(
      'firmoutreach:cross-digest:sent:2026-06-28:morning',
      expect.any(String),
      expect.objectContaining({ ex: expect.any(Number) }),
    );
  });
});
