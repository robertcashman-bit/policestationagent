const fs = require("fs");
const path = require("path");

const blogPostsPath = path.join(__dirname, "..", "data", "blog-posts-full.json");
const posts = JSON.parse(fs.readFileSync(blogPostsPath, "utf8"));

function getCharCount(html) {
  if (!html) return 0;
  return html.replace(/<[^>]*>/g, "").trim().length;
}

function getImageCount(html) {
  if (!html) return 0;
  return (html.match(/<img[^>]*>/gi) || []).length;
}

console.log("=== CURRENT BLOG POST ANALYSIS ===\n");
const needsWork = [];

posts.forEach((p, i) => {
  const chars = getCharCount(p.content);
  const images = getImageCount(p.content);
  const status = chars >= 1500 && chars <= 2500 && images === 1 ? "✓" : "✗";

  if (chars < 1500 || chars > 2500 || images !== 1) {
    needsWork.push({ ...p, charCount: chars, imageCount: images });
  }

  if (i < 10) {
    console.log(`${i + 1}. [${status}] ${p.slug.substring(0, 50)}`);
    console.log(`   Characters: ${chars}, Images: ${images}`);
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total posts: ${posts.length}`);
console.log(`Posts needing work: ${needsWork.length}`);
console.log(`\nBreakdown:`);
console.log(`- Posts < 1500 chars: ${posts.filter((p) => getCharCount(p.content) < 1500).length}`);
console.log(`- Posts > 2500 chars: ${posts.filter((p) => getCharCount(p.content) > 2500).length}`);
console.log(
  `- Posts with != 1 image: ${posts.filter((p) => getImageCount(p.content) !== 1).length}`
);

if (needsWork.length > 0) {
  console.log(`\n=== POSTS NEEDING WORK ===`);
  needsWork.slice(0, 10).forEach((p) => {
    console.log(`- ${p.slug}: ${p.charCount} chars, ${p.imageCount} images`);
  });
}
