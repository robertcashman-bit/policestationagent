/**
 * Permanent stop for Police Station Agent firm-outreach emails.
 *
 * Covers:
 * - Prospect / firm sends (Kent agent-cover)
 * - Operator digests (Kent daily + cross-workspace morning/evening)
 * - Approval reminders, batch confirmation, Kent correction mail
 *
 * Env cannot re-enable. There is no FORCE_SEND escape hatch.
 * Do not flip this to false without an explicit written product decision from Robert.
 *
 * Pipeline / enrich / discovery may still run for inventory; they must not email.
 */
export const PSA_OUTREACH_EMAILS_DISABLED = true as const;

export const PSA_OUTREACH_EMAILS_DISABLED_REASON =
  'Police Station Agent firm outreach emails and operator digests are permanently disabled. Env cannot re-enable.';

/** True when no PSA firm-outreach email (prospect send or operator mail) may leave this app. */
export function arePsaOutreachEmailsDisabled(): boolean {
  return PSA_OUTREACH_EMAILS_DISABLED;
}

/** Alias for operator-facing digests / alerts / confirmations. */
export function arePsaOutreachOperatorMailDisabled(): boolean {
  return PSA_OUTREACH_EMAILS_DISABLED;
}
