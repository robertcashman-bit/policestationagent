/**
 * Header navigation — curated from footer link lists + enquiry pathways.
 * Keep Custody Note / Store / Mac / PSR Train / RepUK out of header chrome.
 */
import {
  PATH_AGENCY,
  PATH_CONTACT,
  PATH_CUSTODY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";
import {
  FOOTER_ADVICE_PAGES,
  FOOTER_RIGHTS_GUIDES,
  FOOTER_SERVICES,
  FOOTER_STATION_HUBS,
  type FooterLink,
} from "@/config/footer-links";

export type NavLink = {
  href: string;
  label: string;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavLink[];
};

function byHref(links: readonly FooterLink[], href: string): FooterLink {
  const found = links.find((l) => l.href === href);
  if (!found) {
    throw new Error(`nav.ts: missing footer link for ${href}`);
  }
  return found;
}

function relabel(link: FooterLink, label: string): NavLink {
  return { href: link.href, label };
}

/** Public + solicitor pathways — conversion-first. */
export const NAV_GET_HELP: NavLink[] = [
  { href: PATH_VOLUNTARY_LANDING, label: "Voluntary interviews" },
  { href: PATH_CUSTODY, label: "Current custody" },
  { href: PATH_AGENCY, label: "For solicitors" },
  { href: "/canwehelp", label: "Can we help?" },
  { href: PATH_CONTACT, label: "Contact" },
];

/** Short Kent hub labels — hrefs from FOOTER_STATION_HUBS. */
export const NAV_KENT_STATIONS: NavLink[] = [
  relabel(byHref(FOOTER_STATION_HUBS, "/police-station-rep-gravesend"), "Gravesend"),
  relabel(byHref(FOOTER_STATION_HUBS, "/police-station-rep-tonbridge"), "Tonbridge"),
  relabel(byHref(FOOTER_STATION_HUBS, "/police-station-rep-medway"), "Medway"),
  relabel(byHref(FOOTER_STATION_HUBS, "/police-station-rep-maidstone"), "Maidstone"),
  relabel(byHref(FOOTER_STATION_HUBS, "/police-station-rep-canterbury"), "Canterbury"),
  relabel(byHref(FOOTER_STATION_HUBS, "/coverage"), "All Kent coverage"),
];

/** Curated rights guides — not every footer entry. */
export const NAV_YOUR_RIGHTS: NavLink[] = [
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/police-custody-rights"), "Custody rights"),
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/police-interview-rights"), "Interview rights"),
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/pace-code-c"), "PACE Code C"),
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/no-comment-interview"), "No comment interviews"),
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/police-bail-explained"), "Police bail"),
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/custody-time-limits"), "Custody time limits"),
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/released-under-investigation"), "Released under investigation"),
  relabel(byHref(FOOTER_RIGHTS_GUIDES, "/faq"), "FAQ"),
];

/** Curated advice pages. */
export const NAV_ADVICE: NavLink[] = [
  relabel(
    byHref(FOOTER_ADVICE_PAGES, "/what-to-do-if-a-loved-one-is-arrested"),
    "Loved one arrested"
  ),
  relabel(
    byHref(FOOTER_ADVICE_PAGES, "/voluntary-police-interview-risks"),
    "Voluntary interview risks"
  ),
  relabel(
    byHref(FOOTER_ADVICE_PAGES, "/preparing-for-police-interview"),
    "Preparing for interview"
  ),
  relabel(byHref(FOOTER_ADVICE_PAGES, "/can-police-take-my-phone"), "Can police take my phone?"),
  relabel(
    byHref(FOOTER_ADVICE_PAGES, "/free-police-station-advice-kent"),
    "Free advice in Kent"
  ),
  relabel(
    byHref(FOOTER_ADVICE_PAGES, "/what-to-expect-at-a-police-interview-in-kent"),
    "What to expect at interview"
  ),
  relabel(byHref(FOOTER_ADVICE_PAGES, "/appropriate-adult"), "Appropriate adults"),
];

/** Firm / practice information. */
export const NAV_ABOUT: NavLink[] = [
  { href: "/about", label: "About" },
  relabel(byHref(FOOTER_SERVICES, "/services"), "Services"),
  relabel(byHref(FOOTER_SERVICES, "/fees"), "Legal aid & fees"),
  { href: "/blog", label: "Blog" },
];

export const NAV_GROUPS: NavGroup[] = [
  { id: "get-help", label: "Get help", items: NAV_GET_HELP },
  { id: "kent-stations", label: "Kent stations", items: NAV_KENT_STATIONS },
  { id: "your-rights", label: "Your rights", items: NAV_YOUR_RIGHTS },
  { id: "advice", label: "Advice", items: NAV_ADVICE },
  { id: "about", label: "About", items: NAV_ABOUT },
];

/** Gold CTA — not inside a dropdown. */
export const NAV_PRIMARY_CTA = {
  href: PATH_CONTACT,
  label: "Get a solicitor",
} as const;
