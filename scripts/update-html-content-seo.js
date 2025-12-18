const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/police-station-agent-kent/page.tsx',
  'app/page.tsx',
  'app/emergency-police-station-representation/page.tsx',
  'app/whatisapolicestationrep/page.tsx'
];

function updateHTMLContent(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} - file not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace "24/7" references
  content = content.replace(/Available 24\/7 Across Kent/g, 'Extended Hours Service Across Kent');
  content = content.replace(/24\/7 Police Station Agent in Kent/g, 'Police Station Duty Solicitor Kent');
  content = content.replace(/Available 24\/7/g, 'Extended Hours Service');
  content = content.replace(/24\/7 availability/g, 'Extended hours service');
  content = content.replace(/24\/7 representation/g, 'Extended hours representation');
  content = content.replace(/24\/7, including weekends/g, 'Extended hours including evenings, weekends');
  content = content.replace(/Available 24\/7 across all Kent custody suites/g, 'Extended hours service across all Kent custody suites');
  content = content.replace(/available 24\/7/g, 'available for extended hours');
  content = content.replace(/FREE legal advice available 24\/7/g, 'FREE legal advice under Legal Aid');
  content = content.replace(/operates 24\/7/g, 'operates extended hours');
  
  // Replace "Police Station Agent" references
  content = content.replace(/Police Station Agent/g, 'Police Station Duty Solicitor');
  content = content.replace(/At Police Station Agent, we understand/g, 'We understand');
  content = content.replace(/Need a Police Station Agent in Kent\?/g, 'Need a Police Station Duty Solicitor in Kent?');
  
  // Replace "police station agent" (lowercase)
  content = content.replace(/police station agent/g, 'duty solicitor');
  content = content.replace(/a police station agent/g, 'a duty solicitor');
  
  // Update H1 headings
  content = content.replace(/<h1[^>]*>24\/7 Police Station Agent in Kent<\/h1>/g, '<h1 id="kent-hero" class="text-4xl md:text-6xl font-black mb-6">Police Station Duty Solicitor Kent</h1>');
  
  // Update FAQ content
  content = content.replace(/How quickly can a police station agent attend/g, 'How quickly can a duty solicitor attend');
  content = content.replace(/What is the difference between a duty solicitor and a police station agent\?/g, 'What is the difference between a police station agent and a duty solicitor?');
  
  // Update extended hours representation references
  content = content.replace(/extended hours representation - 9am till late/g, 'Extended hours service');
  content = content.replace(/extended hours extended hours representation - 9am till late/g, 'Extended hours service');
  
  // Update "24/7" in FAQ answers
  content = content.replace(/Our extended hours service operates 24\/7, including weekends/g, 'Our extended hours service covers evenings, weekends');
  content = content.replace(/24\/7 coverage/g, 'Extended hours coverage');
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

filesToUpdate.forEach(file => {
  updateHTMLContent(file);
});

console.log('All HTML content updated!');






