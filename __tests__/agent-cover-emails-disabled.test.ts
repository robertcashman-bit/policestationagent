import { describe, expect, it } from 'vitest';
import {
  AGENT_COVER_EMAILS_DISABLED,
  areAgentCoverEmailsDisabled,
} from '@/lib/firm-outreach/agent-cover-emails-disabled';
import { AGENT_COVER_KENT_CAMPAIGN_ID } from '@/lib/firm-outreach/campaign-scope';
import { OUTREACH_SEND_CAMPAIGN_IDS } from '@/lib/firm-outreach/site-config';
import { sendOutreachEmail } from '@/lib/firm-outreach/outreach/send';
import type { FirmProspect } from '@/lib/firm-outreach/types';

describe('agent_cover email kill-switch', () => {
  it('is permanently disabled by default', () => {
    expect(AGENT_COVER_EMAILS_DISABLED).toBe(true);
    delete process.env.FIRM_OUTREACH_FORCE_AGENT_COVER_SEND;
    expect(areAgentCoverEmailsDisabled()).toBe(true);
  });

  it('excludes agent_cover from live send campaign list', () => {
    expect(OUTREACH_SEND_CAMPAIGN_IDS).toEqual(['whatsapp_invite_v1']);
    expect(OUTREACH_SEND_CAMPAIGN_IDS).not.toContain(AGENT_COVER_KENT_CAMPAIGN_ID);
  });

  it('blocks live agent_cover sendOutreachEmail calls', async () => {
    delete process.env.FIRM_OUTREACH_FORCE_AGENT_COVER_SEND;
    delete process.env.FIRM_OUTREACH_DRY_RUN;
    const prospect = {
      id: 'fop_agent_block_test',
      firmKey: 'test-firm',
      firmName: 'Test Firm LLP',
      prospectType: 'firm',
      status: 'ready_to_send',
      sequenceStep: 1,
      sources: ['laa'],
      priorityScore: 10,
      campaignId: AGENT_COVER_KENT_CAMPAIGN_ID,
      enrichAttempts: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: 'test@example-firm.co.uk',
    } as FirmProspect;

    const result = await sendOutreachEmail({ prospect, step: 1, dryRun: false });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('agent_cover_emails_disabled');
  });
});
