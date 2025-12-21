const fs = require('fs');
const path = require('path');

// Get all routes
const getAllRoutes = () => {
  const routes = [];
  const appDir = path.join(process.cwd(), 'app');
  
  function scanDir(dir, baseRoute = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
      if (item.isDirectory()) {
        const routePart = item.name;
        const newBase = baseRoute ? baseRoute + '/' + routePart : '/' + routePart;
        scanDir(path.join(dir, item.name), newBase);
      } else if (item.name === 'page.tsx') {
        const route = baseRoute || '/';
        routes.push(route);
      }
    });
  }
  
  scanDir(appDir);
  return routes;
};

// Get linked routes from Header and Footer
const getLinkedRoutes = () => {
  const header = fs.readFileSync('components/Header.tsx', 'utf8');
  const footer = fs.readFileSync('components/Footer.tsx', 'utf8');
  const combined = header + footer;
  
  const links = new Set();
  const regex = /href=["'](\/[^"']+)["']/g;
  let match;
  while ((match = regex.exec(combined)) !== null) {
    const link = match[1].split('?')[0].split('#')[0];
    if (link.startsWith('/')) {
      links.add(link);
    }
  }
  
  return Array.from(links);
};

const allRoutes = getAllRoutes();
const linkedRoutes = getLinkedRoutes();

// Filter out dynamic routes and admin/internal routes
const publicRoutes = allRoutes.filter(r => 
  !r.includes('[') && 
  !r.startsWith('/admin') && 
  !r.startsWith('/import-blog') &&
  !r.startsWith('/post') &&
  !r.startsWith('/feed') &&
  !r.startsWith('/case-status')
);

// Find orphaned pages
const orphaned = publicRoutes.filter(route => {
  if (linkedRoutes.includes(route)) return false;
  const routeParts = route.split('/').filter(p => p);
  for (let i = routeParts.length; i > 0; i--) {
    const parentRoute = '/' + routeParts.slice(0, i).join('/');
    if (linkedRoutes.includes(parentRoute)) return false;
  }
  return true;
});

// Categorize orphaned pages
const categories = {
  'Important Pages (Should Be Linked)': [],
  'Location Pages (SEO - May Not Need Navigation)': [],
  'Alternative Routes (Duplicates)': [],
  'Utility/Internal Pages': []
};

orphaned.forEach(route => {
  // Important pages that should probably be linked
  if (['/for-clients', '/what-to-do-if-a-loved-one-is-arrested', '/arrested-what-to-do', 
       '/arrival-times-delays', '/emergency-police-station-representation', 
       '/article-loved-one-arrested-kent', '/police-station-interviews-kent-rights',
       '/kent-police-station-reps', '/kent-police-stations', '/psastations',
       '/preparing-for-police-interview', '/importance-of-early-legal-advice',
       '/what-happens-if-ignore-police-interview', '/voluntary-police-interview-risks',
       '/vulnerable-adults-in-custody', '/booking-in-procedure-in-kent'].includes(route)) {
    categories['Important Pages (Should Be Linked)'].push(route);
  }
  // Location-specific pages (solicitor pages, PSA stations)
  else if (route.includes('-solicitor') || route.includes('-psa-station') || 
           route.includes('police-station-agent-') || route.includes('police-station-rep-') ||
           route.includes('-police-station')) {
    categories['Location Pages (SEO - May Not Need Navigation)'].push(route);
  }
  // Alternative routes (duplicates)
  else if (['/termsandconditions', '/forsolicitors', '/voluntaryinterviews', 
            '/outofarea', '/canwehelp', '/f-a-q', '/g-d-p-r', '/whatisapolicestationrep',
            '/afterapoliceinterview', '/nofurtheractionafterpoliceinterview',
            '/policestationreps', '/private-crime', '/servicesvoluntaryinterviews',
            '/court-representation'].includes(route)) {
    categories['Alternative Routes (Duplicates)'].push(route);
  }
  // Utility/internal pages
  else {
    categories['Utility/Internal Pages'].push(route);
  }
});

console.log('ORPHANED PAGES ANALYSIS');
console.log('======================\n');

Object.entries(categories).forEach(([category, pages]) => {
  console.log(`${category}: ${pages.length} pages`);
  if (pages.length > 0) {
    pages.sort().forEach(route => console.log(`  - ${route}`));
  }
  console.log('');
});

console.log(`\nTotal orphaned pages: ${orphaned.length}`);

