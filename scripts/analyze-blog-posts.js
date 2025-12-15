const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath, { readonly: true });

// Get all published posts
const posts = db.prepare(`
  SELECT id, title, slug, content, excerpt, published_at, created_at
  FROM blog_posts 
  WHERE published = 1
  ORDER BY published_at DESC, created_at DESC
`).all();

console.log(`\n=== BLOG POST ANALYSIS ===\n`);
console.log(`Total published posts: ${posts.length}\n`);

// Check for duplicates and empty posts
const titleMap = new Map();
const slugMap = new Map();
const emptyPosts = [];
const duplicateTitles = [];
const duplicateSlugs = [];

posts.forEach(post => {
  const title = (post.title || '').trim().toLowerCase();
  const slug = (post.slug || '').trim().toLowerCase();
  const content = (post.content || '').trim();
  
  // Check for empty content
  if (!content || content.length < 50) {
    emptyPosts.push({ id: post.id, title: post.title, slug: post.slug, contentLength: content.length });
  }
  
  // Check for duplicate titles
  if (title) {
    if (titleMap.has(title)) {
      duplicateTitles.push({ id: post.id, title: post.title, slug: post.slug });
    } else {
      titleMap.set(title, post);
    }
  }
  
  // Check for duplicate slugs
  if (slug) {
    if (slugMap.has(slug)) {
      duplicateSlugs.push({ id: post.id, title: post.title, slug: post.slug });
    } else {
      slugMap.set(slug, post);
    }
  }
});

console.log(`Empty posts (content < 50 chars): ${emptyPosts.length}`);
if (emptyPosts.length > 0) {
  console.log('Empty posts:');
  emptyPosts.forEach(p => console.log(`  - ID ${p.id}: "${p.title}" (${p.contentLength} chars)`));
}

console.log(`\nDuplicate titles: ${duplicateTitles.length}`);
if (duplicateTitles.length > 0) {
  console.log('Duplicate titles:');
  duplicateTitles.forEach(p => console.log(`  - ID ${p.id}: "${p.title}"`));
}

console.log(`\nDuplicate slugs: ${duplicateSlugs.length}`);
if (duplicateSlugs.length > 0) {
  console.log('Duplicate slugs:');
  duplicateSlugs.forEach(p => console.log(`  - ID ${p.id}: "${p.title}" (slug: ${p.slug})`));
}

// Categorize posts
const categories = {
  'Interview Advice': [],
  'What Is?': [],
  'Your Rights': [],
  'Police Station Locations': [],
  'Legal Process': [],
  'Emergency Help': [],
  'General Information': []
};

// Keywords for categorization
const categoryKeywords = {
  'Interview Advice': [
    'interview', 'caution', 'voluntary interview', 'police interview', 
    'preparing for interview', 'interview rights', 'refusing interview',
    'what to expect', 'interview help', 'attending interview'
  ],
  'What Is?': [
    'what is', 'what\'s a', 'what are', 'definition', 'explained',
    'understanding', 'introduction to', 'guide to'
  ],
  'Your Rights': [
    'rights', 'legal rights', 'custody rights', 'your rights',
    'right to', 'entitlement', 'freedom'
  ],
  'Police Station Locations': [
    'police station', 'station', 'canterbury', 'maidstone', 'ashford',
    'dover', 'folkestone', 'gravesend', 'medway', 'sevenoaks',
    'tonbridge', 'tunbridge wells', 'sittingbourne', 'swanley',
    'bluewater', 'coldharbour', 'kent police'
  ],
  'Legal Process': [
    'process', 'procedure', 'booking', 'custody', 'arrest',
    'bail', 'charge', 'court', 'legal aid', 'representation',
    'after interview', 'next steps'
  ],
  'Emergency Help': [
    'emergency', 'arrested', 'urgent', 'help', 'family',
    'loved one', 'immediate', '24/7', 'emergency help'
  ],
  'General Information': []
};

posts.forEach(post => {
  const title = (post.title || '').toLowerCase();
  const content = (post.content || '').toLowerCase();
  const text = `${title} ${content}`;
  
  let categorized = false;
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category === 'General Information') continue;
    
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        categories[category].push(post);
        categorized = true;
        break;
      }
    }
    
    if (categorized) break;
  }
  
  if (!categorized) {
    categories['General Information'].push(post);
  }
});

console.log(`\n=== CATEGORIZATION ===\n`);
for (const [category, posts] of Object.entries(categories)) {
  console.log(`${category}: ${posts.length} posts`);
  if (posts.length > 0 && posts.length <= 10) {
    posts.forEach(p => console.log(`  - ${p.title}`));
  } else if (posts.length > 10) {
    posts.slice(0, 5).forEach(p => console.log(`  - ${p.title}`));
    console.log(`  ... and ${posts.length - 5} more`);
  }
}

// Generate report
const report = {
  total: posts.length,
  empty: emptyPosts.length,
  duplicates: {
    titles: duplicateTitles.length,
    slugs: duplicateSlugs.length
  },
  categories: Object.fromEntries(
    Object.entries(categories).map(([cat, posts]) => [cat, posts.length])
  ),
  emptyPostIds: emptyPosts.map(p => p.id),
  duplicateTitleIds: duplicateTitles.map(p => p.id),
  duplicateSlugIds: duplicateSlugs.map(p => p.id)
};

console.log(`\n=== SUMMARY ===\n`);
console.log(JSON.stringify(report, null, 2));

db.close();
