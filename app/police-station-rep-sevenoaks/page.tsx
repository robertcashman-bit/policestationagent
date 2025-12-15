import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN, SITE_URL } from '@/config/site';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Police Station Rep Sevenoaks | FREE 24/7 | Accredited Duty Solicitor",
  description: "Police station rep for Sevenoaks voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Sevenoaks and West Kent. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/police-station-rep-sevenoaks`,
  },
  openGraph: {
    title: "Police Station Rep Sevenoaks | FREE 24/7 | Accredited Duty Solicitor",
    description: "Police station rep for Sevenoaks voluntary interviews. FREE legal advice 24/7. Accredited duty solicitor covering Sevenoaks and West Kent.",
    url: `https://${SITE_DOMAIN}/police-station-rep-sevenoaks`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/police-station-rep-sevenoaks#business`,
  "name": "Police Station Representative - Sevenoaks, Kent",
  "description": "Expert police station rep service in Sevenoaks, Kent. FREE 24/7 representation for voluntary interviews' for police interviews and custody matters.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sevenoaks",
    "addressRegion": "Kent",
    "addressCountry": "GB"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Sevenoaks",
      "containedIn": {
        "@type": "State",
        "name": "Kent"
      }
    },
    {
      "@type": "City",
      "name": "West Kent",
      "containedIn": {
        "@type": "State",
        "name": "Kent"
      }
    },
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Police Station Representative in Sevenoaks, Kent</h1>
              <p className="mt-4 text-lg text-blue-200 max-w-3xl mx-auto">
                Expert police station rep service covering Sevenoaks voluntary interviews. FREE 24/7 representation by accredited duty solicitor Robert Cashman.
              </p>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-xl border bg-card text-card-foreground shadow-lg">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Police Station Rep Coverage in Sevenoaks</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      If you or someone you know has been arrested or invited for a police interview in Sevenoaks, you need expert representation. As Kent's leading police station rep service, we provide FREE legal advice 24/7 for voluntary interviews'.
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Our accredited duty solicitor Robert Cashman has 35+ years of experience and has handled 21,000+ cases. Unlike call-centre services, you get direct access to a qualified solicitor who understands Sevenoaks's police procedures.
                    </p>
                    <div className="mt-6 space-y-3">
                      <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 w-5 h-5 mt-0.5 flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <p className="text-slate-700">FREE legal advice under Legal Aid</p>
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
                        <p className="text-slate-700">45-minute response time to Sevenoaks</p>
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
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Sevenoaks Police Station Coverage</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Sevenoaks police station is located at Sevenoaks area. We provide expert <a href="/sevenoaks-police-station" className="text-blue-600 hover:underline font-semibold">police station rep at Sevenoaks</a> for all arrests and voluntary interviews in the Sevenoaks area.
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      We cover voluntary interviews at Sevenoaks police stations. Whether you're in Sevenoaks or West Kent, we can provide immediate representation.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-lg">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Our Police Station Rep Service in Sevenoaks?</h2>
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
                  <h3 className="text-xl font-bold mb-4">Need a Police Station Rep in Sevenoaks?</h3>
                  <p className="mb-4 text-red-100">Call now for FREE 24/7 representation</p>
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
                    <h3 className="font-semibold text-slate-900 mb-4">Sevenoaks Police Station</h3>
                    <p className="text-slate-600 text-sm mb-2">Sevenoaks area</p>
                    <a href="/sevenoaks-police-station" className="text-blue-600 hover:underline text-sm font-medium">
                      View police station rep at Sevenoaks →
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
