#!/usr/bin/env node
/**
 * Fix large SVG icons in blog posts
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath);

// Find posts with large SVGs
const posts = db.prepare('SELECT id, title, content FROM blog_posts').all();
let fixedCount = 0;

posts.forEach(post => {
  let content = post.content;
  let modified = false;
  
  // Find SVGs with width/height > 100 and reduce them
  content = content.replace(/<svg([^>]*)width=["']?(\d+)["']?([^>]*)height=["']?(\d+)["']?([^>]*)>/gi, 
    (match, before, width, middle, height, after) => {
      const w = parseInt(width);
      const h = parseInt(height);
      
      if (w > 100 || h > 100) {
        console.log(`Found large SVG in "${post.title}": ${w}x${h}`);
        // Reduce to a reasonable size (48x48 max)
        const newSize = 48;
        modified = true;
        return `<svg${before}width="${newSize}"${middle}height="${newSize}"${after}>`;
      }
      return match;
    }
  );
  
  // Also handle the reverse order (height before width)
  content = content.replace(/<svg([^>]*)height=["']?(\d+)["']?([^>]*)width=["']?(\d+)["']?([^>]*)>/gi, 
    (match, before, height, middle, width, after) => {
      const w = parseInt(width);
      const h = parseInt(height);
      
      if (w > 100 || h > 100) {
        console.log(`Found large SVG (reversed) in "${post.title}": ${w}x${h}`);
        const newSize = 48;
        modified = true;
        return `<svg${before}height="${newSize}"${middle}width="${newSize}"${after}>`;
      }
      return match;
    }
  );
  
  if (modified) {
    const updateStmt = db.prepare('UPDATE blog_posts SET content = ? WHERE id = ?');
    updateStmt.run(content, post.id);
    console.log(`Fixed: ${post.title}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} posts with large SVG icons`);

db.close();

