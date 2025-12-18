/**
 * Check blog import status
 * Compares what's in the database vs what should be imported
 */

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath);

// Expected posts based on the Wix site (from search results)
const expectedPosts = [
  'understanding-police-cautions-in-england-a-comprehensive-guide-to-their-meaning-and-consequences',
  'understanding-community-resolutions-and-their-impact-on-dbs-checks-and-employment',
  'the-hidden-risks-of-voluntary-police-interviews-or-informal-chats-in-the-uk-you-need-to-know',
  'the-role-of-higher-court-advocates-in-the-uk',
  // Add more as discovered
];

console.log('\n📊 Blog Import Status Check\n');

// Get all posts from database
const dbPosts = db.prepare(`
  SELECT slug, title, published, published_at 
  FROM blog_posts 
  ORDER BY published_at DESC, created_at DESC
`).all();

console.log(`Database: ${dbPosts.length} total posts`);
console.log(`Published: ${dbPosts.filter(p => p.published === 1).length} posts\n`);

// Get posts from JSON file
let jsonPosts = {};
try {
  const jsonPath = path.join(__dirname, '..', 'data', 'blog-posts.json');
  if (fs.existsSync(jsonPath)) {
    jsonPosts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log(`JSON file: ${Object.keys(jsonPosts).length} posts\n`);
  }
} catch (error) {
  console.log('JSON file not found or invalid\n');
}

// Show all database posts
console.log('Posts in Database:');
dbPosts.forEach((post, index) => {
  const status = post.published === 1 ? '✅ Published' : '⏸️  Draft';
  console.log(`  ${index + 1}. ${post.slug}`);
  console.log(`     Title: ${post.title}`);
  console.log(`     Status: ${status}`);
  if (post.published_at) {
    console.log(`     Published: ${post.published_at}`);
  }
  console.log('');
});

// Check for missing expected posts
if (expectedPosts.length > 0) {
  console.log('\nExpected Posts (from Wix site):');
  expectedPosts.forEach(slug => {
    const found = dbPosts.find(p => p.slug === slug);
    if (found) {
      console.log(`  ✅ ${slug}`);
    } else {
      console.log(`  ❌ MISSING: ${slug}`);
    }
  });
}

console.log('\n📝 Summary:');
console.log(`   Total in database: ${dbPosts.length}`);
console.log(`   Published: ${dbPosts.filter(p => p.published === 1).length}`);
console.log(`   Drafts: ${dbPosts.filter(p => p.published === 0).length}`);
console.log(`   In JSON file: ${Object.keys(jsonPosts).length}`);
console.log(`\n💡 Note: The Wix site shows ~29 posts total (based on monthly counts)`);
console.log(`   We currently have ${dbPosts.length} posts imported.\n`);

db.close();

















