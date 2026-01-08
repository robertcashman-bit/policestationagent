#!/usr/bin/env node
/**
 * Clean specific text from blog post 37 and find large icons
 */

const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "web44ai.db");
const db = new Database(dbPath);

// Get post 37
const post = db.prepare("SELECT id, title, content FROM blog_posts WHERE id = 37").get();
console.log("Processing:", post.title);
console.log("Original content length:", post.content.length);

let content = post.content;

// Remove the promotional paragraph about calling 07897 015550
// The pattern is: <div data-breakout="normal"><p ...>If you require police station representation...</p></div>
const promoRegex =
  /<div[^>]*data-breakout[^>]*>[\s\S]*?If you require police station representation in the Kent area[\s\S]*?<\/p>[\s\S]*?<\/div>/gi;
const matches = content.match(promoRegex);

if (matches) {
  console.log("Found promotional text blocks:", matches.length);
  content = content.replace(promoRegex, "");
} else {
  // Try a simpler pattern
  const simplePattern =
    /<p[^>]*>[\s\S]*?If you require police station representation in the Kent area[\s\S]*?<\/p>/gi;
  const simpleMatches = content.match(simplePattern);
  if (simpleMatches) {
    console.log("Found with simple pattern:", simpleMatches.length);
    content = content.replace(simplePattern, "");
  }
}

// Also remove any empty divs left behind
content = content.replace(
  /<div[^>]*data-hook="rcv-block\d+"[^>]*><\/div>\s*<div[^>]*data-hook="rcv-block\d+"[^>]*><\/div>/gi,
  ""
);

// Update the database
if (content !== post.content) {
  const updateStmt = db.prepare("UPDATE blog_posts SET content = ? WHERE id = ?");
  updateStmt.run(content, post.id);
  console.log("Updated content length:", content.length);
  console.log("Removed", post.content.length - content.length, "characters");
} else {
  console.log("No changes made");
}

// Now look for any large SVGs in all posts
console.log("\n--- Checking for large SVG icons in all blog posts ---\n");

const allPosts = db.prepare("SELECT id, title, content FROM blog_posts").all();
allPosts.forEach((p) => {
  // Find SVGs with width/height > 100
  const svgPattern = /<svg[^>]*>/gi;
  let match;
  while ((match = svgPattern.exec(p.content)) !== null) {
    const svgTag = match[0];
    const widthMatch = svgTag.match(/width=["']?(\d+)/i);
    const heightMatch = svgTag.match(/height=["']?(\d+)/i);
    const w = widthMatch ? parseInt(widthMatch[1]) : 0;
    const h = heightMatch ? parseInt(heightMatch[1]) : 0;

    if (w > 100 || h > 100) {
      console.log("Large SVG in:", p.title);
      console.log("  Size:", w, "x", h);
    }
  }
});

db.close();
console.log("\nDone!");
