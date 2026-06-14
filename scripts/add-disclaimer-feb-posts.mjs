#!/usr/bin/env node
import fs from "fs";
import path from "path";

const NOT_KENT =
  "<p>Police Station Agent is a private defence website operated by Robert Cashman — <strong>NOT Kent Police</strong>. Legal services are delivered through Tuckers Solicitors LLP (SRA ID: 127795).</p>";

const dir = path.join(process.cwd(), "data", "blog-posts");
for (const f of fs.readdirSync(dir).filter((x) => x.startsWith("2026-02-02") || x.startsWith("2025-12-12"))) {
  const p = path.join(dir, f);
  const post = JSON.parse(fs.readFileSync(p, "utf8"));
  if (!/not kent police/i.test(post.contentHtml)) {
    post.contentHtml = post.contentHtml.replace(
      /(<div class="blog-content">\s*\n?\s*<h2>Introduction<\/h2>\s*\n?<p>)/i,
      `$1\n${NOT_KENT}\n`
    );
    if (!/not kent police/i.test(post.contentHtml)) {
      post.contentHtml = post.contentHtml.replace(/(<div class="blog-content">\s*\n?)/i, `$1\n${NOT_KENT}\n`);
    }
    fs.writeFileSync(p, JSON.stringify(post, null, 2) + "\n");
    console.log("disclaimer added:", f);
  }
}
