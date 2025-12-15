const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath, { readonly: true });

const posts = db.prepare(`
  SELECT id, title, slug, content
  FROM blog_posts 
  WHERE published = 1
  ORDER BY published_at DESC, created_at DESC
`).all();

console.log('All blog post titles:\n');
posts.forEach((post, index) => {
  const contentLength = (post.content || '').trim().length;
  console.log(`${index + 1}. [ID: ${post.id}] "${post.title}" (${contentLength} chars)`);
});

db.close();
