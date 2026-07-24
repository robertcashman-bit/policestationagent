#!/usr/bin/env node
/**
 * Verify all LocalCover rep pages use solicitor/rep keywords in title, h1, and meta.
 * Accepts "solicitor", "legal advice", "representation", or "rep" framing.
 * Blocks firm phone digits in title/meta.
 * Run: node scripts/verify-rep-page-seo.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "lib/seo/local-cover-data.ts");

const SOLICITOR_INTENT = /rep|representative|solicitor|legal advice|legal representation|independent/i;
const KENT_PATTERN = /kent/i;
const FIRM_PHONE = /01732|07535/;
const NOT_POLICE = /not kent police|not the police|101/i;

function extractEntries(source) {
  const entries = [];
  const keyRe = /^\s{2}([\w-]+):\s*\{/gm;
  let match;
  while ((match = keyRe.exec(source)) !== null) {
    const key = match[1];
    const start = match.index;
    const slice = source.slice(start);
    const title = slice.match(/title:\s*"([^"]+)"/)?.[1] ?? "";
    const h1 = slice.match(/h1:\s*"([^"]+)"/)?.[1] ?? "";
    const metaDescription = slice.match(/metaDescription:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
    const slug = slice.match(/slug:\s*"([^"]+)"/)?.[1] ?? "";
    entries.push({ key, slug, title, h1, metaDescription });
  }
  return entries;
}

const source = fs.readFileSync(DATA_FILE, "utf8");
const entries = extractEntries(source);
const failures = [];

for (const entry of entries) {
  if (!SOLICITOR_INTENT.test(entry.title)) {
    failures.push(`${entry.key}: title missing solicitor/rep intent — "${entry.title}"`);
  }
  if (!SOLICITOR_INTENT.test(entry.h1)) {
    failures.push(`${entry.key}: h1 missing solicitor/rep intent — "${entry.h1}"`);
  }
  if (!KENT_PATTERN.test(entry.metaDescription) && !NOT_POLICE.test(entry.metaDescription)) {
    failures.push(`${entry.key}: metaDescription missing Kent or not-police clarification`);
  }
  if (FIRM_PHONE.test(entry.title) || FIRM_PHONE.test(entry.metaDescription)) {
    failures.push(`${entry.key}: firm telephone must not appear in title or metaDescription`);
  }
  if (!NOT_POLICE.test(entry.metaDescription)) {
    failures.push(`${entry.key}: metaDescription should state not Kent Police / 101`);
  }
}

if (failures.length) {
  console.error("verify-rep-page-seo: FAILED\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log(`verify-rep-page-seo: OK (${entries.length} LocalCover entries)`);
