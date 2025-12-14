const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find the start of dangerouslySetInnerHTML
const startMarker = 'dangerouslySetInnerHTML={{ __html: "';
const startIdx = content.indexOf(startMarker);

if (startIdx === -1) {
  console.error('Could not find dangerouslySetInnerHTML');
  process.exit(1);
}

// Find the end of the HTML string (the closing " }})
const htmlStart = startIdx + startMarker.length;
let htmlEnd = htmlStart;
let escaped = false;

// Find the end of the escaped string
for (let i = htmlStart; i < content.length; i++) {
  if (escaped) {
    escaped = false;
    continue;
  }
  if (content[i] === '\\') {
    escaped = true;
    continue;
  }
  if (content[i] === '"') {
    htmlEnd = i;
    break;
  }
}

let html = content.substring(htmlStart, htmlEnd);
console.log('Original HTML length:', html.length);

// Function to remove a section by finding its start pattern and matching closing tag
function removeSection(html, startPattern, sectionName) {
  const startIdx = html.indexOf(startPattern);
  if (startIdx === -1) {
    console.log(`${sectionName}: Not found`);
    return html;
  }
  
  // Find the matching </section> tag
  let depth = 0;
  let pos = startIdx;
  let foundStart = false;
  
  while (pos < html.length) {
    if (html.substring(pos, pos + 8) === '<section') {
      depth++;
      foundStart = true;
      pos += 8;
    } else if (html.substring(pos, pos + 10) === '</section>') {
      depth--;
      if (depth === 0 && foundStart) {
        const sectionEnd = pos + 10;
        const removed = html.substring(startIdx, sectionEnd);
        console.log(`${sectionName}: Removed ${removed.length} characters`);
        return html.substring(0, startIdx) + html.substring(sectionEnd);
      }
      pos += 10;
    } else {
      pos++;
    }
  }
  
  console.log(`${sectionName}: Could not find matching </section>`);
  return html;
}

// Remove "Featured Articles" section
html = removeSection(
  html,
  '<section class=\\"py-16 bg-white\\"><div class=\\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\\"><div class=\\"flex justify-between items-end mb-10\\"><div><div class=\\"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold',
  'Featured Articles'
);

// Remove "Latest Articles" / "From Our Blog" section  
html = removeSection(
  html,
  '<section class=\\"py-20 bg-gradient-to-b from-white to-slate-50\\"><div class=\\"max-w-7xl mx-auto px-4\\"><div class=\\"text-center mb-12\\"><div class=\\"inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold',
  'Latest Articles'
);

console.log('Final HTML length:', html.length);

// Reconstruct the file
const newContent = content.substring(0, htmlStart) + html + content.substring(htmlEnd);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Homepage updated successfully');
