import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Vulnerable Adults in Custody | Special Protections | Police Station Agent",
  description:
    "Special protections for vulnerable adults in police custody. Learn about appropriate adults, mental health assessments, and your rights under PACE Code C.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/vulnerable-adults-in-custody`,
  },
  openGraph: {
    title: "Vulnerable Adults in Custody | Special Protections | Police Station Agent",
    description:
      "Special protections for vulnerable adults in police custody. Learn about appropriate adults, mental health assessments, and your rights under PACE Code C.",
    url: `https://${SITE_DOMAIN}/vulnerable-adults-in-custody`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function Page() {
  const sources: LegalSource[] = [
    {
      id: "code-c-2023",
      label:
        "Home Office: PACE Code C (December 2023) – detention, treatment and questioning (see e.g. paras 1.5, 1.7A, 11.15–11.18)",
      href: "https://www.gov.uk/government/publications/pace-code-c-2023",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">
              Vulnerable Adults in Custody: Special Protections
            </h1>

            <p className="lead text-xl text-slate-700 mb-8">
              Vulnerable adults in police custody are entitled to special protections under PACE
              Code C. Understanding these rights is crucial for ensuring fair treatment and proper
              legal representation.
            </p>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Who is Considered a Vulnerable Adult?</h2>
              <p className="mb-4">
                PACE Code C defines “vulnerable” for the purposes of detention and interview
                safeguards. Broadly, this can include people who may not understand the significance
                of what is said to them or their replies because of mental state or capacity.
                <Ref n={1} /> Examples may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Adults with mental health conditions</li>
                <li>Adults with learning disabilities</li>
                <li>Adults with communication difficulties</li>
                <li>Adults who may be particularly suggestible</li>
                <li>Adults under the influence of drugs or alcohol</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">The Role of an Appropriate Adult</h2>
              <p className="mb-4">
                PACE Code C describes the role of the appropriate adult as safeguarding the rights,
                entitlements and welfare of vulnerable persons, including supporting/assisting them
                through procedures and helping communication.
                <Ref n={1} /> The appropriate adult role includes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Supporting, advising and assisting the person when they are given/asked to provide
                  information or participate in procedures
                </li>
                <li>
                  Helping the person understand their rights and ensuring those rights are respected
                </li>
                <li>
                  Assisting communication with police (while respecting the person’s right to say
                  nothing)
                </li>
                <li>Observing whether police are acting properly and fairly</li>
              </ul>
              <p className="mb-4">
                If you are unsure who can act as the appropriate adult in your situation, take legal
                advice and ask police what they are proposing under Code C.
                <Ref n={1} />
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Mental Health Assessments</h2>
              <p className="mb-4">
                If there are concerns about a detainee’s health or capacity to be interviewed
                safely, ask for a healthcare professional and make sure the custody record reflects
                the concerns. Code C contains safeguards for vulnerable detainees and interview
                decisions.
                <Ref n={1} />
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Be at risk of self-harm</li>
                <li>Require medication</li>
                <li>Need a mental health assessment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Interview Safeguards</h2>
              <p className="mb-4">
                PACE Code C provides that a detained vulnerable person must not be interviewed (or
                asked to provide/sign certain written statements) in the absence of the appropriate
                adult, subject to limited exceptions (including “urgent interviews” with senior
                authorisation).
                <Ref n={1} />
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>An appropriate adult is a key safeguard for vulnerable suspects</li>
                <li>Ask for breaks if the person is struggling to understand or respond</li>
                <li>Ask for questions to be repeated or simplified if needed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Why Legal Representation is Essential</h2>
              <p className="mb-4">
                Vulnerable adults are particularly at risk during police interviews. A solicitor
                can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Ensure the appropriate adult is present and acting properly</li>
                <li>Challenge any breaches of PACE Code C</li>
                <li>Ensure the vulnerable adult's rights are protected</li>
                <li>Advise on whether the interview should proceed</li>
                <li>Ensure any evidence obtained is admissible</li>
              </ul>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-semibold mb-4">Get Expert Help Now</h2>
              <p className="mb-4">
                If you or someone you know is a vulnerable adult in police custody, it is essential
                to have expert legal representation. We specialise in representing vulnerable adults
                and ensuring their rights are fully protected.
              </p>
              <p className="mb-4">
                <strong>
                  Call us extended hours on{" "}
                  <a
                    href="tel:01732247427"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    01732 247427
                  </a>
                </strong>{" "}
                for free legal advice and representation.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-slate-300">
              <LegalReferences sources={sources} heading="Sources" />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
