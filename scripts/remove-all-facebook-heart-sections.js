const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath, { readonly: false });

const posts = db.prepare(`
  SELECT id, title, content
  FROM blog_posts 
  WHERE published = 1
`).all();

console.log(`\n=== REMOVING ALL FACEBOOK/HEART SECTIONS ===\n`);
console.log(`Total posts: ${posts.length}\n`);

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

posts.forEach(post => {
  let content = post.content || '';
  const originalLength = content.length;
  let removed = false;
  let iterations = 0;
  const maxIterations = 10; // Prevent infinite loops
  
  // Keep removing until no more Facebook/heart sections are found
  while (iterations < maxIterations) {
    iterations++;
    let found = false;
    
    // Find Facebook reference (case insensitive)
    const fbIndex = content.toLowerCase().indexOf('facebook');
    
    if (fbIndex === -1) {
      break; // No more Facebook found
    }
    
    // Find the start of the containing element
    let startIndex = fbIndex;
    const searchStart = Math.max(0, fbIndex - 1000);
    const beforeFb = content.substring(searchStart, fbIndex);
    
    // Look for opening tags (div, p, section, article, span, figure)
    const tagPattern = /<(\/?)(div|p|section|article|span|figure|a)[^>]*>/gi;
    let lastOpenTag = -1;
    let tagDepth = 0;
    let match;
    
    // Find the last opening tag before Facebook
    while ((match = tagPattern.exec(beforeFb)) !== null) {
      if (match[1] === '') {
        // Opening tag
        lastOpenTag = searchStart + match.index;
        tagDepth++;
      } else {
        // Closing tag
        tagDepth--;
        if (tagDepth === 0) {
          lastOpenTag = -1;
        }
      }
    }
    
    if (lastOpenTag !== -1) {
      startIndex = lastOpenTag;
    } else {
      // If no containing tag found, start from Facebook
      startIndex = fbIndex;
    }
    
    // Find heart emoji after Facebook
    const afterFb = content.substring(fbIndex);
    let heartIndex = -1;
    let heartLength = 0;
    
    const heartPatterns = [
      { pattern: /❤/, name: '❤' },
      { pattern: /&lt;3/, name: '&lt;3' },
      { pattern: /&hearts;/, name: '&hearts;' },
      { pattern: /&amp;lt;3/, name: '&amp;lt;3' },
      { pattern: /&amp;hearts;/, name: '&amp;hearts;' },
    ];
    
    for (const { pattern, name } of heartPatterns) {
      const heartMatch = afterFb.match(pattern);
      if (heartMatch) {
        heartIndex = fbIndex + afterFb.indexOf(heartMatch[0]);
        heartLength = heartMatch[0].length;
        break;
      }
    }
    
    let endIndex;
    
    if (heartIndex !== -1 && heartIndex > fbIndex) {
      // Heart found - include it in removal
      endIndex = heartIndex + heartLength;
      
      // Try to find the closing tag of the containing element
      const afterHeart = content.substring(endIndex);
      const closeTagMatch = afterHeart.match(/<\/(div|p|section|article|span|figure|a)>/i);
      if (closeTagMatch) {
        endIndex = endIndex + afterHeart.indexOf(closeTagMatch[0]) + closeTagMatch[0].length;
      }
    } else {
      // No heart found - remove from Facebook to end of containing element or next closing tag
      const afterFb2 = content.substring(fbIndex);
      const closeTagMatch = afterFb2.match(/<\/(div|p|section|article|span|figure|a)>/i);
      if (closeTagMatch) {
        endIndex = fbIndex + afterFb2.indexOf(closeTagMatch[0]) + closeTagMatch[0].length;
      } else {
        // No closing tag found, remove from start to end of Facebook reference
        // Find the end of the Facebook reference (end of link, SVG, or word)
        const fbEndMatch = afterFb.match(/(?:<\/a>|<\/svg>|<\/div>|<\/p>|<\/section>|<\/article>|<\/span>|<\/figure>|[\s<])/);
        if (fbEndMatch) {
          endIndex = fbIndex + afterFb.indexOf(fbEndMatch[0]) + fbEndMatch[0].length;
        } else {
          // Fallback: remove Facebook word and some following content
          endIndex = fbIndex + 'facebook'.length + 100; // Remove Facebook + 100 chars
        }
      }
    }
    
    // Remove the section
    content = content.substring(0, startIndex) + content.substring(endIndex);
    removed = true;
    found = true;
    totalRemoved += (endIndex - startIndex);
  }
  
  if (removed) {
    postsToUpdate.push({ id: post.id, content });
    updatedCount++;
    console.log(`Post ID ${post.id}: Removed Facebook/heart section(s) (${originalLength - content.length} chars removed)`);
  }
});

if (postsToUpdate.length > 0) {
  console.log(`\nUpdating ${postsToUpdate.length} posts...`);
  transaction(postsToUpdate);
  console.log(`✓ Successfully updated ${updatedCount} posts`);
  console.log(`Total characters removed: ${totalRemoved}`);
} else {
  console.log('No Facebook/heart sections found to remove.');
}

// Verify removal
console.log(`\n=== VERIFICATION ===\n`);
const verifyPosts = db.prepare(`
  SELECT id, title, content
  FROM blog_posts 
  WHERE published = 1
`).all();

let stillHasFacebook = 0;
verifyPosts.forEach(p => {
  const content = p.content || '';
  if (content.toLowerCase().includes('facebook')) {
    stillHasFacebook++;
    console.log(`Post ID ${p.id} still has Facebook`);
  }
});

if (stillHasFacebook === 0) {
  console.log('✓ All Facebook references successfully removed!');
} else {
  console.log(`⚠ ${stillHasFacebook} posts still contain Facebook references`);
}

db.close();
