#!/usr/bin/env node
/**
 * Regenerate Buffer calendar for 10 new SEO click-driving blog posts (public voice).
 */
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "seo-growth-police-station-agent", "buffer");
const BASE = "https://www.policestationagent.com";

const blogPosts = [
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

const cornerstone = [
  { path: "/voluntary-police-interview", label: "Voluntary police interview advice" },
  { path: "/free-police-station-advice-kent", label: "Free police station advice in Kent" },
  { path: "/kent-police-station-reps", label: "Kent police station reps hub" },
];

function imageForSlug(slug) {
  const map = {
    "voluntary-interview-letter-kent-what-to-do": "blog-listing-1.png",
    "is-police-station-legal-advice-free-kent": "blog-listing-0.jpg",
    "police-station-rep-near-me-kent": "types-of-offences-police-station-featured.jpg",
    "maidstone-voluntary-interview-mid-kent-legal-advice": "blog-listing-5.png",
    "canterbury-custody-legal-advice-kent": "domestic-allegations-police-stage-featured.jpg",
    "sevenoaks-voluntary-interview-legal-advice-kent": "blog-listing-4.png",
    "folkestone-custody-legal-advice-kent": "drug-allegations-police-stage-featured.jpg",
    "qualified-duty-solicitor-vs-police-station-rep-kent": "blog-listing-7.png",
    "police-warrant-arrest-kent-what-to-do": "violence-public-order-featured.jpg",
    "no-further-action-after-police-interview-kent": "blog-listing-2.png",
  };
  return map[slug] || "blog-listing-0.jpg";
}

function appendUtm(url, slug) {
  const u = new URL(url);
  u.searchParams.set("utm_source", "buffer");
  u.searchParams.set("utm_medium", "social");
  u.searchParams.set("utm_campaign", `click_blog_${slug || "cornerstone"}`);
  return u.toString();
}

function addDays(iso, days) {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const start = "2026-06-17";
const items = [];
let day = 0;

for (const p of blogPosts) {
  const url = appendUtm(`${BASE}/blog/${p.slug}`, p.slug);
  for (let i = 0; i < 2; i++) {
    items.push({
      date: addDays(start, day),
      type: "blog",
      slug: p.slug,
      url,
      text: `${p.label}. Free legal advice at Kent police stations — NOT Kent Police. ${url}`,
      hashtags: "#Kent #PoliceStation #LegalAdvice #DutySolicitor",
      image: `${BASE}/blog-images/${imageForSlug(p.slug)}`,
    });
    day += 4;
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
    image: `${BASE}/og-image.jpg`,
  });
  day += 5;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "buffer-posts.json"), JSON.stringify(items, null, 2));

const csv = [
  "date,type,slug,url,text,hashtags,image",
  ...items.map((i) =>
    [i.date, i.type, i.slug, i.url, `"${i.text.replace(/"/g, '""')}"`, `"${i.hashtags}"`, i.image].join(","),
  ),
].join("\n");
fs.writeFileSync(path.join(OUT, "buffer-posts.csv"), csv);

const calLines = items.map((i) => `| ${i.date} | ${i.type} | ${i.url} | ${i.text.slice(0, 70)}… |`);
const calMd = `# 90-day content calendar

Generated ${new Date().toISOString().slice(0, 10)}. Public-facing posts promoting 10 new SEO click-driving blog articles and 3 cornerstone pages.

| Date | Type | URL | Summary |
|------|------|-----|---------|
${calLines.join("\n")}
`;
fs.writeFileSync(path.join(process.cwd(), "seo-growth-police-station-agent", "content-calendar-90-days.md"), calMd);
fs.writeFileSync(path.join(process.cwd(), "seo-growth-police-station-agent", "content-calendar-90-days.csv"), csv);

console.log(`Wrote ${items.length} buffer/calendar entries for 10 click-driving blog posts`);
