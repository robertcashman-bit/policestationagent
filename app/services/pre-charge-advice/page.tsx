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
import {
  CTA_OUT_OF_SCOPE,
  CTA_WHO_CAN_CALL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SCOPE_HELP_HREF,
  SEO_NOT_POLICE,
} from "@/config/contact";

export const metadata: Metadata = {
  title: "Police Interview Advice Solicitor Kent | Pre-Charge Advice | Custody & VAI",
  description:
    `${SEO_NOT_POLICE} Police interview advice for current Kent custody or a booked voluntary interview. FREE Legal Aid at the station where eligible — not free post-release phone advice.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/services/pre-charge-advice`,
  },
  openGraph: {
    title: "Police Interview Advice Solicitor Kent | Custody & Booked VAI",
    description:
      "Expert police interview advice for Kent custody and booked voluntary interviews. FREE under Legal Aid at the station where eligible.",
    url: `https://${SITE_DOMAIN}/services/pre-charge-advice`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function PreChargeAdvicePage() {
  const faqItems = [
    {
      question: "What is pre‑charge advice?",
      answer:
        "Pre‑charge advice is legal advice and representation given before the police or CPS make a charging decision. It often involves reviewing evidence, advising on interview strategy, and making written representations to prevent charge or narrow allegations where appropriate.",
    },
    {
      question: "When is the best time to get pre‑charge advice?",
      answer:
        "As early as possible—ideally before a police interview. Our telephone line is for current Kent custody or a booked voluntary interview. Work after release outside the police station is not free Legal Aid phone advice and may need a private appointment with a criminal defence firm.",
    },
    {
      question: "Can a solicitor speak to the police or CPS for me before I am charged?",
      answer:
        "Where we are instructed for current custody or a booked interview, we can make appropriate representations as part of that attendance. Speculative post-release calls for free status updates or case advice are outside our phone intake.",
    },
    {
      question: "Is pre‑charge advice free at the police station?",
      answer:
        "Legal advice at the police station (custody or booked voluntary interview) is free under Legal Aid where eligible. Work outside the police station after release is not free phone advice via this line.",
    },
    {
      question: "Do you cover pre‑charge advice across Kent?",
      answer:
        "Yes. We cover Kent custody suites and voluntary interview locations, including Medway, Maidstone, Canterbury, Gravesend and surrounding areas.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <FAQPage items={faqItems} />
      <ComprehensiveLegalServiceSchema
        serviceName="Police Interview Advice Solicitor"
        serviceDescription="Police interview advice solicitor provides expert pre-charge advice and strategic representations to police/CPS before charging decisions. This service includes interview strategy, evidence review, and written representations to prevent or narrow charges. FREE under Legal Aid in England & Wales."
        serviceType="Pre-Charge Advice"
        areaServed="Kent"
        jurisdiction="England & Wales"
      />
      <PersonSchema />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">Police Interview Advice Solicitor Kent | Pre-Charge Advice | FREE Legal Aid</h1>
            
            <LLMContentBlock
              serviceName="Police Interview Advice Solicitor"
              serviceDefinition="Police interview advice for people in Kent custody or attending a booked voluntary interview, including interview strategy and representations as part of that attendance. FREE under Legal Aid at the police station where eligible."
              whoFor="This service is for people currently in Kent police custody or with a booked voluntary interview. It is not a free phone helpline for advice after you have already been released."
              whenToUse="Instruct us when you are in custody now or have a scheduled voluntary interview. Do not attend an interview without advice. Do not call this line for free advice after release."
              jurisdiction="England & Wales"
            />

            <p className="lead text-xl text-slate-700 mb-8">
              If you have been arrested or invited to a booked voluntary interview, early advice at
              the police station can protect your position. This page is not an invitation to call
              for free advice after you have already been released.
            </p>

            <h2>What “pre‑charge” means</h2>
            <p>
              “Pre‑charge” covers the period before the police (or the CPS) decide whether to
              charge, issue an out of court disposal, take no further action, or continue the
              investigation. It can include advice before interview, advice during interview, and
              representations after interview.
            </p>

            <h2>How we help</h2>
            <ul>
              <li>
                <strong>Interview strategy:</strong> whether to answer questions, provide a prepared
                statement, or make no comment (always case‑specific).
              </li>
              <li>
                <strong>Evidence review:</strong> understanding what the police say they have, and
                what may be missing.
              </li>
              <li>
                <strong>Representations:</strong> written or oral submissions to highlight
                evidential issues and legal points, and to provide relevant mitigation where
                appropriate.
              </li>
              <li>
                <strong>Next steps planning:</strong> bail/RUI guidance, conditions challenges, and
                practical advice on what to do (and not do) while the case is ongoing.
              </li>
            </ul>

            <h2>When to contact us</h2>
            <p>
              {CTA_WHO_CAN_CALL} {CTA_OUT_OF_SCOPE}
            </p>

            <div className="not-prose mt-10 rounded-xl border bg-white shadow p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Need urgent police station representation?</h3>
              <p className="text-slate-700 mb-2">{CTA_WHO_CAN_CALL}</p>
              <p className="text-slate-600 text-sm mb-4">{CTA_OUT_OF_SCOPE}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3"
                >
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={SCOPE_HELP_HREF}
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold px-6 py-3"
                >
                  Who can call?
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                If you are in a police station or custody suite, ask for a solicitor. Police station
                advice is free under Legal Aid where eligible.
              </p>
            </div>

            {/* Internal Linking Hub */}
            <InternalLinkHub
              title="Related Services and Information"
              links={[
                { href: "/offences-we-deal-with", text: "Offences We Deal With", description: "Types of offences we handle" },
                { href: "/services/police-station-representation", text: "Police Station Representation", description: "Main service page" },
                { href: "/police-station-interviews-kent-rights", text: "Solicitor for Police Interview", description: "Your rights and what to expect" },
                { href: "/voluntary-interviews", text: "Legal Advice at Police Station", description: "Voluntary interview guidance" },
                { href: "/services/bail-applications", text: "Duty Solicitor Police Station", description: "Bail applications and advice" },
                { href: "/prepared-statements", text: "Prepared Statements", description: "Interview strategy guide" },
                { href: "/no-comment-interview", text: "No Comment Interviews", description: "When to exercise silence" },
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
