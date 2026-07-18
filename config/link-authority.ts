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

/** Owned sibling sites — safe for footer cross-links */
export const OWNED_NETWORK_SITES = [
  { url: "https://custodynote.com", label: "Custody Note — digital custody records" },
  { url: "https://psrtrain.com", label: "PSR Train — police station rep training" },
] as const;

/** RepUK paths that must not appear in client-facing footers (competing Kent listings) */
export const REPUK_KENT_LISTING_BLOCKLIST = ["/directory/kent"] as const;

export const RESOURCE_HUB_PATH = "/kent-police-custody-resources";
export const RESOURCE_HUB_URL = `${SITE_URL}${RESOURCE_HUB_PATH}`;

export const REGULATORY_LINKS = {
  sraFindASolicitor: "https://www.sra.org.uk/consumers/register/",
  tuckers: "https://www.tuckers.co.uk/",
  clsa: "https://www.clsa.co.uk/",
} as const;

/** Schema sameAs — add GBP URL when GOOGLE_BUSINESS_PROFILE_URL is set in Vercel */
const GBP_PROFILE_URL = process.env.GOOGLE_BUSINESS_PROFILE_URL?.trim();

export const SAME_AS_URLS = [
  "https://www.facebook.com/policestationagent",
  "https://www.linkedin.com/company/police-station-agent",
  "https://twitter.com/policestation",
  REPUK_PROFILE_URL,
  REGULATORY_LINKS.sraFindASolicitor,
  REGULATORY_LINKS.clsa,
  ...(GBP_PROFILE_URL ? [GBP_PROFILE_URL] : []),
] as const;

/** Directory and citation targets — use consistent NAP (AUTHORITY_NAP) */
export const DIRECTORY_CITATIONS = [
  {
    name: "RepUK professional profile",
    url: REPUK_PROFILE_URL,
    anchor: "Robert Cashman — police station rep (Kent)",
  },
  {
    name: "SRA Find a Solicitor (Tuckers LLP)",
    url: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795",
    anchor: "Tuckers Solicitors LLP — SRA 127795",
  },
  {
    name: "Kent police custody resources hub",
    url: RESOURCE_HUB_URL,
    anchor: "Kent police custody rights guide",
  },
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

export const EMBED_BADGE_HTML = `<a href="${SITE_URL}/for-solicitors" title="Police station agent cover within 45 minutes of Maidstone" rel="noopener noreferrer" style="display:inline-block;padding:10px 14px;border:2px solid #1e40af;border-radius:8px;font-family:system-ui,sans-serif;font-size:14px;font-weight:600;color:#1e3a8a;text-decoration:none;background:#eff6ff;">Police station agent cover (45 mins of Maidstone) — Police Station Agent</a>`;
