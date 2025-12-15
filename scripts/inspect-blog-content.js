const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath, { readonly: true });

// Get a few posts and save their content to files for inspection
const posts = db.prepare(`
  SELECT id, title, content
  FROM blog_posts 
  WHERE published = 1
  LIMIT 3
`).all();

posts.forEach((post, index) => {
  const filename = `blog-content-${post.id}.html`;
  fs.writeFileSync(filename, post.content || '', 'utf8');
  console.log(`Saved post ID ${post.id} ("${post.title}") to ${filename}`);
  
  // Search for Facebook and heart patterns
  const content = post.content || '';
  
  // Look for various Facebook patterns
  const fbMatches = [
    content.match(/facebook/i),
    content.match(/fb/i),
    content.match(/M18.*h-3/i), // Facebook icon SVG path
    content.match(/<svg[^>]*>[\s\S]{0,500}M18[\s\S]{0,500}<\/svg>/i),
  ];
  
  // Look for heart patterns
  const heartMatches = [
    content.match(/❤/),
    content.match(/&lt;3/),
    content.match(/&hearts;/),
    content.match(/heart/i),
  ];
  
  console.log(`\nPost ${post.id}:`);
  console.log(`  Facebook matches: ${fbMatches.filter(m => m).length}`);
  console.log(`  Heart matches: ${heartMatches.filter(m => m).length}`);
  
  if (fbMatches[0]) {
    const fbIndex = content.toLowerCase().indexOf('facebook');
    console.log(`  Facebook found at index: ${fbIndex}`);
    console.log(`  Context: ${content.substring(Math.max(0, fbIndex - 100), Math.min(content.length, fbIndex + 500))}`);
  }
  
  if (heartMatches[0]) {
    const heartIndex = content.indexOf('❤');
    if (heartIndex === -1) {
      const heartIndex2 = content.indexOf('&lt;3');
      if (heartIndex2 !== -1) {
        console.log(`  Heart found at index: ${heartIndex2} (as &lt;3)`);
        console.log(`  Context: ${content.substring(Math.max(0, heartIndex2 - 500), Math.min(content.length, heartIndex2 + 200))}`);
      }
    } else {
      console.log(`  Heart found at index: ${heartIndex}`);
      console.log(`  Context: ${content.substring(Math.max(0, heartIndex - 500), Math.min(content.length, heartIndex + 200))}`);
    }
  }
  
  // If both found, show the section between them
  const fbIndex = content.toLowerCase().indexOf('facebook');
  if (fbIndex !== -1) {
    const heartIndex = content.indexOf('❤');
    const heartIndex2 = content.indexOf('&lt;3');
    const heartPos = heartIndex !== -1 ? heartIndex : (heartIndex2 !== -1 ? heartIndex2 : -1);
    
    if (heartPos !== -1 && heartPos > fbIndex) {
      console.log(`\n  Section to remove (${fbIndex} to ${heartPos + 1}):`);
      console.log(content.substring(fbIndex, heartPos + 10));
    }
  }
  
  console.log('\n---\n');
});

db.close();
