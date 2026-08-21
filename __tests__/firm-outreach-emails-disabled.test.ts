import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import {
  PSA_OUTREACH_EMAILS_DISABLED,
  arePsaOutreachEmailsDisabled,
} from '@/lib/firm-outreach/outreach-emails-disabled';
import { sendOutreachEmail } from '@/lib/firm-outreach/outreach/send';
import { FIRM_OUTREACH_CAMPAIGN_ID } from '@/lib/firm-outreach/site-config';
import type { FirmProspect } from '@/lib/firm-outreach/types';
import {
  EXPECTED_CRON_ROUTES,
  LEGACY_CRON_ROUTES,
  cronRouteScheduled,
} from '@/lib/firm-outreach/verify-checks';

describe('PSA outreach email kill-switch', () => {
  it('is permanently disabled by default', () => {
    expect(PSA_OUTREACH_EMAILS_DISABLED).toBe(true);
    delete process.env.FIRM_OUTREACH_FORCE_SEND;
    expect(arePsaOutreachEmailsDisabled()).toBe(true);
  });

  it('campaign id remains agent_cover_kent_v1 (Kent agent cover)', () => {
    expect(FIRM_OUTREACH_CAMPAIGN_ID).toBe('agent_cover_kent_v1');
  });

  it('refuses live agent_cover_kent_v1 prospect sends', async () => {
    delete process.env.FIRM_OUTREACH_FORCE_SEND;
    const prospect = {
      id: 'fop_kent_test',
      email: 'crime@kent-firm.example',
      firmName: 'Kent Test Solicitors',
      status: 'ready_to_send',
      sources: ['laa'],
      sequenceStep: 0,
      campaignId: 'agent_cover_kent_v1',
      county: 'Kent',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    } as FirmProspect;

    const result = await sendOutreachEmail({ prospect, step: 0, dryRun: false });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('psa_outreach_emails_disabled');
  });

  it('blocks live sendOutreachEmail calls without campaign id', async () => {
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

  it('does not schedule the Kent digest cron in vercel.json', () => {
    const vercelRaw = readFileSync(resolve('vercel.json'), 'utf8');
    const vercelJson = JSON.parse(vercelRaw.replace(/,\s*([}\]])/g, '$1'));
    const paths = (vercelJson.crons ?? []).map((c: { path: string }) => c.path as string);
    expect(cronRouteScheduled(paths, '/api/cron/firm-outreach-digest')).toBe(false);
    expect(paths.some((p) => p.includes('firm-outreach-digest'))).toBe(false);
    expect(EXPECTED_CRON_ROUTES).not.toContain('/api/cron/firm-outreach-digest');
    expect(LEGACY_CRON_ROUTES).toContain('/api/cron/firm-outreach-digest');
  });

  it('does not schedule prospect send or kent-correction crons', () => {
    const vercelRaw = readFileSync(resolve('vercel.json'), 'utf8');
    const vercelJson = JSON.parse(vercelRaw.replace(/,\s*([}\]])/g, '$1'));
    const paths = (vercelJson.crons ?? []).map((c: { path: string }) => c.path as string);
    expect(cronRouteScheduled(paths, '/api/cron/firm-outreach-send')).toBe(false);
    expect(cronRouteScheduled(paths, '/api/cron/firm-outreach-kent-corrections')).toBe(false);
  });
});
