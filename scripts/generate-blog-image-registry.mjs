#!/usr/bin/env node
/** Generate data/blog-image-registry.json with unique slug-based image paths. */
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const OUT = path.join(process.cwd(), "data", "blog-image-registry.json");

const TOPIC_SOURCES = {
  "domestic-allegations-police-station-stage": "/blog-images/domestic-allegations-police-stage-featured.jpg",
  "drug-allegations-police-station-interviews": "/blog-images/drug-allegations-police-stage-featured.jpg",
  "motoring-driving-allegations-police-station": "/blog-images/motoring-driving-police-station-featured.jpg",
  "sexual-allegations-police-station-stage": "/blog-images/sexual-allegations-police-stage-featured.jpg",
  "theft-fraud-financial-police-station": "/blog-images/theft-fraud-financial-featured.jpg",
  "violence-public-order-police-station-stage": "/blog-images/violence-public-order-featured.jpg",
  "types-of-offences-police-station-stage": "/blog-images/types-of-offences-police-station-featured.jpg",
  "what-happens-if-charged-criminal-offence-court": "/blog-images/magistrates-court-first-hearing-featured.jpg",
  "how-digital-evidence-voluntary-police-interview": "/blog-images/types-of-offences-police-station-featured.jpg",
  "folkestone-custody-legal-advice-kent": "/blog-images/blog-listing-5.png",
  "canterbury-custody-legal-advice-kent": "/blog-images/blog-listing-4.png",
  "police-warrant-arrest-kent-what-to-do": "/blog-images/blog-listing-2.png",
  "police-station-rep-near-me-kent": "/blog-images/blog-listing-0.jpg",
  "police-station-cover-firms-kent-medway": "/blog-images/blog-listing-3.png",
};

const AUTHORITY_NEW = {
  "can-police-take-my-phone-kent": {
    copyFrom: "/blog-images/types-of-offences-police-station-featured.jpg",
    alt: "Police phone seizure at a Kent custody suite — general information",
  },
  "police-bail-explained-kent": {
    copyFrom: "/blog-images/blog-listing-2.png",
    alt: "Police bail explained for Kent police station attendance",
  },
  "no-comment-interview-kent": {
    copyFrom: "/blog-images/violence-public-order-featured.jpg",
    alt: "No comment interview advice at Kent police stations",
  },
  "prepared-statements-kent": {
    copyFrom: "/blog-images/blog-listing-1.png",
    alt: "Prepared statements in Kent police interviews",
  },
  "adverse-inference-kent": {
    copyFrom: "/blog-images/blog-listing-7.png",
    alt: "Adverse inference and silence in police interview — Kent guide",
  },
  "custody-time-limits-kent": {
    copyFrom: "/blog-images/blog-listing-5.png",
    alt: "Custody time limits at Kent police stations",
  },
  "pace-code-c-kent-guide": {
    copyFrom: "/blog-images/blog-listing-3.png",
    alt: "PACE Code C rights in Kent police custody",
  },
  "youth-custody-rights-kent": {
    copyFrom: "/blog-images/blog-listing-4.png",
    alt: "Youth custody rights at Kent police stations",
  },
  "appropriate-adult-kent": {
    copyFrom: "/blog-images/domestic-allegations-police-stage-featured.jpg",
    alt: "Appropriate adult at Kent police station interviews",
  },
  "dna-fingerprints-police-station-kent": {
    copyFrom: "/blog-images/drug-allegations-police-stage-featured.jpg",
    alt: "DNA and fingerprints at Kent police stations",
  },
};

function extFor(src) {
  return src.endsWith(".png") ? ".png" : ".jpg";
}

const registry = {};

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"))) {
  const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
  const slug = post.slug;
  const current = post.featuredImage || "/blog-images/default.jpg";
  const topicSrc = TOPIC_SOURCES[slug] || current;
  const ext = extFor(topicSrc);
  const featured = `/blog-images/${slug}-featured${ext}`;
  registry[slug] = {
    featured,
    alt: post.featuredImageAlt || post.title,
    copyFrom: topicSrc,
  };
}

for (const [slug, entry] of Object.entries(AUTHORITY_NEW)) {
  const ext = extFor(entry.copyFrom);
  registry[slug] = {
    featured: `/blog-images/${slug}-featured${ext}`,
    alt: entry.alt,
    copyFrom: entry.copyFrom,
  };
}

fs.writeFileSync(OUT, JSON.stringify(registry, null, 2) + "\n");
console.log(`Wrote ${Object.keys(registry).length} entries to blog-image-registry.json`);
