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

/** Short CTA: who should not call for free phone advice */
export const CTA_OUT_OF_SCOPE =
  "Do not call for free advice after release, after a past interview, or for general case updates.";

/** Scope FAQ / can-we-help anchor */
export const SCOPE_HELP_HREF = "/faq#immediate-custody-only";
