#!/usr/bin/env node
/** Copy source images to slug-unique paths per data/blog-image-registry.json */
import fs from "fs";
import path from "path";

const REGISTRY = path.join(process.cwd(), "data", "blog-image-registry.json");
const PUBLIC_IMAGES = path.join(process.cwd(), "public", "blog-images");

const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf-8"));
let created = 0;
let skipped = 0;

for (const [slug, entry] of Object.entries(registry)) {
  const dest = path.join(PUBLIC_IMAGES, path.basename(entry.featured.replace(/^\//, "")));
  if (fs.existsSync(dest)) {
    skipped++;
    continue;
  }
  const srcPath = entry.copyFrom || entry.featured;
  const src = path.join(process.cwd(), "public", srcPath.replace(/^\//, ""));
  if (!fs.existsSync(src)) {
    console.error(`Missing source for ${slug}: ${srcPath}`);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  created++;
}

console.log(`Blog images: ${created} created, ${skipped} already present (${Object.keys(registry).length} registry entries).`);
