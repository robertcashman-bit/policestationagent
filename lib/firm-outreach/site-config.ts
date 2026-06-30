/** Site-specific firm-outreach identity (no imports — avoids circular init with campaign-scope). */
export const FIRM_OUTREACH_UA =
  'PoliceStationAgent/1.0 (+https://policestationagent.com; firm-outreach)';

export const FIRM_OUTREACH_CAMPAIGN_ID = 'agent_cover_kent_v1';

/** All outreach campaigns sharing this KV (PSA + RepUK). */
export const OUTREACH_CAMPAIGN_IDS = [
  'whatsapp_invite_v1',
  'agent_cover_kent_v1',
] as const;
