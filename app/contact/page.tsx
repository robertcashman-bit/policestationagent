import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhoProvidesLegalService from "@/components/WhoProvidesLegalService";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { SolicitorInstructionChecklist } from "@/components/conversion/SolicitorInstructionChecklist";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import {
  CONTACT_HEADLINE,
  CTA_OUT_OF_SCOPE,
  PHONE_DISPLAY,
  PHONE_TEL,
  SEO_NOT_POLICE,
  SERVICE_SCOPE,
  SMS_DISPLAY,
  SMS_TEL,
} from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact | NOT THE POLICE — Criminal Solicitors | What We Do & Don't Do",
  description: `${SEO_NOT_POLICE} We are criminal solicitors. Urgent police station representation for Kent custody or a forthcoming interview only — not police enquiries. ${SERVICE_SCOPE} Telephone ${PHONE_DISPLAY}.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/contact`,
  },
  openGraph: {
    title: "Contact | NOT THE POLICE — Criminal Solicitors",
    description: `${SEO_NOT_POLICE} We are criminal solicitors. Custody or forthcoming interview only — not police enquiries. Call ${PHONE_DISPLAY}.`,
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
            {/* 1. NOT THE POLICE — We are criminal solicitors (no phone yet) */}
            <section
              className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-16 rounded-xl mb-8"
              aria-labelledby="page-title"
            >
              <div className="max-w-3xl mx-auto px-4">
                <h1 id="page-title" className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  {CONTACT_HEADLINE}
                </h1>
                <p className="text-xl text-red-100 mb-4">
                  This is a private criminal defence solicitor website. We are{" "}
                  <strong className="text-white">NOT THE POLICE</strong> — not Kent Police or any
                  police force.{" "}
                  <strong className="text-white">
                    Do not use our telephone for police enquiries — we cannot help with those.
                  </strong>{" "}
                  For police assistance call <strong className="text-white">999</strong> or{" "}
                  <strong className="text-white">101</strong>.
                </p>
                <p className="text-lg text-red-100 mb-2">
                  If you need <strong className="text-white">urgent police station representation</strong>{" "}
                  for someone in <strong className="text-white">current custody</strong>, or for a{" "}
                  <strong className="text-white">forthcoming police interview</strong> (including a
                  booked voluntary interview) at a Kent station, you are in the right place.
                </p>
                <p className="text-red-100 text-sm md:text-base mt-4">
                  Read what we do and do not do below. The solicitor telephone is at the bottom of
                  this section — last, after the scope.
                </p>
              </div>
            </section>

            {/* 2. What we do / don't do — before the number */}
            <section
              className="bg-white border-2 border-slate-200 rounded-xl shadow-lg p-6 md:p-8 mb-8"
              aria-labelledby="scope-heading"
            >
              <h2 id="scope-heading" className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                What we do and do not do
              </h2>
              <p className="text-slate-600 mb-6 text-sm md:text-base">
                Read this before you call. We are <strong>criminal solicitors</strong> — not Kent
                Police.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                  <h3 className="text-lg font-bold text-emerald-900 mb-3">We do</h3>
                  <ul className="space-y-2 text-slate-800 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                      <span>
                        Instruct for <strong>current Kent police custody</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                      <span>
                        Attend a <strong>forthcoming / booked voluntary (VAI) interview</strong> at
                        a Kent station
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                      <span>
                        Take instructions from the detainee or <strong>immediate family</strong>{" "}
                        (detainee must confirm)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                      <span>Provide free Legal Aid advice where eligible</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 p-5">
                  <h3 className="text-lg font-bold text-red-900 mb-3">We do not</h3>
                  <ul className="space-y-2 text-slate-800 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-red-700 font-bold mt-0.5">✗</span>
                      <span>
                        Handle <strong>police enquiries</strong> — we are NOT the police and{" "}
                        <strong>we cannot help</strong> with crime reports, switchboard calls, or
                        police contact requests
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-700 font-bold mt-0.5">✗</span>
                      <span>Transfer calls to police stations or custody suites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-700 font-bold mt-0.5">✗</span>
                      <span>
                        Give free advice after release, after a past interview, or general case
                        updates by phone
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-700 font-bold mt-0.5">✗</span>
                      <span>
                        Handle missing-person enquiries, friends calling on someone&apos;s behalf,
                        or anything else out of scope
                      </span>
                    </li>
                  </ul>
                  <p className="text-red-900 text-sm font-medium mt-4">{CTA_OUT_OF_SCOPE}</p>
                  <p className="text-slate-700 text-sm mt-3">
                    Need the police? Call <strong>999</strong> (emergency) or <strong>101</strong>{" "}
                    (non-emergency).
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Telephone last */}
            <section
              className="bg-slate-900 text-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
              aria-labelledby="phone-heading"
            >
              <h2 id="phone-heading" className="text-xl md:text-2xl font-bold mb-3">
                Solicitor telephone (last)
              </h2>
              <p className="text-amber-200 text-sm md:text-base font-semibold mb-2">
                NOT THE POLICE. Do not use this number for police enquiries — we cannot help.
              </p>
              <p className="text-slate-300 text-sm mb-4">
                Custody or forthcoming interview only. For police assistance use 999 or 101.
              </p>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex flex-col items-start gap-1 bg-white text-red-700 font-bold text-xl md:text-2xl px-6 py-4 rounded-lg shadow-lg hover:bg-red-50 transition mb-4"
                aria-label={`Criminal solicitor line ${PHONE_DISPLAY} — not for police enquiries, we cannot help`}
              >
                <span>Solicitor telephone: {PHONE_DISPLAY}</span>
                <span className="text-sm font-semibold text-red-600">
                  Custody / forthcoming interview only — not for police enquiries (we cannot help)
                </span>
              </a>
              <p className="text-slate-300 mb-1">
                Text if unable to call:{" "}
                <a href={`sms:${SMS_TEL}`} className="underline font-semibold text-white">
                  {SMS_DISPLAY}
                </a>
              </p>
              <p className="text-amber-300 font-bold mt-4">
                Ask for Robert Cashman, Tuckers Duty Solicitor — The DSCC have our details
              </p>
            </section>

            <WhoProvidesLegalService />

            <div className="mb-8">
              <SolicitorInstructionChecklist />
            </div>

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
                <a
                  href="/faq#immediate-custody-only"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  FAQ on immediate custody
                </a>{" "}
                or{" "}
                <a href="/canwehelp" className="text-blue-600 hover:underline font-semibold">
                  interactive guide
                </a>
                .
              </p>
            </section>

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

            <ContactForm />

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

            <div className="max-w-4xl mx-auto px-4 pb-8">
              <InternalLinkHub
                title="Related Services and Information"
                links={[
                  {
                    href: "/offences-we-deal-with",
                    text: "Offences We Deal With",
                    description: "Types of offences we handle",
                  },
                  {
                    href: "/services/police-station-representation",
                    text: "Police Station Representation",
                    description: "Main service page",
                  },
                  {
                    href: "/voluntary-police-interview",
                    text: "Voluntary Police Interview",
                    description: "Advice before attendance",
                  },
                  {
                    href: "/your-rights-in-custody",
                    text: "Your Rights in Custody",
                    description: "PACE Code C rights",
                  },
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
