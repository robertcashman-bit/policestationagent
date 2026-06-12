import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { FAQPage } from "@/components/StructuredData";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { RIGHTS_HUB } from "@/config/internal-link-hubs";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";

export const metadata: Metadata = buildPageMetadata({
  title: "Booking In Procedure in Kent | What Happens at the Police Station",
  path: "/booking-in-procedure-in-kent",
  description:
    "Understanding the booking in procedure at Kent police stations. Learn what happens when you arrive, your rights, and what to expect during the custody process.",
});

const BOOKING_IN_FAQ = [
  {
    question: "What is the booking-in procedure at a Kent police station?",
    answer:
      "Booking-in is the process when you arrive at custody. The custody officer records your detention, explains your rights, and authorises detention if necessary under PACE Code C.",
  },
  {
    question: "What rights must the custody officer explain during booking-in?",
    answer:
      "You must be told your right to free legal advice, to have someone informed of your arrest, and to consult the PACE Codes of Practice. Medical attention must be arranged if needed.",
  },
  {
    question: "Can I request a solicitor during booking-in?",
    answer:
      "Yes. Request legal advice as soon as possible. The custody officer must allow you to consult a solicitor in private and should not interview you about the offence until you have had that opportunity unless you waive the right.",
  },
  {
    question: "What happens to my property during booking-in?",
    answer:
      "Your belongings are searched and logged. Items that could be used to harm yourself or others are removed for safekeeping and recorded on the custody record.",
  },
];

export default function Page() {
  return (
    <>
      <FAQPage items={BOOKING_IN_FAQ} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">
              Booking In Procedure in Kent Police Stations
            </h1>

            <p className="lead text-xl text-slate-700 mb-8">
              Understanding what happens during the booking in procedure at Kent police stations can
              help you know your rights and what to expect.
            </p>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">What is the Booking In Procedure?</h2>
              <p className="mb-4">
                When you are brought to a police station, you will go through a booking in
                procedure. This is the process by which the custody officer records your detention
                and ensures your rights are protected.<sup>1</sup>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">
                The Custody Officer's Responsibilities
              </h2>
              <p className="mb-4">
                The custody officer has specific responsibilities under PACE Code C:<sup>2</sup>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To determine whether there is sufficient evidence to charge you</li>
                <li>To ensure your rights are explained and protected</li>
                <li>To authorise your detention if necessary</li>
                <li>To ensure you are treated properly while in custody</li>
                <li>To arrange for legal advice if requested</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">What Happens During Booking In</h2>

              <h3 className="text-2xl font-semibold mb-3 mt-6">1. Personal Details</h3>
              <p className="mb-4">
                The custody officer will record your personal details, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your name and address</li>
                <li>Date of birth</li>
                <li>Occupation</li>
                <li>Any medical conditions or medication</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">2. The Caution</h3>
              <p className="mb-4">
                You will be given the police caution:<sup>3</sup> "You do not have to say anything,
                but it may harm your defence if you do not mention when questioned something which
                you later rely on in court."
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">3. Your Rights</h3>
              <p className="mb-4">
                The custody officer must inform you of your rights:<sup>4</sup>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Right to free legal advice</li>
                <li>Right to have someone informed of your arrest</li>
                <li>Right to consult the Codes of Practice</li>
                <li>Right to medical attention if needed</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">4. Property</h3>
              <p className="mb-4">
                Your property will be searched and recorded. Items that may be used to harm yourself
                or others will be removed for safekeeping.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">5. Custody Record</h3>
              <p className="mb-4">
                All details of your detention will be recorded in the custody record, including
                times, decisions made, and any requests you make.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Requesting Legal Advice</h2>
              <p className="mb-4">
                During booking in, you should request legal advice if you haven't already.
                <sup>5</sup> The custody officer must:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Inform you of your right to free legal advice</li>
                <li>Allow you to consult with a solicitor</li>
                <li>
                  Not interview you until you have had the opportunity to speak to a solicitor
                  (unless you waive this right)
                </li>
                <li>Allow you to speak to a solicitor in private</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Medical Attention</h2>
              <p className="mb-4">
                If you have any medical conditions or need medication, inform the custody officer
                immediately.<sup>6</sup> They have a duty to ensure your health and welfare while in
                custody.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Vulnerable Adults</h2>
              <p className="mb-4">
                If you are a vulnerable adult, the custody officer must arrange for an appropriate
                adult to be present.<sup>7</sup> This is in addition to your right to legal advice.
              </p>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-semibold mb-4">Get Expert Legal Representation</h2>
              <p className="mb-4">
                During the booking in procedure, it is essential to request legal advice. We provide
                free extended hours legal advice and representation at all Kent police stations.
              </p>
              <p className="mb-4">
                <strong>
                  Call us immediately on{" "}
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </strong>{" "}
                to arrange representation.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-slate-300">
              <h2 className="text-2xl font-semibold mb-4">References</h2>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-600">
                <li>Police and Criminal Evidence Act 1984, Code C, paragraph 3.1</li>
                <li>Police and Criminal Evidence Act 1984, Code C, paragraph 3.2</li>
                <li>Police and Criminal Evidence Act 1984, Code C, paragraph 10.5</li>
                <li>Police and Criminal Evidence Act 1984, Code C, paragraph 3.1</li>
                <li>Police and Criminal Evidence Act 1984, Code C, paragraph 6.1</li>
                <li>Police and Criminal Evidence Act 1984, Code C, paragraph 9.5</li>
                <li>Police and Criminal Evidence Act 1984, Code C, paragraph 3.15</li>
              </ol>
            </section>

            <div className="max-w-6xl mx-auto px-4 pb-12">
              <InternalLinkHub title={RIGHTS_HUB.title} links={RIGHTS_HUB.links} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
}
