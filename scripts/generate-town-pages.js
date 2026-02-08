const fs = require("fs");
const path = require("path");

const towns = [
  {
    slug: "maidstone",
    name: "Maidstone",
    displayName: "Maidstone",
    type: "Voluntary Interviews",
    address: "Palace Avenue, Maidstone, Kent ME15 6NF",
    areaServed: ["Maidstone", "Mid-Kent"],
    stationLink: "/maidstone-police-station",
    description:
      "Police station rep for Maidstone voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Maidstone and mid-Kent.",
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    displayName: "Canterbury",
    type: "Custody Suite",
    address: "Old Dover Road, Canterbury",
    areaServed: ["Canterbury", "East Kent", "Dover", "Margate", "Ramsgate"],
    stationLink: "/canterbury-police-station",
    description:
      "Expert police station rep in Canterbury, Kent. FREE We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor. at Canterbury custody suite. Serving East Kent.",
  },
  {
    slug: "gravesend",
    name: "Gravesend",
    displayName: "Gravesend",
    type: "Custody Suite",
    address: "Thames Way, Northfleet DA11 8BD",
    areaServed: ["Gravesend", "Dartford", "North Kent"],
    stationLink: "/north-kent-gravesend-police-station",
    description:
      "Police station rep in Gravesend, Kent. FREE legal advice 24/7 at North Kent custody suite. Serving Gravesend, Dartford, and North Kent.",
  },
  {
    slug: "tonbridge",
    name: "Tonbridge",
    displayName: "Tonbridge",
    type: "Custody Suite",
    address: "1 Pembury Road, Tonbridge TN9 2HS",
    areaServed: ["Tonbridge", "West Kent"],
    stationLink: "/tonbridge-police-station",
    description:
      "Expert police station rep in Tonbridge, Kent. FREE We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor. at Tonbridge custody suite. Serving West Kent.",
  },
  {
    slug: "folkestone",
    name: "Folkestone",
    displayName: "Folkestone",
    type: "Custody Suite",
    address: "Bouverie House, Folkestone",
    areaServed: ["Folkestone", "East Kent"],
    stationLink: "/folkestone-police-station",
    description:
      "Expert police station rep in Folkestone, Kent. FREE We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor. at Folkestone custody suite. Serving East Kent.",
  },
  {
    slug: "ashford",
    name: "Ashford",
    displayName: "Ashford",
    type: "Voluntary Interviews",
    address: "Tufton Street, Ashford",
    areaServed: ["Ashford", "Mid-Kent"],
    stationLink: "/ashford-police-station",
    description:
      "Police station rep for Ashford voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Ashford and mid-Kent.",
  },
  {
    slug: "dartford",
    name: "Dartford",
    displayName: "Dartford",
    type: "Coverage Area",
    address: "North Kent area",
    areaServed: ["Dartford", "North Kent", "Gravesend"],
    stationLink: "/north-kent-gravesend-police-station",
    description:
      "Police station rep in Dartford, Kent. FREE legal advice 24/7. Serving Dartford and North Kent area.",
  },
  {
    slug: "sittingbourne",
    name: "Sittingbourne",
    displayName: "Sittingbourne",
    type: "Voluntary Interviews",
    address: "Sittingbourne area",
    areaServed: ["Sittingbourne", "Mid-Kent"],
    stationLink: "/sittingbourne-police-station",
    description:
      "Police station rep for Sittingbourne voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Sittingbourne.",
  },
  {
    slug: "sevenoaks",
    name: "Sevenoaks",
    displayName: "Sevenoaks",
    type: "Voluntary Interviews",
    address: "Sevenoaks area",
    areaServed: ["Sevenoaks", "West Kent"],
    stationLink: "/sevenoaks-police-station",
    description:
      "Police station rep for Sevenoaks voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Sevenoaks and West Kent.",
  },
  {
    slug: "tunbridge-wells",
    name: "Tunbridge Wells",
    displayName: "Tunbridge Wells",
    type: "Voluntary Interviews",
    address: "Tunbridge Wells area",
    areaServed: ["Tunbridge Wells", "West Kent"],
    stationLink: "/tunbridge-wells-police-station",
    description:
      "Police station rep for Tunbridge Wells voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Tunbridge Wells.",
  },
  {
    slug: "margate",
    name: "Margate",
    displayName: "Margate",
    type: "Custody Suite",
    address: "Fort Hill, Margate",
    areaServed: ["Margate", "East Kent", "Thanet"],
    stationLink: "/margate-police-station",
    description:
      "Expert police station rep in Margate, Kent. FREE We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor. at Margate custody suite. Serving East Kent and Thanet.",
  },
  {
    slug: "dover",
    name: "Dover",
    displayName: "Dover",
    type: "Voluntary Interviews",
    address: "Ladywell, Dover CT16 1DJ",
    areaServed: ["Dover", "East Kent"],
    stationLink: "/dover-police-station",
    description:
      "Police station rep for Dover voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Dover and East Kent.",
  },
  {
    slug: "swanley",
    name: "Swanley",
    displayName: "Swanley",
    type: "Voluntary Interviews",
    address: "Swanley area",
    areaServed: ["Swanley", "North Kent"],
    stationLink: "/swanley-police-station",
    description:
      "Police station rep for Swanley voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Swanley and North Kent.",
  },
  {
    slug: "bluewater",
    name: "Bluewater",
    displayName: "Bluewater",
    type: "Voluntary Interviews",
    address: "Bluewater area",
    areaServed: ["Bluewater", "North Kent", "Dartford"],
    stationLink: "/bluewater-police-station",
    description:
      "Police station rep for Bluewater voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Bluewater and North Kent.",
  },
];

const template = (town) => `import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN, SITE_URL } from '@/config/site';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Police Station Rep ${town.displayName} | FREE 24/7 | Accredited Duty Solicitor",
  description: "${town.description} Call 01732 247427.",
  alternates: {
    canonical: \`https://\${SITE_DOMAIN}/police-station-rep-${town.slug}\`,
  },
  openGraph: {
    title: "Police Station Rep ${town.displayName} | FREE 24/7 | Accredited Duty Solicitor",
    description: "${town.description}",
    url: \`https://\${SITE_DOMAIN}/police-station-rep-${town.slug}\`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": \`\${SITE_URL}/police-station-rep-${town.slug}#business\`,
  "name": "Police Station Representative - ${town.displayName}, Kent",
  "description": "Expert police station rep service in ${town.displayName}, Kent. FREE We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor.${town.type === "Custody Suite" ? " at " + town.displayName + " custody suite" : " for " + town.type.toLowerCase()}' for police interviews and custody matters.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "${town.displayName}",
    "addressRegion": "Kent",
    "addressCountry": "GB"
  },
  "areaServed": [
${town.areaServed
  .map(
    (area) => `    {
      "@type": "City",
      "name": "${area}",
      "containedIn": {
        "@type": "State",
        "name": "Kent"
      }
    }`
  )
  .join(",\n")},
    {
      "@type": "State",
      "name": "Kent"
    }
  ],
  "serviceType": "Police Station Representation",
  "telephone": "+441732247427",
  "priceRange": "Free under Legal Aid",
  "openingHours": "Mo-Su 00:00-23:59"
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Police Station Representative in ${town.displayName}, Kent</h1>
              <p className="mt-4 text-lg text-blue-200 max-w-3xl mx-auto">
                Expert police station rep service covering ${town.displayName}${town.type === "Custody Suite" ? " custody suite" : " " + town.type.toLowerCase()}. FREE We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor. by accredited duty solicitor Robert Cashman.
              </p>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-xl border bg-card text-card-foreground shadow-lg">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Police Station Rep Coverage in ${town.displayName}</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      If you or someone you know has been arrested or invited for a police interview in ${town.displayName}, you need expert representation. As Kent's leading police station rep service, we provide FREE legal advice 24/7${town.type === "Custody Suite" ? " at " + town.displayName + " custody suite" : " for " + town.type.toLowerCase()}'.
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Our accredited duty solicitor Robert Cashman has 35+ years of experience and has handled 21,000+ cases. Unlike call-centre services, you get direct access to a qualified solicitor who understands ${town.displayName}'s police procedures.
                    </p>
                    <div className="mt-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 w-5 h-5 mt-0.5 flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-slate-700">FREE legal advice under Legal Aid${town.type === "Custody Suite" ? " at " + town.displayName + " custody suite" : ""}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 w-5 h-5 mt-0.5 flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-slate-700">Available 24/7 including weekends and bank holidays</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 w-5 h-5 mt-0.5 flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-slate-700">45-minute response time to ${town.displayName}${town.type === "Custody Suite" ? " custody suite" : ""}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 w-5 h-5 mt-0.5 flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-slate-700">Qualified solicitor (not a call centre) - direct access to Robert Cashman</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-lg">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">${town.displayName} ${town.type === "Custody Suite" ? "Custody Suite" : "Police Station"} Coverage</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      ${town.type === "Custody Suite" ? town.displayName + " custody suite" : town.displayName + " police station"}${town.address ? " is located at " + town.address + "." : "."} We provide expert <a href="${town.stationLink}" className="text-blue-600 hover:underline font-semibold">police station rep at ${town.displayName}${town.type === "Custody Suite" ? " custody suite" : ""}</a> for all arrests and voluntary interviews in the ${town.displayName} area.
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      We cover ${town.type === "Custody Suite" ? "all custody matters" : "voluntary interviews"} at ${town.displayName} police stations. Whether you're in ${town.areaServed.slice(0, 2).join(" or ")}, we can provide immediate representation.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-lg">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Our Police Station Rep Service in ${town.displayName}?</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Unlike call-centre competitors, we provide direct access to qualified solicitor Robert Cashman. With 35+ years of experience and 21,000+ cases, he brings Practice Director-level expertise to every case.
                    </p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Qualified Solicitor:</strong> Robert Cashman is a qualified solicitor, not just an agent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Kent-Specific:</strong> Exclusive focus on Kent (not national call centre)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Higher Court Advocate:</strong> Can represent through to Crown Court if needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Accredited Duty Solicitor:</strong> On Legal Aid rota for Kent</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-xl border bg-red-600 text-white shadow-lg p-6 text-center">
                  <h3 className="text-xl font-bold mb-4">Need a Police Station Rep in ${town.displayName}?</h3>
                  <p className="mb-4 text-red-100">Call now for FREE We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor.</p>
                  <a href="tel:01732247427" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-6 w-full bg-white text-red-600 hover:bg-red-50 font-bold mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Call: 01732 247427
                  </a>
                  <a href="sms:07535494446" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-5 h-5">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                    </svg>
                    Text: 07535 494446
                  </a>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-md">
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">${town.displayName} Police Station</h3>
                    <p className="text-slate-600 text-sm mb-2">${town.address || town.displayName + ", Kent"}</p>
                    <a href="${town.stationLink}" className="text-blue-600 hover:underline text-sm font-medium">
                      View police station rep at ${town.displayName}${town.type === "Custody Suite" ? " custody suite" : ""} →
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
`;

// Generate all pages
towns.forEach((town) => {
  const dir = path.join(__dirname, "..", "app", `police-station-rep-${town.slug}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, "page.tsx");
  fs.writeFileSync(filePath, template(town));
  console.log(`Generated: ${filePath}`);
});

console.log(`\nGenerated ${towns.length} town pages successfully!`);
