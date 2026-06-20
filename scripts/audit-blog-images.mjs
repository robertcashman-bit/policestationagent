#!/usr/bin/env node
/** Audit blog post images: format, existence, uniqueness, featured vs inline match. */
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const PUBLIC = path.join(process.cwd(), "public");

const ALLOWED = /\.(jpe?g|png)$/i;

function imgSrcs(html) {
  return [...(html || "").matchAll(/<img[^>]+src="([^"]+)"/gi)].map((m) => m[1]);
}

function main() {
  const errors = [];
  const warnings = [];
  const featuredPaths = new Map();

  for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"))) {
    const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
    const slug = post.slug || file.replace(/\.json$/, "");

    if (post.featuredImage) {
      if (!ALLOWED.test(post.featuredImage)) {
        errors.push(`${slug}: featuredImage must be .jpg or .png — ${post.featuredImage}`);
      }
      const disk = path.join(PUBLIC, post.featuredImage.replace(/^\//, ""));
      if (!fs.existsSync(disk)) {
        errors.push(`${slug}: missing file ${post.featuredImage}`);
      }
      if (featuredPaths.has(post.featuredImage)) {
        errors.push(
          `${slug}: duplicate featuredImage ${post.featuredImage} (also used by ${featuredPaths.get(post.featuredImage)})`,
        );
      } else {
        featuredPaths.set(post.featuredImage, slug);
      }
    } else {
      warnings.push(`${slug}: missing featuredImage`);
    }

    for (const src of imgSrcs(post.contentHtml)) {
      if (!ALLOWED.test(src)) {
        errors.push(`${slug}: inline img must be .jpg or .png — ${src}`);
      }
      if (src.startsWith("/") && !fs.existsSync(path.join(PUBLIC, src.replace(/^\//, "")))) {
        errors.push(`${slug}: missing inline image ${src}`);
      }
    }

    const inline = imgSrcs(post.contentHtml)[0];
    if (post.featuredImage && inline && post.featuredImage !== inline) {
      warnings.push(`${slug}: featuredImage (${post.featuredImage}) differs from inline figure (${inline})`);
    }
  }

  if (warnings.length) {
    console.warn("Blog image warnings:");
    for (const w of warnings) console.warn(`  WARN: ${w}`);
  }

  if (errors.length) {
    console.error("Blog image audit FAILED:");
    for (const e of errors) console.error(`  ERROR: ${e}`);
    process.exit(1);
  }

  console.log(`Blog image audit OK (${featuredPaths.size} unique featured images)`);
}

main();
