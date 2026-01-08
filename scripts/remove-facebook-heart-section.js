const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "web44ai.db");
const db = new Database(dbPath, { readonly: false });

// Get all published posts
const posts = db
  .prepare(
    `
  SELECT id, title, content
  FROM blog_posts 
  WHERE published = 1
`
  )
  .all();

console.log(`\n=== REMOVING FACEBOOK/HEART SECTIONS FROM BLOG POSTS ===\n`);
console.log(`Total posts to process: ${posts.length}\n`);

let updatedCount = 0;
let totalRemoved = 0;

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

  // Pattern 1: Look for Facebook icon (SVG with M18 path - common Facebook icon path)
  // followed by text until heart emoji
  const fbHeartPattern = /<svg[^>]*>[\s\S]*?M18[^>]*>[\s\S]*?<\/svg>[\s\S]*?❤[\s\S]*?/i;
  if (fbHeartPattern.test(content)) {
    content = content.replace(fbHeartPattern, "");
    removed = true;
  }

  // Pattern 2: Look for Facebook text/link followed by content until heart
  const fbTextHeartPattern = /(?:<a[^>]*>[\s\S]*?facebook[\s\S]*?<\/a>|facebook[^<]*)[\s\S]*?❤/i;
  if (fbTextHeartPattern.test(content)) {
    content = content.replace(fbTextHeartPattern, "");
    removed = true;
  }

  // Pattern 3: Look for any section containing "facebook" (case insensitive)
  // followed by any content until heart emoji (including the heart)
  const generalFbHeartPattern = /(?:<[^>]*>[\s\S]*?)?facebook[\s\S]*?❤[\s\S]*?(?:<\/[^>]*>)?/i;
  if (generalFbHeartPattern.test(content)) {
    content = content.replace(generalFbHeartPattern, "");
    removed = true;
  }

  // Pattern 4: Look for div/section containing Facebook icon and heart
  const divPattern = /<div[^>]*>[\s\S]*?facebook[\s\S]*?❤[\s\S]*?<\/div>/i;
  if (divPattern.test(content)) {
    content = content.replace(divPattern, "");
    removed = true;
  }

  // Pattern 5: Look for paragraph or any block containing Facebook until heart
  const blockPattern =
    /<(?:p|div|section)[^>]*>[\s\S]*?facebook[\s\S]*?❤[\s\S]*?<\/(?:p|div|section)>/i;
  if (blockPattern.test(content)) {
    content = content.replace(blockPattern, "");
    removed = true;
  }

  // Pattern 6: More aggressive - find Facebook anywhere, then remove everything until heart (including heart)
  // This is a fallback if other patterns don't match
  const fbIndex = content.toLowerCase().indexOf("facebook");
  if (fbIndex !== -1) {
    // Find the start of the containing element (go back to find opening tag)
    let startIndex = fbIndex;
    let depth = 0;
    let foundStart = false;

    // Go backwards to find the start of the block
    for (let i = fbIndex; i >= 0; i--) {
      if (content.substring(i, i + 2) === "</") {
        depth++;
      } else if (content.substring(i, i + 1) === ">") {
        if (depth === 0) {
          // Check if this is an opening tag
          const tagStart = content.lastIndexOf("<", i);
          if (tagStart !== -1) {
            const tag = content
              .substring(tagStart + 1, i)
              .split(" ")[0]
              .toLowerCase();
            if (["div", "p", "section", "article", "span"].includes(tag)) {
              startIndex = tagStart;
              foundStart = true;
              break;
            }
          }
        } else {
          depth--;
        }
      }
    }

    // Find heart emoji
    const heartIndex = content.indexOf("❤", fbIndex);
    if (heartIndex !== -1) {
      // Find the end of the containing element (go forward to find closing tag)
      let endIndex = heartIndex + 1; // Include the heart
      let depth2 = 0;
      let foundEnd = false;

      for (let i = heartIndex; i < content.length; i++) {
        if (content.substring(i, i + 2) === "</") {
          depth2++;
          const tagEnd = content.indexOf(">", i);
          if (tagEnd !== -1) {
            const tag = content
              .substring(i + 2, tagEnd)
              .split(" ")[0]
              .toLowerCase();
            if (depth2 === 1 && ["div", "p", "section", "article", "span"].includes(tag)) {
              endIndex = tagEnd + 1;
              foundEnd = true;
              break;
            }
            if (["div", "p", "section", "article", "span"].includes(tag)) {
              depth2--;
            }
          }
        }
      }

      if (foundStart && foundEnd) {
        content = content.substring(0, startIndex) + content.substring(endIndex);
        removed = true;
      } else if (heartIndex !== -1) {
        // Fallback: just remove from Facebook to heart (including heart)
        content = content.substring(0, fbIndex) + content.substring(heartIndex + 1);
        removed = true;
      }
    }
  }

  if (removed) {
    const removedLength = originalLength - content.length;
    totalRemoved += removedLength;
    postsToUpdate.push({ id: post.id, content });
    updatedCount++;
    console.log(`Post ID ${post.id}: "${post.title}" - Removed ${removedLength} characters`);
  }
});

if (postsToUpdate.length > 0) {
  console.log(`\nUpdating ${postsToUpdate.length} posts...`);
  transaction(postsToUpdate);
  console.log(`\n✓ Successfully updated ${updatedCount} posts`);
  console.log(`Total characters removed: ${totalRemoved}`);
} else {
  console.log("No Facebook/heart sections found to remove.");
}

db.close();
