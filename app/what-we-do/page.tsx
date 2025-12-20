import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN, SITE_URL } from '@/config/site';

export const metadata: Metadata = {
  title: "What We Do | Police Station Agent - Expert Legal Representation Kent",
  description: "Expert police station representation and criminal defence services across Kent. FREE legal advice under Legal Aid, extended hours availability, voluntary interviews, and agent cover for law firms.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/what-we-do`,
  },
  openGraph: {
    title: "What We Do | Police Station Agent",
    description: "Expert police station representation and criminal defence services across Kent. FREE legal advice under Legal Aid, extended hours availability.",
    url: `https://${SITE_DOMAIN}/what-we-do`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-gradient-to-br from-slate-50 to-blue-50">
          <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-amber-400 text-slate-900 mb-6 text-sm font-bold">
                Our Services
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6">What We Do</h1>
              <p className="text-xl text-blue-100 mb-8">Expert police station representation and criminal defence services across Kent</p>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check w-6 h-6 text-blue-600">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Police Station Representation</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We provide expert legal representation at police stations across Kent, available during extended hours. Whether you've been arrested or invited for a voluntary interview, we're here to protect your rights and provide expert legal advice.
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Available during extended hours across all Kent police stations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Expert advice during police interviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Protection of your legal rights under PACE 1984</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>FREE under Legal Aid - not means-tested</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-6 h-6 text-green-600">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Voluntary Interviews</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    If the police ask you to attend a voluntary interview, you have the right to legal representation. We provide expert advice and representation for voluntary interviews, helping you understand your rights and the potential consequences.
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Pre-interview consultation and advice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Full representation during the interview</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Post-interview guidance and support</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase w-6 h-6 text-purple-600">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Legal Aid & Private Representation</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We provide both Legal Aid (free) and private representation services. Legal Aid is available to everyone at the police station, while private representation offers guaranteed continuity and enhanced service.
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Free Legal Aid representation available to all</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Private representation with guaranteed solicitor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Transparent fixed-fee packages available</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-6 h-6 text-red-600">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">extended hours Emergency Service</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We understand that arrests and police interviews can happen at any time. That's why we provide round-the-clock emergency legal representation across all Kent police stations.
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Available 24 hours a day, 7 days a week</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Rapid response to police station calls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Coverage of all Kent police stations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Extended hours including weekends and bank holidays</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-8 border border-blue-200 mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Coverage</h2>
                <p className="text-slate-600 mb-6">
                  We provide police station representation across all of Kent, including:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">East Kent</h3>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>Canterbury</li>
                      <li>Folkestone</li>
                      <li>Dover</li>
                      <li>Margate</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">West Kent</h3>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>Tonbridge</li>
                      <li>Maidstone</li>
                      <li>Sevenoaks</li>
                      <li>Tunbridge Wells</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">North Kent</h3>
                    <ul className="space-y-1 text-slate-600 text-sm">
                      <li>Medway</li>
                      <li>Gravesend</li>
                      <li>Swanley</li>
                      <li>Bluewater</li>
                      <li>Sittingbourne</li>
                      <li>Ashford</li>
                      <li>Coldharbour</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200 mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Agent Cover for Law Firms</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We provide reliable police station agent services for criminal law firms across the country. Our comprehensive service includes detailed attendance notes, competitive fixed rates, and expert representation.
                </p>
                <ul className="space-y-2 text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Detailed attendance notes and case reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Competitive fixed rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>35 years experience & 21,000+ cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Trusted by law firms nationwide</span>
                  </li>
                </ul>
                <a href="/forsolicitors" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md px-6 bg-amber-600 hover:bg-amber-700 text-white font-bold">
                  Learn About Agent Services
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 ml-2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Need Help Now?</h2>
                <p className="text-xl text-slate-600 mb-8">We're available during extended hours to provide expert legal representation</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:01732247427" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white shadow h-12 rounded-md px-8 bg-red-600 hover:bg-red-700 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Call: 01732 247427
                  </a>
                  <a href="/contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-white shadow-sm h-12 rounded-md px-8 border-slate-300 text-slate-900 hover:bg-slate-50">
                    Contact Us
                  </a>
                </div>
                <p className="text-sm text-slate-600 mt-6">
                  <strong>Ask for Robert Cashman, Tuckers Duty Solicitor</strong> — The DSCC have our details
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
