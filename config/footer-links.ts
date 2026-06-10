import { REPUK_PROFILE_URL } from "@/config/link-authority";

export const FOOTER_BLOG_LIMIT = 30;

/** Kent rep directory paths — do not link (competing listings) */
export const REPUK_KENT_LISTING_BLOCKLIST = ["/directory/kent", "/directory/kent/"] as const;

export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export const FOOTER_RIGHTS_GUIDES: FooterLink[] = [
  { href: "/faq", label: "Frequently Asked Questions" },
  { href: "/police-custody-rights", label: "Police Custody Rights" },
  { href: "/police-interview-rights", label: "Police Interview Rights" },
  { href: "/your-rights-in-custody", label: "Your Rights in Custody" },
  { href: "/pace-code-c", label: "PACE Code C Rights" },
  { href: "/no-comment-interview", label: "No Comment Interviews" },
  { href: "/prepared-statements", label: "Prepared Statements" },
  { href: "/released-under-investigation", label: "Released Under Investigation" },
  { href: "/police-bail-explained", label: "Police Bail Explained" },
  { href: "/custody-time-limits", label: "Custody Time Limits" },
  { href: "/youth-custody-rights", label: "Youth Custody Rights" },
  { href: "/resources/pace-rights-guide", label: "Printable PACE Rights Guide" },
];

export const FOOTER_ADVICE_PAGES: FooterLink[] = [
  { href: "/what-to-do-if-a-loved-one-is-arrested", label: "Loved One Arrested — What to Do" },
  { href: "/start/in-custody", label: "Someone in Custody Now" },
  { href: "/voluntary-interviews", label: "Voluntary Police Interviews" },
  { href: "/voluntary-police-interview-risks", label: "Voluntary Interview Risks" },
  { href: "/article-loved-one-arrested-kent", label: "Loved One Arrested in Kent" },
  { href: "/article-interview-under-caution", label: "Interview Under Caution Guide" },
  { href: "/article-rights-kent-police-station-2025", label: "Kent Police Station Rights 2025" },
  { href: "/preparing-for-police-interview", label: "Preparing for Police Interview" },
  { href: "/what-to-expect-at-a-police-interview-in-kent", label: "What to Expect at Interview" },
  { href: "/vulnerable-adults-in-custody", label: "Vulnerable Adults in Custody" },
  { href: "/appropriate-adult", label: "Appropriate Adults" },
  { href: "/can-police-take-my-phone", label: "Can Police Take My Phone?" },
];

export const FOOTER_STATION_HUBS: FooterLink[] = [
  { href: "/police-stations", label: "All Kent Police Stations" },
  { href: "/coverage", label: "Service Coverage" },
  { href: "/kent-police-custody-resources", label: "Kent Custody Resources Hub" },
  { href: "/medway-police-station", label: "Medway Police Station" },
  { href: "/maidstone-police-station", label: "Maidstone Police Station" },
  { href: "/canterbury-police-station", label: "Canterbury Police Station" },
  { href: "/north-kent-gravesend-police-station", label: "Gravesend Police Station" },
  { href: "/tonbridge-police-station", label: "Tonbridge Police Station" },
  { href: "/folkestone-police-station", label: "Folkestone Police Station" },
];

export const FOOTER_SERVICES: FooterLink[] = [
  { href: "/services", label: "Police Station Rep Services" },
  { href: "/services/police-station-representation", label: "Police Station Representation" },
  { href: "/for-solicitors", label: "Agent Cover for Law Firms" },
  { href: "/emergency-police-station-representation", label: "Emergency Representation" },
  { href: "/fees", label: "Legal Aid & Fees" },
  { href: "/offences-we-deal-with", label: "Offences We Deal With" },
];

export const FOOTER_LEGAL: FooterLink[] = [
  { href: "/terms-and-conditions", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookies Policy" },
  { href: "/gdpr", label: "GDPR" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/complaints", label: "Complaints" },
  { href: "/regulatory-information", label: "Regulatory Information" },
];

export const FOOTER_NETWORK_LINKS: FooterLink[] = [
  {
    href: "https://policestationrepuk.org/?utm_source=psafooter",
    label: "Police Station Rep UK — professional network",
    external: true,
  },
  {
    href: `${REPUK_PROFILE_URL}?utm_source=psafooter`,
    label: "Robert Cashman — RepUK profile",
    external: true,
  },
  {
    href: "https://custodynote.com?utm_source=psafooter",
    label: "Custody Note — digital custody records",
    external: true,
  },
  {
    href: "https://psrtrain.com?utm_source=psafooter",
    label: "PSR Train — police station rep training",
    external: true,
  },
  { href: "/resources", label: "Free resources for solicitors & sites" },
  { href: "/link-to-us", label: "Link to Police Station Agent" },
  { href: "/press", label: "Press & media" },
];

export function isBlockedRepUkUrl(href: string): boolean {
  try {
    const url = new URL(href, "https://policestationrepuk.org");
    return REPUK_KENT_LISTING_BLOCKLIST.some(
      (blocked) => url.pathname === blocked || url.pathname.startsWith(blocked)
    );
  } catch {
    return false;
  }
}
