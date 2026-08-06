/** Canonical pathway routes for the three enquiry audiences */

export const PATH_VOLUNTARY = "/start/voluntary-interview";
export const PATH_VOLUNTARY_LANDING = "/voluntary-interviews";
export const PATH_CUSTODY = "/current-custody";
export const PATH_AGENCY = "/for-solicitors";
export const PATH_CONTACT = "/contact";

/** Routes where firm telephone may appear without custody qualification */
export const PHONE_ALLOWLIST_PATHS = [
  "/for-solicitors",
  "/forsolicitors",
  "/repcover",
  "/start/solicitors-agent-cover",
  "/servicerates",
  "/attendanceterms",
] as const;

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
    href: `${PATH_VOLUNTARY}#request`,
    title: "Voluntary interview booked",
    description:
      "I have received a police letter, email or call inviting me to an interview under caution.",
    button: "Request representation",
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
