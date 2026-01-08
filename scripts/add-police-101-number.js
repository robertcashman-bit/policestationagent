#!/usr/bin/env node
/**
 * Add Kent Police non-emergency number (101) to all police station pages
 */

const fs = require("fs");
const path = require("path");

// Police station pages to update
const appDir = path.join(__dirname, "..", "app");

function addPoliceNumber(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Check if already has 101 info
  if (
    content.includes("Call 101") ||
    content.includes("Kent Police 101") ||
    content.includes("Non-emergency: 101")
  ) {
    console.log(`  Already has 101: ${filePath}`);
    return false;
  }

  // Add Kent Police 101 info after the "Get Directions" button in the station details sidebar
  // Look for the pattern after the address and directions link
  const directionsPattern = /Get Directions<\/a><\/div><\/div>/g;
  if (content.match(directionsPattern)) {
    const policeInfoHTML = `Get Directions</a><div class="mt-4 pt-4 border-t border-slate-200"><p class="text-sm font-semibold text-slate-700 mb-1">Kent Police Non-Emergency</p><a href="tel:101" class="text-lg font-bold text-blue-600 hover:underline">Call 101</a><p class="text-xs text-slate-500 mt-1">For non-urgent police matters</p></div></div></div>`;
    content = content.replace(directionsPattern, policeInfoHTML);
    modified = true;
  }

  // Also check for escaped pattern in HTML strings
  if (!modified && content.includes("Get Directions</a></div></div>")) {
    const searchStr = "Get Directions</a></div></div>";
    const replaceStr =
      'Get Directions</a><div class="mt-4 pt-4 border-t border-slate-200"><p class="text-sm font-semibold text-slate-700 mb-1">Kent Police Non-Emergency</p><a href="tel:101" class="text-lg font-bold text-blue-600 hover:underline">Call 101</a><p class="text-xs text-slate-500 mt-1">For non-urgent police matters</p></div></div></div>';
    // Only replace first occurrence (station details sidebar)
    content = content.replace(searchStr, replaceStr);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✓ Added 101: ${filePath}`);
    return true;
  }

  return false;
}

console.log("Adding Kent Police 101 number to police station pages...\n");

const stationPatterns = ["police-station", "solicitor", "psa-station", "police-station-agent"];
let updatedCount = 0;

function processDirectory(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const dirName = item.toLowerCase();
      const isStationPage = stationPatterns.some((p) => dirName.includes(p));

      if (isStationPage) {
        const pagePath = path.join(fullPath, "page.tsx");
        if (fs.existsSync(pagePath)) {
          if (addPoliceNumber(pagePath)) {
            updatedCount++;
          }
        }
      }

      processDirectory(fullPath);
    }
  }
}

processDirectory(appDir);
console.log(`\n✓ Updated ${updatedCount} files with Kent Police 101 number`);
