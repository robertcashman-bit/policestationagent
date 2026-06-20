#!/usr/bin/env node
/**
 * Site-wide legal content audit: blogs, PACE citations, case law, Sources.
 * Run: node scripts/audit-legal-content.mjs [--warn-only]
 */
import fs from "fs";
import path from "path";
import { getAllBlogPosts, getStaticPageSurfaces } from "./lib/legal-content-scanner.mjs";
import { auditBlogBaseline } from "./lib/legal-baseline-audit.mjs";
import {
  auditPaceCitations,
  auditGlobalForbiddenClaims,
} from "./lib/pace-citation-audit.mjs";
import { auditCaseCitations } from "./lib/legal-citation-audit.mjs";
import { auditUnfitnessPost, SLUG as UNFITNESS_SLUG } from "./lib/legal-rule-packs/unfitness.mjs";

const OUT_JSON = path.join(process.cwd(), "scripts", "legal-audit-report.json");
const OUT_CSV = path.join(process.cwd(), "scripts", "legal-audit-report.csv");
const warnOnly = process.argv.includes("--warn-only");

function auditItem(item) {
  const content = item.contentHtml || "";
  const label = item.slug || item.file;
  const issues = [];

  if (item.surface === "blog") {
    const baseline = auditBlogBaseline(item);
    issues.push(...baseline.issues);

    if (item.slug === UNFITNESS_SLUG) {
      issues.push(...auditUnfitnessPost(item));
    }
  }

  issues.push(...auditPaceCitations(content, label));
  issues.push(...auditGlobalForbiddenClaims(content, label));
  issues.push(...auditCaseCitations(content, label));

  return issues;
}

function main() {
  const items = [...getAllBlogPosts(), ...getStaticPageSurfaces()];
  const results = [];
  let errorCount = 0;
  let warnCount = 0;

  for (const item of items) {
    const issues = auditItem(item);
    const errors = issues.filter((i) => i.severity === "error");
    const warns = issues.filter((i) => i.severity === "warn");
    errorCount += errors.length;
    warnCount += warns.length;
    if (issues.length) {
      results.push({
        slug: item.slug,
        surface: item.surface,
        file: item.file,
        title: item.title,
        issues,
      });
    }
  }

  const summary = {
    scanned: items.length,
    itemsWithIssues: results.length,
    errors: errorCount,
    warnings: warnCount,
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify({ summary, results }, null, 2));

  const rows = ["slug,surface,file,severity,message"];
  for (const r of results) {
    for (const issue of r.issues) {
      rows.push(
        `"${r.slug}","${r.surface}","${r.file || ""}","${issue.severity}","${issue.message.replace(/"/g, '""')}"`,
      );
    }
  }
  fs.writeFileSync(OUT_CSV, rows.join("\n"));

  console.log("Legal content audit summary:");
  console.log(JSON.stringify(summary, null, 2));

  if (results.length) {
    console.log("\nIssues:");
    for (const r of results.slice(0, 40)) {
      for (const issue of r.issues) {
        console.log(`  [${issue.severity}] ${r.slug}: ${issue.message}`);
      }
    }
    if (results.length > 40) console.log(`  ... and ${results.length - 40} more items`);
  }

  if (errorCount > 0 && !warnOnly) {
    console.error(`\nFAIL: ${errorCount} error(s)`);
    process.exit(1);
  }
  console.log("\nLegal content audit OK");
}

main();
