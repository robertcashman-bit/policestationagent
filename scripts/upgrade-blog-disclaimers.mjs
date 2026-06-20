#!/usr/bin/env node
/** Upgrade blog Sources disclaimer tails to include accuracy notice and report-errors link. */
import fs from "fs";
import path from "path";
import { LEGAL_ACCURACY_DISCLAIMER_HTML } from "./lib/legal-accuracy-disclaimer-html.mjs";

const OLD_TAIL =
  '<p><em>General information only — not legal advice about any individual case. Statutory references and Code C paragraphs are summarised for readability; refer to the official published versions linked above.</em></p>';

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const LEGACY_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");

let count = 0;

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"))) {
  const fp = path.join(BLOG_DIR, file);
  const post = JSON.parse(fs.readFileSync(fp, "utf-8"));
  if (!post.contentHtml?.includes(OLD_TAIL)) continue;
  post.contentHtml = post.contentHtml.split(OLD_TAIL).join(LEGAL_ACCURACY_DISCLAIMER_HTML);
  fs.writeFileSync(fp, JSON.stringify(post, null, 2) + "\n");
  count++;
}

if (fs.existsSync(LEGACY_PATH)) {
  const legacy = JSON.parse(fs.readFileSync(LEGACY_PATH, "utf-8"));
  let legacyUpdated = false;
  for (const post of legacy) {
    if (!post.content?.includes(OLD_TAIL)) continue;
    post.content = post.content.split(OLD_TAIL).join(LEGAL_ACCURACY_DISCLAIMER_HTML);
    legacyUpdated = true;
  }
  if (legacyUpdated) {
    fs.writeFileSync(LEGACY_PATH, JSON.stringify(legacy, null, 2) + "\n");
    count++;
  }
}

console.log(`Upgraded blog disclaimer tails (${count} file batches).`);
