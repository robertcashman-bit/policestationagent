import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: "Terms and Conditions | Police Station Agent",
  description: "Terms and conditions for Police Station Agent services. Legal information about our police station representation services across Kent.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms and Conditions | Police Station Agent",
    description: "Terms and conditions for Police Station Agent services.",
    url: `https://${SITE_DOMAIN}/terms-and-conditions`,
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                <p>These terms and conditions govern your use of Police Station Agent services. By instructing us, you agree to these terms.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Legal Aid Services</h2>
                <p>Legal Aid representation at the police station is provided free of charge under the Legal Aid Agency scheme. This service is available to everyone regardless of means and is not means-tested.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Private Client Services</h2>
                <p>Private client services are subject to separate terms and fee agreements. All fees will be agreed in advance and confirmed in writing.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Confidentiality</h2>
                <p>All communications between you and your solicitor are protected by Legal Professional Privilege and are strictly confidential. We will not disclose any information without your express consent, except where required by law.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Professional Standards</h2>
                <p>We are regulated by the Solicitors Regulation Authority (SRA) and operate in accordance with all professional standards and codes of conduct.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
                <p>Our liability is limited to the extent permitted by law. We provide professional legal services in accordance with our professional obligations.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact</h2>
                <p>For any questions about these terms, please contact us:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Email: robertcashman@defencelegalservices.co.uk</li>
                  <li>Phone: 01732 247427</li>
                </ul>
              </section>

              <section className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500">Last updated: December 2025</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
