#!/usr/bin/env node
/** Apply data/blog-image-registry.json to blog post JSON files. */
import fs from "fs";
import path from "path";

const REGISTRY = path.join(process.cwd(), "data", "blog-image-registry.json");
const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf-8"));

let updated = 0;

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"))) {
  const fp = path.join(BLOG_DIR, file);
  const post = JSON.parse(fs.readFileSync(fp, "utf-8"));
  const entry = registry[post.slug];
  if (!entry) continue;

  const img = entry.featured;
  const alt = entry.alt || post.featuredImageAlt || post.title;
  post.featuredImage = img;
  post.featuredImageAlt = alt;

  if (post.contentHtml) {
    post.contentHtml = post.contentHtml.replace(
      /<figure class="blog-image">\s*<img[^>]*>/i,
      `<figure class="blog-image">\n  <img src="${img}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy" width="800" height="400" />`,
    );
  }

  fs.writeFileSync(fp, JSON.stringify(post, null, 2) + "\n");
  updated++;
}

console.log(`Applied image registry to ${updated} blog posts.`);
