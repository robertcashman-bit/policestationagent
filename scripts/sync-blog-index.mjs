#!/usr/bin/env node
/**
 * Regenerate public/blog-posts.json and data/blog-posts-static.json from live published posts.
 */
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const LEGACY_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");

function normalizeSlug(input) {
  if (!input || typeof input !== "string") return "";
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPosts() {
  const map = new Map();

  if (fs.existsSync(LEGACY_PATH)) {
    const legacy = JSON.parse(fs.readFileSync(LEGACY_PATH, "utf-8"));
    for (const p of legacy.filter((x) => x.published === 1)) {
      map.set(normalizeSlug(p.slug), {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        published_at: p.published_at,
        created_at: p.created_at,
      });
    }
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    if (post.status === "published") {
      map.set(normalizeSlug(post.slug), {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.metaDescription || null,
        published_at: `${post.date}T12:00:00`,
        created_at: `${post.date}T12:00:00`,
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

const posts = getPosts();
const out = JSON.stringify(posts, null, 2) + "\n";
fs.writeFileSync(path.join(process.cwd(), "public", "blog-posts.json"), out);
fs.writeFileSync(path.join(process.cwd(), "data", "blog-posts-static.json"), out);
if (fs.existsSync(path.join(process.cwd(), "public", "blog-posts-full.json"))) {
  fs.copyFileSync(LEGACY_PATH, path.join(process.cwd(), "public", "blog-posts-full.json"));
}
console.log(`Regenerated blog index with ${posts.length} published posts.`);
