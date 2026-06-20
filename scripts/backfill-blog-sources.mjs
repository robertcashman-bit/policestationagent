#!/usr/bin/env node
/**
 * Append standard Sources section to blog posts missing one.
 * Updates canonical JSON files and data/blog-posts-full.json legacy entries.
 */
import fs from "fs";
import path from "path";
import { LEGAL_ACCURACY_DISCLAIMER_HTML } from "./lib/legal-accuracy-disclaimer-html.mjs";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const LEGACY_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");

const STANDARD_SOURCES = `
<h2>Sources</h2>
<ul>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023 (accessible text)</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/58" rel="noopener noreferrer">PACE 1984, section 58</a> — right to legal advice at the police station</li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/76" rel="noopener noreferrer">PACE 1984, section 76</a> — exclusion of confessions</li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>
${LEGAL_ACCURACY_DISCLAIMER_HTML}`;

const S58_MISQUOTE =
  "However, the court will consider whether you were properly advised of your rights under section 58 of PACE when assessing the weight of that evidence.";
const S58_FIX =
  "Answers may still be used as evidence. Section 58 of PACE gives you the right to free legal advice before interview — it does not automatically exclude answers given without a solicitor.";

function hasSources(html) {
  return /<h2[^>]*>\s*sources\s*<\/h2>/i.test(html || "");
}

function appendSources(html) {
  if (hasSources(html)) return html;
  const trimmed = (html || "").trimEnd();
  if (trimmed.endsWith("</div>")) {
    return trimmed.replace(/<\/div>\s*$/, `${STANDARD_SOURCES}\n</div>`);
  }
  return trimmed + STANDARD_SOURCES;
}

function fixMisquotes(text) {
  return text.split(S58_MISQUOTE).join(S58_FIX);
}

let canonicalUpdated = 0;
const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
for (const file of files) {
  const fp = path.join(BLOG_DIR, file);
  const post = JSON.parse(fs.readFileSync(fp, "utf-8"));
  if (post.status !== "published") continue;
  let html = post.contentHtml || "";
  const before = html;
  html = fixMisquotes(html);
  html = appendSources(html);
  if (html !== before) {
    post.contentHtml = html;
    fs.writeFileSync(fp, JSON.stringify(post, null, 2) + "\n");
    canonicalUpdated++;
    console.log(`Updated canonical: ${post.slug}`);
  }
}

let legacyUpdated = 0;
if (fs.existsSync(LEGACY_PATH)) {
  const legacy = JSON.parse(fs.readFileSync(LEGACY_PATH, "utf-8"));
  for (const post of legacy) {
    if (post.published !== 1) continue;
    let html = post.content || "";
    const beforeHtml = html;
    const beforeFaq = JSON.stringify(post.faq || []);
    html = fixMisquotes(html);
    html = appendSources(html);
    if (post.faq?.length) {
      post.faq = post.faq.map((item) => ({
        ...item,
        a: typeof item.a === "string" ? fixMisquotes(item.a) : item.a,
        answer: typeof item.answer === "string" ? fixMisquotes(item.answer) : item.answer,
      }));
    }
    if (html !== beforeHtml || JSON.stringify(post.faq || []) !== beforeFaq) {
      post.content = html;
      legacyUpdated++;
      console.log(`Updated legacy: ${post.slug || post.title}`);
    }
  }
  fs.writeFileSync(LEGACY_PATH, JSON.stringify(legacy, null, 2) + "\n");
}

console.log(`Backfill complete: ${canonicalUpdated} canonical, ${legacyUpdated} legacy posts updated.`);
