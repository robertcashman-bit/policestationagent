const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find the HTML string in dangerouslySetInnerHTML
const htmlMatch = content.match(/dangerouslySetInnerHTML=\{\{\s*__html:\s*"([^"]+)"/s);

if (!htmlMatch) {
  console.error('Could not find HTML string');
  process.exit(1);
}

let html = htmlMatch[1];

// Remove the "Featured Articles" section (from <section class="py-16 bg-white"> to </section>)
// This section contains the old hardcoded blog posts
const featuredArticlesStart = html.indexOf('<section class="py-16 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-end mb-10"><div><div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-blue-100 text-blue-800 mb-2">Latest Insights</div><h2 class="text-3xl font-bold text-slate-900">Featured Articles</h2>');

if (featuredArticlesStart !== -1) {
  // Find the end of this section (the closing </section> tag)
  let depth = 0;
  let pos = featuredArticlesStart;
  let inSection = false;
  
  while (pos < html.length) {
    if (html.substring(pos, pos + 8) === '<section') {
      depth++;
      inSection = true;
      pos += 8;
    } else if (html.substring(pos, pos + 10) === '</section>') {
      depth--;
      if (depth === 0 && inSection) {
        // Found the end of the Featured Articles section
        const sectionEnd = pos + 10;
        html = html.substring(0, featuredArticlesStart) + html.substring(sectionEnd);
        console.log('Removed Featured Articles section');
        break;
      }
      pos += 10;
    } else {
      pos++;
    }
  }
}

// Remove the "Latest Articles" section (the second blog listing)
const latestArticlesStart = html.indexOf('<section class="py-20 bg-gradient-to-b from-white to-slate-50"><div class="max-w-7xl mx-auto px-4"><div class="text-center mb-12"><div class="inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-amber-100 text-amber-800 mb-4 text-sm">From Our Blog</div><h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4">Latest Articles</h2>');

if (latestArticlesStart !== -1) {
  // Find the end of this section
  let depth = 0;
  let pos = latestArticlesStart;
  let inSection = false;
  
  while (pos < html.length) {
    if (html.substring(pos, pos + 8) === '<section') {
      depth++;
      inSection = true;
      pos += 8;
    } else if (html.substring(pos, pos + 10) === '</section>') {
      depth--;
      if (depth === 0 && inSection) {
        const sectionEnd = pos + 10;
        html = html.substring(0, latestArticlesStart) + html.substring(sectionEnd);
        console.log('Removed Latest Articles section');
        break;
      }
      pos += 10;
    } else {
      pos++;
    }
  }
}

// Replace the HTML in the file
content = content.replace(
  /dangerouslySetInnerHTML=\{\{\s*__html:\s*"([^"]+)"/s,
  `dangerouslySetInnerHTML={{ __html: "${html.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Homepage HTML updated successfully');
