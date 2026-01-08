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

function getImageCount(html) {
  if (!html) return 0;
  return (html.match(/<img[^>]*>/gi) || []).length;
}

// Function to ensure exactly one image
function ensureSingleImage(content, title) {
  const images = content.match(/<img[^>]*>/gi) || [];

  if (images.length === 0) {
    // Determine appropriate image
    const titleLower = title.toLowerCase();
    let imagePath = "/blog-images/blog-listing-5.png";

    if (titleLower.includes("bail")) imagePath = "/blog-images/blog-listing-0.jpg";
    else if (titleLower.includes("voluntary") || titleLower.includes("interview"))
      imagePath = "/blog-images/blog-listing-1.png";
    else if (titleLower.includes("duty solicitor")) imagePath = "/blog-images/blog-listing-2.png";
    else if (titleLower.includes("property")) imagePath = "/blog-images/blog-listing-3.png";
    else if (titleLower.includes("caution")) imagePath = "/blog-images/blog-listing-4.png";

    const imageHtml = `<figure class="blog-image">
  <img src="${imagePath}" alt="${title}" loading="lazy" width="800" height="400" />
  <figcaption>${title}</figcaption>
</figure>`;

    // Insert after first H2
    if (content.includes("<h2>")) {
      const h2Index = content.indexOf("<h2>");
      const afterH2 = content.indexOf(">", h2Index) + 1;
      return content.slice(0, afterH2) + "\n" + imageHtml + "\n" + content.slice(afterH2);
    } else {
      return imageHtml + "\n" + content;
    }
  } else if (images.length > 1) {
    // Keep only the first image
    let result = content;
    for (let i = 1; i < images.length; i++) {
      result = result.replace(images[i], "");
      // Remove surrounding figure tags if empty
      result = result.replace(/<figure[^>]*>\s*<\/figure>/gi, "");
    }
    return result;
  }

  return content;
}

// Process all posts
let updated = 0;
const enhancedPosts = posts.map((post) => {
  let content = post.content || "";
  const currentImages = getImageCount(content);

  if (currentImages !== 1) {
    content = ensureSingleImage(content, post.title);
    updated++;
  }

  if (content !== post.content) {
    return { ...post, content };
  }

  return post;
});

// Write enhanced posts
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Fixed images for ${updated} blog posts.`);

// Final verification
const stats = {
  correctLength: 0,
  correctImages: 0,
  hasReferences: 0,
  perfect: 0,
};

enhancedPosts.forEach((post) => {
  const chars = getCharCount(post.content);
  const images = getImageCount(post.content);
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

if (stats.perfect === enhancedPosts.length) {
  console.log(`\n✅ ALL BLOG POSTS MEET ALL REQUIREMENTS!`);
} else {
  const needsWork = enhancedPosts.filter((p) => {
    const chars = getCharCount(p.content);
    const images = getImageCount(p.content);
    const hasRefs = p.content && p.content.includes("<h2>References</h2>");
    return chars < 1500 || chars > 2500 || images !== 1 || !hasRefs;
  });

  console.log(`\n=== REMAINING ISSUES: ${needsWork.length} ===`);
  needsWork.forEach((p) => {
    const chars = getCharCount(p.content);
    const images = getImageCount(p.content);
    const hasRefs = p.content && p.content.includes("<h2>References</h2>");
    console.log(`${p.slug}: ${chars} chars, ${images} images, refs: ${hasRefs}`);
  });
}
