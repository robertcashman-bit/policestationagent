/**
 * Publish all blog posts in the database
 * Sets published = 1 and published_at to current date if not set
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath);

try {
  // Get all unpublished posts
  const unpublished = db.prepare(`
    SELECT id, slug, title, published, published_at 
    FROM blog_posts 
    WHERE published = 0 OR published_at IS NULL
  `).all();

  console.log(`\n📝 Publishing Blog Posts`);
  console.log(`Found ${unpublished.length} unpublished posts\n`);

  if (unpublished.length === 0) {
    console.log('✅ All posts are already published!\n');
    db.close();
    process.exit(0);
  }

  const updateStmt = db.prepare(`
    UPDATE blog_posts 
    SET published = 1, 
        published_at = COALESCE(published_at, CURRENT_TIMESTAMP),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  let published = 0;
  unpublished.forEach(post => {
    updateStmt.run(post.id);
    published++;
    console.log(`✓ Published: ${post.title} (${post.slug})`);
  });

  console.log(`\n📊 Summary:`);
  console.log(`   ✓ Published: ${published} posts\n`);
  console.log('✅ Done!\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
} finally {
  db.close();
}







