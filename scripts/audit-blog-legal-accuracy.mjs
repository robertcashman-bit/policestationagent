#!/usr/bin/env node
/**
 * Legal accuracy checks for educational blog posts (PACE / interview fitness).
 * Run: node scripts/audit-blog-legal-accuracy.mjs [slug]
 */
import fs from "fs";
import path from "path";
import {
  sourcesAtBottom,
  sourcesExternalLinkQuality,
} from "./lib/blog-sources-audit.mjs";
import { auditUnfitnessPost, SLUG as UNFITNESS_SLUG } from "./lib/legal-rule-packs/unfitness.mjs";
import {
  auditPaceCitations,
  auditGlobalForbiddenClaims,
} from "./lib/pace-citation-audit.mjs";
import { auditCaseCitations } from "./lib/legal-citation-audit.mjs";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");

/** Posts that must pass topic-specific rule packs. */
export const LEGAL_ACCURACY_SLUGS = [UNFITNESS_SLUG];

function loadPost(slug) {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    if (post.slug === slug) return { post, file };
  }
  return null;
}

export function auditLegalAccuracy(post) {
  const html = post.contentHtml || "";
  const issues = [];

  if (post.slug === UNFITNESS_SLUG) {
    for (const issue of auditUnfitnessPost(post)) {
      issues.push(issue.message);
    }
  }

  for (const issue of auditPaceCitations(html, post.slug)) {
    if (issue.severity === "error") issues.push(issue.message);
  }
  for (const issue of auditGlobalForbiddenClaims(html, post.slug)) {
    if (issue.severity === "error") issues.push(issue.message);
  }
  for (const issue of auditCaseCitations(html, post.slug)) {
    if (issue.severity === "error") issues.push(issue.message);
  }

  if (!/not kent police/i.test(html)) {
    issues.push("missing NOT Kent Police disclaimer");
  }

  if (!/<h2[^>]*>sources<\/h2>/i.test(html)) {
    issues.push("missing Sources section");
  }

  if (!sourcesAtBottom(html)) {
    issues.push("Sources section must be at bottom (after Conclusion/CTA)");
  }

  const linkCheck = sourcesExternalLinkQuality(html);
  if (/<h2[^>]*>sources<\/h2>/i.test(html) && !linkCheck.ok) {
    issues.push(...linkCheck.issues);
  }

  return { ok: issues.length === 0, issues, slug: post.slug, title: post.title };
}

function main() {
  const targetSlug = process.argv[2];
  const slugs = targetSlug ? [targetSlug] : LEGAL_ACCURACY_SLUGS;
  let failed = 0;

  for (const slug of slugs) {
    const loaded = loadPost(slug);
    if (!loaded) {
      console.error(`FAIL ${slug}: post file not found`);
      failed++;
      continue;
    }
    const result = auditLegalAccuracy(loaded.post);
    if (result.ok) {
      console.log(`PASS ${slug}`);
    } else {
      failed++;
      console.error(`FAIL ${slug}:`);
      for (const issue of result.issues) console.error(`  - ${issue}`);
    }
  }

  if (failed > 0) process.exit(1);
  console.log("Legal accuracy audit OK");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
