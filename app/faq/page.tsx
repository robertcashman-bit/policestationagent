import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQContent from "@/app/faq/FAQContent";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import {
  SCOPE_CALLOUT_CAN,
  SCOPE_CALLOUT_CANNOT,
  SCOPE_FAQ_ITEMS,
  SCOPE_STATUS_ENQUIRY_HEADLINE,
} from "@/config/scope-faqs";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { RIGHTS_HUB, STATIONS_HUB } from "@/config/internal-link-hubs";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Police station representation FAQ for Kent. Immediate custody only, who can instruct, confidentiality, legal aid, and when we can help — not past arrests or general enquiries.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/faq`,
  },
  openGraph: {
    title: "FAQ — Frequently Asked Questions",
    description:
      "Police station representation FAQ for Kent. Immediate custody only, who can instruct, confidentiality, legal aid, and when we can help — not past arrests or general enquiries.",
    type: "website",
    url: `https://${SITE_DOMAIN}/faq`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SCOPE_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer.replace(/\s+/g, " ").trim(),
    },
  })),
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main">
        <div className="bg-slate-50 min-h-screen">
          <div className="bg-gradient-to-b from-slate-50 to-white">
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-amber-400 text-slate-900 mb-6 text-sm font-bold">
                  Frequently Asked Questions
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-6">
                  Police Station Representation FAQ (Kent)
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Comprehensive answers about our police station representation services across Kent
                </p>
                <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-left max-w-2xl mx-auto mb-8">
                  <h2 className="text-lg font-bold text-amber-300 mb-3">
                    {SCOPE_STATUS_ENQUIRY_HEADLINE}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-100">
                    <div>
                      <p className="font-semibold text-white mb-2">We can help when:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        {SCOPE_CALLOUT_CAN.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-2">We cannot help with:</p>
                      <ul className="space-y-1 list-disc list-inside">
                        {SCOPE_CALLOUT_CANNOT.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    <a href="/canwehelp" className="text-amber-300 hover:text-amber-200 underline font-semibold">
                      Use our interactive guide → Can we help you?
                    </a>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/current-custody"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md px-8 bg-red-600 hover:bg-red-700 font-bold flex items-center gap-2 text-white"
                  >
                    Current custody check
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-white shadow-sm h-10 rounded-md px-8 border-white text-blue-900 hover:bg-white hover:text-blue-900"
                    href="/contact"
                  >
                    Contact pathways
                  </a>
                </div>
              </div>
            </section>
            <section className="py-16">
              <div className="max-w-4xl mx-auto px-4">
                <FAQContent />
              </div>
            </section>
            <section className="py-20 bg-gradient-to-br from-red-600 to-red-800">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Still Have Questions?
                </h2>
                <p className="text-xl text-red-100 mb-12">
                  Custody or scheduled voluntary interview enquiries only — not general legal advice
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <a
                    href="/current-custody"
                    className="bg-white/95 hover:bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-slate-900 font-bold text-lg mb-2">Current custody</div>
                    <div className="text-slate-700 text-base font-semibold">
                      Check whether we can help if someone is detained now
                    </div>
                  </a>
                  <a
                    href="/start/voluntary-interview#request"
                    className="bg-white/95 hover:bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="text-slate-900 font-bold text-lg mb-2">Request representation</div>
                    <div className="text-slate-700 text-base font-semibold">
                      Booked voluntary interview pathway
                    </div>
                  </a>
                  <a
                    href="mailto:robertcashman@defencelegalservices.co.uk"
                    className="bg-white/95 hover:bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-105"
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
                      className="lucide lucide-mail w-12 h-12 mx-auto mb-4 text-blue-600"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <div className="text-slate-900 font-bold text-lg mb-2">Email</div>
                    <div className="text-slate-700 text-sm font-semibold break-words">
                      robertcashman@
                      <br />
                      defencelegalservices.co.uk
                    </div>
                  </a>
                </div>
              </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 pb-12 space-y-8">
              <InternalLinkHub title={RIGHTS_HUB.title} links={RIGHTS_HUB.links} />
              <InternalLinkHub title={STATIONS_HUB.title} links={STATIONS_HUB.links} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
