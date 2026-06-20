#!/usr/bin/env node
/**
 * Audit static guide pages with LegalReferences and high-risk PACE pages.
 */
import fs from "fs";
import path from "path";
import { getStaticPageSurfaces } from "./lib/legal-content-scanner.mjs";
import { auditStaticPageBaseline } from "./lib/legal-baseline-audit.mjs";
import {
  auditPaceCitations,
  auditGlobalForbiddenClaims,
} from "./lib/pace-citation-audit.mjs";

const HIGH_RISK_ROUTES = [
  "/pace-code-c",
  "/police-custody-rights",
  "/police-interview-rights",
  "/appropriate-adult",
  "/vulnerable-adults-in-custody",
  "/custody-time-limits",
  "/adverse-inference",
  "/police-bail-explained",
];

function main() {
  const pages = getStaticPageSurfaces().filter(
    (p) =>
      /LegalReferences/.test(p.contentHtml) ||
      HIGH_RISK_ROUTES.includes(p.slug) ||
      /PACE|Code C/.test(p.contentHtml),
  );

  let errors = 0;
  for (const page of pages) {
    const baseline = auditStaticPageBaseline(page);
    const pace = auditPaceCitations(page.contentHtml, page.file);
    const forbidden = auditGlobalForbiddenClaims(page.contentHtml, page.file);
    const all = [...baseline.issues, ...pace, ...forbidden];
    for (const issue of all) {
      if (issue.severity === "error") {
        errors++;
        console.error(`FAIL [${page.file}]: ${issue.message}`);
      } else {
        console.warn(`WARN [${page.file}]: ${issue.message}`);
      }
    }
  }

  if (errors > 0) {
    console.error(`\nStatic legal pages audit FAIL: ${errors} error(s)`);
    process.exit(1);
  }
  console.log(`Static legal pages audit OK (${pages.length} pages scanned)`);
}

main();
