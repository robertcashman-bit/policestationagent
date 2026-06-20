#!/usr/bin/env node
/**
 * Regenerate Buffer calendar for SEO blog posts + authority guide blogs + cornerstone pages.
 */
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "seo-growth-police-station-agent", "buffer");
const REGISTRY = path.join(process.cwd(), "data", "blog-image-registry.json");
const BASE = "https://www.policestationagent.com";

const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf-8"));

const clickDriving = [
  { slug: "voluntary-interview-letter-kent-what-to-do", label: "Voluntary interview letter in Kent — what to do before you attend" },
  { slug: "is-police-station-legal-advice-free-kent", label: "Is police station legal advice really free in Kent?" },
  { slug: "police-station-rep-near-me-kent", label: "Police station rep near me in Kent" },
  { slug: "maidstone-voluntary-interview-mid-kent-legal-advice", label: "Maidstone voluntary interviews — custody closed, mid-Kent advice" },
  { slug: "canterbury-custody-legal-advice-kent", label: "Canterbury custody — free legal advice for families" },
  { slug: "sevenoaks-voluntary-interview-legal-advice-kent", label: "Sevenoaks voluntary interview legal advice" },
  { slug: "folkestone-custody-legal-advice-kent", label: "Folkestone custody legal advice — east Kent" },
  { slug: "qualified-duty-solicitor-vs-police-station-rep-kent", label: "Qualified duty solicitor vs police station rep in Kent" },
  { slug: "police-warrant-arrest-kent-what-to-do", label: "Police warrant or arrest in Kent — what to do first" },
  { slug: "no-further-action-after-police-interview-kent", label: "No further action after a Kent police interview" },
];

const authorityBlogs = [
  { slug: "can-police-take-my-phone-kent", label: "Can police take my phone at a Kent police station?" },
  { slug: "police-bail-explained-kent", label: "Police bail explained for Kent — conditions and time limits" },
  { slug: "no-comment-interview-kent", label: "No comment interview at a Kent police station" },
  { slug: "prepared-statements-kent", label: "Prepared statements in Kent police interviews" },
  { slug: "adverse-inference-kent", label: "Adverse inference after a Kent police interview" },
  { slug: "custody-time-limits-kent", label: "Custody time limits at Kent police stations" },
  { slug: "pace-code-c-kent-guide", label: "PACE Code C at Kent police stations" },
  { slug: "youth-custody-rights-kent", label: "Youth custody rights in Kent — under 18 guide" },
  { slug: "appropriate-adult-kent", label: "Appropriate adults at Kent police stations" },
  { slug: "dna-fingerprints-police-station-kent", label: "DNA and fingerprints at Kent police stations" },
  { slug: "unfitness-to-interview-pace-code-c-kent", label: "Unfitness to interview under PACE Code C — Kent" },
  { slug: "released-under-investigation-kent-plain-english", label: "Released under investigation in plain English — Kent" },
];

const cornerstone = [
  { path: "/can-police-take-my-phone", label: "Can police take my phone? Full UK guide" },
  { path: "/no-comment-interview", label: "No comment interview — full guide" },
  { path: "/police-bail-explained", label: "Police bail explained — full guide" },
  { path: "/voluntary-police-interview", label: "Voluntary police interview advice" },
  { path: "/free-police-station-advice-kent", label: "Free police station advice in Kent" },
];

function imageForSlug(slug) {
  const entry = registry[slug];
  if (entry?.featured) return `${BASE}${entry.featured}`;
  return `${BASE}/blog-images/default.jpg`;
}

function appendUtm(url, slug) {
  const u = new URL(url);
  u.searchParams.set("utm_source", "buffer");
  u.searchParams.set("utm_medium", "social");
  u.searchParams.set("utm_campaign", slug ? `click_blog_${slug}` : "click_cornerstone");
  return u.toString();
}

function addDays(iso, days) {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const start = "2026-06-21";
const items = [];
let day = 0;

const allBlogs = [...authorityBlogs, ...clickDriving];

for (const p of allBlogs) {
  const url = appendUtm(`${BASE}/blog/${p.slug}`, p.slug);
  for (let i = 0; i < 2; i++) {
    items.push({
      date: addDays(start, day),
      type: "blog",
      slug: p.slug,
      url,
      text: `${p.label}. Free legal advice at Kent police stations — NOT Kent Police. ${url}`,
      hashtags: "#Kent #PoliceStation #LegalAdvice #DutySolicitor",
      image: imageForSlug(p.slug),
    });
    day += 3;
  }
}

for (const c of cornerstone) {
  const slug = c.path.replace(/^\//, "").replace(/\//g, "-");
  const url = appendUtm(`${BASE}${c.path}`, slug);
  items.push({
    date: addDays(start, day),
    type: "page",
    slug,
    url,
    text: `${c.label}. Qualified duty solicitor cover across Kent. NOT the police. ${url}`,
    hashtags: "#Kent #DutySolicitor #PoliceStation",
    image: `${BASE}/blog-images/default.jpg`,
  });
  day += 4;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "buffer-posts.json"), JSON.stringify(items, null, 2) + "\n");

const csv = [
  "date,type,slug,url,text,hashtags,image",
  ...items.map((i) =>
    [i.date, i.type, i.slug, i.url, `"${i.text.replace(/"/g, '""')}"`, `"${i.hashtags}"`, i.image].join(","),
  ),
].join("\n");
fs.writeFileSync(path.join(OUT, "buffer-posts.csv"), csv + "\n");

console.log(`Wrote ${items.length} buffer/calendar entries (${authorityBlogs.length} authority + ${clickDriving.length} click-driving blogs + ${cornerstone.length} pages).`);
