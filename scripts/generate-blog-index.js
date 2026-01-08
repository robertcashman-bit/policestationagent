/**
 * Generate Blog Index
 *
 * Extracts all published blog posts from the database and creates
 * a categorized index file for the dropdown menu.
 */

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "..", "data", "web44ai.db");
const outputPath = path.join(__dirname, "..", "data", "blogIndex.js");

// Category mapping function - categorizes posts based on title/keywords
function categorizePost(title) {
  const titleLower = title.toLowerCase();

  // Police Interview & Procedure
  if (
    titleLower.includes("interview") ||
    titleLower.includes("procedure") ||
    titleLower.includes("what to expect") ||
    titleLower.includes("preparing") ||
    titleLower.includes("refusing") ||
    titleLower.includes("ignoring") ||
    titleLower.includes("after interview") ||
    titleLower.includes("voluntary interview")
  ) {
    return "Police Interview & Procedure";
  }

  // Police Bail & Custody
  if (
    titleLower.includes("bail") ||
    titleLower.includes("custody") ||
    titleLower.includes("arrested") ||
    titleLower.includes("detention") ||
    titleLower.includes("release") ||
    titleLower.includes("booking")
  ) {
    return "Police Bail & Custody";
  }

  // Your Legal Rights
  if (
    titleLower.includes("rights") ||
    titleLower.includes("legal aid") ||
    titleLower.includes("free") ||
    titleLower.includes("entitlement") ||
    titleLower.includes("vulnerable") ||
    titleLower.includes("early legal advice")
  ) {
    return "Your Legal Rights";
  }

  // Criminal Defence Guidance
  if (
    titleLower.includes("defence") ||
    titleLower.includes("defense") ||
    titleLower.includes("criminal law") ||
    titleLower.includes("faq") ||
    titleLower.includes("guide") ||
    titleLower.includes("what is") ||
    titleLower.includes("solicitor") ||
    titleLower.includes("representation")
  ) {
    return "Criminal Defence Guidance";
  }

  // Duty Solicitor & Representation
  if (
    titleLower.includes("duty solicitor") ||
    titleLower.includes("police station rep") ||
    titleLower.includes("agent") ||
    titleLower.includes("24/7") ||
    titleLower.includes("kent") ||
    titleLower.includes("coverage") ||
    titleLower.includes("arrival")
  ) {
    return "Duty Solicitor & Representation";
  }

  // Police Station Advice
  if (
    titleLower.includes("police station") ||
    titleLower.includes("advice") ||
    titleLower.includes("help") ||
    titleLower.includes("emergency") ||
    titleLower.includes("loved one") ||
    titleLower.includes("family")
  ) {
    return "Police Station Advice";
  }

  // Default to Updates & Commentary
  return "Updates & Commentary";
}

// Main execution
try {
  const db = new Database(dbPath, { readonly: true });

  const posts = db
    .prepare(
      `
    SELECT id, title, slug 
    FROM blog_posts 
    WHERE published = 1 
    ORDER BY title ASC
  `
    )
    .all();

  console.log(`\n=== Generating Blog Index ===\n`);
  console.log(`Found ${posts.length} published blog posts\n`);

  // Categorize and structure posts
  const categorizedPosts = posts.map((post) => {
    const category = categorizePost(post.title);
    return {
      title: post.title.trim(),
      slug: `/blog/${post.slug}`,
      category: category,
    };
  });

  // Generate the JavaScript file
  const fileContent = `/**
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
 * Total Posts: ${categorizedPosts.length}
 */

export const blogPosts = ${JSON.stringify(categorizedPosts, null, 2)};

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

  // Write to file
  fs.writeFileSync(outputPath, fileContent, "utf8");

  // Show category breakdown
  const categoryCounts = {};
  categorizedPosts.forEach((post) => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
  });

  console.log("Category Breakdown:");
  console.log("==================");
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count} posts`);
    });

  console.log(`\n✅ Blog index generated: ${outputPath}`);
  console.log(`   Total posts: ${categorizedPosts.length}\n`);

  db.close();
} catch (error) {
  console.error("Error generating blog index:", error);
  process.exit(1);
}
