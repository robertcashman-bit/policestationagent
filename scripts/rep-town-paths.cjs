/** Shared rep URL paths for CommonJS scripts (keep in sync with lib/seo/rep-town-paths.ts) */
const REP_TOWN_SLUGS = [
  "medway",
  "maidstone",
  "canterbury",
  "ashford",
  "folkestone",
  "dover",
  "gravesend",
  "tonbridge",
  "tunbridge-wells",
  "sevenoaks",
  "sittingbourne",
  "swanley",
  "margate",
  "dartford",
  "bluewater",
];

const REP_TOWN_PATHS = REP_TOWN_SLUGS.map((slug) => `/police-station-rep-${slug}`);

const REP_INDEXNOW_PATHS = [
  "/kent-police-station-reps",
  "/locations",
  "/blog/police-station-rep-near-me-kent",
  ...REP_TOWN_PATHS,
];

module.exports = { REP_TOWN_SLUGS, REP_TOWN_PATHS, REP_INDEXNOW_PATHS };
