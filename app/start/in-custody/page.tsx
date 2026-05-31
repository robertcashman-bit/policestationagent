import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SEO_NOT_POLICE, SERVICE_SCOPE, PHONE_DISPLAY } from "@/config/contact";

export const metadata: Metadata = {
  title: "Someone in Custody? | NOT the Police | Arrange Representation Kent",
  description:
    `${SEO_NOT_POLICE} ${SERVICE_SCOPE} Telephone ${PHONE_DISPLAY} to instruct representation for someone in Kent police custody.`,
  alternates: {
    canonical: "https://policestationagent.com/start/in-custody",
  },
};

export default function InCustodyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Hero Section */}
            <section
              className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-16 rounded-xl mb-8"
              aria-labelledby="page-title"
            >
              <div className="max-w-3xl mx-auto px-4">
                <h1 id="page-title" className="text-4xl md:text-5xl font-black mb-6 text-white">
                  Has someone you know been arrested and taken to a police station?
                </h1>
                <p className="text-xl text-red-100 mb-6">
                  If a friend, family member, or client has been arrested and is currently being held
                  at a police station, you can arrange legal representation on their behalf.
                </p>
                <p className="text-lg text-red-100 mb-6">
                  A person in custody is entitled to free and independent legal advice. Once
                  instructed, I will contact the custody suite directly and ensure that the detainee
                  receives appropriate legal advice before interview.
                </p>
                <p className="text-lg text-red-100 mb-4">
                  <strong className="text-white">We are NOT the police.</strong> Telephone this line
                  only to instruct representation for someone <strong className="text-white">currently in custody</strong> — not for past arrests, friends, missing-person enquiries, or general updates.
                </p>
                <p className="text-lg text-red-100 mb-4">
                  Only <strong className="text-white">immediate family</strong> (parent, spouse or partner, child, or sibling) may instruct on someone else&apos;s behalf. The detainee must confirm they want us to represent them when we contact the station.
                </p>
                <p className="text-lg text-red-100">
                  I provide prompt and experienced police station representation across Kent and
                  surrounding areas. Where appropriate, I also accept instructions from other
                  solicitors requiring police station cover.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <a
                href="tel:01732247427"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call to instruct custody representation
              </a>
              <p className="text-slate-600 mt-4 text-lg font-semibold">Telephone: 01732 247427</p>
              <p className="text-slate-500 mt-2 text-sm">
                Ask for Robert Cashman, Tuckers Duty Solicitor — The DSCC have our details
              </p>
              <p className="text-slate-500 mt-4 text-sm">
                <a href="/faq#immediate-custody-only" className="text-blue-600 hover:underline">
                  Read who can call and what we cannot help with
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
