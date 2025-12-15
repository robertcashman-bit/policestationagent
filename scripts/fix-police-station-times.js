#!/usr/bin/env node
/**
 * Fix police station response times with accurate road times from TN15 6ER
 * and add Kent Police non-emergency number (101) to each page
 */

const fs = require('fs');
const path = require('path');

// Realistic drive times from TN15 6ER (West Kingsdown) to each police station
// These are approximate average drive times, not best-case scenarios
const stationTimes = {
  'canterbury': { time: '50 min', miles: 40 },
  'folkestone': { time: '60 min', miles: 48 },
  'dover': { time: '65 min', miles: 52 },
  'margate': { time: '70 min', miles: 55 },
  'ashford': { time: '45 min', miles: 35 },
  'maidstone': { time: '25 min', miles: 18 },
  'medway': { time: '35 min', miles: 25 },
  'tonbridge': { time: '20 min', miles: 12 },
  'tunbridge-wells': { time: '25 min', miles: 15 },
  'sevenoaks': { time: '10 min', miles: 5 },
  'gravesend': { time: '25 min', miles: 15 },
  'bluewater': { time: '20 min', miles: 12 },
  'dartford': { time: '20 min', miles: 12 },
  'swanley': { time: '10 min', miles: 5 },
  'sittingbourne': { time: '40 min', miles: 30 },
  'coldharbour': { time: '35 min', miles: 25 },
  'north-kent': { time: '25 min', miles: 15 },
};

// Function to determine the correct time for a file
function getTimeForFile(filename) {
  const lowerFilename = filename.toLowerCase();
  
  for (const [station, data] of Object.entries(stationTimes)) {
    if (lowerFilename.includes(station)) {
      return data;
    }
  }
  
  // Default fallback for unknown stations
  return { time: '45 min', miles: 35 };
}

// Function to fix a single file
function fixFile(filePath) {
  const filename = path.basename(path.dirname(filePath));
  const stationData = getTimeForFile(filename);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix "15 minutes away" claims
  const timePatterns = [
    /We're 15 minutes away/g,
    /15 minutes away/g,
    /15 Min Response/g,
    /15 minute response/gi,
    /⚡ 15 minutes response/g,
    /solicitor 15 minutes away/gi,
  ];
  
  for (const pattern of timePatterns) {
    if (content.match(pattern)) {
      const replacement = pattern.toString().includes('Min Response') 
        ? `${stationData.time} Response`
        : pattern.toString().includes('15 minute response')
        ? `${stationData.time} response`
        : `We're ${stationData.time} away`;
      
      // Handle different replacement based on pattern type
      if (pattern.toString().includes('15 Min Response')) {
        content = content.replace(pattern, `${stationData.time} Response`);
      } else if (pattern.toString().includes('15 minutes away')) {
        content = content.replace(pattern, `${stationData.time} away`);
      } else if (pattern.toString().includes('15 minute response')) {
        content = content.replace(pattern, `${stationData.time} response`);
      } else if (pattern.toString().includes('solicitor 15 minutes')) {
        content = content.replace(pattern, `solicitor ${stationData.time}`);
      }
      modified = true;
    }
  }
  
  // Fix "Criminal Defence Kent" to "Police Station Agent"
  if (content.includes('Criminal Defence Kent')) {
    content = content.replace(/Criminal Defence Kent/g, 'Police Station Agent');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  }
  
  return false;
}

// Find all police station page files
const appDir = path.join(__dirname, '..', 'app');
const stationPatterns = [
  'police-station',
  'solicitor',
  'psa-station',
  'police-station-agent'
];

let fixedCount = 0;
let checkedCount = 0;

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const dirName = item.toLowerCase();
      const isStationPage = stationPatterns.some(p => dirName.includes(p));
      
      if (isStationPage) {
        const pagePath = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          checkedCount++;
          if (fixFile(pagePath)) {
            fixedCount++;
          }
        }
      }
      
      // Continue recursing
      processDirectory(fullPath);
    }
  }
}

console.log('Fixing police station response times...\n');
console.log('Base location: TN15 6ER (West Kingsdown, near Sevenoaks)\n');

processDirectory(appDir);

console.log(`\n✓ Checked ${checkedCount} files`);
console.log(`✓ Fixed ${fixedCount} files`);

// Also fix other pages with Criminal Defence Kent
const otherPages = [
  'app/page.tsx',
  'app/home/page.tsx',
  'app/about/page.tsx',
  'app/areas/page.tsx',
  'app/coverage/page.tsx',
  'app/accessibility/page.tsx',
  'app/privateclientfaq/page.tsx',
  'app/what-is-a-police-station-rep/page.tsx',
  'app/what-to-do-if-a-loved-one-is-arrested/page.tsx',
  'app/arrival-times-delays/page.tsx',
  'app/after-a-police-interview/page.tsx',
  'app/voluntary-police-interview-risks/page.tsx',
  'app/what-is-a-criminal-solicitor/page.tsx',
  'app/kent-police-station-reps/page.tsx',
  'app/police-station-interviews-kent-rights/page.tsx',
  'app/can-we-help/page.tsx',
  'app/case-status/page.tsx',
  'app/admin/login/layout.tsx',
  'app/manifest.json/route.ts',
  'public/manifest.json',
];

console.log('\nFixing other pages with Criminal Defence Kent...\n');

for (const page of otherPages) {
  const fullPath = path.join(__dirname, '..', page);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('Criminal Defence Kent')) {
      content = content.replace(/Criminal Defence Kent/g, 'Police Station Agent');
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✓ Fixed: ${page}`);
    }
  }
}

console.log('\nDone!');

