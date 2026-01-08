const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "web44ai.db");
const db = new Database(dbPath, { readonly: false });

const posts = db
  .prepare(
    `
  SELECT id, title, content
  FROM blog_posts 
  WHERE published = 1
`
  )
  .all();

console.log(`\n=== FINDING AND REMOVING FACEBOOK/HEART SECTIONS ===\n`);
console.log(`Total posts: ${posts.length}\n`);

let updatedCount = 0;
const updateStmt = db.prepare(`
  UPDATE blog_posts 
  SET content = ?, updated_at = CURRENT_TIMESTAMP 
  WHERE id = ?
`);

const transaction = db.transaction((postsToUpdate) => {
  for (const { id, content } of postsToUpdate) {
    updateStmt.run(content, id);
  }
});

const postsToUpdate = [];

posts.forEach((post) => {
  let content = post.content || "";
  const originalLength = content.length;
  let removed = false;

  // Pattern: Look for any section that contains:
  // 1. Facebook (text, link, or SVG icon)
  // 2. Followed by any content
  // 3. Until a heart emoji (❤, &lt;3, &hearts;, or heart text)
  // 4. Including the heart

  // First, find all potential Facebook references
  const fbPatterns = [
    /facebook/i,
    /<svg[^>]*>[\s\S]*?M18[^>]*h-3[^>]*>[\s\S]*?<\/svg>/i, // Facebook icon SVG
    /<a[^>]*facebook[^>]*>[\s\S]*?<\/a>/i,
    /href=["'][^"']*facebook[^"']*["']/i,
  ];

  // Find heart patterns
  const heartPatterns = [/❤/, /&lt;3/, /&hearts;/, /&amp;lt;3/, /&amp;hearts;/];

  // Strategy: Find Facebook, then find the next heart after it, remove everything in between including both
  for (const fbPattern of fbPatterns) {
    const fbMatch = content.match(fbPattern);
    if (fbMatch) {
      const fbIndex = content.indexOf(fbMatch[0]);

      // Find the start of the containing element (go backwards to find opening tag)
      let startIndex = fbIndex;
      let searchStart = Math.max(0, fbIndex - 500);

      // Look for opening tags before Facebook
      const beforeFb = content.substring(searchStart, fbIndex);
      const lastOpenTag = beforeFb.lastIndexOf("<");
      if (lastOpenTag !== -1) {
        const tagContent = beforeFb.substring(lastOpenTag);
        const tagMatch = tagContent.match(/<(\w+)[^>]*>/);
        if (
          tagMatch &&
          ["div", "p", "section", "article", "span", "figure"].includes(tagMatch[1].toLowerCase())
        ) {
          startIndex = searchStart + lastOpenTag;
        }
      }

      // Find heart after Facebook
      const afterFb = content.substring(fbIndex);
      let heartIndex = -1;
      let heartLength = 0;

      for (const heartPattern of heartPatterns) {
        const heartMatch = afterFb.match(heartPattern);
        if (heartMatch) {
          heartIndex = fbIndex + afterFb.indexOf(heartMatch[0]);
          heartLength = heartMatch[0].length;
          break;
        }
      }

      if (heartIndex !== -1 && heartIndex > fbIndex) {
        // Find the end of the containing element (go forward to find closing tag)
        let endIndex = heartIndex + heartLength;
        const afterHeart = content.substring(endIndex);
        const firstCloseTag = afterHeart.indexOf("</");
        if (firstCloseTag !== -1) {
          const closeTagEnd = afterHeart.indexOf(">", firstCloseTag);
          if (closeTagEnd !== -1) {
            const tagName = afterHeart
              .substring(firstCloseTag + 2, closeTagEnd)
              .split(" ")[0]
              .toLowerCase();
            if (["div", "p", "section", "article", "span", "figure"].includes(tagName)) {
              endIndex = endIndex + closeTagEnd + 1;
            }
          }
        }

        // Remove the section
        content = content.substring(0, startIndex) + content.substring(endIndex);
        removed = true;
        console.log(
          `Post ID ${post.id}: Removed Facebook/heart section (${originalLength - content.length} chars)`
        );
        break;
      } else {
        // If no heart found, try to find a reasonable end point (like end of paragraph or div)
        // Look for closing tags after Facebook
        const afterFb2 = content.substring(fbIndex + fbMatch[0].length);
        const closeTagMatch = afterFb2.match(/<\/\w+>/);
        if (closeTagMatch) {
          const endIndex =
            fbIndex +
            fbMatch[0].length +
            afterFb2.indexOf(closeTagMatch[0]) +
            closeTagMatch[0].length;
          content = content.substring(0, startIndex) + content.substring(endIndex);
          removed = true;
          console.log(
            `Post ID ${post.id}: Removed Facebook section (no heart found, ${originalLength - content.length} chars)`
          );
          break;
        }
      }
    }
  }

  if (removed) {
    postsToUpdate.push({ id: post.id, content });
    updatedCount++;
  }
});

if (postsToUpdate.length > 0) {
  console.log(`\nUpdating ${postsToUpdate.length} posts...`);
  transaction(postsToUpdate);
  console.log(`✓ Successfully updated ${updatedCount} posts`);
} else {
  console.log("No Facebook/heart sections found. Let me check a sample post...");

  // Show a sample to help identify the pattern
  const sample = posts[0];
  if (sample) {
    const content = sample.content || "";
    const last2000 = content.substring(Math.max(0, content.length - 2000));
    console.log(`\nLast 2000 chars of post ID ${sample.id} ("${sample.title}"):`);
    console.log(last2000);
  }
}

db.close();
