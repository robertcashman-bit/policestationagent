#!/usr/bin/env node
/** Generate authority guide companion blog posts from scripts/lib/authority-guide-blogs.mjs */
import fs from "fs";
import path from "path";
import { AUTHORITY_BLOGS } from "./lib/authority-guide-blogs.mjs";
import { auditPostForPublish } from "./lib/legal-publish-audit.mjs";

const OUT = path.join(process.cwd(), "data", "blog-posts");
const REGISTRY = path.join(process.cwd(), "data", "blog-image-registry.json");
const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf-8"));

let written = 0;
const failures = [];

for (const def of AUTHORITY_BLOGS) {
  const imgEntry = registry[def.slug];
  if (!imgEntry) {
    failures.push(`${def.slug}: missing from blog-image-registry.json`);
    continue;
  }

  const img = {
    path: imgEntry.featured,
    alt: imgEntry.alt,
    caption: imgEntry.alt,
  };

  const post = {
    id: `${def.date}-${def.slug}`,
    title: def.title,
    slug: def.slug,
    date: def.date,
    category: def.category,
    primaryKeyword: def.primaryKeyword,
    secondaryKeywords: def.secondaryKeywords,
    location: "Kent",
    metaTitle: def.metaTitle,
    metaDescription: def.metaDescription,
    featuredImage: imgEntry.featured,
    featuredImageAlt: imgEntry.alt,
    contentHtml: def.build(img),
    faq: def.faq,
    author: "Robert Cashman",
    status: "published",
  };

  const audit = auditPostForPublish(post);
  if (!audit.ok) {
    failures.push(`${def.slug}: ${audit.issues?.join("; ")}`);
    continue;
  }

  const fp = path.join(OUT, `${def.date}-${def.slug}.json`);
  fs.writeFileSync(fp, JSON.stringify(post, null, 2) + "\n");
  written++;
}

if (failures.length) {
  console.error("Authority blog generation failures:");
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(`Generated ${written} authority guide blog posts.`);
