import { SITE_DOMAIN, SITE_URL } from "@/config/site";

const TRUSTED_ENQUIRY_HOSTS = new Set([
  SITE_DOMAIN,
  "www.policestationagent.com",
  "policestationagent.com",
]);

function isLocalDevHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function isPreviewHost(hostname: string): boolean {
  return hostname.endsWith(".vercel.app");
}

function isTrustedEnquiryHost(hostname: string): boolean {
  if (process.env.NODE_ENV !== "production") {
    if (isLocalDevHost(hostname) || isPreviewHost(hostname)) return true;
  }
  return TRUSTED_ENQUIRY_HOSTS.has(hostname);
}

function hostFromHeaderValue(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

export function isAllowedEnquiryOrigin(request: Request): boolean {
  const originHost = hostFromHeaderValue(request.headers.get("origin"));
  const refererHost = hostFromHeaderValue(request.headers.get("referer"));

  if (process.env.NODE_ENV === "production") {
    const host = originHost ?? refererHost;
    if (!host) return false;
    return isTrustedEnquiryHost(host);
  }

  if (originHost) return isTrustedEnquiryHost(originHost);
  if (refererHost) return isTrustedEnquiryHost(refererHost);
  return true;
}

export function enquirySiteBase(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || SITE_URL;
}
