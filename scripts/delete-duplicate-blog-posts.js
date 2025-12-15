const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath, { readonly: false });

// Get all published posts
const posts = db.prepare(`
  SELECT id, title, slug, content, published_at, created_at
  FROM blog_posts 
  WHERE published = 1
  ORDER BY published_at DESC, created_at DESC
`).all();

console.log(`\n=== DELETING DUPLICATE BLOG POSTS ===\n`);
console.log(`Total published posts: ${posts.length}\n`);

// Find duplicates by title and content
const titleContentMap = new Map();
const duplicatesToDelete = [];
const keepPosts = [];

posts.forEach(post => {
  const title = (post.title || '').trim().toLowerCase();
  const content = (post.content || '').trim();
  const key = `${title}|||${content.substring(0, 100)}`; // Use first 100 chars of content as fingerprint
  
  if (titleContentMap.has(key)) {
    // This is a duplicate - keep the one with earlier published_at or created_at
    const existing = titleContentMap.get(key);
    const existingDate = existing.published_at || existing.created_at;
    const currentDate = post.published_at || post.created_at;
    
    if (currentDate < existingDate) {
      // Current is older, keep it and delete existing
      duplicatesToDelete.push(existing.id);
      titleContentMap.set(key, post);
      keepPosts.push(post.id);
    } else {
      // Existing is older, keep it and delete current
      duplicatesToDelete.push(post.id);
    }
  } else {
    titleContentMap.set(key, post);
    keepPosts.push(post.id);
  }
});

// Also check for posts with very short content (likely empty/invalid)
const emptyPosts = posts.filter(p => {
  const content = (p.content || '').trim();
  return content.length < 200 && p.title && p.title.toLowerCase().includes('blog');
});

emptyPosts.forEach(p => {
  if (!duplicatesToDelete.includes(p.id)) {
    duplicatesToDelete.push(p.id);
    console.log(`Marking empty/invalid post for deletion: ID ${p.id} - "${p.title}" (${p.content.trim().length} chars)`);
  }
});

console.log(`\nPosts to keep: ${keepPosts.length}`);
console.log(`Posts to delete: ${duplicatesToDelete.length}\n`);

if (duplicatesToDelete.length > 0) {
  console.log('Posts to be deleted:');
  duplicatesToDelete.forEach(id => {
    const post = posts.find(p => p.id === id);
    if (post) {
      console.log(`  - ID ${id}: "${post.title}"`);
    }
  });
  
  console.log(`\nDeleting ${duplicatesToDelete.length} duplicate/empty posts...`);
  
  const deleteStmt = db.prepare('DELETE FROM blog_posts WHERE id = ?');
  const transaction = db.transaction((ids) => {
    for (const id of ids) {
      deleteStmt.run(id);
    }
  });
  
  transaction(duplicatesToDelete);
  
  console.log(`\n✓ Successfully deleted ${duplicatesToDelete.length} posts`);
  console.log(`Remaining published posts: ${posts.length - duplicatesToDelete.length}`);
} else {
  console.log('No duplicates found to delete.');
}

db.close();
