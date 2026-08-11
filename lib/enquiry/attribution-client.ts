"use client";

import {
  ATTRIBUTION_STORAGE_KEY,
  type EnquiryAttribution,
  deviceCategoryFromUserAgent,
  sanitizeEnquiryAttribution,
} from "@/lib/enquiry/attribution";

type StoredTouch = {
  sessionId: string;
  landingPage: string;
  firstPage: string;
  documentReferrer: string;
  previousInternalPage: string;
  lastInternalPage: string;
  source?: string;
  medium?: string;
  campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  msclkid?: string;
};

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function readStored(): StoredTouch | null {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredTouch;
  } catch {
    return null;
  }
}

function writeStored(data: StoredTouch): void {
  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* private mode / quota — ignore */
  }
}

function pathAndQuery(): string {
  return `${window.location.pathname}${window.location.search || ""}`;
}

function classifySource(params: URLSearchParams, referrer: string): {
  source?: string;
  medium?: string;
  campaign?: string;
} {
  const utmSource = params.get("utm_source") || undefined;
  const utmMedium = params.get("utm_medium") || undefined;
  const utmCampaign = params.get("utm_campaign") || undefined;
  if (utmSource || utmMedium || utmCampaign) {
    return {
      source: utmSource || "unknown",
      medium: utmMedium || "unknown",
      campaign: utmCampaign,
    };
  }
  if (params.get("gclid")) return { source: "google", medium: "cpc" };
  if (params.get("msclkid")) return { source: "bing", medium: "cpc" };
  if (!referrer) return { source: "direct", medium: "none" };
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes(window.location.hostname.replace(/^www\./, ""))) {
      return { source: "internal", medium: "referral" };
    }
    if (/google\./i.test(host)) return { source: "google", medium: "organic" };
    if (/bing\./i.test(host)) return { source: "bing", medium: "organic" };
    if (/yahoo\./i.test(host)) return { source: "yahoo", medium: "organic" };
    return { source: host.slice(0, 64), medium: "referral" };
  } catch {
    return { source: "referral", medium: "referral" };
  }
}

/** Call on route changes to keep landing/first/previous pages fresh for this tab. */
export function touchEnquiryAttribution(): void {
  if (typeof window === "undefined") return;
  const path = pathAndQuery();
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  const existing = readStored();

  if (!existing) {
    const classified = classifySource(params, referrer);
    writeStored({
      sessionId: randomId(),
      landingPage: path,
      firstPage: path,
      documentReferrer: referrer.slice(0, 500),
      previousInternalPage: "",
      lastInternalPage: path,
      ...classified,
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      gclid: params.get("gclid") || undefined,
      msclkid: params.get("msclkid") || undefined,
    });
    return;
  }

  if (existing.lastInternalPage && existing.lastInternalPage !== path) {
    existing.previousInternalPage = existing.lastInternalPage;
  }
  existing.lastInternalPage = path;
  // Capture click IDs / UTMs if they appear later in the session
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "gclid", "msclkid"] as const) {
    const v = params.get(key);
    if (v && !existing[key]) existing[key] = v;
  }
  writeStored(existing);
}

/** Snapshot for attaching to a contact/enquiry POST body. */
export function getEnquiryAttributionForSubmit(): EnquiryAttribution {
  if (typeof window === "undefined") return {};
  touchEnquiryAttribution();
  const stored = readStored();
  const currentPage = pathAndQuery();
  const raw: EnquiryAttribution = {
    submittedAt: new Date().toISOString(),
    currentPage,
    landingPage: stored?.landingPage || currentPage,
    firstPage: stored?.firstPage || currentPage,
    previousInternalPage: stored?.previousInternalPage || undefined,
    documentReferrer: stored?.documentReferrer || document.referrer || undefined,
    source: stored?.source,
    medium: stored?.medium,
    campaign: stored?.campaign,
    utm_source: stored?.utm_source,
    utm_medium: stored?.utm_medium,
    utm_campaign: stored?.utm_campaign,
    gclid: stored?.gclid,
    msclkid: stored?.msclkid,
    sessionId: stored?.sessionId,
    deviceCategory: deviceCategoryFromUserAgent(navigator.userAgent),
  };
  return sanitizeEnquiryAttribution(raw) || raw;
}
