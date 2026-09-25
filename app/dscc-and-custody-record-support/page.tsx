import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { GeneralLegalDisclaimer } from "@/components/conversion/GeneralLegalDisclaimer";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { SolicitorInstructionChecklist } from "@/components/conversion/SolicitorInstructionChecklist";
import { JsonLd } from "@/components/JsonLd";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { SITE_URL } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { PATH_AGENCY, PATH_CUSTODY, PATH_VOLUNTARY } from "@/config/enquiry-paths";

export const metadata = buildPageMetadata({
  title: "DSCC & Custody Record Numbers | Not the Police | Firm Instruction Guide",
  path: "/dscc-and-custody-record-support",
  description: `${SEO_NOT_POLICE} DSCC references and custody record numbers explained for defence firms instructing Kent police station cover — not the police switchboard. For police matters use 101 or 999.`,
});

const faqs = [
  {
    question: "What is a DSCC reference?",
    answer:
      "The Defence Solicitor Call Centre (DSCC) allocates a reference when a firm or client requests duty solicitor contact. It helps match the instruction to the attendance. This page explains how defence solicitors use that reference — it is not a police contact directory.",
  },
  {
    question: "What is a custody record number?",
    answer:
      "When someone is booked into custody, the custody officer creates a custody record with a unique reference. This identifies the detention on the custody suite system. We do not publish custody suite telephone numbers.",
  },
  {
    question: "What should firms send when instructing cover?",
    answer:
      "Client name, station, custody record number, DSCC reference if available, interview time, allegation summary, and firm contact details.",
  },
  {
    question: "Is this the police DSCC number?",
    answer:
      "No. PoliceStationAgent.com is an independent criminal defence solicitor service — not Kent Police and not the DSCC switchboard. For police assistance use 999 (emergency) or 101 (non-emergency).",
  },
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DSCC and custody record instruction support for defence solicitors",
    url: `${SITE_URL}/dscc-and-custody-record-support`,
    provider: { "@type": "LegalService", name: "Police Station Agent", url: SITE_URL },
    areaServed: "Kent, UK",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col pb-16 lg:pb-0">
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />
      <Header />
      <main id="main-content" role="main" className="flex-grow">
        <section className="bg-[#2563eb] text-white py-14">
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-light mb-3">
              Defence solicitors · not the police · not the DSCC phone book
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              DSCC reference &amp; custody record support for defence solicitors
            </h1>
            <p className="text-blue-100 mb-4">
              Looking for the police DSCC number or a custody suite phone book? This is not that.
              We are independent criminal defence solicitors. This guide helps defence firms instruct
              police station cover with the right DSCC reference and custody record number.
            </p>
            <p className="text-sm text-white/80 mb-6">
              For police assistance use{" "}
              <a href="tel:999" className="font-bold underline text-white">
                999
              </a>{" "}
              (emergency) or{" "}
              <a href="tel:101" className="font-bold underline text-white">
                101
              </a>{" "}
              (non-emergency). We do not publish firm or custody suite telephone digits on this page.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href={PATH_AGENCY}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-accent px-5 py-2.5 font-bold text-accent-foreground hover:bg-accent-light"
              >
                Agency cover for solicitors
              </Link>
              <Link
                href={`${PATH_VOLUNTARY}#request`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/40 bg-white/10 px-5 py-2.5 font-semibold text-white hover:bg-white/20"
              >
                Request representation
              </Link>
              <Link
                href={PATH_CUSTODY}
                className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-red-700 px-5 py-2.5 font-bold text-white hover:bg-red-800"
              >
                Check custody now
              </Link>
            </div>
          </div>
        </section>
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
          <PoliceSignposting />
          <section className="prose prose-slate max-w-none">
            <h2>Why these references matter</h2>
            <p>
              Criminal defence firms instructing freelance police station agents need the attendance
              logged correctly against the client&apos;s custody or DSCC instruction. The custody record
              number identifies the detention on the custody suite system. A DSCC reference connects
              the instruction to the national duty solicitor call centre process where applicable.
            </p>
            <h2>Typical workflow</h2>
            <ol>
              <li>Client or family contacts a firm or the DSCC requesting a duty solicitor.</li>
              <li>Custody staff create or update the custody record when the detainee is booked in.</li>
              <li>The firm instructs cover with client details, station, and references.</li>
              <li>The representative attends, obtains disclosure, advises the client, and notes the outcome.</li>
            </ol>
            <p>
              Read our guide:{" "}
              <a href="/blog/custody-record-number-dscc-reference">
                custody record numbers and DSCC references explained
              </a>
              .
            </p>
          </section>
          <SolicitorInstructionChecklist />
          <section>
            <h2 className="text-xl font-bold mb-4">FAQs</h2>
            <dl className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="rounded-lg border bg-white p-4">
                  <dt className="font-semibold">{f.question}</dt>
                  <dd className="mt-2 text-sm text-slate-700">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
          <InternalLinkHub
            title="Related"
            links={[
              {
                href: "/for-solicitors",
                text: "Police station cover for solicitors",
                description: "Firm instructions",
              },
              {
                href: "/start/solicitors-agent-cover",
                text: "Send instructions",
                description: "Cover request flow",
              },
              {
                href: "/current-custody",
                text: "Someone in custody now",
                description: "Public custody pathway",
              },
              {
                href: "/contact",
                text: "Contact pathways",
                description: "Choose how we can help",
              },
            ]}
          />
          <GeneralLegalDisclaimer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
