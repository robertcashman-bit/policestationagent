/**
 * Permanent stop for Police Station Agent / agent_cover_kent_v1 emails
 * sent from the Policestationrepuk deployment (shared KV dual-campaign).
 *
 * WhatsApp invite outreach (whatsapp_invite_v1) must keep running.
 * Do not flip this to false without an explicit product decision.
 *
 * Escape hatch (emergency only): FIRM_OUTREACH_FORCE_AGENT_COVER_SEND=true
 */
export const AGENT_COVER_EMAILS_DISABLED = true;

export const AGENT_COVER_EMAILS_DISABLED_REASON =
  'Police Station Agent (agent_cover_kent_v1) outreach emails are permanently disabled (2026-08-17). WhatsApp / RepUK firm outreach remains active.';

/** True when agent-cover / PSA-branded firm emails must not be sent from this app. */
export function areAgentCoverEmailsDisabled(): boolean {
  if (process.env.FIRM_OUTREACH_FORCE_AGENT_COVER_SEND === 'true') return false;
  return AGENT_COVER_EMAILS_DISABLED;
}
