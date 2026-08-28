import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockIssueToken = vi.fn();
const mockWasSent = vi.fn();
const mockMarkSent = vi.fn();
const mockBuildReport = vi.fn();
const mockGetDailySendCount = vi.fn();
const mockResendSend = vi.fn();

vi.mock('@/lib/firm-outreach/outreach/send-approval-token', () => ({
  issueSendApprovalToken: (...args: unknown[]) => mockIssueToken(...args),
  wasOutreachApprovalEmailSent: (...args: unknown[]) => mockWasSent(...args),
  markOutreachApprovalEmailSent: (...args: unknown[]) => mockMarkSent(...args),
  outreachApprovalDate: () => '2026-06-13',
}));

vi.mock('@/lib/firm-outreach/outreach/activity-report', () => ({
  buildOutreachActivityReport: (...args: unknown[]) => mockBuildReport(...args),
}));

vi.mock('@/lib/firm-outreach/storage', () => ({
  getDailySendCount: (...args: unknown[]) => mockGetDailySendCount(...args),
}));

vi.mock('resend', () => ({
  Resend: vi.fn(function ResendMock() {
    return { emails: { send: (...args: unknown[]) => mockResendSend(...args) } };
  }),
}));

describe('sendOutreachApprovalRequestEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.FIRM_OUTREACH_FORCE_SEND;
    process.env.RESEND_API_KEY = 're_test';
    process.env.FIRM_OUTREACH_DIGEST_EMAIL = 'robertdavidcashman@gmail.com';
    mockWasSent.mockResolvedValue(false);
    mockGetDailySendCount.mockResolvedValue(0);
    mockIssueToken.mockResolvedValue({
      token: 'tok_test',
      jti: '11111111-1111-4111-8111-111111111111',
      exp: 9999999999,
      date: '2026-06-13',
    });
    mockBuildReport.mockResolvedValue({
      report: {
        summary: { readyToSend: 120, sentToday: 0 },
        readyToSendProspects: [
          {
            prospectId: 'fop_1',
            firmName: 'Alpha LLP',
            email: 'crime@alpha.co.uk',
            county: 'Kent',
            suppressed: false,
          },
        ],
      },
    });
    mockResendSend.mockResolvedValue({ data: { id: 'msg_1' } });
  });

  it('is blocked by the PSA kill-switch and never calls Resend', async () => {
    vi.resetModules();
    const { sendOutreachApprovalRequestEmail } = await import(
      '@/lib/firm-outreach/outreach/approval-request-email'
    );
    const result = await sendOutreachApprovalRequestEmail();
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
    expect(mockIssueToken).not.toHaveBeenCalled();
  });

  it('FORCE_SEND env cannot re-enable approval emails', async () => {
    process.env.FIRM_OUTREACH_FORCE_SEND = 'true';
    vi.resetModules();
    const { sendOutreachApprovalRequestEmail } = await import(
      '@/lib/firm-outreach/outreach/approval-request-email'
    );
    const result = await sendOutreachApprovalRequestEmail({ force: true });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
  });
});

describe('sendOutreachSendConfirmationEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.RESEND_API_KEY;
  });

  it('does not throw when RESEND_API_KEY is absent', async () => {
    vi.resetModules();
    const { sendOutreachSendConfirmationEmail } = await import(
      '@/lib/firm-outreach/outreach/send-confirmation-email'
    );
    const ok = await sendOutreachSendConfirmationEmail({
      stats: { queued: 5, sent: 5, skipped: 0, suppressed: 0, errors: 0, elapsedMs: 1 },
      receipts: [],
      readyRemaining: 115,
    });
    expect(ok).toBe(false);
  });

  it('never calls Resend while PSA operator mail is permanently disabled', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.FIRM_OUTREACH_DIGEST_EMAIL = 'robertdavidcashman@gmail.com';
    mockResendSend.mockResolvedValue({ data: { id: 'msg_2' } });
    vi.resetModules();
    const { sendOutreachSendConfirmationEmail } = await import(
      '@/lib/firm-outreach/outreach/send-confirmation-email'
    );
    const ok = await sendOutreachSendConfirmationEmail({
      stats: { queued: 2, sent: 2, skipped: 0, suppressed: 0, errors: 0, elapsedMs: 1 },
      receipts: [
        {
          sendId: 'send_beta_1',
          prospectId: 'fop_beta_1',
          firmName: 'Beta LLP',
          prospectType: 'firm' as const,
          email: 'crime@beta.co.uk',
          sequenceStep: 0,
          touchLabel: 'Initial invite',
          subject: 'Police station cover for Beta LLP',
          sendStatus: 'sent' as const,
          prospectStatus: 'sent' as const,
          sentAt: '2026-06-18T09:30:00.000Z',
          suppressed: false,
        },
      ],
      readyRemaining: 26,
      source: 'autosend',
      date: '2026-06-18',
    });
    expect(ok).toBe(false);
    expect(mockResendSend).not.toHaveBeenCalled();
  });
});
