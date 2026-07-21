/**
 * Paths that rank for "police station contact / phone number" queries.
 * On these routes we must not expose the firm telephone as a crawlable contact fact.
 * Solicitor/rep intent URLs keep the number.
 */

export function isPoliceContactIntentPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const path = pathname.split("?")[0].split("#")[0].toLowerCase().replace(/\/+$/, "") || "/";

  // Explicit solicitor / rep intent — keep the number
  if (
    path.endsWith("-solicitor") ||
    path.includes("/police-station-rep-") ||
    path.includes("/police-station-agent-") ||
    path === "/contact" ||
    path.startsWith("/contact/") ||
    path === "/start/in-custody" ||
    path === "/start/voluntary-interview"
  ) {
    return false;
  }

  return (
    path === "/police-stations" ||
    path.startsWith("/police-stations/") ||
    path === "/kent-police-stations" ||
    path === "/locations" ||
    path.startsWith("/coverage/police-stations") ||
    path.endsWith("-police-station") ||
    path.endsWith("-psa-station") ||
    /\/[a-z0-9-]+-police-station$/.test(path) ||
    /\/[a-z0-9-]+-psa-station$/.test(path)
  );
}
