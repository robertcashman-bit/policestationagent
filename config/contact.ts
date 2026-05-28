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
  "We accept instructions for people in police custody and scheduled voluntary (VAI) interviews at Kent police stations only — not general legal advice by phone.";

export const SERVICE_SCOPE_SHORT =
  "Custody & scheduled voluntary interviews only — not general legal advice.";

export const CUSTODY_PHONE_CTA =
  "Telephone for custody or a booked voluntary interview";

export const HEADER_STRAPLINE =
  "Independent duty solicitor (NOT the police) — custody & scheduled interviews, Kent";
