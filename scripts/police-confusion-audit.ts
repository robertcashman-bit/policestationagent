#!/usr/bin/env npx tsx
/**
 * Police Confusion Score auditor.
 * Usage: npm run seo:police-confusion
 */
import { runPoliceConfusionHealthCheck } from "../lib/seo/police-confusion-health";
import { CONFUSION_THRESHOLD } from "../lib/seo/police-confusion-score";

async function main() {
  const report = await runPoliceConfusionHealthCheck();
  const { summary, pages } = report;
  console.log(
    `Police confusion audit: ${summary.pagesTested} pages, avg ${summary.averageScore}, high-risk ${summary.highRiskCount}, trend ${summary.trendSincePrevious}`,
  );
  for (const note of (summary.externalChecks as { notes?: string[] })?.notes || []) {
    console.log(`  ext: ${note}`);
  }
  for (const p of pages.filter((x) => x.score >= CONFUSION_THRESHOLD)) {
    console.log(`  HIGH ${p.score}: ${p.path} — ${p.flags.join(", ")}`);
  }
  if (summary.schemaErrors > 0) {
    console.error("CRITICAL: firm telephone still bound to station-address LocalBusiness schema");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
