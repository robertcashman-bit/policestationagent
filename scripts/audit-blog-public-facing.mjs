#!/usr/bin/env node
/**
 * Audit all blog posts for public-facing compliance.
 * Mirrors merge logic in lib/blog-reader.ts
 */
import fs from "fs";
import path from "path";
import {
  sourcesAtBottom,
  sourcesExternalLinkQuality,
} from "./lib/blog-sources-audit.mjs";
import { isLegalContent } from "./lib/legal-content-scanner.mjs";

const BLOG_POSTS_DIR = path.join(process.cwd(), "data", "blog-posts");
const LEGACY_JSON_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");
const INDEX_PATH = path.join(process.cwd(), "public", "blog-posts.json");
const OUT_CSV = path.join(process.cwd(), "scripts", "blog-audit-report.csv");
const OUT_JSON = path.join(process.cwd(), "scripts", "blog-audit-report.json");

function normalizeSlug(input) {
  if (!input || typeof input !== "string") return "";
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNewFormatPosts() {
  const files = fs.readdirSync(BLOG_POSTS_DIR).filter((f) => f.endsWith(".json"));
  const posts = [];
  for (const file of files) {
    const post = JSON.parse(fs.readFileSync(path.join(BLOG_POSTS_DIR, file), "utf-8"));
    if (post.status === "published") {
      posts.push({ ...post, source: "canonical", file });
    }
  }
  return posts;
}

function getLegacyPosts() {
  if (!fs.existsSync(LEGACY_JSON_PATH)) return [];
  const legacyPosts = JSON.parse(fs.readFileSync(LEGACY_JSON_PATH, "utf-8"));
  return legacyPosts
    .filter((p) => p.published === 1)
    .map((p) => ({
      id: `legacy-${p.id}`,
      title: p.title || "Untitled",
      slug: normalizeSlug(p.slug || p.title),
      date: (p.published_at || p.created_at || "").split("T")[0],
      featuredImage: p.image || "",
      contentHtml: p.content || "",
      faq: [],
      source: "legacy",
      legacyId: p.id,
    }));
}

function getAllPosts() {
  const postMap = new Map();
  for (const post of getLegacyPosts()) {
    postMap.set(normalizeSlug(post.slug), post);
  }
  for (const post of getNewFormatPosts()) {
    postMap.set(normalizeSlug(post.slug), post);
  }
  return Array.from(postMap.values());
}

const REP_NETWORK_PATTERNS = [
  /how to become a police station rep/i,
  /get paid as a police station/i,
  /register as a police station rep/i,
  /find a police station rep now/i,
  /top 10 tips/i,
  /police station representative directory/i,
];

const FIRM_PATTERNS = [
  /instructing firm/i,
  /criminal defence firm/i,
  /fee earner/i,
  /legal aid billing/i,
  /instruct cover/i,
  /for solicitors/i,
  /when should a solicitor instruct/i,
  /attendance notes.*firm/i,
  /freelance police station agent/i,
  /police station cover for firms/i,
  /instructing a police station representative/i,
  /dscc reference/i,
  /note format/i,
  /billing expectations/i,
];

const BLOG_SOURCES_REQUIRED_FROM = "2026-06-14";

function requiresSourcesCompliance(post) {
  if (post.status === "draft") return false;
  const html = post.contentHtml || "";
  const audience = classifyAudience(post.title, html);
  if (audience !== "public") return false;
  return isLegalContent(html);
}

function classifyAudience(title, html) {
  const text = `${title} ${html}`;
  if (REP_NETWORK_PATTERNS.some((p) => p.test(text))) return "rep-network";
  const firmHits = FIRM_PATTERNS.filter((p) => p.test(text)).length;
  if (firmHits >= 2) return "firm";
  return "public";
}

function auditPost(post) {
  const html = post.contentHtml || "";
  const text = html.replace(/<[^>]+>/g, " ").toLowerCase();

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    source: post.source,
    file: post.file || `legacy-${post.legacyId}`,
    audience: classifyAudience(post.title, html),
    hasFeaturedImage: Boolean(post.featuredImage),
    hasInlineFigure: /<figure[^>]*class="blog-image"/i.test(html),
    hasNotKentPolice: /not kent police/i.test(html),
    hasKeyTakeaways: /key-takeaways/i.test(html),
    hasSources: /<h2[^>]*>sources<\/h2>/i.test(html),
    sourcesAtBottom: sourcesAtBottom(html),
    sourcesLinkQuality: sourcesExternalLinkQuality(html).ok,
    hasPublicCta: /01732\s*247427/i.test(html),
    hasFirmPrimaryCta: /need police station cover in kent/i.test(html),
    hasRepKentLink: /policestationrepkent/i.test(html),
    hasWixImage: /wixstatic\.com/i.test(html),
    faqFormat:
      post.faq?.length > 0
        ? post.faq[0].q !== undefined
          ? "q/a"
          : post.faq[0].question !== undefined
            ? "question/answer"
            : "unknown"
        : "none",
    wordCount: text.split(/\s+/).filter(Boolean).length,
  };
}

function getIndexOrphans(allSlugs) {
  if (!fs.existsSync(INDEX_PATH)) return [];
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8"));
  const slugSet = new Set(allSlugs.map((s) => normalizeSlug(s)));
  return index
    .filter((e) => !slugSet.has(normalizeSlug(e.slug)))
    .map((e) => ({
      slug: e.slug,
      title: e.title,
      audience: classifyAudience(e.title, e.title),
      orphan: true,
    }));
}

const posts = getAllPosts();
const audits = posts.map((post) => auditPost(post));
const sourcesViolations = posts
  .filter((p) => requiresSourcesCompliance(p))
  .map((post) => {
    const html = post.contentHtml || "";
    const linkCheck = sourcesExternalLinkQuality(html);
    const issues = [];
    if (!/<h2[^>]*>sources<\/h2>/i.test(html)) issues.push("missing Sources section");
    if (!sourcesAtBottom(html)) issues.push("Sources not at bottom (after Conclusion/CTA)");
    if (/<h2[^>]*>sources<\/h2>/i.test(html) && !linkCheck.ok) {
      issues.push(...linkCheck.issues);
    }
    return { slug: post.slug, date: post.date, issues };
  })
  .filter((v) => v.issues.length > 0);
const orphans = getIndexOrphans(posts.map((p) => p.slug));

const summary = {
  total: audits.length,
  byAudience: {
    public: audits.filter((a) => a.audience === "public").length,
    firm: audits.filter((a) => a.audience === "firm").length,
    repNetwork: audits.filter((a) => a.audience === "rep-network").length,
  },
  missingInlineFigure: audits.filter((a) => !a.hasInlineFigure).length,
  missingNotKentPolice: audits.filter((a) => !a.hasNotKentPolice).length,
  missingKeyTakeaways: audits.filter((a) => !a.hasKeyTakeaways).length,
  missingSources: audits.filter((a) => !a.hasSources).length,
  missingSourcesAtBottom: audits.filter(
    (a) => a.source === "canonical" && (!a.hasSources || !a.sourcesAtBottom),
  ).length,
  badSourcesLinks: audits.filter((a) => a.source === "canonical" && a.hasSources && !a.sourcesLinkQuality)
    .length,
  firmPrimaryCta: audits.filter((a) => a.hasFirmPrimaryCta).length,
  repKentLinks: audits.filter((a) => a.hasRepKentLink).length,
  wixImages: audits.filter((a) => a.hasWixImage).length,
  indexOrphans: orphans.length,
};

const report = { summary, audits, orphans };
fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));

const headers = Object.keys(audits[0] || {}).join(",");
const rows = audits.map((a) =>
  Object.values(a)
    .map((v) => `"${String(v).replace(/"/g, '""')}"`)
    .join(",")
);
fs.writeFileSync(OUT_CSV, [headers, ...rows].join("\n"));

console.log("Blog audit summary:");
console.log(JSON.stringify(summary, null, 2));
console.log(`\nFirm/rep-network posts:`);
audits
  .filter((a) => a.audience !== "public")
  .forEach((a) => console.log(`  - [${a.audience}] ${a.slug}`));
console.log(`\nMissing inline figure:`);
audits.filter((a) => !a.hasInlineFigure).forEach((a) => console.log(`  - ${a.slug}`));
console.log(`\nCanonical posts missing Sources at bottom:`);
audits
  .filter((a) => a.source === "canonical" && (!a.hasSources || !a.sourcesAtBottom))
  .forEach((a) => console.log(`  - ${a.slug}`));
console.log(`\nCanonical posts with Sources link issues:`);
audits
  .filter((a) => a.source === "canonical" && a.hasSources && !a.sourcesLinkQuality)
  .forEach((a) => console.log(`  - ${a.slug}`));
console.log(`\nIndex orphans: ${orphans.length}`);
orphans.forEach((o) => console.log(`  - ${o.slug}`));
console.log(`\nSources compliance failures (public legal posts):`);
if (sourcesViolations.length === 0) {
  console.log("  (none)");
} else {
  for (const v of sourcesViolations) {
    console.log(`  - ${v.slug} (${v.date}): ${v.issues.join("; ")}`);
  }
  process.exit(1);
}
console.log(`\nWrote ${OUT_CSV} and ${OUT_JSON}`);
