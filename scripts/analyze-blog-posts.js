const fs = require("fs");
const path = require("path");

const posts = JSON.parse(fs.readFileSync("data/blog-posts-full.json", "utf8"));

console.log(`Total blog posts: ${posts.length}\n`);

const postsWithIssues = [];

posts.forEach((p, i) => {
  const content = p.content || "";
  const textOnly = content
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = textOnly.split(" ").filter((w) => w.length > 0).length;

  const hasAdvertRef =
    textOnly.toLowerCase().includes("policestationrep") ||
    textOnly.toLowerCase().includes("policestationagent") ||
    textOnly.toLowerCase().includes("robert cashman");

  const isIncomplete = wordCount < 200 || content.trim().length < 500;

  if (isIncomplete || !hasAdvertRef) {
    postsWithIssues.push({
      id: p.id,
      slug: p.slug,
      title: p.title,
      wordCount,
      hasAdvertRef,
      isIncomplete,
      contentLength: content.length,
    });
  }

  console.log(`${i + 1}. [${p.slug}]`);
  console.log(`   Title: ${p.title.substring(0, 60)}`);
  console.log(`   Words: ${wordCount}, Content length: ${content.length}`);
  console.log(`   Has advert ref: ${hasAdvertRef}, Incomplete: ${isIncomplete}`);
  console.log("");
});

console.log(`\n=== POSTS NEEDING ATTENTION: ${postsWithIssues.length} ===\n`);
postsWithIssues.forEach((p) => {
  console.log(`- [${p.slug}] ${p.title}`);
  console.log(
    `  Words: ${p.wordCount}, Has advert: ${p.hasAdvertRef}, Incomplete: ${p.isIncomplete}`
  );
});
