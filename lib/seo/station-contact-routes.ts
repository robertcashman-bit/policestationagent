/**
 * Paths that rank for "police station contact / phone number" queries.
 * On these routes we must not expose the firm telephone as a crawlable contact fact.
 * Explicit solicitor / instruct-start URLs keep the number.
 *
 * Note: legacy `*-police-station` URLs 308 to `/police-station-rep-*`, so those
 * rep landings are police-contact intent for phone publishing purposes.
 */

/** Blog slugs/titles that sit next to station/custody language in SERPs. */
export function isStationRiskBlogSlug(slug: string | null | undefined): boolean {
  if (!slug) return false;
  const s = slug.toLowerCase();
  return (
    s.includes("police-station") ||
    s.includes("custody") ||
    s.includes("voluntary-interview") ||
    s.includes("duty-solicitor") ||
    s.includes("arrest") ||
    s.includes("pace-code") ||
    s.includes("rui-") ||
    s.includes("police-bail") ||
    s.includes("appropriate-adult") ||
    s.includes("out-of-hours-solicitor") ||
    /(?:tonbridge|gravesend|medway|maidstone|canterbury|folkestone|sevenoaks|dartford|swanley|dover|ashford|sittingbourne|margate|bluewater|tunbridge)/.test(
      s,
    )
  );
}

export function isPoliceContactIntentPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split("?")[0].split("#")[0].toLowerCase().replace(/\/+$/, "") || "/";

  // Explicit solicitor / instruct intent — keep the number
  if (
    path.endsWith("-solicitor") ||
    path.includes("/police-station-agent-") ||
    path === "/contact" ||
    path.startsWith("/contact/") ||
    path === "/start/in-custody" ||
    path === "/start/voluntary-interview"
  ) {
    return false;
  }

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    if (isStationRiskBlogSlug(slug)) return true;
  }

  return (
    path === "/police-stations" ||
    path.startsWith("/police-stations/") ||
    path === "/kent-police-stations" ||
    path === "/kent-police-station-reps" ||
    path === "/locations" ||
    path.startsWith("/coverage/police-stations") ||
    path.endsWith("-police-station") ||
    path.endsWith("-psa-station") ||
    path.includes("/police-station-rep-") ||
    /\/police-station-rep-[a-z0-9-]+$/.test(path) ||
    /\/[a-z0-9-]+-police-station$/.test(path) ||
    /\/[a-z0-9-]+-psa-station$/.test(path)
  );
}
