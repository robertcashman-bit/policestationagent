/**
 * Permanent stop for Police Station Agent firm-outreach emails (to prospects).
 *
 * Policestationrepuk outreach is separate and must keep running.
 * Do not flip this to false without an explicit product decision.
 *
 * Escape hatch (emergency only): FIRM_OUTREACH_FORCE_SEND=true
 * — still requires normal pause/send env gates.
 */
export const PSA_OUTREACH_EMAILS_DISABLED = true;

export const PSA_OUTREACH_EMAILS_DISABLED_REASON =
  'Police Station Agent firm outreach emails are permanently disabled (2026-08-17). Use Policestationrepuk for firm outreach.';

/** True when no prospect/firm outreach email may be sent from this app. */
export function arePsaOutreachEmailsDisabled(): boolean {
  if (process.env.FIRM_OUTREACH_FORCE_SEND === 'true') return false;
  return PSA_OUTREACH_EMAILS_DISABLED;
}
