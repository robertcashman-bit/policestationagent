import { SITE_DOMAIN, SITE_URL } from "@/config/site";

export function isAllowedEnquiryOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) return true;
    try {
      const host = new URL(referer).hostname;
      return (
        host === SITE_DOMAIN ||
        host === "policestationagent.com" ||
        host === "localhost" ||
        host.endsWith(".vercel.app")
      );
    } catch {
      return false;
    }
  }
  try {
    const host = new URL(origin).hostname;
    if (host === "localhost" || host === "127.0.0.1") return true;
    if (host.endsWith(".vercel.app")) return true;
    return host === SITE_DOMAIN || host === "policestationagent.com";
  } catch {
    return false;
  }
}

export function enquirySiteBase(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || SITE_URL;
}
