import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FirmProspect } from '@/lib/firm-outreach/types';
import {
  buildKentCorrectionEmailHtml,
  buildOutreachEmailHtml,
  isLegacyNationwideInitialSubject,
  KENT_CORRECTION_SUBJECT,
  LEGACY_NATIONWIDE_INITIAL_SUBJECTS,
  subjectForStep,
} from '@/lib/firm-outreach/outreach/templates';

const prospect: FirmProspect = {
  id: 'fop_test_1',
  firmName: 'Test Kent LLP',
  firmKey: 'test-kent',
  email: 'crime@testkent.co.uk',
  status: 'ready_to_send',
  prospectType: 'firm',
  campaignId: 'agent_cover_kent_v1',
  sequenceStep: 0,
  county: 'Kent',
  priorityScore: 10,
  enrichAttempts: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  sources: [],
};

describe('Kent-only outreach templates', () => {
  it('uses Maidstone radius in initial subject lines', () => {
    expect(subjectForStep(prospect, 0)).toContain('Maidstone');
    expect(subjectForStep({ ...prospect, prospectType: 'solicitor' }, 0)).toContain('Maidstone');
  });

  it('does not mention nationwide roster coverage in step 0 body', () => {
    const html = buildOutreachEmailHtml({
      prospect,
      step: 0,
      unsubscribeUrl: 'https://example.com/unsub',
    });
    expect(html).toContain('45 minutes of Maidstone');
    expect(html).not.toContain('England &amp; Wales when your roster');
    expect(html).toContain('07535 494446');
    expect(html).toContain('01732 247427');
  });

  it('mentions Maidstone radius in follow-up steps', () => {
    for (const step of [1, 2]) {
      const html = buildOutreachEmailHtml({
        prospect,
        step,
        unsubscribeUrl: 'https://example.com/unsub',
      });
      expect(html.toLowerCase()).toContain('maidstone');
    }
  });

  it('detects legacy nationwide initial subjects', () => {
    for (const subject of LEGACY_NATIONWIDE_INITIAL_SUBJECTS) {
      expect(isLegacyNationwideInitialSubject(subject)).toBe(true);
    }
    expect(isLegacyNationwideInitialSubject(subjectForStep(prospect, 0))).toBe(false);
  });

  it('builds correction email with apology and Maidstone radius scope', () => {
    const html = buildKentCorrectionEmailHtml({
      prospect,
      unsubscribeUrl: 'https://example.com/unsub',
    });
    expect(KENT_CORRECTION_SUBJECT).toContain('Maidstone');
    expect(html).toContain('incorrectly suggested nationwide');
    expect(html).toContain('45 minutes of Maidstone');
  });
});

describe('runKentCorrectionEmails', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('targets legacy initial sends not yet corrected', async () => {
    vi.doMock('@/lib/kv', () => ({ getKV: () => null }));
    vi.doMock('@/lib/firm-outreach/storage', () => ({
      listAllSends: vi.fn().mockResolvedValue([
        {
          id: 'send_1',
          prospectId: 'fop_legacy',
          firmName: 'Legacy LLP',
          email: 'a@legacy.co.uk',
          campaignId: 'agent_cover_kent_v1',
          sequenceStep: 0,
          subject: LEGACY_NATIONWIDE_INITIAL_SUBJECTS[0],
          status: 'sent',
          sentAt: '2026-06-18T09:00:00.000Z',
          createdAt: '2026-06-18T09:00:00.000Z',
        },
      ]),
      getProspect: vi.fn().mockResolvedValue({
        ...prospect,
        id: 'fop_legacy',
        email: 'a@legacy.co.uk',
        firmName: 'Legacy LLP',
      }),
      isSuppressed: vi.fn().mockResolvedValue(false),
    }));
    vi.doMock('@/lib/firm-outreach/outreach/send-kent-correction', () => ({
      sendKentCorrectionEmail: vi.fn().mockResolvedValue({ ok: true, subject: KENT_CORRECTION_SUBJECT }),
    }));

    const { listProspectsNeedingKentCorrection } = await import(
      '@/lib/firm-outreach/outreach/run-kent-corrections'
    );
    const rows = await listProspectsNeedingKentCorrection();
    expect(rows).toHaveLength(1);
    expect(rows[0].email).toBe('a@legacy.co.uk');
  });
});

describe('brochure attachment policy', () => {
  it('attaches brochure on step 0 sends only', async () => {
    const src = await import('fs/promises').then((fs) =>
      fs.readFile(new URL('../lib/firm-outreach/outreach/send.ts', import.meta.url), 'utf8'),
    );
    expect(src).toContain('opts.step === 0 ? loadBrochureAttachment()');
  });
});
