import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";
import { GeneralLegalDisclaimer } from "@/components/conversion/GeneralLegalDisclaimer";
import { SolicitorInstructionChecklist } from "@/components/conversion/SolicitorInstructionChecklist";
import { JsonLd } from "@/components/JsonLd";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { SITE_URL } from "@/config/site";

export const metadata = buildPageMetadata({
  title: "DSCC and Custody Record Support | Solicitors",
  path: "/dscc-and-custody-record-support",
  description:
    "Practical guide to DSCC references and custody record numbers when instructing police station cover in Kent. For criminal defence firms. NOT the police.",
});

const faqs = [
  {
    question: "What is a DSCC reference?",
    answer:
      "The Defence Solicitor Call Centre (DSCC) allocates a reference when a firm or client requests duty solicitor contact. It helps match the instruction to the attendance.",
  },
  {
    question: "What is a custody record number?",
    answer:
      "When someone is booked into custody, the custody officer creates a custody record with a unique reference. This identifies the detention on the custody suite system.",
  },
  {
    question: "What should firms send when instructing cover?",
    answer:
      "Client name, station, custody record number, DSCC reference if available, interview time, allegation summary, and firm contact details.",
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
    name: "DSCC and custody record instruction support",
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
        <section className="bg-[#0A2342] text-white py-14">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              DSCC and Custody Record Support for Solicitors
            </h1>
            <p className="text-blue-100 mb-6">
              In brief: when instructing police station cover, providing the DSCC reference and custody
              record number helps attendance be arranged promptly and linked to the correct detention.
            </p>
            <ConversionCTAGroup />
          </div>
        </section>
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
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
              <a href="/blog/custody-record-number-dscc-reference">custody record numbers and DSCC references explained</a>.
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
              { href: "/for-solicitors", text: "Police station cover for solicitors", description: "Firm instructions" },
              { href: "/start/solicitors-agent-cover", text: "Send instructions", description: "Cover request flow" },
              { href: "/contact", text: "Contact", description: "Telephone for urgent custody" },
            ]}
          />
          <GeneralLegalDisclaimer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
