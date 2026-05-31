import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";
import { SITE_URL } from "@/config/site";

export const AUTHORITY_NAP = {
  name: "Robert Cashman – Police Station Duty Solicitor (Kent)",
  brand: "Police Station Agent",
  phone: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  email: "robertcashman@defencelegalservices.co.uk",
  url: SITE_URL,
  area: "Kent",
} as const;

export const REPUK_PROFILE_URL = "https://policestationrepuk.org/rep/robert-cashman";

export const RESOURCE_HUB_PATH = "/kent-police-custody-resources";
export const RESOURCE_HUB_URL = `${SITE_URL}${RESOURCE_HUB_PATH}`;

export const REGULATORY_LINKS = {
  sraFindASolicitor: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795",
  tuckers: "https://www.tuckers.co.uk/",
  clsa: "https://www.clsa.co.uk/",
} as const;

/** Schema sameAs — add GBP URL when available */
export const SAME_AS_URLS = [
  "https://www.facebook.com/policestationagent",
  "https://www.linkedin.com/company/police-station-agent",
  "https://twitter.com/policestation",
  REPUK_PROFILE_URL,
  REGULATORY_LINKS.sraFindASolicitor,
  REGULATORY_LINKS.clsa,
] as const;

export const SUGGESTED_LINK_ANCHORS = [
  "Kent police custody rights guide",
  "PACE Code C explained (Kent)",
  "Police station representation in Kent",
  "What to do if someone is arrested in Kent",
] as const;

export function directoryUtmUrl(source: string): string {
  return `${SITE_URL}?utm_source=${encodeURIComponent(source)}`;
}

export const EMBED_BADGE_HTML = `<a href="${SITE_URL}/for-solicitors" title="Kent police station agent cover" rel="noopener noreferrer" style="display:inline-block;padding:10px 14px;border:2px solid #1e40af;border-radius:8px;font-family:system-ui,sans-serif;font-size:14px;font-weight:600;color:#1e3a8a;text-decoration:none;background:#eff6ff;">Kent police station cover — Police Station Agent</a>`;
