import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Youth Custody Rights: Under 18 at a Police Station UK",
  description:
    "Under-18s at the police station (England & Wales): key protections in PACE Code C including appropriate adult rules and custody safeguards. Sources included.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/youth-custody-rights`,
  },
};

export default function YouthCustodyRightsPage() {
  const sources: LegalSource[] = [
    {
      id: "code-c-2023",
      label:
        "Home Office: PACE Code C (December 2023) – detention, treatment and questioning (see e.g. paras 3.13–3.14, 8.8, 11.15)",
      href: "https://www.gov.uk/government/publications/pace-code-c-2023",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What rights do under 18s have at a police station?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C contains specific safeguards for juveniles, including appropriate adult rules for interviews and requirements to inform a person responsible for the juvenile’s welfare.",
        },
      },
      {
        "@type": "Question",
        name: "What is an appropriate adult for a young person?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An appropriate adult for a young person is usually a parent, guardian, or social worker who attends the police station to support them. They ensure the young person understands what is happening and their rights are protected.",
        },
      },
      {
        "@type": "Question",
        name: "Can police interview a child without a parent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C says juveniles must not be interviewed in the absence of the appropriate adult, subject to limited exceptions set out in the Code.",
        },
      },
      {
        "@type": "Question",
        name: "Can a 16 year old be held in police cells?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C provides that a juvenile shall not be placed in a police cell unless no other secure accommodation is available and the custody officer considers certain conditions are met, and a juvenile may not be placed in a cell with a detained adult.",
        },
      },
      {
        "@type": "Question",
        name: "How long can police hold a minor?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custody time limits come from PACE, but this page focuses on juvenile-specific safeguards in PACE Code C. See the custody time limits guide for time limit details.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <JsonLd data={faqSchema} />
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">›</span>
              <Link href="/police-custody-rights" className="hover:text-white">
                Custody Rights
              </Link>
              <span className="mx-2">›</span>
              <span>Youth Custody</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Youth Custody Rights: Under 18 at a Police Station
            </h1>
            <p className="text-xl text-blue-100">
              Special protections for young people in police custody
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> If you're under 18 and arrested, you have extra
              protections. Under PACE Code C, a juvenile must not be interviewed in the absence of
              the appropriate adult (subject to limited exceptions in the Code).
              <Ref n={1} /> Code C also requires the custody officer (if practicable) to identify
              and inform a person responsible for the juvenile’s welfare, as soon as practicable,
              that the juvenile has been arrested and where they are detained.
              <Ref n={1} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Special Protections for Young People</h2>
            <p>
              The law recognises that young people need additional safeguards in the criminal
              justice system. PACE Code C contains specific provisions for those under 18 to ensure
              they are treated appropriately and their rights are protected.
            </p>

            <h2>The Appropriate Adult</h2>
            <p>
              One of the most important protections for under 18s is the requirement for an
              <strong> appropriate adult</strong> to be present during:
            </p>
            <ul>
              <li>Police interviews</li>
              <li>Intimate and strip searches</li>
              <li>Charging and cautioning</li>
              <li>Any time the young person is asked to provide a sample (DNA, fingerprints)</li>
              <li>Reading and signing of important documents</li>
            </ul>

            <h3>Who Can Be an Appropriate Adult?</h3>
            <ul>
              <li>
                <strong>Parent or guardian</strong> – the first choice in most cases
              </li>
              <li>
                <strong>Social worker</strong> – if parents are unavailable or unsuitable
              </li>
              <li>
                <strong>Other responsible adult</strong> – over 18, not a police officer
              </li>
            </ul>
            <p>
              The appropriate adult's role is to support the young person, ensure they understand
              what is happening, and observe that the interview is conducted fairly.
            </p>

            <h2>Custody Conditions for Young People</h2>
            <p>
              PACE Code C includes juvenile-specific custody safeguards. For example, Code C
              provides that a juvenile shall not be placed in a police cell unless no other secure
              accommodation is available and the custody officer considers certain conditions are
              met, and a juvenile may not be placed in a cell with a detained adult.
              <Ref n={1} />
            </p>
            <ul>
              <li>
                <strong>Appropriate adult safeguards</strong> apply to interviews and key
                procedures.
                <Ref n={1} />
              </li>
              <li>
                <strong>Parent/guardian welfare notification</strong> is a specific requirement in
                Code C.
                <Ref n={1} />
              </li>
              <li>
                <strong>Cell placement limits</strong> for juveniles are set out in Code C.
                <Ref n={1} />
              </li>
            </ul>

            <h2>What Happens When a Young Person Is Arrested</h2>
            <ol>
              <li>
                <strong>Arrival at custody:</strong> Custody officer assesses the young person's
                needs
              </li>
              <li>
                <strong>Inform welfare contact:</strong> Code C requires (if practicable)
                identifying and informing a person responsible for the juvenile’s welfare as soon as
                practicable that the juvenile has been arrested and where they are detained.
                <Ref n={1} />
              </li>
              <li>
                <strong>Appropriate adult arranged:</strong> Interview should not proceed without
                them, subject to limited exceptions set out in Code C.
                <Ref n={1} />
              </li>
              <li>
                <strong>Legal advice offered:</strong> Free and confidential
              </li>
              <li>
                <strong>Interview:</strong> With solicitor and appropriate adult present
              </li>
              <li>
                <strong>Decision:</strong> The police decide what happens next (e.g. no further
                action, bail, charge) depending on the case.
              </li>
            </ol>

            <h2>Interview Rules for Young People</h2>
            <p>
              PACE Code C contains specific safeguards for juveniles, including that a juvenile must
              not be interviewed in the absence of the appropriate adult except in limited
              circumstances set out in the Code.
              <Ref n={1} />
            </p>
            <ul>
              <li>Appropriate adult must be present throughout</li>
              <li>
                Police should follow Code C requirements throughout the interview process.
                <Ref n={1} />
              </li>
            </ul>

            <h2>Advice for Parents</h2>
            <ol>
              <li>
                <strong>Go to the police station</strong> – Your child needs you as appropriate
                adult
              </li>
              <li>
                <strong>Request a solicitor</strong> – Legal advice is free and important
              </li>
              <li>
                <strong>Stay calm</strong> – Your support matters
              </li>
              <li>
                <strong>Don't discuss the case</strong> – Wait for legal advice first
              </li>
              <li>
                <strong>Take notes</strong> – Record times and what happens
              </li>
            </ol>

            <LegalReferences sources={sources} />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Under 18s must have an appropriate adult present during interview</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Parents/guardians should be informed as soon as possible</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Young people should not be placed in cells with adults</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Free legal advice is available and highly recommended</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Cases should be dealt with as quickly as possible</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  What rights do under 18s have at a police station?
                </h3>
                <p className="text-slate-700">
                  Under 18s have enhanced rights including: an appropriate adult must be present,
                  parents should be informed, special custody conditions apply, and there are
                  stricter procedures. Legal advice is free.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  What is an appropriate adult for a young person?
                </h3>
                <p className="text-slate-700">
                  An appropriate adult is usually a parent, guardian, or social worker who attends
                  to support the young person. They ensure the young person understands what is
                  happening and their rights are protected.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can police interview a child without a parent?
                </h3>
                <p className="text-slate-700">
                  No, police cannot interview a child without an appropriate adult present. If
                  parents are unavailable, a social worker or other suitable adult must attend
                  before interview begins.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can a 16 year old be held in police cells?
                </h3>
                <p className="text-slate-700">
                  Young people should not be held in cells unless absolutely necessary. If detained,
                  they must never be placed with an adult. Police should seek alternative
                  accommodation where possible.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  How long can police hold a minor?
                </h3>
                <p className="text-slate-700">
                  The same time limits apply as for adults, but police should aim to deal with young
                  people quickly. Overnight detention should be avoided where possible.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Young Person Arrested?</h3>
            <p className="text-slate-300 mb-6">
              If your child has been arrested or you need to act as appropriate adult, I can provide
              immediate legal assistance at any Kent police station.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:01732247427"
                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg"
              >
                Call 01732 247427
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg"
              >
                Contact Online
              </Link>
            </div>
          </div>

          <div className="border-t pt-8 mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/appropriate-adult"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Appropriate Adult Role →</span>
              </Link>
              <Link
                href="/police-custody-rights"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">General Custody Rights →</span>
              </Link>
              <Link
                href="/police-interview-rights"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Interview Rights →</span>
              </Link>
              <Link
                href="/pace-code-c"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">PACE Code C →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
