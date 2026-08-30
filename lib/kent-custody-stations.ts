/** Operational Kent custody suites linked from the resource hub */
export const KENT_OPERATIONAL_CUSTODY_STATIONS = [
  { name: "Medway", href: "/medway-police-station" },
  { name: "North Kent (Gravesend)", href: "/police-station-rep-gravesend" },
  { name: "Canterbury", href: "/canterbury-police-station" },
  { name: "Tonbridge", href: "/police-station-rep-tonbridge" },
  { name: "Folkestone", href: "/folkestone-police-station" },
  { name: "Margate", href: "/margate-police-station" },
] as const;

/**
 * Voluntary-interview / local-cover stations — not public custody suites.
 * Maidstone custody is closed (VAI only).
 */
export const KENT_VAI_STATIONS = [
  { name: "Maidstone (VAI only — custody closed)", href: "/maidstone-police-station" },
  { name: "Ashford", href: "/ashford-police-station" },
  { name: "Dover", href: "/dover-police-station" },
  { name: "Sevenoaks", href: "/sevenoaks-police-station" },
  { name: "Sittingbourne", href: "/sittingbourne-police-station" },
  { name: "Swanley (VAI / local cover — not a custody suite)", href: "/swanley-police-station" },
  { name: "Tunbridge Wells", href: "/tunbridge-wells-police-station" },
  {
    name: "Bluewater (local cover — not a custody suite; nearest North Kent / Dartford area)",
    href: "/bluewater-police-station",
  },
  {
    name: "Coldharbour (VAI / local cover — not a custody suite)",
    href: "/coldharbour-police-station",
  },
] as const;

/** @deprecated Prefer KENT_OPERATIONAL_CUSTODY_STATIONS — excludes VAI-only stations */
export const KENT_CUSTODY_STATIONS = KENT_OPERATIONAL_CUSTODY_STATIONS;

export const AUTHORITY_RESOURCE_LINKS = [
  { title: "PACE Code C — rights in custody", href: "/pace-code-c" },
  { title: "Custody time limits (24/36/96 hours)", href: "/custody-time-limits" },
  { title: "Released under investigation (RUI)", href: "/released-under-investigation" },
  { title: "No comment interviews", href: "/no-comment-interview" },
  { title: "Police bail explained", href: "/police-bail-explained" },
  { title: "If a loved one is arrested", href: "/what-to-do-if-a-loved-one-is-arrested" },
  { title: "Immediate custody — who can call (FAQ)", href: "/faq#immediate-custody-only" },
  { title: "Voluntary interview rights", href: "/voluntary-police-interview" },
] as const;
