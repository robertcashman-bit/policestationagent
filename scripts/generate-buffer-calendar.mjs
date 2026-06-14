#!/usr/bin/env node
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "seo-growth-police-station-agent", "buffer");
const BASE = "https://policestationagent.com";

const posts = [
  { slug: "instructing-a-police-station-representative", label: "Instructing a rep" },
  { slug: "custody-record-number-dscc-reference", label: "DSCC & custody record" },
  { slug: "when-to-instruct-police-station-agent", label: "When to instruct" },
  { slug: "police-station-attendance-notes", label: "Attendance notes" },
  { slug: "freelance-police-station-agents-for-solicitors", label: "Freelance agents" },
  {
    slug: "police-station-cover-criminal-defence-firms-kent-medway",
    label: "Kent & Medway firm cover",
  },
];

const cornerstone = [
  { path: "/for-solicitors", label: "Police station cover for solicitors" },
  { path: "/dscc-and-custody-record-support", label: "DSCC guide" },
  { path: "/kent-police-station-reps", label: "Kent reps hub" },
];

function addDays(iso, days) {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const start = "2026-06-16";
const items = [];
let day = 0;

for (const p of posts) {
  for (let i = 0; i < 2; i++) {
    items.push({
      date: addDays(start, day),
      type: "blog",
      url: `${BASE}/blog/${p.slug}`,
      text: `${p.label} — practical guide for criminal defence firms instructing Kent police station cover. ${BASE}/blog/${p.slug}`,
      hashtags: "#Kent #PoliceStation #CriminalDefence",
    });
    day += 5;
  }
}

for (const c of cornerstone) {
  items.push({
    date: addDays(start, day),
    type: "page",
    url: `${BASE}${c.path}`,
    text: `${c.label} — police station agent cover across Kent & Medway. NOT the police. ${BASE}${c.path}`,
    hashtags: "#Kent #Solicitors #PoliceStation",
  });
  day += 7;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "buffer-posts.json"), JSON.stringify(items, null, 2));

const csv = [
  "date,type,url,text,hashtags",
  ...items.map((i) =>
    [i.date, i.type, i.url, `"${i.text.replace(/"/g, '""')}"`, `"${i.hashtags}"`].join(","),
  ),
].join("\n");
fs.writeFileSync(path.join(OUT, "buffer-posts.csv"), csv);

const calLines = items.map(
  (i) => `| ${i.date} | ${i.type} | ${i.url} | ${i.text.slice(0, 80)}… |`,
);
const calMd = `# 90-day content calendar

Generated ${new Date().toISOString().slice(0, 10)}. Social posts promote new blog articles and cornerstone pages only (no duplicate content).

| Date | Type | URL | Summary |
|------|------|-----|---------|
${calLines.join("\n")}
`;
fs.writeFileSync(
  path.join(process.cwd(), "seo-growth-police-station-agent", "content-calendar-90-days.md"),
  calMd,
);
fs.writeFileSync(
  path.join(process.cwd(), "seo-growth-police-station-agent", "content-calendar-90-days.csv"),
  csv,
);

console.log(`Wrote ${items.length} buffer/calendar entries`);
