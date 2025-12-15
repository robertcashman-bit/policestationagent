const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const db = new Database(dbPath, { readonly: true });

const posts = db.prepare(`
  SELECT id, title, content
  FROM blog_posts 
  WHERE published = 1
  LIMIT 10
`).all();

console.log('Searching for Facebook icon and heart emoji pattern...\n');

posts.forEach(post => {
  const content = post.content || '';
  
  // Look for Facebook SVG patterns
  const fbPatterns = [
    /<svg[^>]*>[\s\S]*?facebook[\s\S]*?<\/svg>/i,
    /facebook.*?<svg[\s\S]*?<\/svg>/i,
    /<path[^>]*d="[^"]*M18[^"]*h-3[^"]*facebook/i,
  ];
  
  // Look for heart emoji patterns
  const heartPatterns = [
    /❤/,
    /&lt;3/,
    /heart/i,
    /<svg[^>]*>[\s\S]*?heart[\s\S]*?<\/svg>/i,
  ];
  
  let fbIndex = -1;
  let heartIndex = -1;
  
  // Find Facebook icon
  for (const pattern of fbPatterns) {
    const match = content.match(pattern);
    if (match) {
      fbIndex = content.indexOf(match[0]);
      console.log(`\nPost ID ${post.id}: "${post.title}"`);
      console.log('Found Facebook at index:', fbIndex);
      console.log('Facebook section:', match[0].substring(0, 300));
      break;
    }
  }
  
  // Find heart emoji
  for (const pattern of heartPatterns) {
    const match = content.match(pattern);
    if (match) {
      heartIndex = content.indexOf(match[0]);
      if (heartIndex > fbIndex && fbIndex > -1) {
        console.log('Found heart at index:', heartIndex);
        const section = content.substring(fbIndex, heartIndex + 50);
        console.log('Section to remove (first 500 chars):');
        console.log(section.substring(0, 500));
        break;
      }
    }
  }
  
  // Also check for common social sharing patterns
  if (fbIndex === -1) {
    const socialPattern = /(Share|Like|Follow).*?(Facebook|fb).*?❤/i;
    const socialMatch = content.match(socialPattern);
    if (socialMatch) {
      console.log(`\nPost ID ${post.id}: "${post.title}"`);
      console.log('Found social sharing pattern:', socialMatch[0].substring(0, 200));
    }
  }
});

db.close();
