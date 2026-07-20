#!/usr/bin/env node
/**
 * DISABLED — Do not re-inject tel:101 beside solicitor CTAs on station pages.
 *
 * Placing Kent Police 101 immediately above the solicitor 01732 number caused
 * search engines and callers to confuse PoliceStationAgent.com with the police.
 *
 * Use PoliceAssistanceBlock / disambiguateStationHtml instead.
 */
console.error(
  "scripts/add-police-101-number.js is disabled. It reintroduced police/solicitor phone confusion.",
);
console.error(
  "Use components/compliance/PoliceAssistanceBlock.tsx and lib/seo/disambiguate-station-html.ts.",
);
process.exit(1);
