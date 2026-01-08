import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Police Bail Explained: Conditions, Time Limits & Your Rights UK",
  description:
    "Police bail is release with conditions while an investigation continues. Learn what bail is, what happens if you breach conditions, and how pre-charge bail time limits work (England & Wales).",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/police-bail-explained`,
  },
};

export default function PoliceBailExplainedPage() {
  const sources: LegalSource[] = [
    {
      id: "pace-47zb",
      label:
        "Police and Criminal Evidence Act 1984 (PACE) s.47ZB (applicable bail period: initial limit)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/47ZB",
    },
    {
      id: "pace-47zd",
      label: "PACE s.47ZD (extension of initial limit in standard cases; relevant officer)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/47ZD",
    },
    {
      id: "pace-47zf",
      label: "PACE s.47ZF (first extension by magistrates’ court)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/47ZF",
    },
    {
      id: "pace-47zg",
      label: "PACE s.47ZG (subsequent extensions by magistrates’ court)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/47ZG",
    },
    {
      id: "pace-47zj",
      label:
        "PACE s.47ZJ (late court applications; bail period treated as extended until determined)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/47ZJ",
    },
    {
      id: "pace-46a",
      label: "PACE s.46A (arrest for failure to answer bail / suspected breach of bail conditions)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/46A",
    },
    {
      id: "cps-bail",
      label: "Crown Prosecution Service (CPS) prosecution guidance: Bail",
      href: "https://www.cps.gov.uk/prosecution-guidance/bail",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is police bail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Police bail is when you are released from custody with conditions while the investigation continues. You must return to the police station on a specified date. Bail can include conditions like not contacting certain people or staying away from certain locations.",
        },
      },
      {
        "@type": "Question",
        name: "How long does police bail last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pre-charge police bail time limits depend on the type of case. Under PACE, the initial “applicable bail period” is generally 3 months from the bail start date, with different rules for certain designated/regulatory cases. Bail can be extended under PACE, including (in some circumstances) by a court.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if I breach police bail conditions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Police can arrest you if they reasonably suspect you have broken pre-charge bail conditions, and you may be taken back to a police station. What happens next depends on your case and the investigation.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between bail and RUI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Police bail usually involves conditions and a return date. RUI is release without bail (typically without bail conditions).",
        },
      },
      {
        "@type": "Question",
        name: "Can I challenge police bail conditions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can ask the police to vary bail conditions, and you can get a solicitor to make representations for you. The route to challenge conditions depends on whether it is police bail or court bail.",
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
              <span>Police Bail</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Police Bail Explained: What You Need to Know
            </h1>
            <p className="text-xl text-blue-100">
              Understanding bail conditions, time limits, and your rights
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> Police bail means you are released from custody with
              <strong> conditions</strong> (such as not contacting witnesses) and a{" "}
              <strong>return date</strong>
              to come back to the station. Pre-charge bail has statutory time-limit rules under PACE
              and can be extended in certain circumstances.
              <Ref n={1} /> If police reasonably suspect you have broken bail conditions, they can
              arrest you and take you back to a police station.
              <Ref n={6} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Is Police Bail?</h2>
            <p>
              Police bail (also called "pre-charge bail") is when you are released from police
              custody while the investigation into the alleged offence continues. Unlike
              unconditional release, bail comes with conditions you must follow and a date to return
              to the police station.
            </p>

            <h2>Common Bail Conditions</h2>
            <p>Bail conditions vary depending on the alleged offence but commonly include:</p>
            <ul>
              <li>
                <strong>Non-contact:</strong> Not contacting the alleged victim or witnesses
              </li>
              <li>
                <strong>Exclusion zones:</strong> Staying away from certain addresses or areas
              </li>
              <li>
                <strong>Residence:</strong> Living at a specified address
              </li>
              <li>
                <strong>Curfew:</strong> Being at home between certain hours
              </li>
              <li>
                <strong>Reporting:</strong> Signing on at a police station regularly
              </li>
              <li>
                <strong>Surrender of passport:</strong> Not leaving the country
              </li>
            </ul>

            <h2>Bail Time Limits</h2>
            <p>
              In England &amp; Wales, the statutory “applicable bail period” (the key time-limit
              concept for pre-charge bail) is set out in PACE.
              <Ref n={1} />
            </p>
            <ul>
              <li>
                <strong>Initial limit (standard cases):</strong> 3 months beginning with the
                person’s bail start date (PACE s.47ZB).
                <Ref n={1} />
              </li>
              <li>
                <strong>Initial limit (certain designated/regulatory cases):</strong> 6 months
                beginning with the bail start date (PACE s.47ZB).
                <Ref n={1} />
              </li>
              <li>
                <strong>Extension in standard cases (up to 6 months total):</strong> A relevant
                officer (inspector or above) may authorise an extension where the statutory
                conditions are met (PACE s.47ZD).
                <Ref n={2} />
              </li>
              <li>
                <strong>Court extensions:</strong> A magistrates’ court can authorise extensions in
                the situations set out in PACE (e.g., ss.47ZF–47ZG).
                <Ref n={3} /> <Ref n={4} />
              </li>
            </ul>
            <p>
              If an application to the magistrates’ court is made in time but cannot be determined
              before the period ends, the bail period is treated as extended until the application
              is determined (PACE s.47ZJ).
              <Ref n={5} />
            </p>

            <h2>What Happens If You Breach Bail?</h2>
            <p>
              If the police reasonably suspect you have broken pre-charge bail conditions, a
              constable may arrest you without warrant (PACE s.46A(1A)).
              <Ref n={6} />
            </p>
            <ul>
              <li>
                You may be taken back to a police station as soon as practicable after arrest (PACE
                s.46A(2)).
                <Ref n={6} />
              </li>
              <li>
                What happens next depends on your case and the investigation (get legal advice
                specific to you).
              </li>
            </ul>

            <h2>Bail vs Released Under Investigation (RUI)</h2>
            <table className="w-full border-collapse my-6">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3 text-left">Feature</th>
                  <th className="border p-3 text-left">Police Bail</th>
                  <th className="border p-3 text-left">RUI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Conditions</td>
                  <td className="border p-3">Yes – must be followed</td>
                  <td className="border p-3">None</td>
                </tr>
                <tr>
                  <td className="border p-3">Return date</td>
                  <td className="border p-3">Yes – must attend</td>
                  <td className="border p-3">None</td>
                </tr>
                <tr>
                  <td className="border p-3">Time limit</td>
                  <td className="border p-3">
                    Statutory bail time-limit rules apply (PACE “applicable bail period”).
                    <Ref n={1} />
                  </td>
                  <td className="border p-3">
                    No fixed “applicable bail period” (RUI is release without bail).
                  </td>
                </tr>
                <tr>
                  <td className="border p-3">Breach consequences</td>
                  <td className="border p-3">
                    Arrest possible if police suspect breach of bail conditions (PACE s.46A).
                    <Ref n={6} />
                  </td>
                  <td className="border p-3">N/A</td>
                </tr>
              </tbody>
            </table>

            <h2>Challenging Bail Conditions</h2>
            <p>If you believe your bail conditions are unreasonable, you can:</p>
            <ol>
              <li>
                <strong>Ask the police to vary them:</strong> Make representations to the custody
                sergeant or investigating officer
              </li>
              <li>
                <strong>Apply to the magistrates' court:</strong> If the police refuse, you can
                apply to court to have conditions varied or removed
              </li>
              <li>
                <strong>Get legal representation:</strong> A solicitor can argue on your behalf
              </li>
            </ol>

            <h2>What Happens at Your Bail Date?</h2>
            <p>
              When you return to the police station on your bail date, several things can happen:
            </p>
            <ul>
              <li>
                <strong>Charged:</strong> You are formally charged and given a court date
              </li>
              <li>
                <strong>Re-bailed:</strong> Investigation continues, new return date set
              </li>
              <li>
                <strong>Released under investigation:</strong> Bail ends but investigation continues
                without conditions
              </li>
              <li>
                <strong>No further action:</strong> Case closed, you are free to go
              </li>
              <li>
                <strong>Cautioned:</strong> Given a formal warning instead of prosecution
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Police bail has conditions you must follow and a return date</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Initial bail lasts 28 days but can be extended</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Breaching conditions can lead to arrest but isn't a separate crime</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You can challenge unreasonable conditions through the courts</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Bail is now used more sparingly following 2017 reforms</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is police bail?</h3>
                <p className="text-slate-700">
                  Police bail is when you are released from custody with conditions while the
                  investigation continues. You must return to the police station on a specified
                  date.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  How long does police bail last?
                </h3>
                <p className="text-slate-700">
                  Initial police bail lasts up to 28 days. It can be extended to 3 months by a
                  superintendent, or longer with magistrates' court approval.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  What happens if I breach police bail conditions?
                </h3>
                <p className="text-slate-700">
                  Breaching conditions is not a criminal offence itself, but you can be arrested and
                  brought back to the police station. You may be held in custody rather than
                  re-released.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  What is the difference between bail and RUI?
                </h3>
                <p className="text-slate-700">
                  Bail has conditions and a return date. RUI has no conditions and no return date.
                  Bail is reserved for cases where conditions are necessary.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can I challenge police bail conditions?
                </h3>
                <p className="text-slate-700">
                  Yes, you can ask the police to vary or remove conditions. If refused, you can
                  apply to a magistrates' court. Your solicitor can make representations on your
                  behalf.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">On Police Bail?</h3>
            <p className="text-slate-300 mb-6">
              If you're on bail and need advice about your conditions or what to expect, I can help.
              I provide representation at bail return dates across Kent.
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
                href="/released-under-investigation"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Released Under Investigation →</span>
              </Link>
              <Link
                href="/custody-time-limits"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Custody Time Limits →</span>
              </Link>
              <Link
                href="/services/bail-applications"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Bail Applications →</span>
              </Link>
              <Link
                href="/police-custody-rights"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Your Custody Rights →</span>
              </Link>
            </div>
          </div>

          <LegalReferences sources={sources} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
