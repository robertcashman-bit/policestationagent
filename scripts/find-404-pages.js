const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');

function find404Pages(dir, basePath = '') {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and other non-app directories
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
        continue;
      }
      results.push(...find404Pages(fullPath, relativePath));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for 404 content
      if (content.includes('404') || 
          content.includes('Page Not Found') || 
          content.includes('could not be found')) {
        const route = '/' + relativePath.replace(/\\/g, '/').replace(/\/page\.tsx?$/, '');
        results.push({
          file: fullPath,
          route: route,
          has404: true
        });
      }
    }
  }

  return results;
}

const pages404 = find404Pages(appDir);

console.log('\n=== 404 PAGES FOUND ===\n');
console.log(`Total pages with 404 content: ${pages404.length}\n`);

pages404.forEach((page, index) => {
  console.log(`${index + 1}. ${page.route}`);
  console.log(`   File: ${path.relative(process.cwd(), page.file)}\n`);
});

// Save to JSON for reference
const report = {
  total: pages404.length,
  pages: pages404.map(p => ({
    route: p.route,
    file: path.relative(process.cwd(), p.file)
  }))
};

fs.writeFileSync(
  path.join(__dirname, '..', '404-pages-report.json'),
  JSON.stringify(report, null, 2)
);

console.log(`\nReport saved to: 404-pages-report.json`);
