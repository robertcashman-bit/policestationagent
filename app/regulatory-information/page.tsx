import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { REGULATORY_LINKS, REPUK_PROFILE_URL } from "@/config/link-authority";

export const metadata: Metadata = {
  title: "Regulatory Information | Police Station Agent",
  description:
    "Regulatory information about Defence Legal Services Ltd t/a Police Station Agent and Tuckers Solicitors LLP.",
  alternates: { canonical: `https://${SITE_DOMAIN}/regulatory-information` },
};

export default function RegulatoryInformationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">
              Regulatory Information
            </h1>

            <div className="space-y-8">
              {/* Website Operator */}
              <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Website Operator</h2>
                <p className="text-slate-700 leading-relaxed">
                  This website is operated by{" "}
                  <strong>Defence Legal Services Ltd t/a Police Station Agent</strong>.
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Defence Legal Services Ltd t/a Police Station Agent provides general information
                  through this website and does not itself provide legal services.
                </p>
              </section>

              {/* Legal Services Provider */}
              <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Legal Services Provider</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Legal services are provided by{" "}
                  <a
                    href={REGULATORY_LINKS.tuckers}
                    className="text-blue-600 hover:underline"
                    rel="noopener noreferrer"
                  >
                    <strong>Tuckers Solicitors LLP</strong>
                  </a>{" "}
                  (SRA ID: 127795). Verify via the{" "}
                  <a
                    href={REGULATORY_LINKS.sraFindASolicitor}
                    className="text-blue-600 hover:underline"
                    rel="noopener noreferrer"
                  >
                    SRA register
                  </a>
                  .
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Any Legal Aid or private retainer is with Tuckers Solicitors LLP. Robert Cashman
                  acts as a solicitor at Tuckers Solicitors LLP, subject to availability and
                  conflicts.
                </p>
              </section>

              <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional memberships</h2>
                <ul className="space-y-2 text-slate-700">
                  <li>
                    <a
                      href={REGULATORY_LINKS.clsa}
                      className="text-blue-600 hover:underline"
                      rel="noopener noreferrer"
                    >
                      Criminal Law Solicitors&apos; Association (CLSA)
                    </a>
                  </li>
                  <li>
                    <a
                      href={REPUK_PROFILE_URL}
                      className="text-blue-600 hover:underline"
                      rel="noopener noreferrer"
                    >
                      PoliceStationRepUK directory profile
                    </a>
                  </li>
                </ul>
              </section>

              {/* Data Sharing */}
              <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Sharing</h2>
                <p className="text-slate-700 leading-relaxed">
                  By contacting us via this website, you consent to your details being used to
                  respond and, where appropriate, shared with Tuckers Solicitors LLP for that
                  purpose.
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  For more information about how we handle your data, please see our{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </section>

              {/* Complaints */}
              <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Complaints</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Complaints about Legal Services
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Complaints about legal services provided by Tuckers Solicitors LLP should be
                      directed to Tuckers Solicitors LLP in accordance with their complaints
                      procedure.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Complaints about Website/Technical Issues
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Complaints about the website or technical issues should be directed to Defence
                      Legal Services Ltd t/a Police Station Agent. Please see our{" "}
                      <a href="/complaints" className="text-blue-600 hover:underline">
                        Complaints Page
                      </a>{" "}
                      for more information.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
