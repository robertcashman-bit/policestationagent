/**
 * Lightweight GA4 event helpers — no-op when measurement ID is unset.
 * Never send names, DOBs, phones, emails, allegations, custody numbers, or uploads.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

const PII_PARAM_KEYS = new Set([
  "name",
  "full_name",
  "fullName",
  "email",
  "phone",
  "telephone",
  "contactNumber",
  "dob",
  "dateOfBirth",
  "date_of_birth",
  "allegation",
  "offence",
  "offenceSummary",
  "custodyRecord",
  "custody_record",
  "dscc",
  "dsccReference",
  "officer",
  "officerName",
  "officerEmail",
  "officerPhone",
  "filename",
  "fileName",
  "clientName",
  "client_name",
]);

export function isAnalyticsEnabled(): boolean {
  return Boolean(GA_ID);
}

export function sanitizeAnalyticsParams(
  params?: Record<string, string | number | boolean | undefined>,
): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};
  if (!params) return cleaned;
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (PII_PARAM_KEYS.has(key)) continue;
    if (/name|email|phone|dob|offence|allegation|custody|dscc|officer|file/i.test(key)) {
      continue;
    }
    cleaned[key] = value;
  }
  return cleaned;
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined" || !GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", name, sanitizeAnalyticsParams(params));
}

export const FunnelEvents = {
  pathwayVoluntary: () => trackEvent("pathway_voluntary_selected"),
  pathwayCustody: () => trackEvent("pathway_custody_selected"),
  pathwayAgency: () => trackEvent("pathway_agency_selected"),
  situationOther: () => trackEvent("situation_other_selected"),
  voluntaryFormStart: () => trackEvent("voluntary_form_start"),
  voluntaryFormSubmit: () => trackEvent("voluntary_form_submit"),
  custodyScreenStart: () => trackEvent("custody_screen_start"),
  custodyScreenQualified: () => trackEvent("custody_screen_qualified"),
  custodyPhoneReveal: () => trackEvent("custody_phone_reveal"),
  custodyPhoneClick: () => trackEvent("custody_phone_click"),
  agencyPageView: () => trackEvent("agency_page_viewed"),
  agencyFormStart: () => trackEvent("agency_form_start"),
  agencyFormSubmit: () => trackEvent("agency_form_submit"),
  agencyPhoneClick: () => trackEvent("agency_phone_click"),
  enquiryOutOfScope: (reason: string) =>
    trackEvent("enquiry_out_of_scope", { reason_code: reason }),
} as const;

export const AnalyticsEvents = {
  callClick: (placement: string) => trackEvent("call_click", { placement }),
  whatsAppClick: (placement: string) => trackEvent("whatsapp_click", { placement }),
  smsClick: (placement: string) => trackEvent("sms_click", { placement }),
  formSubmit: (form: string) => trackEvent("form_submit", { form }),
  solicitorInstruction: (placement: string) =>
    trackEvent("solicitor_instruction", { placement }),
  policeStationCoverRequest: (placement: string) =>
    trackEvent("police_station_cover_request", { placement }),
  blogCtaClick: (placement: string) => trackEvent("blog_cta_click", { placement }),
  contactPageSubmit: () => trackEvent("contact_page_submit", { form: "contact" }),
  outboundPartnerClick: (partner: string, placement: string) =>
    trackEvent("outbound_partner_click", { partner, placement }),
} as const;
