/** Authoritative contact details and scope copy for policestationagent.com */

export const PHONE_TEL = "01732247427";
export const PHONE_DISPLAY = "01732 247427";
export const SMS_TEL = "07535494446";
export const SMS_DISPLAY = "07535 494446";

/** B2B / solicitor cover WhatsApp — text messages only */
export const WHATSAPP_E164 = "447490126251";
export const WHATSAPP_TEXT_ONLY_NOTE =
  "WhatsApp text message only — please do not attempt voice or video calls via WhatsApp.";

export function whatsAppTextUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export function smsUrl(message: string): string {
  return `sms:${SMS_TEL}?body=${encodeURIComponent(message)}`;
}

/** Shown in Google meta descriptions / snippets */
export const SEO_NOT_POLICE =
  "We are not the police — we are criminal defence solicitors.";

/** Contact / station headline order: NOT THE POLICE first */
export const CONTACT_HEADLINE = "NOT THE POLICE — We are criminal solicitors";

/** What the practice accepts instructions for */
export const SERVICE_SCOPE =
  "Immediate matters only: current police custody or a scheduled voluntary (VAI) interview at a Kent station — instructed by the detainee or immediate family (detainee must confirm). Not past arrests, friends, missing-person enquiries, or general legal advice by phone.";

export const SERVICE_SCOPE_SHORT =
  "Immediate custody & booked VAI only — immediate family may instruct; not past arrests, post-release free advice, or general advice.";

export const CUSTODY_PHONE_CTA =
  "Telephone for current custody or a booked voluntary interview";

/** Help-first site chrome (header strip / footer) — not a rejection notice */
export const CHROME_HELP_STRIP =
  "Criminal defence help for Kent custody and booked interviews";

/** Primary brand tagline under the logo */
export const CHROME_BRAND_TAGLINE = "Police station defence in Kent";

/** Quieter disambiguation under the brand — not the loudest signal */
export const CHROME_NOT_POLICE_QUIET = "Independent solicitor — not Kent Police";

/** Homepage hero eyebrow — help-first */
export const CHROME_HERO_EYEBROW =
  "Criminal defence for Kent custody and booked interviews";

/** @deprecated Prefer CHROME_HELP_STRIP + CHROME_NOT_POLICE_QUIET */
export const HEADER_STRAPLINE = `${CHROME_HELP_STRIP}. ${CHROME_NOT_POLICE_QUIET}.`;

/** Short CTA: who this phone line is for */
export const CTA_WHO_CAN_CALL =
  "Call only for current Kent police custody or a booked voluntary (VAI) interview.";

/** Short CTA: who should not call — we cannot help with police matters */
export const CTA_OUT_OF_SCOPE =
  "Do not use this number for police enquiries — we are NOT the police and we cannot help. Do not call for crime reports, switchboard transfers, free advice after release, after a past interview, or general case updates. For police assistance use 999 or 101.";

/**
 * Station pages: NOT THE POLICE first, then criminal solicitors, then Medway-style
 * urgent-rep framing. No telephone digits — Contact holds the number last.
 */
export const STATION_SOLICITOR_CTA =
  "NOT THE POLICE. We are criminal solicitors serving this station. Do not use our telephone for police enquiries — we cannot help with those. If you need urgent police station representation for current custody or a forthcoming police interview, go to Contact — that page lists what we do and do not do, then the solicitor telephone. This page is not a police contact directory.";

export const STATION_PHONE_LABEL = "NOT THE POLICE — We are criminal solicitors";

export const STATION_CONTACT_BUTTON =
  "Contact criminal solicitors — what we do & don't do";

/** Station-page scope (no digits) */
export const STATION_PHONE_SCOPE =
  "Solicitor telephone is on the Contact page only (custody or forthcoming interview). Do not use it for police enquiries — we are NOT the police and we cannot help. Use 999 or 101 for police assistance.";
/** Scope FAQ / can-we-help anchor */
export const SCOPE_HELP_HREF = "/faq#immediate-custody-only";

/** Soft Contact-page intro — why pathways, not a sitewide number */
export const CONTACT_GETTING_IN_TOUCH =
  "We’re Robert Cashman’s police-station defence practice (through Tuckers Solicitors LLP) — not Kent Police. We know a phone number feels simplest, and we do take urgent calls when someone is in custody or has a booked interview. We don’t publish that number on every page because search traffic often mistakes us for the police, and the line isn’t a free general advice service after release.";

export const CONTACT_PATHWAY_PROMPT =
  "Choose the pathway that fits you. The solicitor telephone is not listed on this page — for current custody it appears only after a short check if we can help.";

/** Non-urgent admin / written enquiry on Contact — filter, not a second advice line */
export const ADMIN_ENQUIRY_HEADING = "Non-urgent written / administrative enquiry";

export const ADMIN_ENQUIRY_INTRO =
  "Use this form for non-urgent written messages only. It is not an emergency channel, not a police contact form, and not a free general legal advice service. Response times are not guaranteed. If someone is in custody now, or has a booked interview, use the pathways above — don’t wait on this form.";

export const ADMIN_ENQUIRY_CAN = [
  "Non-urgent questions about instructing us for police-station work in Kent",
  "Administrative messages (e.g. referring a matter, confirming you’ve already instructed us)",
  "Clarifying whether your situation is something we cover",
  "Solicitor/firm messages about agency cover (the agency pathway is usually faster)",
] as const;

export const ADMIN_ENQUIRY_CANNOT = [
  "Act as Kent Police, take crime reports, or transfer calls to custody or switchboard",
  "Confirm whether someone is in custody, find a missing person, or give welfare updates without being instructed as their solicitor",
  "Provide free advice after release, after a past interview, or general case updates",
  "Accept instructions from friends or colleagues for someone else (immediate family only; detainee must confirm)",
  "Treat past arrests or “already released” matters as urgent police-station attendance",
  "Replace 999 or 101",
] as const;

export const WHY_PHONE_NOT_EVERYWHERE_FAQ = {
  question: "Why isn’t your phone number on every page?",
  answer:
    "We’re independent criminal solicitors, not the police. A number on every blog and station page draws 101-style calls and “free advice after release” enquiries we can’t help with, which delays people in live custody or with a booked interview. Use the Contact pathways that match your situation, or the non-urgent written enquiry on the Contact page for administrative messages. For police help use 999 or 101.",
} as const;

export const CAN_I_EMAIL_FAQ = {
  question: "Can I email you instead of calling?",
  answer:
    "Yes — for non-urgent written / administrative enquiries only, use the form on the Contact page. Email and that form are not for emergencies, police matters, or “is my relative in custody right now?” queries, nor for trace or welfare requests. Current custody and same-day interviews should use the Contact pathways — don’t wait on a written reply.",
} as const;

export const NOT_POLICE_NOTICE =
  "Independent criminal defence solicitor website — not Kent Police. For police assistance call 101, or 999 in an emergency. The solicitor contact details below are only for legal advice and representation.";
export const SOLICITOR_PHONE_LABEL = "Independent solicitor telephone";
export const SOLICITOR_SMS_LABEL = "Solicitor SMS — legal representation enquiries only";
export const SOLICITOR_TEL_ARIA = "Call Robert Cashman, independent criminal defence solicitor";
export const SOLICITOR_SMS_ARIA = "Text Robert Cashman, independent criminal defence solicitor";
export const SOLICITOR_CONTACT_CTA = "Request legal representation";
export const LEGAL_SERVICE_SCHEMA_DESCRIPTION =
  "Independent criminal defence solicitor providing police station legal representation. Not affiliated with Kent Police or any police force. Legal services delivered through Tuckers Solicitors LLP (SRA ID: 127795).";
export const PHONE_E164 = "+441732247427";
