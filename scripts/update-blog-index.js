const fs = require("fs");
const path = require("path");

// Read current blogIndex
const blogIndexPath = path.join(process.cwd(), "data", "blogIndex.js");
const content = fs.readFileSync(blogIndexPath, "utf-8");

// Extract existing entries
const entries = [];
const entryRegex =
  /\{\s*"title":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"category":\s*"([^"]+)"\s*\}/g;
let match;
while ((match = entryRegex.exec(content)) !== null) {
  entries.push({
    title: match[1],
    slug: match[2],
    category: match[3],
  });
}

// Remove duplicates (keep first occurrence)
const seen = new Map();
const uniqueEntries = [];

entries.forEach((entry) => {
  const key = entry.title.toLowerCase().trim();
  if (!seen.has(key)) {
    seen.set(key, true);
    uniqueEntries.push(entry);
  } else {
    console.log(`Removing duplicate: "${entry.title}" (${entry.slug})`);
  }
});

console.log(`\nRemoved ${entries.length - uniqueEntries.length} duplicate entries`);
console.log(`Remaining entries: ${uniqueEntries.length}`);

// Add new candidates
const candidates = [
  {
    route: "/arrested-what-to-do",
    title: "Arrested in Kent? What to Do",
    category: "Your Legal Rights",
  },
  {
    route: "/arrival-times-delays",
    title: "Arrival Times & Delays",
    category: "Your Legal Rights",
  },
  {
    route: "/article-interview-under-caution",
    title: "What Happens During Interview Under Caution?",
    category: "Police Interview & Procedure",
  },
  {
    route: "/article-loved-one-arrested-kent",
    title: "What To Do If a Loved One Is Arrested in Kent",
    category: "Your Legal Rights",
  },
  {
    route: "/article-police-caution-before-interview",
    title: "The Police Caution Before Interview",
    category: "Police Interview & Procedure",
  },
  {
    route: "/article-rights-kent-police-station-2025",
    title: "Your Rights in a Kent Police Station (2025 Guide)",
    category: "Your Legal Rights",
  },
  {
    route: "/booking-in-procedure-in-kent",
    title: "Booking In Procedure in Kent",
    category: "Police Bail & Custody",
  },
  {
    route: "/kent-police-station-reps",
    title: "Police Station Representatives in Kent",
    category: "Police Bail & Custody",
  },
  {
    route: "/kent-police-stations",
    title: "Kent Police Stations Guide 2025",
    category: "Police Bail & Custody",
  },
  {
    route: "/out-of-area",
    title: "Detained Outside Kent? What To Do",
    category: "Police Station Advice",
  },
  {
    route: "/police-station-interviews-kent-rights",
    title: "Police Station Interviews in Kent: Your Rights and What to Expect",
    category: "Police Interview & Procedure",
  },
  {
    route: "/psastations",
    title: "Kent Police Station Coverage",
    category: "Police Bail & Custody",
  },
  {
    route: "/services/bail-applications",
    title: "Bail Applications Kent",
    category: "Police Bail & Custody",
  },
  {
    route: "/services/pre-charge-advice",
    title: "Pre-Charge Advice Kent",
    category: "Police Station Advice",
  },
  {
    route: "/what-to-do-if-a-loved-one-is-arrested",
    title: "What to Do If a Loved One is Arrested",
    category: "Your Legal Rights",
  },
];

// Check for duplicates before adding
candidates.forEach((candidate) => {
  const slug = candidate.route === "/" ? "/" : candidate.route.replace(/\/$/, "");
  const existing = uniqueEntries.find(
    (e) =>
      e.slug.toLowerCase() === slug.toLowerCase() ||
      e.title.toLowerCase() === candidate.title.toLowerCase()
  );

  if (existing) {
    console.log(`Skipping candidate (already exists): "${candidate.title}"`);
  } else {
    uniqueEntries.push({
      title: candidate.title,
      slug: slug,
      category: candidate.category,
    });
    console.log(`Adding: "${candidate.title}" -> ${candidate.category}`);
  }
});

// Sort by category, then alphabetically by title
const categoryOrder = [
  "Police Interview & Procedure",
  "Police Bail & Custody",
  "Your Legal Rights",
  "Criminal Defence Guidance",
  "Duty Solicitor & Representation",
  "Police Station Advice",
  "Updates & Commentary",
];

const sortedEntries = [];
categoryOrder.forEach((category) => {
  const categoryEntries = uniqueEntries
    .filter((e) => e.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
  sortedEntries.push(...categoryEntries);
});

// Generate new blogIndex.js content
const header = `/**
 * BLOG INDEX - SINGLE SOURCE OF TRUTH
 * 
 * This file contains all blog posts categorized for the dropdown menu.
 * 
 * To add a new blog post:
 * 1. Add it to the database (it will appear automatically if published = 1)
 * 2. Run: node scripts/generate-blog-index.js
 * 3. The post will be automatically categorized and added here
 * 
 * Generated: ${new Date().toISOString()}
 * Total Posts: ${sortedEntries.length}
 */

export const blogPosts = [
`;

const entriesJs = sortedEntries
  .map((entry) => {
    return `  {
    "title": ${JSON.stringify(entry.title)},
    "slug": ${JSON.stringify(entry.slug)},
    "category": ${JSON.stringify(entry.category)}
  }`;
  })
  .join(",\n");

const footer = `];

// Category order for display
export const categoryOrder = [
  "Police Interview & Procedure",
  "Police Bail & Custody",
  "Your Legal Rights",
  "Criminal Defence Guidance",
  "Duty Solicitor & Representation",
  "Police Station Advice",
  "Updates & Commentary"
];
`;

const newContent = header + entriesJs + "\n" + footer;

// Write back
fs.writeFileSync(blogIndexPath, newContent, "utf-8");

console.log(`\n✅ Updated blogIndex.js`);
console.log(`   Total entries: ${sortedEntries.length}`);
console.log(`   Entries by category:`);
categoryOrder.forEach((cat) => {
  const count = sortedEntries.filter((e) => e.category === cat).length;
  if (count > 0) {
    console.log(`     ${cat}: ${count}`);
  }
});
