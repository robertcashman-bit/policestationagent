const fs = require('fs');
const path = require('path');

const locationPages = [
  'app/police-station-agent-medway/page.tsx',
  'app/police-station-agent-maidstone/page.tsx',
  'app/police-station-agent-canterbury/page.tsx',
  'app/police-station-agent-gravesend/page.tsx',
  'app/police-station-agent-ashford/page.tsx',
  'app/police-station-agent-folkestone/page.tsx',
  'app/police-station-agent-tonbridge/page.tsx',
  'app/police-station-agent-sittingbourne/page.tsx',
  'app/police-station-agent-sevenoaks/page.tsx',
  'app/police-station-agent-dartford/page.tsx'
];

function addFAQSection(filePath, locationName) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${filePath} - file not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Add new FAQ questions before the closing section
  const newFAQs = `<div class="rounded-xl bg-card text-card-foreground border-0 shadow-sm"><div class="p-6"><h3 class="font-bold text-slate-900 mb-2">What is a police station duty solicitor?</h3><p class="text-slate-600">A police station duty solicitor is a qualified solicitor accredited by the Law Society to provide FREE legal advice at police stations under Legal Aid. Robert Cashman is both a qualified solicitor and an Accredited Duty Solicitor with Higher Court Advocate status, providing expert representation at ${locationName} and all Kent custody suites.</p></div></div><div class="rounded-xl bg-card text-card-foreground border-0 shadow-sm"><div class="p-6"><h3 class="font-bold text-slate-900 mb-2">How does a duty solicitor protect your rights in Kent custody suites?</h3><p class="text-slate-600">A duty solicitor protects your rights by: ensuring you understand your legal rights under PACE 1984, reviewing police evidence and disclosure before interview, advising on whether to answer questions or remain silent, attending the interview with you and intervening if questioning is improper, making representations about bail conditions or release, and ensuring all police procedures are followed correctly. This protection is your absolute right under Section 58 of PACE 1984.</p></div></div><div class="rounded-xl bg-card text-card-foreground border-0 shadow-sm"><div class="p-6"><h3 class="font-bold text-slate-900 mb-2">What is the difference between a police station agent and a duty solicitor?</h3><p class="text-slate-600">A duty solicitor is a qualified solicitor accredited by the Law Society to provide legal advice at police stations. A police station agent (or accredited representative) is a non-solicitor who has passed the Police Station Qualification to attend on behalf of a solicitor's firm. Robert Cashman is a qualified solicitor and Accredited Duty Solicitor with Higher Court Advocate status, not just an agent.</p></div></div>`;

  // Find the FAQ section and add new questions before the closing div
  if (content.includes(`${locationName} Police Station FAQs</h2>`)) {
    // Insert new FAQs before the closing </div></div></section>
    content = content.replace(
      /(<div class="p-6"><h3 class="font-bold text-slate-900 mb-2">[^<]+<\/h3><p class="text-slate-600">[^<]+<\/p><\/div><\/div><\/div><\/div><\/section>)/,
      newFAQs + '$1'
    );
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Added FAQs to ${filePath}`);
}

// Location names mapping
const locationNames = {
  'medway': 'Medway',
  'maidstone': 'Maidstone',
  'canterbury': 'Canterbury',
  'gravesend': 'Gravesend',
  'ashford': 'Ashford',
  'folkestone': 'Folkestone',
  'tonbridge': 'Tonbridge',
  'sittingbourne': 'Sittingbourne',
  'sevenoaks': 'Sevenoaks',
  'dartford': 'Dartford'
};

locationPages.forEach(filePath => {
  const location = filePath.match(/police-station-agent-([^/]+)/)?.[1];
  if (location) {
    const locationName = locationNames[location] || location.charAt(0).toUpperCase() + location.slice(1);
    addFAQSection(filePath, locationName);
  }
});

console.log('FAQ sections added to all location pages!');
