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
  "Private defence solicitor website — NOT Kent Police or any police force.";

/** Contact / station headline order: NOT THE POLICE first */
export const CONTACT_HEADLINE = "NOT THE POLICE — We are criminal solicitors";

/** What the practice accepts instructions for */
export const SERVICE_SCOPE =
  "Immediate matters only: current police custody or a scheduled voluntary (VAI) interview at a Kent station — instructed by the detainee or immediate family (detainee must confirm). Not past arrests, friends, missing-person enquiries, or general legal advice by phone.";

export const SERVICE_SCOPE_SHORT =
  "Immediate custody & booked VAI only — immediate family may instruct; not past arrests, post-release free advice, or general advice.";

export const CUSTODY_PHONE_CTA =
  "Telephone for current custody or a booked voluntary interview";

export const HEADER_STRAPLINE =
  "Independent solicitor — NOT the police. Kent custody and booked interviews.";

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
