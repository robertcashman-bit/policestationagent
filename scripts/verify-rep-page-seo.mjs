#!/usr/bin/env node
/**
 * Verify all LocalCover rep pages use rep/representative keywords in title, h1, and meta.
 * Run: node scripts/verify-rep-page-seo.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "lib/seo/local-cover-data.ts");

const REP_PATTERN = /rep|representative/i;
const KENT_PATTERN = /kent/i;

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
  if (!REP_PATTERN.test(entry.title)) {
    failures.push(`${entry.key}: title missing rep/representative — "${entry.title}"`);
  }
  if (!REP_PATTERN.test(entry.h1)) {
    failures.push(`${entry.key}: h1 missing rep/representative — "${entry.h1}"`);
  }
  if (!KENT_PATTERN.test(entry.metaDescription)) {
    failures.push(`${entry.key}: metaDescription missing Kent`);
  }
}

if (failures.length) {
  console.error("verify-rep-page-seo: FAILED\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log(`verify-rep-page-seo: OK (${entries.length} LocalCover entries)`);
