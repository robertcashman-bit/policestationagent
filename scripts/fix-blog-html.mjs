#!/usr/bin/env node
/** Fix nested <p>, key-takeaways heading size, duplicate h1 in blog contentHtml. */
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const NESTED_P =
  /<p>\s*<p>Police Station Agent is a private defence website[\s\S]*?<\/p>\s*([\s\S]*?)<\/p>/gi;

let count = 0;

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"))) {
  const fp = path.join(BLOG_DIR, file);
  const post = JSON.parse(fs.readFileSync(fp, "utf-8"));
  let html = post.contentHtml || "";
  let changed = false;

  const fixed = html.replace(NESTED_P, (_, rest) => {
    changed = true;
    return `<p>Police Station Agent is a private defence website operated by Robert Cashman — <strong>NOT Kent Police</strong>. Legal services are delivered through Tuckers Solicitors LLP (SRA ID: 127795).</p>\n<p>${rest.trim()}</p>`;
  });
  if (fixed !== html) {
    html = fixed;
  }

  const noSmallH2 = html.replace(
    /<h2 style="margin-top: 0; color: #1e40af; font-size: 1\.1rem;">Key takeaways<\/h2>/gi,
    '<h2 class="key-takeaways-heading">Key takeaways</h2>',
  );
  if (noSmallH2 !== html) {
    html = noSmallH2;
    changed = true;
  }

  if (post.slug === "why-you-need-a-criminal-solicitor-in-the-police-station") {
    const noH1 = html.replace(/<h1>Why you need a criminal solicitor in the police station<\/h1>\s*/i, "");
    if (noH1 !== html) {
      html = noH1;
      changed = true;
    }
  }

  if (changed) {
    post.contentHtml = html;
    fs.writeFileSync(fp, JSON.stringify(post, null, 2) + "\n");
    count++;
  }
}

console.log(`Fixed blog HTML in ${count} posts.`);
