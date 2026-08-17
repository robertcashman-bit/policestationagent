/** Site-specific firm-outreach identity (no imports — avoids circular init). */
export const FIRM_OUTREACH_UA =
  'PoliceStationRepUK/1.0 (+https://policestationrepuk.org; firm-outreach)';

export const FIRM_OUTREACH_CAMPAIGN_ID = 'whatsapp_invite_v1';

/**
 * All campaigns that may exist in shared KV (inventory / admin / metrics).
 * agent_cover_kent_v1 remains listed so historical records resolve, but it is
 * excluded from live sends via OUTREACH_SEND_CAMPAIGN_IDS.
 */
export const OUTREACH_CAMPAIGN_IDS = [
  'agent_cover_kent_v1',
  'whatsapp_invite_v1',
] as const;

/**
 * Campaigns allowed to send live firm emails from this deployment.
 * Agent-cover / Police Station Agent branded mail is permanently disabled.
 */
export const OUTREACH_SEND_CAMPAIGN_IDS = ['whatsapp_invite_v1'] as const;
