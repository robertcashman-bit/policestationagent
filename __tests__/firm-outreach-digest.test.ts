import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockBuildReport = vi.fn();
const mockGetDailySendCount = vi.fn();
const mockWasSent = vi.fn();
const mockMarkSent = vi.fn();
const mockResendSend = vi.fn();

vi.mock('@/lib/firm-outreach/outreach/activity-report', () => ({
  buildOutreachActivityReport: (...args: unknown[]) => mockBuildReport(...args),
}));

vi.mock('@/lib/firm-outreach/storage', () => ({
  getDailySendCount: (...args: unknown[]) => mockGetDailySendCount(...args),
}));

vi.mock('@/lib/firm-outreach/outreach/daily-digest', () => ({
  outreachDigestDate: () => '2026-08-21',
  wasOutreachDigestSent: (...args: unknown[]) => mockWasSent(...args),
  markOutreachDigestSent: (...args: unknown[]) => mockMarkSent(...args),
}));

vi.mock('resend', () => ({
  Resend: vi.fn(function ResendMock() {
    return { emails: { send: (...args: unknown[]) => mockResendSend(...args) } };
  }),
}));

function stubReadyReport() {
  mockWasSent.mockResolvedValue(false);
  mockGetDailySendCount.mockResolvedValue(0);
  mockBuildReport.mockResolvedValue({
    report: {
      summary: {
        readyToSend: 43,
        sentToday: 0,
        sentLast7Days: 129,
        discovered: 100,
        totalSends: 20,
        noEmail: 5,
        excluded: 1,
        unsubscribed: 0,
        joinedWhatsApp: 0,
      },
      readyToSendProspects: [
        {
          prospectId: 'fop_1',
          firmName: 'Alpha LLP',
          prospectType: 'firm',
          email: 'crime@alpha.co.uk',
          county: 'Kent',
          priorityScore: 80,
          sources: ['laa'],
          updatedAt: '2026-08-21T08:00:00.000Z',
          suppressed: false,
        },
      ],
      sends: [],
    },
  });
  mockResendSend.mockResolvedValue({ data: { id: 'msg_1' } });
}

describe('sendDailyOutreachDigest — PSA kill-switch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    delete process.env.FIRM_OUTREACH_FORCE_SEND;
    process.env.RESEND_API_KEY = 're_test';
    process.env.FIRM_OUTREACH_DIGEST_EMAIL = 'robertdavidcashman@gmail.com';
    process.env.FIRM_OUTREACH_FROM_EMAIL =
      'PoliceStationRepUK <noreply@policestationrepuk.org>';
    stubReadyReport();
  });

  it('is a no-op and never calls Resend while PSA outreach is disabled', async () => {
    const { sendDailyOutreachDigest } = await import('@/lib/firm-outreach/outreach/digest-email');
    const result = await sendDailyOutreachDigest();
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
    expect(mockMarkSent).not.toHaveBeenCalled();
    expect(mockBuildReport).not.toHaveBeenCalled();
  });

  it('never produces a KENT AGENT COVER digest body while disabled (force= ignored)', async () => {
    const { sendDailyOutreachDigest } = await import('@/lib/firm-outreach/outreach/digest-email');
    const result = await sendDailyOutreachDigest({ force: true });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('psa_outreach_emails_disabled');
    expect(mockResendSend).not.toHaveBeenCalled();
    for (const call of mockResendSend.mock.calls) {
      const payload = call[0] as { subject?: string; html?: string };
      expect(String(payload?.html ?? '').toUpperCase()).not.toContain('KENT AGENT COVER');
      expect(String(payload?.subject ?? '')).not.toMatch(/\[Firm outreach\].*ready to send/);
    }
  });

  it('skips when digest already sent today (only reachable with FORCE_SEND escape)', async () => {
    process.env.FIRM_OUTREACH_FORCE_SEND = 'true';
    mockWasSent.mockResolvedValue(true);
    const { sendDailyOutreachDigest } = await import('@/lib/firm-outreach/outreach/digest-email');
    const result = await sendDailyOutreachDigest();
    expect(result.sent).toBe(false);
    expect(result.reason).toBe('already_sent_today');
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('with FORCE_SEND escape, legacy digest subject/body match the 17:01 mail shape', async () => {
    process.env.FIRM_OUTREACH_FORCE_SEND = 'true';
    const { sendDailyOutreachDigest } = await import('@/lib/firm-outreach/outreach/digest-email');
    const result = await sendDailyOutreachDigest();
    expect(result.sent).toBe(true);
    expect(mockResendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'robertdavidcashman@gmail.com',
        from: 'PoliceStationRepUK <noreply@policestationrepuk.org>',
        subject: '[Firm outreach] 43 ready to send — 2026-08-21',
        html: expect.stringMatching(/Kent agent cover/i),
      }),
    );
    const html = String((mockResendSend.mock.calls[0]?.[0] as { html: string }).html);
    expect(html.toUpperCase()).toContain('KENT AGENT COVER');
    expect(mockMarkSent).toHaveBeenCalledWith('2026-08-21');
  });
});
