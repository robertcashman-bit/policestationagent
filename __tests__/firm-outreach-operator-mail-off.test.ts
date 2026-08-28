import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockResendSend = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn(function ResendMock() {
    return { emails: { send: (...args: unknown[]) => mockResendSend(...args) } };
  }),
}));

vi.mock('@/lib/firm-outreach/outreach/activity-report', () => ({
  buildOutreachActivityReport: vi.fn(async () => {
    throw new Error('digest must not build report when permanently disabled');
  }),
}));

vi.mock('@/lib/firm-outreach/count-today', () => ({
  listOutreachSentToday: vi.fn(async () => {
    throw new Error('cross digest must not list sends when permanently disabled');
  }),
}));

vi.mock('@/lib/firm-outreach/queue-health', () => ({
  getCampaignQueueCounts: vi.fn(async () => {
    throw new Error('cross digest must not read queues when permanently disabled');
  }),
}));

describe('Operator outreach emails permanently off (no Resend)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    process.env.RESEND_API_KEY = 're_test';
    process.env.FIRM_OUTREACH_DIGEST_EMAIL = 'robertdavidcashman@gmail.com';
    process.env.FIRM_OUTREACH_FORCE_SEND = 'true';
  });

  it('sendDailyOutreachDigest returns early without Resend', async () => {
    const { sendDailyOutreachDigest } = await import('@/lib/firm-outreach/outreach/digest-email');
    const result = await sendDailyOutreachDigest({ force: true });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('sendCrossWorkspaceOutreachDigest returns early without Resend', async () => {
    const { sendCrossWorkspaceOutreachDigest } = await import(
      '@/lib/firm-outreach/cross-workspace-digest'
    );
    const result = await sendCrossWorkspaceOutreachDigest({
      phase: 'morning',
      force: true,
      now: new Date('2026-08-28T11:00:00.000Z'),
    });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('sendOutreachApprovalRequestEmail returns early without Resend', async () => {
    const { sendOutreachApprovalRequestEmail } = await import(
      '@/lib/firm-outreach/outreach/approval-request-email'
    );
    const result = await sendOutreachApprovalRequestEmail({ force: true });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('sendOutreachSendConfirmationEmail returns early without Resend', async () => {
    const { sendOutreachSendConfirmationEmail } = await import(
      '@/lib/firm-outreach/outreach/send-confirmation-email'
    );
    const ok = await sendOutreachSendConfirmationEmail({
      stats: { queued: 1, sent: 1, skipped: 0, suppressed: 0, errors: 0, elapsedMs: 1 },
      receipts: [],
      readyRemaining: 0,
    });
    expect(ok).toBe(false);
    expect(mockResendSend).not.toHaveBeenCalled();
  });
});
