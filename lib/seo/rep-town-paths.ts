/** Kent police station rep town URLs — single source for sitemap, IndexNow, and audits */
export const REP_TOWN_SLUGS = [
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
] as const;

export const REP_TOWN_PATHS = REP_TOWN_SLUGS.map((slug) => `/police-station-rep-${slug}`);

export const REP_HUB_PATH = "/kent-police-station-reps";

export const REP_INDEXNOW_PATHS = [
  REP_HUB_PATH,
  "/locations",
  "/blog/police-station-rep-near-me-kent",
  ...REP_TOWN_PATHS,
];
