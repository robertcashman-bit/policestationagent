/**
 * Permanent stop for Police Station Agent firm-outreach emails.
 *
 * Covers prospect/firm sends AND owner digests / approval reminders for the
 * Kent agent-cover campaign (`agent_cover_kent_v1`). Robert wants RepUK
 * (Policestationrepuk) outreach only — this app must not email digests or
 * firms.
 *
 * Policestationrepuk outreach is separate and must keep running.
 * Do not flip this to false without an explicit product decision.
 *
 * Escape hatch (emergency only): FIRM_OUTREACH_FORCE_SEND=true
 * — still requires normal pause/send env gates.
 */
export const PSA_OUTREACH_EMAILS_DISABLED = true;

export const PSA_OUTREACH_EMAILS_DISABLED_REASON =
  'Police Station Agent firm outreach emails and Kent-agent digests are permanently disabled (2026-08-21). Use Policestationrepuk for firm outreach.';

/** True when no PSA firm-outreach email (prospect send or owner digest) may leave this app. */
export function arePsaOutreachEmailsDisabled(): boolean {
  if (process.env.FIRM_OUTREACH_FORCE_SEND === 'true') return false;
  return PSA_OUTREACH_EMAILS_DISABLED;
}
