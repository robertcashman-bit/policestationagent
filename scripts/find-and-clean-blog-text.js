#!/usr/bin/env node
/**
 * Find and clean specific text from blog posts
 */

const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "web44ai.db");
const db = new Database(dbPath);

// Search for the text and octagon icons in blog posts
const searchPatterns = [
  "07897 015550",
  "police station representation in the Kent area",
  "lucide-octagon",
  "octagon",
  "stop-circle",
];

console.log("Searching for patterns in blog posts...\n");

searchPatterns.forEach((pattern) => {
  const posts = db
    .prepare(`SELECT id, title FROM blog_posts WHERE content LIKE ?`)
    .all(`%${pattern}%`);
  if (posts.length > 0) {
    console.log(`Pattern: "${pattern}"`);
    console.log(`Found in ${posts.length} posts:`);
    posts.forEach((p) => console.log(`  - ID: ${p.id}, Title: ${p.title}`));
    console.log("");
  }
});

// Now let's clean them
console.log("\n--- Cleaning blog posts ---\n");

// Get all posts and clean them
const allPosts = db
  .prepare(
    "SELECT id, title, content FROM blog_posts WHERE content LIKE ? OR content LIKE ? OR content LIKE ?"
  )
  .all("%07897 015550%", "%police station representation in the Kent area%", "%lucide-octagon%");

let cleanedCount = 0;

const updateStmt = db.prepare("UPDATE blog_posts SET content = ? WHERE id = ?");

allPosts.forEach((post) => {
  let content = post.content;
  let modified = false;

  // Remove the specific promotional text - looking for patterns like:
  // "If you require police station representation in the Kent area, please call Robert Cashman on 07897 015550"
  const promoPatterns = [
    /<p[^>]*>If you require police station representation in the Kent area[^<]*<\/p>/gi,
    /If you require police station representation in the Kent area[^.]*\./gi,
    // Also remove any octagon/stop sign icons that are too big
    /<svg[^>]*lucide-octagon[^>]*>[\s\S]*?<\/svg>/gi,
  ];

  promoPatterns.forEach((pattern) => {
    if (content.match(pattern)) {
      content = content.replace(pattern, "");
      modified = true;
    }
  });

  if (modified) {
    updateStmt.run(content, post.id);
    console.log(`Cleaned: ${post.title}`);
    cleanedCount++;
  }
});

console.log(`\nCleaned ${cleanedCount} posts`);

db.close();
