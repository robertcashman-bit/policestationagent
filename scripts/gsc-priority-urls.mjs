#!/usr/bin/env node
/**
 * Output GSC priority URLs for monthly review + optional IndexNow resubmit.
 * Usage:
 *   node scripts/gsc-priority-urls.mjs           # print list
 *   node scripts/gsc-priority-urls.mjs --ping    # IndexNow submit these URLs
 */
import { execSync } from "child_process";
import { REP_INDEXNOW_PATHS } from "./rep-town-paths.cjs";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.policestationagent.com").replace(/\/$/, "");

const GSC_PRIORITY = [
  "/",
  "/contact",
  "/police-stations",
  "/locations",
  "/kent-police-stations",
  "/kent-police-station-reps",
  // Canonical station landings (legacy *-police-station 308 here)
  "/police-station-rep-medway",
  "/police-station-rep-maidstone",
  "/police-station-rep-tonbridge",
  "/police-station-rep-gravesend",
  "/police-station-rep-canterbury",
  "/medway-police-station",
  "/maidstone-police-station",
  "/tonbridge-police-station",
  "/gravesend-police-station",
  "/north-kent-gravesend-police-station",
  "/canterbury-police-station",
  "/free-police-station-advice-kent",
  "/for-solicitors",
  "/start/solicitors-agent-cover",
  "/dscc-and-custody-record-support",
  "/services/police-station-representation",
  "/voluntary-police-interview",
  "/no-comment-interview",
  "/released-under-investigation",
  "/blog/is-police-station-legal-advice-free-kent",
  "/blog/police-station-rep-near-me-kent",
  "/blog/dartford-voluntary-interview-legal-advice-kent",
  "/blog/swanley-police-station-interview-advice-kent",
  ...REP_INDEXNOW_PATHS,
];

const unique = [...new Set(GSC_PRIORITY)];

if (process.argv.includes("--ping")) {
  execSync("node scripts/notify-search-engines.js", { stdio: "inherit" });
} else {
  console.log("# GSC priority URLs — request indexing after publish\n");
  for (const p of unique) console.log(`${SITE}${p}`);
  console.log(`\n${unique.length} URLs. Run with --ping to resubmit via IndexNow.`);
}
