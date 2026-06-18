/**
 * Phase 2 local SEO — 301 legacy scraped town URLs to canonical rep pages.
 * Keeps link equity on one URL scheme (/police-station-rep-{town}).
 */
const REP = (town) => `/police-station-rep-${town}`;

/** @type {{ source: string; destination: string; permanent: true }[]} */
const LEGACY_LOCAL_REDIRECTS = [
  // Legacy {town}-police-station scraped pages
  { source: "/ashford-police-station", destination: REP("ashford"), permanent: true },
  { source: "/bluewater-police-station", destination: REP("bluewater"), permanent: true },
  { source: "/canterbury-police-station", destination: REP("canterbury"), permanent: true },
  { source: "/coldharbour-police-station", destination: REP("maidstone"), permanent: true },
  { source: "/dover-police-station", destination: REP("dover"), permanent: true },
  { source: "/folkestone-police-station", destination: REP("folkestone"), permanent: true },
  { source: "/gravesend-police-station", destination: REP("gravesend"), permanent: true },
  { source: "/maidstone-police-station", destination: REP("maidstone"), permanent: true },
  { source: "/margate-police-station", destination: REP("margate"), permanent: true },
  { source: "/medway-police-station", destination: REP("medway"), permanent: true },
  { source: "/sevenoaks-police-station", destination: REP("sevenoaks"), permanent: true },
  { source: "/sittingbourne-police-station", destination: REP("sittingbourne"), permanent: true },
  { source: "/swanley-police-station", destination: REP("swanley"), permanent: true },
  { source: "/tunbridge-wells-police-station", destination: REP("tunbridge-wells"), permanent: true },
  { source: "/dartford-police-station", destination: REP("dartford"), permanent: true },

  // Legacy police-station-agent-{town} alias scheme
  { source: "/police-station-agent-kent", destination: "/kent-police-station-reps", permanent: true },
  { source: "/police-station-agent-medway", destination: REP("medway"), permanent: true },
  { source: "/police-station-agent-canterbury", destination: REP("canterbury"), permanent: true },
  { source: "/police-station-agent-maidstone", destination: REP("maidstone"), permanent: true },
  { source: "/police-station-agent-folkestone", destination: REP("folkestone"), permanent: true },
  { source: "/police-station-agent-tonbridge", destination: REP("tonbridge"), permanent: true },
  { source: "/police-station-agent-ashford", destination: REP("ashford"), permanent: true },
  { source: "/police-station-agent-sevenoaks", destination: REP("sevenoaks"), permanent: true },
  { source: "/police-station-agent-sittingbourne", destination: REP("sittingbourne"), permanent: true },
  { source: "/police-station-agent-dartford", destination: REP("dartford"), permanent: true },
  { source: "/police-station-agent-dover", destination: REP("dover"), permanent: true },
  { source: "/police-station-agent-margate", destination: REP("margate"), permanent: true },
  { source: "/police-station-agent-swanley", destination: REP("swanley"), permanent: true },
  { source: "/police-station-agent-tunbridge-wells", destination: REP("tunbridge-wells"), permanent: true },
  { source: "/police-station-agent-bluewater", destination: REP("bluewater"), permanent: true },

  // Legacy {town}-solicitor scraped pages
  { source: "/ashford-solicitor", destination: REP("ashford"), permanent: true },
  { source: "/canterbury-solicitor", destination: REP("canterbury"), permanent: true },
  { source: "/maidstone-solicitor", destination: REP("maidstone"), permanent: true },
  { source: "/folkestone-solicitor", destination: REP("folkestone"), permanent: true },
  { source: "/margate-solicitor", destination: REP("margate"), permanent: true },
  { source: "/sevenoaks-solicitor", destination: REP("sevenoaks"), permanent: true },
  { source: "/dartford-solicitor", destination: REP("dartford"), permanent: true },
];

module.exports = { LEGACY_LOCAL_REDIRECTS };
