#!/usr/bin/env node

/**
 * Update travel times from TN15 6ER (Sevenoaks) to all Kent police stations
 * Based on realistic road travel times
 */

const fs = require('fs');
const path = require('path');

// Travel times from TN15 6ER to various locations (in minutes)
const travelTimes = {
  'ashford': 60,
  'canterbury': 55,
  'maidstone': 25,
  'medway': 35,
  'chatham': 35,
  'tonbridge': 15,
  'tunbridge-wells': 20,
  'folkestone': 70,
  'dover': 75,
  'margate': 80,
  'sittingbourne': 45,
  'swanley': 30,
  'gravesend': 40,
  'sevenoaks': 10,
  'rochester': 35,
  'dartford': 30,
  'bromley': 25,
  'bluewater': 30,
  'whitstable': 50,
  'herne-bay': 50,
  'sandwich': 60,
  'ramsgate': 75,
  'deal': 70,
  'faversham': 50,
  'gillingham': 35
};

const solicitorPagesDir = path.join(__dirname, 'app');

// Function to update a solicitor page
function updateSolicitorPage(location, minutes) {
  const filePath = path.join(solicitorPagesDir, `${location}-solicitor`, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Update metadata descriptions
  const descPattern1 = new RegExp(`(description: "Invited for interview in ${location.charAt(0).toUpperCase() + location.slice(1).replace(/-/g, ' ')}[^"]*?)\\d+ minutes away`, 'gi');
  if (descPattern1.test(content)) {
    content = content.replace(descPattern1, `$1${minutes} minutes away`);
    updated = true;
  }

  const descPattern2 = new RegExp(`(description: "Arrested in ${location.charAt(0).toUpperCase() + location.slice(1).replace(/-/g, ' ')}[^"]*?)\\d+ minutes away`, 'gi');
  if (descPattern2.test(content)) {
    content = content.replace(descPattern2, `$1${minutes} minutes away`);
    updated = true;
  }

  // Update HTML content - response time badge
  const badgePattern = new RegExp(`(\\d+) Min Response`, 'gi');
  if (badgePattern.test(content)) {
    content = content.replace(badgePattern, `${minutes} Min Response`);
    updated = true;
  }

  // Update "We're X minutes away" text
  const awayPattern = new RegExp(`We're (\\d+) minutes away`, 'gi');
  if (awayPattern.test(content)) {
    content = content.replace(awayPattern, `We're ${minutes} minutes away`);
    updated = true;
  }

  // Update response time mentions
  const responsePattern = new RegExp(`(\\d+) minute response time`, 'gi');
  if (responsePattern.test(content)) {
    content = content.replace(responsePattern, `${minutes} minute response time`);
    updated = true;
  }

  // Update "Just X minutes away" or "X minutes away"
  const justPattern = new RegExp(`Just (\\d+) minutes away`, 'gi');
  if (justPattern.test(content)) {
    content = content.replace(justPattern, `${minutes} minutes away`);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${location}: ${minutes} minutes`);
    return true;
  } else {
    console.log(`No updates needed for ${location}`);
    return false;
  }
}

// Update all locations
console.log('Updating travel times from TN15 6ER...\n');
let updatedCount = 0;

for (const [location, minutes] of Object.entries(travelTimes)) {
  if (updateSolicitorPage(location, minutes)) {
    updatedCount++;
  }
}

console.log(`\nUpdated ${updatedCount} files.`);

