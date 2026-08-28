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
    delete process.env.FIRM_OUTREACH_FROM_EMAIL;
    delete process.env.FIRM_OUTREACH_DIGEST_FROM_EMAIL;
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

  it('builds HTML for RepUK live workspace only (PSA disabled, no PSA cap)', async () => {
    vi.resetModules();
    const { buildCrossWorkspaceDigestData, buildCrossWorkspaceDigestHtml } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const data = await buildCrossWorkspaceDigestData(
      'morning',
      new Date('2026-06-28T12:00:00.000Z'),
    );
    expect(data.combined).toBe(1);
    expect(data.workspaces).toHaveLength(2);
    expect(data.workspaces[0]?.liveSend).toBe(true);
    expect(data.workspaces[0]?.sentToday).toBe(1);
    expect(data.workspaces[0]?.readyToSend).toBe(41);
    expect(data.workspaces[1]?.liveSend).toBe(false);
    expect(data.workspaces[1]?.readyToSend).toBe(0);
    expect(data.workspaces[1]?.dailyCap).toBe(0);

    const html = buildCrossWorkspaceDigestHtml(data);
    expect(html).toContain('Morning status');
    expect(html).toContain('PoliceStationRepUK firm outreach digest');
    expect(html).toContain('info@tuckers.com');
    expect(html).not.toContain('office@fblaw.co.uk');
    expect(html).toContain('permanently disabled');
    expect(html).not.toContain('Daily caps:');
    expect(html).not.toContain('5000');
  });

  it('builds subject with RepUK branding', async () => {
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
    expect(subject).toContain('PoliceStationRepUK');
    expect(subject).toContain('1 sent');
    expect(subject).not.toContain('2 workspaces');
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
    expect(subject).toContain('PoliceStationRepUK');
    expect(subject).toContain('41 ready');
  });

  it('never emails while kill-switch is on (already_sent path unreachable)', async () => {
    mockKvGet.mockResolvedValue('2026-06-28T11:00:00.000Z');
    const { sendCrossWorkspaceOutreachDigest } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const result = await sendCrossWorkspaceOutreachDigest({
      phase: 'morning',
      now: new Date('2026-06-28T11:00:00.000Z'),
    });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('blocks Resend even with force=true (env cannot re-enable)', async () => {
    process.env.FIRM_OUTREACH_FORCE_SEND = 'true';
    const { sendCrossWorkspaceOutreachDigest } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const result = await sendCrossWorkspaceOutreachDigest({
      phase: 'morning',
      force: true,
      now: new Date('2026-06-28T11:00:00.000Z'),
    });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
    delete process.env.FIRM_OUTREACH_FORCE_SEND;
  });
});
