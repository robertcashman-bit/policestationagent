#!/usr/bin/env node

/**
 * Fix all 404 solicitor pages by creating appropriate content
 * Based on the pattern from canterbury-solicitor, maidstone-solicitor, medway-solicitor
 */

const fs = require("fs").promises;
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");

// Map of locations to their details
const locations = {
  "ashford-solicitor": {
    area: "Ashford",
    postcode: "TN23/TN24",
    responseTime: "20",
    type: "voluntary",
  },
  "bluewater-solicitor": {
    area: "Bluewater",
    postcode: "DA9",
    responseTime: "15",
    type: "voluntary",
  },
  "bromley-solicitor": {
    area: "Bromley",
    postcode: "BR1/BR2",
    responseTime: "25",
    type: "voluntary",
  },
  "chatham-solicitor": {
    area: "Chatham",
    postcode: "ME4/ME5",
    responseTime: "12",
    type: "custody",
  },
  "dartford-solicitor": {
    area: "Dartford",
    postcode: "DA1/DA2",
    responseTime: "18",
    type: "voluntary",
  },
  "deal-solicitor": { area: "Deal", postcode: "CT14", responseTime: "25", type: "voluntary" },
  "dover-solicitor": {
    area: "Dover",
    postcode: "CT16/CT17",
    responseTime: "30",
    type: "voluntary",
  },
  "faversham-solicitor": {
    area: "Faversham",
    postcode: "ME13",
    responseTime: "20",
    type: "voluntary",
  },
  "folkestone-solicitor": {
    area: "Folkestone",
    postcode: "CT19/CT20",
    responseTime: "25",
    type: "custody",
  },
  "gillingham-solicitor": {
    area: "Gillingham",
    postcode: "ME7/ME8",
    responseTime: "12",
    type: "custody",
  },
  "gravesend-police-station": {
    area: "Gravesend",
    postcode: "DA11/DA12",
    responseTime: "15",
    type: "custody",
  },
  "herne-bay-solicitor": {
    area: "Herne Bay",
    postcode: "CT6",
    responseTime: "20",
    type: "voluntary",
  },
  "margate-solicitor": { area: "Margate", postcode: "CT9", responseTime: "30", type: "custody" },
  "ramsgate-solicitor": {
    area: "Ramsgate",
    postcode: "CT11",
    responseTime: "30",
    type: "voluntary",
  },
  "rochester-solicitor": {
    area: "Rochester",
    postcode: "ME1/ME2",
    responseTime: "12",
    type: "custody",
  },
  "sandwich-solicitor": {
    area: "Sandwich",
    postcode: "CT13",
    responseTime: "25",
    type: "voluntary",
  },
  "sevenoaks-solicitor": {
    area: "Sevenoaks",
    postcode: "TN13/TN14/TN15",
    responseTime: "15",
    type: "voluntary",
  },
  "sittingbourne-solicitor": {
    area: "Sittingbourne",
    postcode: "ME9/ME10",
    responseTime: "18",
    type: "voluntary",
  },
  "swanley-solicitor": { area: "Swanley", postcode: "BR8", responseTime: "20", type: "voluntary" },
  "tonbridge-solicitor": {
    area: "Tonbridge",
    postcode: "TN9/TN10/TN11/TN12",
    responseTime: "15",
    type: "custody",
  },
  "tunbridge-wells-solicitor": {
    area: "Tunbridge Wells",
    postcode: "TN1/TN2/TN3/TN4",
    responseTime: "18",
    type: "voluntary",
  },
  "whitstable-solicitor": {
    area: "Whitstable",
    postcode: "CT5",
    responseTime: "18",
    type: "voluntary",
  },
};

function generateContent(location, details) {
  const { area, postcode, responseTime, type } = details;
  const isCustody = type === "custody";
  const stationType = isCustody ? "custody suite" : "police station";
  const action = isCustody ? "Arrested" : "Invited for interview";

  return `import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: "${area} Police Station Solicitor | ${postcode} | FREE Legal Aid | Call 01732 247427",
  description: "${action} in ${area}? Police station solicitor ${responseTime} minutes away. FREE legal aid representation. Available 24/7 - call now.",
  alternates: {
    canonical: \`https://\${SITE_DOMAIN}/${location}\`,
  },
  openGraph: {
    title: "${area} Police Station Solicitor | ${postcode} | FREE Legal Aid | Call 01732 247427",
    description: "${action} in ${area}? Police station solicitor ${responseTime} minutes away. FREE legal aid representation. Available 24/7.",
    url: \`https://\${SITE_DOMAIN}/${location}\`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: \`<div class="bg-slate-50 min-h-screen"><section class="bg-gradient-to-br from-red-700 to-red-900 text-white py-12"><div class="max-w-4xl mx-auto px-4 text-center"><div class="inline-flex items-center rounded-md border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-white text-red-700 mb-4 text-sm font-bold">${postcode} Area - ${responseTime} Min Response</div><h1 class="text-4xl md:text-5xl font-black mb-4">${area} Police Station Solicitor</h1><p class="text-xl text-red-100 mb-6">${action} in ${area}? We're ${responseTime} minutes away. FREE legal representation.</p><div class="flex flex-col sm:flex-row gap-3 justify-center"><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-10 rounded-md px-8 bg-white text-red-700 hover:bg-red-50 font-black text-lg flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Call: 01732 247427</a><a href="sms:07535494446?body=Need solicitor in ${area}" class="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-10 rounded-md px-8 bg-green-600 hover:bg-green-700 text-white font-bold text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5 mr-2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg> Text: 07535 494446</a></div></div></section><div class="max-w-4xl mx-auto px-4 py-12"><div class="rounded-xl border bg-card text-card-foreground mb-8 border-l-4 border-l-amber-500 shadow-lg"><div class="p-6"><div class="flex items-start gap-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-8 h-8 text-amber-600 flex-shrink-0"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg><div><h2 class="text-2xl font-bold text-slate-900 mb-2">${area} (${postcode}) Coverage</h2><p class="text-slate-700 mb-4">We provide expert police station representation in ${area} and surrounding areas. ${isCustody ? "If arrested, you will be taken to the nearest custody suite." : "If invited for a voluntary interview, never attend alone."}</p><ul class="space-y-2 text-slate-700"><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-5 h-5 text-green-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><span><strong>${responseTime} minute response time</strong> to ${stationType}</span></li><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-blue-600"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span><strong>FREE legal aid</strong> - no means test required</span></li><li class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-5 h-5 text-amber-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span><strong>We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor.</p></div></div></div></div><section class="bg-red-600 text-white py-12"><div class="max-w-4xl mx-auto px-4 text-center"><h2 class="text-3xl font-black mb-4">${action} in ${area}?</h2><p class="text-xl text-red-100 mb-6">Immediate FREE legal representation. Available 24/7.</p><div class="flex flex-col sm:flex-row gap-3 justify-center"><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-10 rounded-md px-8 bg-white text-red-700 hover:bg-red-50 font-black">📞 Call: 01732 247427</a><a href="sms:07535494446" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-10 rounded-md px-8 bg-green-600 hover:bg-green-700 text-white font-bold">💬 Text: 07535 494446</a></div></div></section></div>\` }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
`;
}

async function fixAllPages() {
  console.log("Fixing 404 solicitor pages...\n");

  for (const [location, details] of Object.entries(locations)) {
    const filePath = path.join(APP_DIR, location, "page.tsx");
    const content = generateContent(location, details);

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write the file
    await fs.writeFile(filePath, content, "utf-8");
    console.log(`✅ Fixed: ${location}`);
  }

  console.log(`\n✅ Fixed ${Object.keys(locations).length} pages`);
}

fixAllPages().catch(console.error);
