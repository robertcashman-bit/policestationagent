#!/usr/bin/env node
/**
 * Automated search indexing setup checks + IndexNow ping.
 * Manual steps (GSC, Bing, GBP, SRA) are printed with direct links.
 *
 * Usage: node scripts/setup-search-indexing.mjs
 */
import { execSync } from "child_process";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.policestationagent.com").replace(/\/$/, "");

const SITEMAPS = [`${SITE}/sitemap.xml`, `${SITE}/blog-sitemap.xml`];

async function checkUrl(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    return { url, ok: res.ok, status: res.status };
  } catch (err) {
    return { url, ok: false, status: 0, error: err.message };
  }
}

async function main() {
  console.log("=== Search indexing setup — automated checks ===\n");
  console.log(`Site: ${SITE}\n`);

  console.log("Sitemap checks:");
  let allOk = true;
  for (const url of SITEMAPS) {
    const r = await checkUrl(url);
    console.log(`  ${r.ok ? "OK" : "FAIL"} ${r.status} ${url}`);
    if (!r.ok) allOk = false;
  }

  const robots = await checkUrl(`${SITE}/robots.txt`);
  console.log(`  ${robots.ok ? "OK" : "FAIL"} ${robots.status} ${SITE}/robots.txt`);
  if (!robots.ok) allOk = false;

  console.log("\nRunning IndexNow + sitemap ping…");
  try {
    execSync("node scripts/notify-search-engines.js", { stdio: "inherit" });
  } catch {
    console.warn("IndexNow ping failed — check network or run npm run indexnow manually.");
  }

  console.log("\n=== Manual steps (one-time, ~30 min) ===\n");
  console.log("Google Search Console:");
  console.log("  1. https://search.google.com/search-console");
  console.log(`  2. Add property: ${SITE}`);
  console.log("  3. Verify via DNS or HTML tag (set GOOGLE_SITE_VERIFICATION in Vercel env)");
  console.log(`  4. Submit sitemaps: ${SITEMAPS.join(", ")}\n`);

  console.log("Bing Webmaster Tools:");
  console.log("  1. https://www.bing.com/webmasters");
  console.log(`  2. Add site and submit: ${SITE}/sitemap.xml\n`);

  console.log("Google Business Profile:");
  console.log("  1. https://business.google.com");
  console.log("  2. Claim profile — content in GBP_OPTIMIZATION_CONTENT.md");
  console.log(`  3. Set website: ${SITE}`);
  console.log("  4. Set GOOGLE_BUSINESS_PROFILE_URL in Vercel → updates schema sameAs\n");

  console.log("SRA / regulatory:");
  console.log("  1. Update SRA Find a Solicitor listing website → " + SITE);
  console.log("  2. Tuckers profile if applicable\n");

  const priority = [
    "/",
    "/contact",
    "/police-stations",
    "/locations",
    "/kent-police-stations",
    "/medway-police-station",
    "/maidstone-police-station",
    "/tonbridge-police-station",
    "/north-kent-gravesend-police-station",
    "/kent-police-station-reps",
    "/free-police-station-advice-kent",
    "/for-solicitors",
    "/police-station-rep-gravesend",
    "/police-station-rep-medway",
    "/blog/is-police-station-legal-advice-free-kent",
  ];
  console.log("\nGoogle Search Console — URL Inspection → Request indexing for:");
  for (const p of priority) console.log(`  ${SITE}${p}`);
  console.log(
    "\n  Tip: In GSC, paste each URL → URL Inspection → Request indexing (after this deploy goes live).",
  );

  process.exit(allOk ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
