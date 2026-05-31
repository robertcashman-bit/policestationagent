/** Shared scope / confidentiality FAQ copy — single source of truth */

export const SCOPE_IMMEDIATE_ONLY =
  "We handle immediate matters only: someone currently in police custody at a Kent station, or a scheduled voluntary (VAI) interview. We do not deal with arrests from yesterday, days ago, or last week — or enquiries after someone has been released.";

export const SCOPE_CONSENT_REQUIRED =
  "When a third party instructs us, the detainee must confirm they want us to represent them when we contact the station (PACE Code C). We cannot act without that consent.";

export const SCOPE_IMMEDIATE_FAMILY_ONLY =
  "Only immediate family may instruct on someone else's behalf — for example a parent, spouse or partner, child, or sibling. Friends, colleagues, and other acquaintances cannot instruct us.";

export const SCOPE_NOT_TRACING =
  "We are not a tracing or missing-person service. We cannot find someone who has disappeared, confirm whether they are in custody, or explain what happened to them unless we are attending as their instructed solicitor — and even then, confidentiality applies.";

export const SCOPE_NOT_GENERAL =
  "Our telephone line and contact form are not for general legal advice, welfare checks, status updates, or speculative calls to police stations.";

export const SCOPE_STATUS_ENQUIRY_HEADLINE =
  "Immediate custody & scheduled interviews only — not past arrests or general enquiries";

/** Scope section FAQs — used in FAQ page, chatbot, and JSON-LD */
export const SCOPE_FAQ_ITEMS = [
  {
    question: "Do you deal with arrests from yesterday or a few days ago?",
    answer: `${SCOPE_IMMEDIATE_ONLY} If someone was arrested yesterday, two days ago, or earlier — or has already been released — we cannot attend, trace what happened, or provide a case update. If they need a solicitor after release, they should contact a criminal defence firm directly.`,
  },
  {
    question: "Can you tell me if someone is in custody or find someone who has disappeared?",
    answer: `${SCOPE_NOT_TRACING} If you believe an immediate family member is in custody right now at a Kent police station, you may call to instruct representation — see who can instruct us below.`,
  },
  {
    question: "Who can instruct you on someone else's behalf?",
    answer: `${SCOPE_IMMEDIATE_FAMILY_ONLY} ${SCOPE_CONSENT_REQUIRED}`,
  },
  {
    question: "What should immediate family tell us when instructing (right now)?",
    answer:
      "Please tell us: the Kent police station (if known), the detainee's full name, that custody is current (today), any vulnerabilities (under 18, mental health, language needs), whether they already asked for a solicitor, your relationship to the detainee, and a callback number. We will contact custody to attend and advise — not to give you a status report.",
  },
  {
    question: "Can you call the police for a welfare update or to find out what happened in interview?",
    answer:
      "We contact police only to attend as legal representative when properly instructed for current custody. We do not make speculative welfare calls, and we do not discuss interview content with family unless the client explicitly authorises us after release.",
  },
  {
    question: "Why can't you share details with family?",
    answer:
      "Legal Professional Privilege protects the client, not the caller. Everything discussed between a solicitor and client is confidential. The detainee decides who we may speak to after release. This protects their rights during a police investigation. For a step-by-step guide, see our Can We Help page at /canwehelp.",
  },
] as const;

export const SCOPE_SECTION_ID = "immediate-custody-only";

export const SCOPE_CALLOUT_CAN = [
  "Someone is in police custody right now at a Kent station",
  "A scheduled voluntary (VAI) interview is booked",
  "Instruction from the detainee or immediate family (detainee must confirm on arrival)",
] as const;

export const SCOPE_CALLOUT_CANNOT = [
  "Arrests from yesterday, days ago, or after release",
  "Friends or non-family calling on someone's behalf",
  "Missing-person enquiries — where are they? what happened to them?",
  "General legal advice, welfare checks, or status updates",
] as const;

/** Detect out-of-scope queries (status, past arrest, friends, missing person) */
export function isOutOfScopeEnquiry(query: string): boolean {
  const q = query.toLowerCase();

  const pastArrest =
    /\b(yesterday|last week|few days|2 days|two days|days ago|already released|was arrested|got arrested)\b/.test(
      q
    ) && !/\b(right now|currently|today|in custody now)\b/.test(q);

  const missingPerson =
    /\b(disappeared|missing|where are they|what happened to them|find them|trace them|locate them)\b/.test(
      q
    );

  const friendInstruct =
    /\b(friend|mate|colleague|neighbour|neighbor|acquaintance)\b/.test(q) &&
    /\b(instruct|represent|arrested|custody|help)\b/.test(q);

  const statusCheck =
    /\b(find out|check on|status update|welfare|are they still|which station|in custody\?|tell me if)\b/.test(
      q
    ) &&
    /\b(someone|they|he|she|my son|my daughter|my partner|person)\b/.test(q) &&
    !/\b(instruct|represent|attend)\b/.test(q);

  const generalOnly =
    /\b(general (question|enquiry|inquiry|advice)|legal advice by phone)\b/.test(q);

  return pastArrest || missingPerson || friendInstruct || statusCheck || generalOnly;
}
