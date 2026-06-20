#!/usr/bin/env node
/** Fix duplicate FAQ text and plain-text case citations in legacy blog JSON. */
import fs from "fs";
import path from "path";

const LEGACY_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");

const DUPLICATE_ANSWER =
  "Any answers given may still be used as evidence. Answers may still be used as evidence.";
const FIXED_ANSWER =
  "Any answers given may still be used as evidence. Section 58 of PACE gives you the right to free legal advice before interview — it does not automatically exclude answers given without a solicitor.";

const ARGENT_PLAIN = "<li>R v Argent [1997] 2 Cr App R 27</li>";
const ARGENT_LINKED =
  '<li><a href="https://www.cps.gov.uk/legal-guidance/adverse-inference" rel="noopener noreferrer">CPS — Adverse inference guidance (see R v Argent [1997] 2 Cr App R 27)</a></li>';

function fixText(text) {
  return (text || "")
    .split(DUPLICATE_ANSWER)
    .join(FIXED_ANSWER)
    .split(ARGENT_PLAIN)
    .join(ARGENT_LINKED);
}

const legacy = JSON.parse(fs.readFileSync(LEGACY_PATH, "utf-8"));
let count = 0;
for (const post of legacy) {
  if (post.published !== 1) continue;
  const before = JSON.stringify(post);
  post.content = fixText(post.content);
  if (post.faq?.length) {
    post.faq = post.faq.map((item) => ({
      ...item,
      a: typeof item.a === "string" ? fixText(item.a) : item.a,
      answer: typeof item.answer === "string" ? fixText(item.answer) : item.answer,
    }));
  }
  if (JSON.stringify(post) !== before) count++;
}
fs.writeFileSync(LEGACY_PATH, JSON.stringify(legacy, null, 2) + "\n");
console.log(`Fixed ${count} legacy posts.`);
