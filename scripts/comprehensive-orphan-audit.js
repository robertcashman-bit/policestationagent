const fs = require('fs');
const path = require('path');

// STEP 1: Build complete route inventory
function getAllPageRoutes(dir, base = '') {
  const routes = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
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
  } catch (e) {}
  return routes;
}

// STEP 2: Build current link inventory
function extractLinksFromHeader() {
  const headerPath = path.join(process.cwd(), 'components', 'Header.tsx');
  if (!fs.existsSync(headerPath)) return new Set();
  
  const content = fs.readFileSync(headerPath, 'utf-8');
  const links = new Set();
  const linkRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//') && !href.includes(':')) {
      const normalized = href === '/' ? '/' : href.replace(/\/$/, '');
      links.add(normalized);
    }
  }
  return links;
}

function extractLinksFromBlogIndex() {
  const blogIndexPath = path.join(process.cwd(), 'data', 'blogIndex.js');
  if (!fs.existsSync(blogIndexPath)) return { links: new Set(), entries: [] };
  
  const content = fs.readFileSync(blogIndexPath, 'utf-8');
  const links = new Set();
  const entries = [];
  
  // Extract all blog entries
  const entryRegex = /\{\s*"title":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"category":\s*"([^"]+)"\s*\}/g;
  let match;
  while ((match = entryRegex.exec(content)) !== null) {
    const title = match[1];
    const slug = match[2];
    const category = match[3];
    const normalized = slug.replace(/\/$/, '');
    links.add(normalized);
    entries.push({ title, slug: normalized, category });
  }
  
  return { links, entries };
}

// Get page metadata
function getPageMetadata(route, filePath) {
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
    
    // Extract title
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/i) || 
                      content.match(/<title>([^<]+)<\/title>/i) ||
                      content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].split('|')[0].trim() : null;
    
    // Extract description
    const descMatch = content.match(/description:\s*["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1] : '';
    
    // Check if it's substantive content (has meaningful HTML content)
    const hasSubstantiveContent = content.includes('<h1') || 
                                  content.includes('dangerouslySetInnerHTML') ||
                                  content.length > 2000;
    
    return { title, description, hasSubstantiveContent, content };
  } catch (e) {
    return { title: null, description: '', hasSubstantiveContent: false, content: '' };
  }
}

// Check if page is utility/legal boilerplate
function isUtilityPage(route, title) {
  const utilityPatterns = [
    /^\/admin/,
    /^\/api/,
    /^\/manifest/,
    /^\/robots/,
    /^\/sitemap/,
    /^\/terms/,
    /^\/privacy/,
    /^\/cookies/,
    /^\/gdpr/,
    /^\/accessibility/,
    /^\/complaints/,
    /^\/case-status/,
    /^\/post$/,
    /-solicitor$/,  // Location pages
    /-police-station$/,  // Location pages
    /-psa-station$/,  // Location pages
    /^\/police-station-agent-/,  // Location pages
    /^\/home$/,
    /^\/hours$/,
    /^\/extendedhours$/,
    /^\/christmashours$/,
    /^\/attendanceterms$/,
    /^\/servicerates$/,
    /^\/repcover$/,
    /^\/join$/,
    /^\/can-we-help$/,
    /^\/guided-assistant$/,
    /^\/f-a-q$/,
    /^\/g-d-p-r$/,
    /^\/termsandconditions$/,
    /^\/outofarea$/,
    /^\/canwehelp$/,
    /^\/forsolicitors$/,
    /^\/policestationreps$/,
    /^\/whatisapolicestationrep$/,
    /^\/voluntaryinterviews$/,
    /^\/afterapoliceinterview$/,
    /^\/nofurtheractionafterpoliceinterview$/,
    /^\/court-representation$/,
    /^\/private-crime$/,
  ];
  
  return utilityPatterns.some(pattern => pattern.test(route));
}

// Check for duplicate/near-duplicate content
function findDuplicates(newEntry, existingEntries) {
  const duplicates = [];
  const newTitle = newEntry.title.toLowerCase();
  const newSlug = newEntry.slug.toLowerCase();
  
  existingEntries.forEach(existing => {
    const existingTitle = existing.title.toLowerCase();
    const existingSlug = existing.slug.toLowerCase();
    
    // Exact duplicate
    if (existingSlug === newSlug) {
      duplicates.push({ type: 'exact', entry: existing });
      return;
    }
    
    // Near-duplicate: very similar titles
    if (newTitle && existingTitle) {
      const titleSimilarity = calculateSimilarity(newTitle, existingTitle);
      if (titleSimilarity > 0.85) {
        duplicates.push({ type: 'near-duplicate', entry: existing, similarity: titleSimilarity });
      }
    }
    
    // Same topic intent (check keywords)
    const newKeywords = extractKeywords(newTitle);
    const existingKeywords = extractKeywords(existingTitle);
    if (newKeywords.length > 0 && existingKeywords.length > 0) {
      const keywordOverlap = newKeywords.filter(k => existingKeywords.includes(k)).length;
      if (keywordOverlap >= 3 && keywordOverlap / Math.max(newKeywords.length, existingKeywords.length) > 0.6) {
        duplicates.push({ type: 'topic-overlap', entry: existing });
      }
    }
  });
  
  return duplicates;
}

function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  if (longer.length === 0) return 1.0;
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
}

function extractKeywords(title) {
  if (!title) return [];
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'your', 'you', 'police', 'station', 'kent', 'legal', 'advice', 'free']);
  return title.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
}

// Determine category for a page
function determineCategory(route, title, description) {
  const text = `${route} ${title} ${description}`.toLowerCase();
  
  if (text.includes('interview') || text.includes('caution') || text.includes('voluntary')) {
    return 'Police Interview & Procedure';
  }
  if (text.includes('bail') || text.includes('custody') || text.includes('released')) {
    return 'Police Bail & Custody';
  }
  if (text.includes('right') || text.includes('entitle') || text.includes('legal aid')) {
    return 'Your Legal Rights';
  }
  if (text.includes('guide') || text.includes('what is') || text.includes('explained')) {
    return 'Criminal Defence Guidance';
  }
  if (text.includes('duty solicitor') || text.includes('representative') || text.includes('rep')) {
    return 'Duty Solicitor & Representation';
  }
  if (text.includes('advice') || text.includes('help') || text.includes('what to do')) {
    return 'Police Station Advice';
  }
  return 'Updates & Commentary';
}

// Main execution
console.log('='.repeat(80));
console.log('COMPREHENSIVE ORPHANED PAGES AUDIT');
console.log('='.repeat(80));

// STEP 1: Get all routes
const appDir = path.join(process.cwd(), 'app');
const allRoutes = getAllPageRoutes(appDir);
const rootPage = path.join(appDir, 'page.tsx');
if (fs.existsSync(rootPage)) {
  allRoutes.push({ route: '/', file: appDir });
}

console.log(`\nSTEP 1: Found ${allRoutes.length} total routes`);

// STEP 2: Get linked routes
const headerLinks = extractLinksFromHeader();
const { links: blogLinks, entries: blogEntries } = extractLinksFromBlogIndex();
const allLinkedRoutes = new Set([...headerLinks, ...blogLinks]);

console.log(`STEP 2: Found ${allLinkedRoutes.size} linked routes`);
console.log(`  - Header links: ${headerLinks.size}`);
console.log(`  - Blog index entries: ${blogLinks.size}`);

// STEP 3: Identify potential orphans
const normalizedRoutes = allRoutes.map(r => {
  let normalized = r.route.replace(/\[[^\]]+\]/g, '[dynamic]');
  normalized = normalized === '/' ? '/' : normalized.replace(/\/$/, '');
  return {
    original: r.route,
    normalized,
    file: r.file,
    isDynamic: r.route.includes('[')
  };
});

const potentialOrphans = normalizedRoutes.filter(({ original, normalized, isDynamic }) => {
  if (isDynamic || original.startsWith('/admin') || original.startsWith('/api')) {
    return false;
  }
  return !allLinkedRoutes.has(normalized);
});

console.log(`\nSTEP 3: Found ${potentialOrphans.length} potential orphaned pages`);

// STEP 4 & 5: Filter and evaluate
const candidates = [];
const rejected = [];

potentialOrphans.forEach(({ original, file }) => {
  const metadata = getPageMetadata(original, file);
  
  // Reject utility pages
  if (isUtilityPage(original, metadata.title)) {
    rejected.push({
      route: original,
      reason: 'Utility/legal boilerplate or location page',
      title: metadata.title
    });
    return;
  }
  
  // Reject if no substantive content
  if (!metadata.hasSubstantiveContent) {
    rejected.push({
      route: original,
      reason: 'No substantive content',
      title: metadata.title
    });
    return;
  }
  
  // Reject if no title
  if (!metadata.title || metadata.title.length < 10) {
    rejected.push({
      route: original,
      reason: 'No meaningful title',
      title: metadata.title
    });
    return;
  }
  
  // Check for duplicates
  const slug = original === '/' ? '/' : original.replace(/\/$/, '');
  const duplicates = findDuplicates(
    { title: metadata.title, slug },
    blogEntries
  );
  
  if (duplicates.length > 0) {
    rejected.push({
      route: original,
      reason: `Duplicate/near-duplicate: ${duplicates.map(d => d.entry.title).join(', ')}`,
      title: metadata.title,
      duplicates
    });
    return;
  }
  
  // Determine category
  const category = determineCategory(original, metadata.title, metadata.description);
  
  candidates.push({
    route: original,
    slug,
    title: metadata.title,
    category,
    description: metadata.description
  });
});

console.log(`\nSTEP 4-5: Evaluation complete`);
console.log(`  - Candidates for addition: ${candidates.length}`);
console.log(`  - Rejected: ${rejected.length}`);

// Output results
console.log('\n' + '='.repeat(80));
console.log('CANDIDATES FOR ADDITION:');
console.log('='.repeat(80));

if (candidates.length === 0) {
  console.log('\n✅ No candidates found. All orphaned pages are either utility pages or duplicates.');
} else {
  candidates.forEach((candidate, index) => {
    console.log(`\n${index + 1}. ${candidate.route}`);
    console.log(`   Title: ${candidate.title}`);
    console.log(`   Category: ${candidate.category}`);
  });
}

console.log('\n' + '='.repeat(80));
console.log('REJECTED PAGES:');
console.log('='.repeat(80));

rejected.slice(0, 20).forEach((reject, index) => {
  console.log(`\n${index + 1}. ${reject.route}`);
  console.log(`   Reason: ${reject.reason}`);
  if (reject.title) console.log(`   Title: ${reject.title}`);
});

if (rejected.length > 20) {
  console.log(`\n... and ${rejected.length - 20} more rejected pages`);
}

// Check for duplicates in existing blogIndex
console.log('\n' + '='.repeat(80));
console.log('DUPLICATE DETECTION IN EXISTING BLOGINDEX:');
console.log('='.repeat(80));

const existingDuplicates = [];
const seenSlugs = new Map();
const seenTitles = new Map();

blogEntries.forEach((entry, index) => {
  const slugKey = entry.slug.toLowerCase();
  const titleKey = entry.title.toLowerCase();
  
  if (seenSlugs.has(slugKey)) {
    existingDuplicates.push({
      type: 'duplicate-slug',
      entry,
      duplicateOf: seenSlugs.get(slugKey)
    });
  } else {
    seenSlugs.set(slugKey, entry);
  }
  
  if (seenTitles.has(titleKey)) {
    const existing = seenTitles.get(titleKey);
    const similarity = calculateSimilarity(entry.title.toLowerCase(), existing.title.toLowerCase());
    if (similarity > 0.9) {
      existingDuplicates.push({
        type: 'duplicate-title',
        entry,
        duplicateOf: existing,
        similarity
      });
    }
  } else {
    seenTitles.set(titleKey, entry);
  }
});

if (existingDuplicates.length === 0) {
  console.log('\n✅ No duplicates found in existing blogIndex.js');
} else {
  console.log(`\n⚠️  Found ${existingDuplicates.length} duplicate entries:`);
  existingDuplicates.forEach((dup, index) => {
    console.log(`\n${index + 1}. ${dup.type}`);
    console.log(`   Entry: "${dup.entry.title}" (${dup.entry.slug})`);
    console.log(`   Duplicate of: "${dup.duplicateOf.title}" (${dup.duplicateOf.slug})`);
  });
}

// Save report
const report = {
  summary: {
    totalRoutes: allRoutes.length,
    linkedRoutes: allLinkedRoutes.size,
    potentialOrphans: potentialOrphans.length,
    candidates: candidates.length,
    rejected: rejected.length,
    existingDuplicates: existingDuplicates.length
  },
  candidates,
  rejected: rejected.slice(0, 50), // Limit for file size
  existingDuplicates
};

const reportPath = path.join(process.cwd(), 'comprehensive-orphan-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`\n\nReport saved to: ${reportPath}`);
console.log('\n' + '='.repeat(80));
console.log('NEXT STEPS:');
console.log('='.repeat(80));
console.log('1. Review candidates for addition');
console.log('2. Review and remove duplicates from blogIndex.js');
console.log('3. Add approved candidates to blogIndex.js');
console.log('4. Validate site builds correctly');

