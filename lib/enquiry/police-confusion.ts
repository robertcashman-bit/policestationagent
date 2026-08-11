/**
 * Detect police / custody-suite confusion on written enquiries.
 * Used by the contact form (client) and /api/contact (server) — keep in sync.
 */

export type PoliceConfusionReason =
  | "police_email"
  | "police_audience"
  | "custody_contact_request"
  | "officer_language";

const POLICE_EMAIL_RE = /@(?:[a-z0-9.-]+\.)?police\.uk$/i;

/** Phrases that indicate the sender wants a police custody channel, not defence solicitors. */
const CUSTODY_CONTACT_PATTERNS: RegExp[] = [
  /\bcontact (?:number|email|details?).{0,40}\bcustody\b/i,
  /\bcustody\b.{0,40}\b(?:contact|telephone|phone|email|number)\b/i,
  /\bcustody suite\b/i,
  /\byour custody\b/i,
  /\binto your custody\b/i,
  /\b(?:fp|fingerprints?)\b.{0,60}\b(?:dna|custody)\b/i,
  /\bdna\b.{0,60}\b(?:fp|fingerprints?|custody|obtain)/i,
  /\bobtain(?:ed)?\b.{0,40}\b(?:fp|dna|fingerprints?)\b/i,
  /\b(?:fp|dna|fingerprints?).{0,40}\bobtain/i,
];

const OFFICER_PATTERNS: RegExp[] = [
  /\boic\b/i,
  /\bofficer in (?:the )?case\b/i,
  /\bpc\s+\d{3,5}\b/i,
  /\b(?:detective|dc|ds|di|dci)\s+[a-z]/i,
  /\bfrom\s+btp\b/i,
  /\bbtp\b.{0,40}\b(?:colchester|custody|police)\b/i,
  /\bi am (?:an? )?(?:pc|police (?:constable|officer)|oic)\b/i,
  /\bmy (?:suspect|detainee)s?\b/i,
];

export function isPoliceForceEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const trimmed = email.trim().toLowerCase();
  if (!trimmed.includes("@")) return false;
  return POLICE_EMAIL_RE.test(trimmed);
}

export function detectPoliceConfusion(input: {
  email?: string | null;
  message?: string | null;
  name?: string | null;
  audienceIsPolice?: boolean;
}): PoliceConfusionReason | null {
  if (input.audienceIsPolice) return "police_audience";
  if (isPoliceForceEmail(input.email)) return "police_email";

  const haystack = [input.message, input.name].filter(Boolean).join("\n");
  if (!haystack.trim()) return null;

  if (CUSTODY_CONTACT_PATTERNS.some((re) => re.test(haystack))) {
    return "custody_contact_request";
  }
  if (OFFICER_PATTERNS.some((re) => re.test(haystack))) {
    return "officer_language";
  }
  return null;
}

export const POLICE_CONFUSION_USER_MESSAGE =
  "We are independent criminal defence solicitors — not the police and not a custody suite. We cannot provide custody telephone numbers, emails, FP/DNA chase contacts, or switchboard transfers. For police or custody assistance use 101 (or 999 in an emergency), or your force’s internal directory.";

export function policeConfusionPublicMessage(_reason: PoliceConfusionReason): string {
  return POLICE_CONFUSION_USER_MESSAGE;
}
