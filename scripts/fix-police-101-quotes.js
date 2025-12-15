#!/usr/bin/env node
/**
 * Fix the 101 number HTML that was inserted with wrong escaping
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const stationPatterns = ['police-station', 'psa-station'];
let fixedCount = 0;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // The broken pattern has unescaped quotes (class="...")
  // We need to replace it with properly escaped quotes (class=\"...\")
  const brokenHTML = '<div class="mt-4 pt-4 border-t border-slate-200"><p class="text-sm font-semibold text-slate-700 mb-1">Kent Police Non-Emergency</p><a href="tel:101" class="text-lg font-bold text-blue-600 hover:underline">Call 101</a><p class="text-xs text-slate-500 mt-1">For non-urgent police matters</p></div>';
  
  const fixedHTML = '<div class=\\"mt-4 pt-4 border-t border-slate-200\\"><p class=\\"text-sm font-semibold text-slate-700 mb-1\\">Kent Police Non-Emergency</p><a href=\\"tel:101\\" class=\\"text-lg font-bold text-blue-600 hover:underline\\">Call 101</a><p class=\\"text-xs text-slate-500 mt-1\\">For non-urgent police matters</p></div>';
  
  if (content.includes(brokenHTML)) {
    content = content.replace(brokenHTML, fixedHTML);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', path.basename(path.dirname(filePath)));
    return true;
  }
  return false;
}

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
          if (fixFile(pagePath)) {
            fixedCount++;
          }
        }
      }
      processDirectory(fullPath);
    }
  }
}

console.log('Fixing 101 number quote escaping...\n');
processDirectory(appDir);
console.log('\nFixed', fixedCount, 'files');

