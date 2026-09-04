/** Canonical pathway routes for the three enquiry audiences */

export const PATH_VOLUNTARY = "/start/voluntary-interview";
export const PATH_VOLUNTARY_LANDING = "/voluntary-interviews";
export const PATH_CUSTODY = "/current-custody";
export const PATH_AGENCY = "/for-solicitors";
export const PATH_CONTACT = "/contact";

/** Routes where firm telephone may appear without custody qualification.
 * Empty: never publish firm digits in indexable HTML — Contact pathways only.
 */
export const PHONE_ALLOWLIST_PATHS = [] as const;

export function isPhoneAllowlistPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  return (PHONE_ALLOWLIST_PATHS as readonly string[]).some(
    (allowed) => path === allowed || path.startsWith(`${allowed}/`),
  );
}

export const PATHWAY_CARDS = [
  {
    id: "voluntary" as const,
    href: `${PATH_VOLUNTARY_LANDING}#request`,
    title: "Voluntary interview / letter",
    description:
      "I have a police letter, email or call inviting me to an interview under caution in Kent.",
    button: "Request a free solicitor",
    event: "pathway_voluntary_selected",
    accent: "blue" as const,
  },
  {
    id: "custody" as const,
    href: PATH_CUSTODY,
    title: "Someone is in custody now",
    description:
      "A person is currently detained inside a Kent police station and requires legal representation.",
    button: "Check whether we can help",
    event: "pathway_custody_selected",
    accent: "red" as const,
  },
  {
    id: "agency" as const,
    href: PATH_AGENCY,
    title: "Solicitor needing agent cover",
    description:
      "I am instructing on behalf of a criminal defence firm and require police station attendance.",
    button: "Request agency cover",
    event: "pathway_agency_selected",
    accent: "amber" as const,
  },
] as const;

/** Contact-page situation options — includes deflection for wrong traffic */
export const SITUATION_OPTIONS = [
  {
    id: "voluntary" as const,
    title: "Voluntary interview / letter",
    description: "Police letter, email or call about an interview under caution.",
  },
  {
    id: "custody" as const,
    title: "Someone in custody now",
    description: "A person is currently detained at a Kent police station.",
  },
  {
    id: "agency" as const,
    title: "Solicitor agency cover",
    description: "Defence firm needing police station agent attendance.",
  },
  {
    id: "other" as const,
    title: "Something else",
    description: "Crime report, station opening times, lost property, police complaints, or 101.",
  },
] as const;

export type SituationId = (typeof SITUATION_OPTIONS)[number]["id"];
