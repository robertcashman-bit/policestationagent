#!/usr/bin/env node
/**
 * Scans app route page.tsx files for SEO metadata and outputs audit-report.md
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const APP = path.join(ROOT, "app");
const OUT_DIR = path.join(ROOT, "seo-growth-police-station-agent");
const OUT = path.join(OUT_DIR, "audit-report.md");

const PRIORITY_ROUTES = new Set([
  "/",
  "/about",
  "/contact",
  "/faq",
  "/for-solicitors",
  "/start/solicitors-agent-cover",
  "/services/police-station-representation",
  "/voluntary-police-interview",
  "/no-comment-interview",
  "/released-under-investigation",
  "/police-bail-explained",
  "/kent-police-station-reps",
  "/free-police-station-advice-kent",
  "/dscc-and-custody-record-support",
]);

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name === "page.tsx") acc.push(p);
  }
  return acc;
}

function routeFromFile(file) {
  const rel = path.relative(APP, path.dirname(file));
  if (rel === ".") return "/";
  return `/${rel.replace(/\\/g, "/")}`;
}

function extract(content, re) {
  const m = content.match(re);
  return m ? m[1].trim() : "";
}

function auditPage(file) {
  const content = fs.readFileSync(file, "utf8");
  const route = routeFromFile(file);
  const title = extract(content, /title:\s*["'`]([^"'`]+)["'`]/);
  const description = extract(content, /description:\s*\n?\s*[`"']([^"`']+)/) ||
    extract(content, /description:\s*["'`]([^"'`]+)["'`]/);
  const canonical = extract(content, /canonical:\s*[`"']?(https?:\/\/[^"'`\s]+)/);
  const h1 = extract(content, /<h1[^>]*>([^<]+)</) || extract(content, /id="page-title"[^>]*>([^<]+)</);
  const scraped = content.includes("dangerouslySetInnerHTML") || content.includes("normalizeScrapedHtml");
  const wrongDomain = canonical.includes("criminaldefencekent.co.uk");
  const missingMeta = !title || !description;
  let priority = 3;
  if (PRIORITY_ROUTES.has(route)) priority = 10;
  else if (route.startsWith("/police-station-rep-")) priority = 8;
  else if (route.startsWith("/blog")) priority = 5;
  else if (scraped) priority = 6;

  const issues = [];
  if (missingMeta) issues.push("Missing title or meta description");
  if (wrongDomain) issues.push("Canonical points to criminaldefencekent.co.uk");
  if (scraped) issues.push("Scraped HTML page — migrate to React template");
  if (!h1) issues.push("No clear H1 detected");

  return { route, title, description, canonical, h1, scraped, priority, issues };
}

function mdEscape(s) {
  return String(s || "—").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

const pages = walk(APP)
  .map(auditPage)
  .sort((a, b) => b.priority - a.priority || a.route.localeCompare(b.route));

fs.mkdirSync(OUT_DIR, { recursive: true });

const lines = [
  "# SEO Growth Audit — policestationagent.com",
  "",
  `Generated: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "Priority tiers: 10 = commercial core, 8 = local rep canonicals, 6 = scraped legacy, 3 = other.",
  "",
  "| Route | Priority | Current title | Recommended title | Current meta | Technical issues | Action taken |",
  "| --- | ---: | --- | --- | --- | --- | --- |",
];

for (const p of pages.slice(0, 80)) {
  const recTitle = p.scraped
    ? "Use buildPageMetadata + LocalCoverPage template"
    : p.title || "Add unique title (50–60 chars)";
  lines.push(
    `| ${p.route} | ${p.priority} | ${mdEscape(p.title)} | ${mdEscape(recTitle)} | ${mdEscape(p.description?.slice(0, 80))} | ${mdEscape(p.issues.join("; "))} | Pending in growth programme |`,
  );
}

lines.push("", `Total routes scanned: ${pages.length}. Showing top 80 by priority.`, "");

fs.writeFileSync(OUT, lines.join("\n"));
console.log(`Wrote ${OUT} (${pages.length} routes)`);
