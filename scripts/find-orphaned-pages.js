const fs = require('fs');
const path = require('path');

// STEP 1: Discover all routes
function getAllPageRoutes(dir, base = '') {
  const routes = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip API routes, lib, and special Next.js directories
        if (!entry.name.startsWith('_') && 
            entry.name !== 'api' && 
            entry.name !== 'lib' &&
            entry.name !== 'node_modules') {
          const route = base + '/' + entry.name;
          const pageFile = path.join(fullPath, 'page.tsx');
          const pageFile2 = path.join(fullPath, 'page.js');
          const pageFile3 = path.join(fullPath, 'page.jsx');
          
          if (fs.existsSync(pageFile) || fs.existsSync(pageFile2) || fs.existsSync(pageFile3)) {
            routes.push({ route, file: fullPath });
          }
          routes.push(...getAllPageRoutes(fullPath, route));
        }
      }
    }
  } catch (e) {
    // Ignore errors
  }
  return routes;
}

// STEP 2: Extract linked routes from Header.tsx
function extractLinksFromHeader() {
  const headerPath = path.join(process.cwd(), 'components', 'Header.tsx');
  if (!fs.existsSync(headerPath)) {
    return new Set();
  }
  
  const content = fs.readFileSync(headerPath, 'utf-8');
  const links = new Set();
  
  // Extract href attributes from Link components
  const linkRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    // Only include internal links (starting with /)
    if (href.startsWith('/') && !href.startsWith('//') && !href.includes(':')) {
      // Normalize: remove trailing slash, handle root
      const normalized = href === '/' ? '/' : href.replace(/\/$/, '');
      links.add(normalized);
    }
  }
  
  return links;
}

// STEP 3: Extract links from blogIndex.js
function extractLinksFromBlogIndex() {
  const blogIndexPath = path.join(process.cwd(), 'data', 'blogIndex.js');
  if (!fs.existsSync(blogIndexPath)) {
    return new Set();
  }
  
  const content = fs.readFileSync(blogIndexPath, 'utf-8');
  const links = new Set();
  
  // Extract slug values
  const slugRegex = /"slug":\s*["']([^"']+)["']/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1];
    if (slug.startsWith('/')) {
      const normalized = slug.replace(/\/$/, '');
      links.add(normalized);
    }
  }
  
  return links;
}

// STEP 4: Get page title from metadata or file
function getPageTitle(route, filePath) {
  try {
    const pageFile = path.join(filePath, 'page.tsx');
    const pageFile2 = path.join(filePath, 'page.js');
    const pageFile3 = path.join(filePath, 'page.jsx');
    
    let content = '';
    if (fs.existsSync(pageFile)) {
      content = fs.readFileSync(pageFile, 'utf-8');
    } else if (fs.existsSync(pageFile2)) {
      content = fs.readFileSync(pageFile2, 'utf-8');
    } else if (fs.existsSync(pageFile3)) {
      content = fs.readFileSync(pageFile3, 'utf-8');
    }
    
    // Try to extract title from metadata
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/i) || 
                      content.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      return titleMatch[1];
    }
    
    // Fallback: generate from route
    return route.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  } catch (e) {
    return route;
  }
}

// Main execution
const appDir = path.join(process.cwd(), 'app');
const allRoutes = getAllPageRoutes(appDir);

// Add root route
const rootPage = path.join(appDir, 'page.tsx');
if (fs.existsSync(rootPage)) {
  allRoutes.push({ route: '/', file: appDir });
}

// Normalize routes (remove dynamic segments for comparison)
const normalizedRoutes = allRoutes.map(r => {
  // Remove dynamic segments like [slug], [id], etc.
  let normalized = r.route.replace(/\[[^\]]+\]/g, '[dynamic]');
  // Remove trailing slash
  normalized = normalized === '/' ? '/' : normalized.replace(/\/$/, '');
  return {
    original: r.route,
    normalized,
    file: r.file,
    isDynamic: r.route.includes('[')
  };
});

// Get all linked routes
const headerLinks = extractLinksFromHeader();
const blogLinks = extractLinksFromBlogIndex();
const allLinkedRoutes = new Set([...headerLinks, ...blogLinks]);

// Normalize linked routes
const normalizedLinkedRoutes = new Set();
allLinkedRoutes.forEach(link => {
  const normalized = link === '/' ? '/' : link.replace(/\/$/, '');
  normalizedLinkedRoutes.add(normalized);
});

// Find orphaned pages (excluding dynamic routes, admin, and special pages)
const orphanedPages = [];
normalizedRoutes.forEach(({ original, normalized, file, isDynamic }) => {
  // Skip dynamic routes, admin pages, and API routes
  if (isDynamic || 
      original.startsWith('/admin') || 
      original.startsWith('/api') ||
      original === '/post' || // Special route
      original === '/case-status') {
    return;
  }
  
  // Check if this route is linked
  if (!normalizedLinkedRoutes.has(normalized)) {
    const title = getPageTitle(original, file);
    orphanedPages.push({
      route: original,
      normalized,
      title,
      file: file
    });
  }
});

// Sort orphaned pages
orphanedPages.sort((a, b) => a.route.localeCompare(b.route));

// Output results
console.log('='.repeat(80));
console.log('ORPHANED PAGES AUDIT REPORT');
console.log('='.repeat(80));
console.log(`\nTotal pages scanned: ${normalizedRoutes.length}`);
console.log(`Linked routes found: ${allLinkedRoutes.size}`);
console.log(`Orphaned pages found: ${orphanedPages.length}`);
console.log('\n' + '='.repeat(80));
console.log('ORPHANED PAGES:');
console.log('='.repeat(80));

if (orphanedPages.length === 0) {
  console.log('\n✅ No orphaned pages found! All pages are linked.');
} else {
  orphanedPages.forEach((page, index) => {
    console.log(`\n${index + 1}. ${page.route}`);
    console.log(`   Title: ${page.title}`);
    console.log(`   File: ${page.file}`);
  });
}

// Save to JSON for further processing
const reportPath = path.join(process.cwd(), 'orphaned-pages-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  totalPages: normalizedRoutes.length,
  linkedRoutes: allLinkedRoutes.size,
  orphanedPages: orphanedPages.map(p => ({
    route: p.route,
    title: p.title,
    file: p.file
  }))
}, null, 2));

console.log(`\n\nReport saved to: ${reportPath}`);



