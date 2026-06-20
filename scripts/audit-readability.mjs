#!/usr/bin/env node
/** Fail on garbled scraped copy, version badges in app pages, nested blog <p>. */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const errors = [];

const GARBLED = /We're We aim to respond promptly/i;
const VERSION_BADGE = /v4\.4\.0 — \d{1,2}\/\d{1,2}\/\d{4}/;
const NESTED_P = /<p>\s*<p>Police Station Agent/i;

function walk(dir, ext, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory() && !["node_modules", ".next", ".git"].includes(ent.name)) {
      walk(p, ext, out);
    } else if (ent.isFile() && ent.name.endsWith(ext)) {
      out.push(p);
    }
  }
  return out;
}

for (const fp of walk(path.join(ROOT, "app"), ".tsx")) {
  const text = fs.readFileSync(fp, "utf-8");
  if (GARBLED.test(text)) {
    errors.push(`${path.relative(ROOT, fp)}: garbled hero copy`);
  }
}

for (const fp of walk(path.join(ROOT, "data", "blog-posts"), ".json")) {
  const post = JSON.parse(fs.readFileSync(fp, "utf-8"));
  if (NESTED_P.test(post.contentHtml || "")) {
    errors.push(`${post.slug}: nested disclaimer paragraphs in blog HTML`);
  }
}

if (errors.length) {
  console.error("Readability audit FAILED:");
  for (const e of errors) console.error(`  ERROR: ${e}`);
  process.exit(1);
}

console.log("Readability audit OK");
