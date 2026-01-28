import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { FAQPage } from "@/components/StructuredData";
import { ComprehensiveLegalServiceSchema } from "@/components/schema/ComprehensiveLegalServiceSchema";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { AuthorBio } from "@/components/E-E-A-T/AuthorBio";
import { RegulatoryReferences } from "@/components/E-E-A-T/RegulatoryReferences";
import { ServiceDisclaimer } from "@/components/E-E-A-T/ServiceDisclaimer";
import { InternalLinkHub } from "@/components/InternalLinkHub";

export const metadata: Metadata = {
  title:
    "Police Station Solicitor in Kent | Police Station Representation (Legal Aid)",
  description:
    "Police station representation in Kent: free legal advice at the police station under Legal Aid, interview representation, and guidance on bail and next steps. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/services/police-station-representation`,
  },
  openGraph: {
    title: "Police Station Solicitor in Kent | Police Station Representation",
    description:
      "Police station representation in Kent: free legal advice under Legal Aid, interview representation, and early advice before voluntary attendance.",
    url: `https://${SITE_DOMAIN}/services/police-station-representation`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

// Schema is now handled by components (ComprehensiveLegalServiceSchema, PersonSchema)

export default function PoliceStationRepresentationPage() {
  const faqItems = [
    {
      question: "Are police station solicitors independent of the police?",
      answer:
        "Yes, absolutely. Your solicitor is completely independent of the police and works only for YOU. We are not employed by, paid by, or connected to the police in any way. Legal Aid funds your representation, not the police. Everything you discuss with your solicitor is confidential and cannot be shared with police without your consent.",
    },
    {
      question: "Is police station rep service free in Kent?",
      answer:
        "Yes. Everyone arrested or invited for a voluntary interview in Kent is entitled to FREE legal advice at the police station under Legal Aid. This is a statutory right under PACE 1984 and is not means-tested.",
    },
    {
      question: "How quickly can a duty solicitor attend in Kent?",
      answer:
        "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability. Our extended hours service covers all Kent police stations including evenings, weekends and bank holidays, ensuring rapid response across all Kent custody suites.",
    },
    {
      question: "Which Kent custody suites do you cover as a duty solicitor?",
      answer:
        "We cover all Kent custody suites including Medway (Gillingham), Maidstone, North Kent (Gravesend), Canterbury, Tonbridge, Folkestone, Ashford, Dartford, Sittingbourne, Sevenoaks, Tunbridge Wells, Margate, Dover, Swanley, and Bluewater. We also cover voluntary interview locations across Kent.",
    },
    {
      question: "What's the difference between a qualified solicitor and a police station agent?",
      answer:
        "A qualified solicitor is a fully trained legal professional who has completed the Legal Practice Course and training contract. A police station agent (accredited representative) is a non-solicitor who has passed the Police Station Qualification. Robert Cashman is a qualified solicitor with 35+ years experience and Higher Court Advocate status — not just an agent — providing expert independent legal advice.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <FAQPage items={faqItems} />
      <ComprehensiveLegalServiceSchema
        serviceName="Police Station Representation"
        serviceDescription="Police station representation is a legal service provided by qualified solicitors at police custody suites in England & Wales. This service provides FREE legal advice under Legal Aid, expert representation during police interviews, and protection of your rights under PACE 1984."
        serviceType="Police Station Representation"
        areaServed="Kent"
        jurisdiction="England & Wales"
      />
      <PersonSchema />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">Police Station Representation in Kent (Legal Aid)</h1>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-3">What This Service Is</h2>
              <p className="text-slate-700 mb-4">
                Police station representation is a legal service provided by qualified solicitors at police custody suites in England & Wales. This service provides FREE legal advice under Legal Aid, expert representation during police interviews, and protection of your rights under PACE 1984 (Police and Criminal Evidence Act 1984).
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Who It Is For</h2>
              <p className="text-slate-700 mb-4">
                This service is for anyone arrested or invited for a voluntary interview at a police station in Kent. It is suitable for all individuals regardless of income, financial circumstances, or the nature of the allegation. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-3">When You Should Use It</h2>
              <p className="text-slate-700 mb-4">
                You should use this service immediately upon arrest or when contacted by police for a voluntary interview. Do not answer police questions without legal advice. Call 01732 247427 during extended hours for immediate assistance. This service operates in England & Wales under PACE 1984, PACE Code C, and Legal Aid Agency regulations.
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Professional Status</h2>
              <p className="text-slate-700">
                Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795). Robert Cashman is a qualified solicitor and accredited duty solicitor with 35+ years experience, 21,000+ cases, and Higher Court Advocate status. He is regulated by the Solicitors Regulation Authority (SRA) and operates under SRA standards.
              </p>
            </div>
            <p className="lead text-xl text-slate-700 mb-8">
              Expert police station representation by qualified solicitor. FREE legal advice under
              Legal Aid at all Kent custody suites. Independent Defence Solicitor & Higher Court
              Advocate Robert Cashman - 35+ years experience, 21,000+ cases.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 mb-8">
              <p className="text-green-800 font-medium text-sm m-0">
                🛡️ <strong>We are completely independent of the police.</strong> Your solicitor
                works for YOU — not the police, not the CPS. Everything you discuss is confidential.
              </p>
            </div>

            {/* Internal Linking Hub */}
            <InternalLinkHub
              title="Related Services and Information"
              links={[
                { href: "/offences-we-deal-with", text: "Offences We Deal With", description: "Types of offences we handle" },
                { href: "/police-station-interviews-kent-rights", text: "Solicitor for Police Interview", description: "Your rights and what to expect" },
                { href: "/voluntary-interviews", text: "Legal Advice at Police Station", description: "Voluntary interview guidance" },
                { href: "/services/pre-charge-advice", text: "Police Interview Advice Solicitor", description: "Pre-charge advice and representations" },
                { href: "/services/bail-applications", text: "Duty Solicitor Police Station", description: "Bail applications and advice" },
                { href: "/kent-police-stations", text: "Duty Solicitor Kent", description: "All Kent police stations" },
                { href: "/police-custody-rights", text: "Your Rights in Custody", description: "PACE Code C rights guide" },
                { href: "/police-interview-rights", text: "Police Interview Rights", description: "Interview procedure and rights" },
                { href: "/faq", text: "Frequently Asked Questions", description: "Common questions answered" },
              ]}
            />

            {/* E-E-A-T Signals */}
            <AuthorBio showFull={true} className="mb-8" />
            <RegulatoryReferences className="mb-8" />
            <ServiceDisclaimer
              whoNotFor={[
                "One-off court representation (we focus exclusively on police station work)",
              ]}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
