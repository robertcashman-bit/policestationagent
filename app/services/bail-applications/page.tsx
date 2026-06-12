import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN, SITE_URL } from "@/config/site";
import { FAQPage } from "@/components/StructuredData";
import { ComprehensiveLegalServiceSchema } from "@/components/schema/ComprehensiveLegalServiceSchema";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { AuthorBio } from "@/components/E-E-A-T/AuthorBio";
import { RegulatoryReferences } from "@/components/E-E-A-T/RegulatoryReferences";
import { ServiceDisclaimer } from "@/components/E-E-A-T/ServiceDisclaimer";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { LLMContentBlock } from "@/components/LLMContentBlock";

export const metadata: Metadata = {
  title: "Duty Solicitor Police Station Kent | Bail Applications | FREE Legal Aid",
  description:
    "Duty solicitor police station services in Kent. Expert bail applications, police bail advice, court bail, and bail condition variations. FREE under Legal Aid. Qualified duty solicitor. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/services/bail-applications`,
  },
  openGraph: {
    title: "Duty Solicitor Police Station Kent | Bail Applications | FREE",
    description:
      "Expert duty solicitor services for bail applications in Kent. FREE legal advice under Legal Aid for police bail, court bail, and bail condition variations.",
    url: `https://${SITE_DOMAIN}/services/bail-applications`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function BailApplicationsPage() {
  const faqItems = [
    {
      question: "What is police bail?",
      answer:
        "Police bail is when you are released from the police station while the investigation continues, usually with conditions and a return date. If conditions are unreasonable, they may be challenged.",
    },
    {
      question: "What is a bail application?",
      answer:
        "A bail application is a request for release on bail—either from the police or the court—often with proposed conditions. It can also include applications to vary or remove conditions.",
    },
    {
      question: "Can bail conditions be changed?",
      answer:
        "Yes. Depending on the stage of the case, conditions can sometimes be varied or removed. The right approach depends on whether you are on police bail, court bail, or subject to other restrictions.",
    },
    {
      question: "What if I am released under investigation (RUI) instead of bail?",
      answer:
        "RUI means there may be no bail conditions and no fixed return date, but the investigation continues. You still need strategic advice about evidence, interviews, and any future steps by police or CPS.",
    },
    {
      question: "Do you cover bail work across Kent?",
      answer:
        "Yes. We advise on bail and bail conditions connected to Kent custody suites and courts, including Medway, Maidstone, Canterbury, Gravesend and surrounding areas.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <FAQPage items={faqItems} />
      <ComprehensiveLegalServiceSchema
        serviceName="Duty Solicitor Police Station"
        serviceDescription="Duty solicitor police station services provide expert bail applications, police bail advice, court bail, and bail condition variations. This service helps protect your position and challenge unreasonable restrictions. FREE under Legal Aid in England & Wales."
        serviceType="Bail Applications"
        areaServed="Kent"
        jurisdiction="England & Wales"
      />
      <PersonSchema />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">Duty Solicitor Police Station Kent | Bail Applications | FREE Legal Aid</h1>
            
            <LLMContentBlock
              serviceName="Duty Solicitor Police Station"
              serviceDefinition="Duty solicitor police station services provide expert bail applications, police bail advice, court bail, and bail condition variations. This service helps protect your position and challenge unreasonable restrictions. FREE under Legal Aid in England & Wales."
              whoFor="This service is for anyone who has been bailed, given a return date, or is unsure about bail conditions. It is suitable for all individuals and is free under Legal Aid regardless of financial circumstances."
              whenToUse="You should use this service immediately if you have been bailed, given conditions, or need advice about bail variations. Do not breach bail conditions without legal advice. Call 01732 247427 for prompt assistance."
              jurisdiction="England & Wales"
            />

            <p className="lead text-xl text-slate-700 mb-8">
              Bail decisions and bail conditions can have an immediate impact on your life—where you
              can go, who you can contact, and what you must do next. We provide clear advice and
              practical representation to protect your position and challenge unreasonable
              restrictions where appropriate.
            </p>

            <h2>Common bail situations</h2>
            <ul>
              <li>
                <strong>Police bail:</strong> release from the police station with conditions and a
                return date.
              </li>
              <li>
                <strong>Court bail:</strong> release pending court proceedings, sometimes with
                stricter conditions.
              </li>
              <li>
                <strong>Variations:</strong> applications to change or remove conditions (for
                example, contact or address restrictions).
              </li>
              <li>
                <strong>RUI (Released Under Investigation):</strong> no bail conditions, but the
                investigation continues.
              </li>
            </ul>

            <h2>How we approach bail</h2>
            <p>
              The right strategy depends on the facts of the case and the evidence. We focus on
              practical, persuasive proposals—addressing risk factors, proposing workable
              conditions, and ensuring you understand the consequences of breach.
            </p>

            <div className="not-prose mt-10 rounded-xl border bg-white shadow p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Need advice about bail or conditions?
              </h3>
              <p className="text-slate-700 mb-4">
                If you have been bailed, given a return date, or you are unsure what you can and
                cannot do, call us for urgent guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:01732247427"
                  className="inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3"
                >
                  Call 01732 247427
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold px-6 py-3"
                >
                  Use the contact form
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                If you are at a police station, ask for a solicitor. Police station advice is free
                under Legal Aid.
              </p>
            </div>

            {/* Internal Linking Hub */}
            <InternalLinkHub
              title="Related Services and Information"
              links={[
                { href: "/offences-we-deal-with", text: "Offences We Deal With", description: "Types of offences we handle" },
                { href: "/services/police-station-representation", text: "Police Station Representation", description: "Main service page" },
                { href: "/police-station-interviews-kent-rights", text: "Solicitor for Police Interview", description: "Your rights and what to expect" },
                { href: "/services/pre-charge-advice", text: "Police Interview Advice Solicitor", description: "Pre-charge advice" },
                { href: "/police-bail-explained", text: "Police Bail Explained", description: "Understanding bail" },
                { href: "/released-under-investigation", text: "Released Under Investigation", description: "RUI guidance" },
                { href: "/kent-police-stations", text: "Duty Solicitor Kent", description: "All Kent police stations" },
              ]}
            />

            {/* E-E-A-T Signals */}
            <AuthorBio showFull={true} className="mb-8" />
            <RegulatoryReferences className="mb-8" />
            <ServiceDisclaimer />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
