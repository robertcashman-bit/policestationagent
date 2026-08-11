/**
 * First-party enquiry attribution — privacy-conscious, no PII.
 * Client stores touch data in sessionStorage; server sanitises before emailing the owner.
 */

export type EnquiryAttribution = {
  submittedAt?: string;
  currentPage?: string;
  landingPage?: string;
  documentReferrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  msclkid?: string;
  sessionId?: string;
  firstPage?: string;
  previousInternalPage?: string;
  deviceCategory?: string;
};

export const ATTRIBUTION_STORAGE_KEY = "psa_enquiry_attr_v1";

const MAX_URL_LEN = 500;
const MAX_ID_LEN = 80;
const MAX_LABEL_LEN = 64;

function clip(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

function isSafePathOrUrl(value: string): boolean {
  if (value.startsWith("/")) return !value.includes("://");
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Strip anything unexpected before persisting or emailing. */
export function sanitizeEnquiryAttribution(raw: unknown): EnquiryAttribution | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const out: EnquiryAttribution = {};

  const submittedAt = clip(o.submittedAt, 40);
  if (submittedAt && !Number.isNaN(Date.parse(submittedAt))) {
    out.submittedAt = new Date(submittedAt).toISOString();
  }

  for (const key of [
    "currentPage",
    "landingPage",
    "documentReferrer",
    "firstPage",
    "previousInternalPage",
  ] as const) {
    const v = clip(o[key], MAX_URL_LEN);
    if (v && isSafePathOrUrl(v)) out[key] = v;
  }

  for (const key of [
    "source",
    "medium",
    "campaign",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "deviceCategory",
  ] as const) {
    const v = clip(o[key], MAX_LABEL_LEN);
    if (v && /^[\w ./-]+$/i.test(v)) out[key] = v;
  }

  for (const key of ["gclid", "msclkid", "sessionId"] as const) {
    const v = clip(o[key], MAX_ID_LEN);
    if (v && /^[\w.-]+$/i.test(v)) out[key] = v;
  }

  return Object.keys(out).length ? out : null;
}

export function formatAttributionForEmail(attr: EnquiryAttribution): string {
  const lines = ["--- Attribution (first-party, non-PII) ---"];
  const order: (keyof EnquiryAttribution)[] = [
    "submittedAt",
    "currentPage",
    "landingPage",
    "firstPage",
    "previousInternalPage",
    "documentReferrer",
    "source",
    "medium",
    "campaign",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "gclid",
    "msclkid",
    "sessionId",
    "deviceCategory",
  ];
  for (const key of order) {
    const value = attr[key];
    if (value) lines.push(`${key}: ${value}`);
  }
  return lines.join("\n");
}

export function deviceCategoryFromUserAgent(ua: string | null | undefined): string {
  if (!ua) return "unknown";
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobi|iphone|ipod|android.+mobile/i.test(ua)) return "mobile";
  return "desktop";
}
