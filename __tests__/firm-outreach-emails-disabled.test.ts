import { describe, expect, it } from 'vitest';
import {
  PSA_OUTREACH_EMAILS_DISABLED,
  arePsaOutreachEmailsDisabled,
} from '@/lib/firm-outreach/outreach-emails-disabled';
import { sendOutreachEmail } from '@/lib/firm-outreach/outreach/send';
import type { FirmProspect } from '@/lib/firm-outreach/types';

describe('PSA outreach email kill-switch', () => {
  it('is permanently disabled by default', () => {
    expect(PSA_OUTREACH_EMAILS_DISABLED).toBe(true);
    delete process.env.FIRM_OUTREACH_FORCE_SEND;
    expect(arePsaOutreachEmailsDisabled()).toBe(true);
  });

  it('blocks live sendOutreachEmail calls', async () => {
    delete process.env.FIRM_OUTREACH_FORCE_SEND;
    const prospect = {
      id: 'fop_test',
      email: 'test@example-firm.co.uk',
      firmName: 'Test Firm',
      status: 'ready_to_send',
      sources: ['manual'],
      sequenceStep: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    } as FirmProspect;

    const result = await sendOutreachEmail({ prospect, step: 0, dryRun: false });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('psa_outreach_emails_disabled');
  });
});
