const fs = require("fs");
const path = require("path");

const blogPostsPath = path.join(__dirname, "..", "data", "blog-posts-full.json");
const posts = JSON.parse(fs.readFileSync(blogPostsPath, "utf8"));

function getCharCount(html) {
  if (!html) return 0;
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

function trimToTarget(content, targetLength) {
  const currentLength = getCharCount(content);
  if (currentLength <= targetLength) return content;

  // Find references section
  const refIndex = content.indexOf("<h2>References</h2>");
  if (refIndex === -1) return content; // Can't trim without references

  const mainContent = content.substring(0, refIndex);
  const refsSection = content.substring(refIndex);

  // Calculate available length for main content
  const refsLength = getCharCount(refsSection);
  const availableLength = targetLength - refsLength - 100; // Buffer

  // Extract paragraphs and headings
  const elements = [];
  const regex = /<(h[23]|p)[^>]*>[\s\S]*?<\/\1>/gi;
  let match;

  while ((match = regex.exec(mainContent)) !== null) {
    elements.push({
      html: match[0],
      text: match[0]
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
      index: match.index,
    });
  }

  // Build content up to target length
  let result = "";
  let charCount = 0;

  for (const elem of elements) {
    if (charCount + elem.text.length <= availableLength) {
      result += elem.html + "\n";
      charCount += elem.text.length;
    } else {
      // Try to include part of this element if it's a paragraph
      if (elem.html.startsWith("<p>")) {
        const text = elem.text;
        const maxText = availableLength - charCount;
        if (maxText > 100) {
          // Include partial paragraph
          const partialText = text.substring(0, maxText);
          const lastSentence = partialText.lastIndexOf(".");
          if (lastSentence > maxText * 0.7) {
            result += `<p>${partialText.substring(0, lastSentence + 1)}</p>\n`;
          }
        }
      }
      break;
    }
  }

  return result.trim() + "\n\n" + refsSection;
}

// Process posts that are too long
let updated = 0;
const enhancedPosts = posts.map((post) => {
  const currentChars = getCharCount(post.content);

  if (currentChars > 2500) {
    const trimmed = trimToTarget(post.content, 2500);
    if (trimmed !== post.content) {
      updated++;
      return { ...post, content: trimmed };
    }
  }

  return post;
});

// Write enhanced posts
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Trimmed ${updated} blog posts to meet 2500 character limit.`);

// Final verification
const stats = {
  correctLength: 0,
  correctImages: 0,
  hasReferences: 0,
  perfect: 0,
};

enhancedPosts.forEach((post) => {
  const chars = getCharCount(post.content);
  const images = (post.content.match(/<img[^>]*>/gi) || []).length;
  const hasRefs = post.content && post.content.includes("<h2>References</h2>");

  if (chars >= 1500 && chars <= 2500) stats.correctLength++;
  if (images === 1) stats.correctImages++;
  if (hasRefs) stats.hasReferences++;
  if (chars >= 1500 && chars <= 2500 && images === 1 && hasRefs) stats.perfect++;
});

console.log(`\n=== FINAL VERIFICATION ===`);
console.log(
  `Posts with correct length (1500-2500 chars): ${stats.correctLength}/${enhancedPosts.length}`
);
console.log(`Posts with exactly 1 image: ${stats.correctImages}/${enhancedPosts.length}`);
console.log(`Posts with references: ${stats.hasReferences}/${enhancedPosts.length}`);
console.log(`Perfect posts (all criteria): ${stats.perfect}/${enhancedPosts.length}`);

if (stats.perfect < enhancedPosts.length) {
  const needsWork = enhancedPosts.filter((p) => {
    const chars = getCharCount(p.content);
    const images = (p.content.match(/<img[^>]*>/gi) || []).length;
    const hasRefs = p.content && p.content.includes("<h2>References</h2>");
    return chars < 1500 || chars > 2500 || images !== 1 || !hasRefs;
  });

  console.log(`\n=== REMAINING ISSUES: ${needsWork.length} ===`);
  needsWork.forEach((p) => {
    const chars = getCharCount(p.content);
    const images = (p.content.match(/<img[^>]*>/gi) || []).length;
    const hasRefs = p.content && p.content.includes("<h2>References</h2>");
    console.log(`${p.slug}: ${chars} chars, ${images} images, refs: ${hasRefs}`);
  });
}
