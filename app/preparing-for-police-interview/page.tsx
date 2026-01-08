import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Preparing for Police Interview | Expert Guide | Police Station Agent",
  description:
    "How to prepare for a police interview. Expert advice on your rights, what to expect, and why legal representation is essential. Free extended hours advice available.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/preparing-for-police-interview`,
  },
  openGraph: {
    title: "Preparing for Police Interview | Expert Guide | Police Station Agent",
    description:
      "How to prepare for a police interview. Expert advice on your rights, what to expect, and why legal representation is essential.",
    url: `https://${SITE_DOMAIN}/preparing-for-police-interview`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function Page() {
  const sources: LegalSource[] = [
    {
      id: "pace-s58",
      label: "Police and Criminal Evidence Act 1984 (PACE) s.58 (right to consult a solicitor)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/58",
    },
    {
      id: "pace-code-c-2023",
      label:
        "Home Office: PACE Code C (December 2023) – detention, treatment and questioning (PDF)",
      href: "https://assets.publishing.service.gov.uk/media/6580543083ba38000de1b792/PACE+Code+C+2023.pdf",
    },
    {
      id: "cjpoa-s34",
      label:
        "Criminal Justice and Public Order Act 1994 s.34 (inferences from failure to mention facts)",
      href: "https://www.legislation.gov.uk/ukpga/1994/33/section/34",
    },
    {
      id: "pace-code-e-2016",
      label: "Home Office: PACE Code E (2016) – audio recording of interviews (PDF)",
      href: "https://assets.publishing.service.gov.uk/media/5a8092dbe5274a2e87dba95d/52344_00_Pace_Code_E_Accessible_v0.3.pdf",
    },
    {
      id: "pace-code-f-2013",
      label: "Home Office: PACE Code F (2013) – visual recording of interviews (PDF)",
      href: "https://assets.publishing.service.gov.uk/media/5a7d4e9740f0b60a7f1a9b6d/2013_PACE_Code_F.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">Preparing for a Police Interview</h1>

            <p className="lead text-xl text-slate-700 mb-8">
              Being interviewed by the police can be a stressful experience. Proper preparation and
              understanding your rights are essential for protecting your interests.
            </p>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Before the Interview</h2>

              <h3 className="text-2xl font-semibold mb-3 mt-6">
                1. Exercise Your Right to Legal Advice
              </h3>
              <p className="mb-4">
                You have a statutory right to consult a solicitor in police custody (PACE s.58).
                <Ref n={1} /> PACE Code C also requires detainees to be told that free independent
                legal advice is available.
                <Ref n={2} /> Always request legal advice before deciding how to respond in
                interview.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">2. Understand the Caution</h3>
              <p className="mb-4">
                PACE Code C sets out the standard caution wording, including: “You do not have to
                say anything. But it may harm your defence if you do not mention when questioned
                something which you later rely on in Court. Anything you do say may be given in
                evidence.”
                <Ref n={2} /> This means:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You have the right to remain silent</li>
                <li>
                  Section 34 CJPOA 1994 is the key “adverse inference” provision about failing to
                  mention facts later relied on in a defence, where it was reasonable to expect you
                  to mention them at the time
                  <Ref n={3} />
                </li>
                <li>You should wait for legal advice before deciding how to respond</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">3. Know What to Bring</h3>
              <p className="mb-4">If attending a voluntary interview, bring:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Photo identification</li>
                <li>Any relevant documents</li>
                <li>A list of questions you want to ask your solicitor</li>
                <li>Contact details for family or friends</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">During the Interview</h2>

              <h3 className="text-2xl font-semibold mb-3 mt-6">What to Expect</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Interviews are recorded under the PACE recording codes (Codes E and F)
                  <Ref n={4} /> <Ref n={5} />
                </li>
                <li>Your solicitor will be present throughout</li>
                <li>You can take breaks when needed</li>
                <li>You can consult privately with your solicitor at any time</li>
                <li>The interview should be conducted fairly and without pressure</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">Your Rights</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Right to remain silent</li>
                <li>Right to legal advice</li>
                <li>Right to have your solicitor present</li>
                <li>Right to consult privately with your solicitor</li>
                <li>Right to have the interview conducted fairly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Why Legal Representation is Essential</h2>
              <p className="mb-4">
                Having a solicitor present during a police interview is crucial because:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>They understand the law and can advise you on your rights</li>
                <li>They can ensure the interview is conducted properly</li>
                <li>They can challenge inappropriate questions</li>
                <li>They can help you prepare your responses</li>
                <li>They can ensure any evidence obtained is admissible</li>
                <li>They can protect your interests throughout the process</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Common Mistakes to Avoid</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Answering questions without legal advice:</strong> Always wait for your
                  solicitor
                </li>
                <li>
                  <strong>Assuming you have to answer:</strong> You have the right to remain silent
                </li>
                <li>
                  <strong>Not understanding the caution:</strong> Make sure you understand what it
                  means
                </li>
                <li>
                  <strong>Rushing to answer:</strong> Take your time and consult with your solicitor
                </li>
                <li>
                  <strong>Not taking breaks:</strong> You can request breaks when needed
                </li>
              </ul>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-semibold mb-4">Get Expert Legal Representation</h2>
              <p className="mb-4">
                If you have been asked to attend a police interview, whether voluntary or under
                arrest, it is essential to have expert legal representation. We provide free
                extended hours legal advice and representation.
              </p>
              <p className="mb-4">
                <strong>
                  Call us immediately on{" "}
                  <a
                    href="tel:01732247427"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    01732 247427
                  </a>
                </strong>{" "}
                to arrange representation before your interview.
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
