import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhoProvidesLegalService from "@/components/WhoProvidesLegalService";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { SolicitorInstructionChecklist } from "@/components/conversion/SolicitorInstructionChecklist";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import {
  PHONE_DISPLAY,
  SEO_NOT_POLICE,
  SERVICE_SCOPE,
  SMS_DISPLAY,
  SMS_TEL,
  WHATSAPP_TEXT_ONLY_NOTE,
} from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact | Custody & Scheduled Interviews | NOT the Police",
  description:
    `${SEO_NOT_POLICE} ${SERVICE_SCOPE} Telephone ${PHONE_DISPLAY} for custody or a booked voluntary interview. Text ${SMS_DISPLAY} if unable to call.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/contact`,
  },
  openGraph: {
    title: "Contact | Independent Duty Solicitor | NOT Kent Police",
    description:
      `${SEO_NOT_POLICE} Telephone for custody or scheduled voluntary interviews. Text ${SMS_DISPLAY} if unable to call.`,
    url: `https://${SITE_DOMAIN}/contact`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Urgent Matters – Primary Block */}
            <section
              className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-16 rounded-xl mb-8"
              aria-labelledby="page-title"
            >
              <div className="max-w-3xl mx-auto px-4">
                <h1 id="page-title" className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Custody or scheduled interview — telephone only
                </h1>
                <p className="text-xl text-red-100 mb-4">
                  <strong className="text-white">We are NOT the police.</strong> This line is for
                  arranging representation when someone is in{" "}
                  <strong className="text-white">police custody</strong> or for a{" "}
                  <strong className="text-white">scheduled voluntary (VAI) interview</strong> at a
                  Kent police station.
                </p>
                <p className="text-lg text-red-100 mb-6">
                  We do <strong className="text-white">not</strong> provide general legal advice by
                  phone. Email and contact forms are not suitable for urgent custody attendance.
                </p>
                <p className="text-2xl font-bold text-white mb-2">Telephone: {PHONE_DISPLAY}</p>
                <p className="text-red-100 mb-1">
                  Text only (if unable to call):{" "}
                  <a href={`sms:${SMS_TEL}`} className="underline font-semibold text-white">
                    {SMS_DISPLAY}
                  </a>
                </p>
                <p className="text-red-200 text-sm mt-2">{WHATSAPP_TEXT_ONLY_NOTE}</p>
                <p className="text-amber-300 font-bold mt-4">
                  Ask for Robert Cashman, Tuckers Duty Solicitor — The DSCC have our details
                </p>
              </div>
            </section>

            {/* Who Provides Legal Service */}
            <WhoProvidesLegalService />

            <div className="mb-8">
              <SolicitorInstructionChecklist />
            </div>

            {/* Before You Submit Guidance */}
            <section className="bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
                Before You Submit
              </h2>
              <p className="text-slate-700 mb-3">
                To help us respond quickly, please include the following information if available:
              </p>
              <ul className="space-y-2 text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Station/custody suite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Interview time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Allegation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Call-back number</span>
                </li>
              </ul>
              <h3 className="text-lg font-bold text-slate-900 mb-2">This form is not for:</h3>
              <ul className="space-y-2 text-slate-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Arrests from yesterday, days ago, or after someone has been released</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Friends or non-family calling on someone&apos;s behalf</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>Missing-person enquiries — where are they? what happened to them?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-1">•</span>
                  <span>General legal advice, welfare checks, or status updates</span>
                </li>
              </ul>
              <p className="text-slate-600 text-sm">
                See our{" "}
                <a href="/faq#immediate-custody-only" className="text-blue-600 hover:underline font-semibold">
                  FAQ on immediate custody
                </a>{" "}
                or{" "}
                <a href="/canwehelp" className="text-blue-600 hover:underline font-semibold">
                  interactive guide
                </a>
                .
              </p>
            </section>

            {/* Contact Form – Instruction Notice */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 md:p-5 mb-6">
              <p className="text-slate-800 font-medium">
                This contact form is suitable for non-urgent enquiries or scheduled police
                interviews.
              </p>
              <p className="text-slate-700 mt-2">
                If someone has been arrested or is currently in police custody, please telephone
                immediately rather than relying on email or this form.
              </p>
            </div>

            {/* Contact Form */}
            <ContactForm />

            {/* Non-urgent Enquiries and Solicitor Referrals */}
            <section className="mt-12 bg-white rounded-xl border border-slate-200 shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Non-urgent enquiries and solicitor referrals
              </h2>
              <p className="text-slate-700 mb-4">
                Email may be used for non-urgent enquiries, solicitor referrals, availability
                queries, or scheduled interviews. Messages are monitored regularly, but responses
                may not be immediate.
              </p>
              <p className="text-slate-600 mb-4">Email should not be used for urgent custody matters.</p>
              <a
                href="mailto:robertcashman@defencelegalservices.co.uk"
                className="text-lg font-semibold text-blue-600 hover:underline break-all"
              >
                robertcashman@defencelegalservices.co.uk
              </a>
            </section>

            {/* Internal Linking Hub */}
            <div className="max-w-4xl mx-auto px-4 pb-8">
              <InternalLinkHub
                title="Related Services and Information"
                links={[
                  { href: "/offences-we-deal-with", text: "Offences We Deal With", description: "Types of offences we handle" },
                  { href: "/services/police-station-representation", text: "Police Station Representation", description: "Main service page" },
                  { href: "/voluntary-police-interview", text: "Voluntary Police Interview", description: "Advice before attendance" },
                  { href: "/your-rights-in-custody", text: "Your Rights in Custody", description: "PACE Code C rights" },
                  { href: "/faq", text: "Frequently Asked Questions", description: "Common questions" },
                ]}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
