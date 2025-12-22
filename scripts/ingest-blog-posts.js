/**
 * Safe Blog Post Ingestion Script
 * 
 * Imports blog posts from JSON files into the database.
 * NO external network calls - purely local file-based ingestion.
 * 
 * Usage:
 *   node scripts/ingest-blog-posts.js [path-to-json-file]
 * 
 * JSON Format:
 * {
 *   "slug-name": {
 *     "title": "Post Title",
 *     "slug": "slug-name",
 *     "content": "<p>HTML content</p>",
 *     "excerpt": "Short description",
 *     "published": true,
 *     "publishedAt": "2024-01-15T10:00:00Z",
 *     "metaTitle": "SEO Title",
 *     "metaDescription": "SEO Description"
 *   }
 * }
 */

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

// Initialize tables if needed
db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id INTEGER,
    published BOOLEAN DEFAULT 0,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    meta_title TEXT,
    meta_description TEXT,
    FOREIGN KEY (author_id) REFERENCES users(id)
  )
`);

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
  CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published, published_at);
`);

/**
 * Normalize slug - ensure it's URL-safe
 */
function normalizeSlug(slug) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Ingest blog posts from JSON file
 */
function ingestBlogPosts(jsonFilePath) {
  if (!fs.existsSync(jsonFilePath)) {
    console.error(`❌ File not found: ${jsonFilePath}`);
    process.exit(1);
  }

  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
  let posts;
  
  try {
    posts = JSON.parse(jsonContent);
  } catch (error) {
    console.error(`❌ Invalid JSON file: ${error.message}`);
    process.exit(1);
  }

  const insertStmt = db.prepare(`
    INSERT INTO blog_posts 
    (title, slug, content, excerpt, published, published_at, meta_title, meta_description, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      content = excluded.content,
      excerpt = excluded.excerpt,
      published = excluded.published,
      published_at = excluded.published_at,
      meta_title = excluded.meta_title,
      meta_description = excluded.meta_description,
      updated_at = CURRENT_TIMESTAMP
  `);

  const results = {
    imported: 0,
    updated: 0,
    skipped: 0,
    errors: []
  };

  for (const [key, post] of Object.entries(posts)) {
    try {
      // Validate required fields
      if (!post.title || !post.slug) {
        results.errors.push({
          key,
          error: 'Missing required fields: title and slug are required'
        });
        results.skipped++;
        continue;
      }

      // Normalize slug
      const slug = normalizeSlug(post.slug);
      
      // Check if post exists
      const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(slug);
      const isUpdate = !!existing;

      // Prepare content - ensure it's valid HTML
      const content = post.content || '';
      const excerpt = post.excerpt || null;
      const published = post.published === true || post.published === 1;
      const publishedAt = post.publishedAt || (published ? new Date().toISOString() : null);
      const metaTitle = post.metaTitle || post.title;
      const metaDescription = post.metaDescription || excerpt || null;

      // Insert or update
      insertStmt.run(
        post.title,
        slug,
        content,
        excerpt,
        published ? 1 : 0,
        publishedAt,
        metaTitle,
        metaDescription
      );

      if (isUpdate) {
        results.updated++;
        console.log(`✓ Updated: ${post.title} (${slug})`);
      } else {
        results.imported++;
        console.log(`✓ Imported: ${post.title} (${slug})`);
      }
    } catch (error) {
      results.errors.push({
        key,
        error: error.message
      });
      results.skipped++;
      console.error(`✗ Error processing ${key}: ${error.message}`);
    }
  }

  return results;
}

// Main execution
if (require.main === module) {
  const jsonFile = process.argv[2] || path.join(__dirname, '..', 'data', 'blog-posts.json');
  
  console.log(`\n📝 Blog Post Ingestion Script`);
  console.log(`📂 Reading from: ${jsonFile}\n`);

  const results = ingestBlogPosts(jsonFile);

  console.log(`\n📊 Summary:`);
  console.log(`   ✓ Imported: ${results.imported}`);
  console.log(`   ✓ Updated: ${results.updated}`);
  console.log(`   ⚠ Skipped: ${results.skipped}`);
  
  if (results.errors.length > 0) {
    console.log(`\n❌ Errors:`);
    results.errors.forEach(({ key, error }) => {
      console.log(`   - ${key}: ${error}`);
    });
  }

  console.log(`\n✅ Done!\n`);
  
  db.close();
}

module.exports = { ingestBlogPosts, normalizeSlug };

























