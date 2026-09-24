#!/usr/bin/env npx tsx
/**
 * Full-site police-number confusion inventory.
 * Writes reports/seo-police-number-audit.json and .md
 */
import fs from "fs";
import path from "path";
import {
  CONFUSION_THRESHOLD,
  FIRM_PHONE_RE,
  FIRM_SMS_RE,
  scorePageConfusion,
  type ConfusionResult,
} from "../lib/seo/police-confusion-score";
import { LOCAL_COVER_PAGES } from "../lib/seo/local-cover-data";
import { SITE_DOMAIN } from "../config/site";

type IntentClass = "A" | "B" | "C" | "D" | "E" | "F" | "G";

type Occurrence = {
  sourceFile: string;
  publicUrl: string;
  pageTitle: string;
  h1: string;
  metaDescription: string;
  canonical: string;
  robots: string;
  structuredDataType: string;
  structuredDataTelephone: string[];
  visibleTextSurrounding: string;
  linkTextSurrounding: string;
  nearStationNameOrAddress: boolean;
  googleCouldExtractAsPoliceContact: boolean;
  riskRating: "critical" | "high" | "medium" | "low";
  proposedCorrection: string;
  implementationStatus: string;
  intentClass: IntentClass;
  confusion?: ConfusionResult;
};

const ROOT = process.cwd();
const BASE = `https://${SITE_DOMAIN}`;

function walk(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, acc);
    } else if (/\.(tsx|ts|js|jsx|json|md)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function classifyPath(urlPath: string): IntentClass {
  const p = urlPath.toLowerCase();
  if (p.includes("/for-solicitors") || p.includes("/repcover") || p.includes("/start/solicitors")) return "E";
  if (p === "/contact" || p === "/about" || p === "/") return "F";
  if (p.includes("/blog/")) return "C";
  if (p.includes("/police-station-rep-")) return "B";
  if (
    p.endsWith("-police-station") ||
    p.endsWith("-psa-station") ||
    p.includes("/coverage/police-stations") ||
    p.includes("/police-stations/")
  ) {
    return "D";
  }
  if (p.includes("-solicitor") || p.includes("/services/")) return "A";
  if (p.includes("police-station-agent-") || p.includes("-psa-station")) return "G";
  return "A";
}

function extractMeta(src: string, key: string): string {
  const re = new RegExp(`${key}:\\s*[\`'\"]([\\s\\S]*?)[\`'\"]`, "i");
  const m = src.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim().slice(0, 400) : "";
}

function extractH1(src: string): string {
  const m = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return "";
  return m[1].replace(/\{[^}]+\}/g, "X").replace(/<[^>]+>/g, "").trim().slice(0, 200);
}

function riskFromScore(score: number, collision: boolean): Occurrence["riskRating"] {
  if (collision || score >= 60) return "critical";
  if (score >= CONFUSION_THRESHOLD) return "high";
  if (score >= 20) return "medium";
  return "low";
}

function main() {
  const occurrences: Occurrence[] = [];
  const collisions: Occurrence[] = [];

  // App pages
  const appDir = path.join(ROOT, "app");
  for (const full of walk(appDir)) {
    if (!full.endsWith("page.tsx")) continue;
    const rel = path.relative(ROOT, full);
    const src = fs.readFileSync(full, "utf8");
    if (!FIRM_PHONE_RE.test(src) && !FIRM_SMS_RE.test(src) && !/PHONE_DISPLAY|SMS_DISPLAY|01732|07535/.test(src)) {
      continue;
    }
    const route =
      "/" +
      rel
        .replace(/^app\//, "")
        .replace(/\/page\.tsx$/, "")
        .replace(/\/\(.*?\)\//g, "/")
        .replace(/index$/, "");
    const publicUrl = route === "/" || route === "" ? `${BASE}/` : `${BASE}${route === "." ? "" : route}`;
    const title = extractMeta(src, "title") || "";
    const meta = extractMeta(src, "description") || "";
    const h1 = extractH1(src);
    const canonical = extractMeta(src, "canonical") || publicUrl;
    const hasNumber = FIRM_PHONE_RE.test(src) || FIRM_SMS_RE.test(src) || /PHONE_DISPLAY|tel:01732/.test(src);
    const nearStation =
      /police station|custody|pembury|get directions|station details/i.test(src) && hasNumber;
    const confusion = scorePageConfusion({
      path: route,
      title,
      h1,
      metaDescription: meta,
      html: src,
      bodyText: src,
    });
    const collision =
      nearStation &&
      hasNumber &&
      (/telephone|phone|call|contact|number/i.test(`${title} ${meta} ${h1}`) ||
        FIRM_PHONE_RE.test(meta) ||
        FIRM_PHONE_RE.test(title));

    const occ: Occurrence = {
      sourceFile: rel,
      publicUrl,
      pageTitle: title,
      h1,
      metaDescription: meta,
      canonical,
      robots: /noindex/i.test(src) ? "noindex" : "index,follow",
      structuredDataType: /LegalService|LocalBusiness|PoliceStation|FAQPage/.test(src)
        ? "embedded"
        : "layout-default",
      structuredDataTelephone: FIRM_PHONE_RE.test(src) ? ["+441732247427"] : [],
      visibleTextSurrounding: src.match(/.{0,80}01732\s*247427.{0,80}/)?.[0]?.replace(/\s+/g, " ") || "",
      linkTextSurrounding: src.match(/<a[^>]*tel:01732[^>]*>[\s\S]{0,80}/)?.[0]?.replace(/\s+/g, " ") || "",
      nearStationNameOrAddress: nearStation,
      googleCouldExtractAsPoliceContact: collision || confusion.flags.includes("snippet_reads_as_police_contact"),
      riskRating: riskFromScore(confusion.score, !!collision),
      proposedCorrection: confusion.recommendations.join("; ") || "Label as solicitor contact; add not-police notice",
      implementationStatus: "in_progress",
      intentClass: classifyPath(route),
      confusion,
    };
    occurrences.push(occ);
    if (collision || occ.riskRating === "critical" || occ.riskRating === "high") {
      collisions.push(occ);
    }
  }

  // Blog posts
  const blogDir = path.join(ROOT, "data", "blog-posts");
  for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith(".json"))) {
    const full = path.join(blogDir, f);
    const post = JSON.parse(fs.readFileSync(full, "utf8")) as {
      slug?: string;
      metaTitle?: string;
      title?: string;
      metaDescription?: string;
      contentHtml?: string;
    };
    const blob = JSON.stringify(post);
    if (!FIRM_PHONE_RE.test(blob) && !FIRM_SMS_RE.test(blob) && !/01732|07535/.test(blob)) continue;
    const slug = post.slug || f.replace(/\.json$/, "");
    const route = `/blog/${slug}`;
    const confusion = scorePageConfusion({
      path: route,
      title: post.metaTitle || post.title || "",
      metaDescription: post.metaDescription || "",
      html: post.contentHtml || "",
      h1: post.title || "",
    });
    const nearStation = /police station|custody|tonbridge|gravesend/i.test(
      `${post.metaTitle} ${post.metaDescription} ${post.title}`,
    );
    const hasMetaPhone =
      FIRM_PHONE_RE.test(post.metaDescription || "") || FIRM_PHONE_RE.test(post.metaTitle || "");
    const occ: Occurrence = {
      sourceFile: path.relative(ROOT, full),
      publicUrl: `${BASE}${route}`,
      pageTitle: post.metaTitle || post.title || "",
      h1: post.title || "",
      metaDescription: post.metaDescription || "",
      canonical: `${BASE}${route}`,
      robots: "index,follow",
      structuredDataType: "Article",
      structuredDataTelephone: [],
      visibleTextSurrounding: (post.metaDescription || "").slice(0, 160),
      linkTextSurrounding: "",
      nearStationNameOrAddress: nearStation,
      googleCouldExtractAsPoliceContact: hasMetaPhone && nearStation,
      riskRating: riskFromScore(confusion.score, hasMetaPhone && nearStation),
      proposedCorrection: hasMetaPhone
        ? "Remove firm numbers from metaDescription; keep solicitor framing + 101/999"
        : confusion.recommendations.join("; "),
      implementationStatus: hasMetaPhone ? "pending" : "mitigated",
      intentClass: "C",
      confusion,
    };
    occurrences.push(occ);
    if (occ.riskRating === "critical" || occ.riskRating === "high") collisions.push(occ);
  }

  // Local cover configs
  for (const [key, cfg] of Object.entries(LOCAL_COVER_PAGES)) {
    const route = `/${cfg.slug}`;
    const confusion = scorePageConfusion({
      path: route,
      title: cfg.title,
      h1: cfg.h1,
      metaDescription: cfg.metaDescription,
      openingParagraph: cfg.intro,
    });
    occurrences.push({
      sourceFile: `lib/seo/local-cover-data.ts#${key}`,
      publicUrl: `${BASE}${route}`,
      pageTitle: cfg.title,
      h1: cfg.h1,
      metaDescription: cfg.metaDescription,
      canonical: `${BASE}${route}`,
      robots: "index,follow",
      structuredDataType: "Service+FAQPage",
      structuredDataTelephone: [],
      visibleTextSurrounding: cfg.metaDescription.slice(0, 160),
      linkTextSurrounding: "",
      nearStationNameOrAddress: true,
      googleCouldExtractAsPoliceContact: confusion.flags.includes("snippet_reads_as_police_contact"),
      riskRating: riskFromScore(confusion.score, false),
      proposedCorrection: confusion.recommendations.join("; ") || "Maintain solicitor-intent metadata",
      implementationStatus: key === "tonbridge" ? "corrected" : "reviewed",
      intentClass: "B",
      confusion,
    });
  }

  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      occurrenceCount: occurrences.length,
      critical: occurrences.filter((o) => o.riskRating === "critical").length,
      high: occurrences.filter((o) => o.riskRating === "high").length,
      medium: occurrences.filter((o) => o.riskRating === "medium").length,
      low: occurrences.filter((o) => o.riskRating === "low").length,
      keywordCollisions: collisions.length,
    },
    keywordCollisions: collisions.map((c) => ({
      url: c.publicUrl,
      title: c.pageTitle,
      risk: c.riskRating,
      flags: c.confusion?.flags || [],
    })),
    occurrences,
  };

  const outDir = path.join(ROOT, "reports");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "seo-police-number-audit.json"), JSON.stringify(report, null, 2));

  const md = [
    "# SEO police-number audit",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    `Occurrences: **${report.summary.occurrenceCount}** · Critical: **${report.summary.critical}** · High: **${report.summary.high}** · Medium: **${report.summary.medium}** · Low: **${report.summary.low}**`,
    "",
    "## Keyword collisions (station entity + contact modifier + firm number)",
    "",
    ...collisions.slice(0, 80).map(
      (c) =>
        `- \`${c.publicUrl}\` — ${c.riskRating} — ${c.pageTitle || "(no title)"} — ${(c.confusion?.flags || []).join(", ")}`,
    ),
    "",
    "## Intent classes",
    "",
    "- A Solicitor service",
    "- B Police station representation",
    "- C Legal information article",
    "- D Police station/location information",
    "- E Firm-to-firm agency",
    "- F General company/contact",
    "- G Duplicate/obsolete/thin",
    "",
    "Full machine-readable inventory: `reports/seo-police-number-audit.json`.",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outDir, "seo-police-number-audit.md"), md);
  console.log(`Wrote reports/seo-police-number-audit.json (${occurrences.length} occurrences)`);
}

main();
