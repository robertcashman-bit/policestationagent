import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnswerFirstBlock } from "@/components/conversion/AnswerFirstBlock";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Released Under Investigation (RUI): What It Means & How Long It Lasts",
  description:
    "Released under investigation (RUI) is commonly used to describe being released without bail while an investigation continues. What to do next, with sources for core rights.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/released-under-investigation`,
  },
};

export default function ReleasedUnderInvestigationPage() {
  const sources: LegalSource[] = [
    {
      id: "pace-s58",
      label: "Police and Criminal Evidence Act 1984 (PACE) s.58 (right to legal advice)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/58",
    },
    {
      id: "govuk-arrested",
      label: "GOV.UK: Arrested? Your rights",
      href: "https://www.gov.uk/arrested-your-rights",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Released Under Investigation (RUI) mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Released Under Investigation (RUI) is commonly used to describe being released without bail while an investigation continues.",
        },
      },
      {
        "@type": "Question",
        name: "How long can Released Under Investigation last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Investigation timescales vary widely depending on the case. Get advice on your specific situation and ask for updates.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between RUI and bail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Police bail can include conditions and return dates. RUI is commonly used to describe release without bail while an investigation continues.",
        },
      },
      {
        "@type": "Question",
        name: "Can I travel abroad while Released Under Investigation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Get legal advice before making travel plans. Your circumstances may change quickly depending on the investigation.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after being Released Under Investigation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Possible outcomes include no further action, further interview, bail, or charge. Take advice on your specific case.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <JsonLd data={faqSchema} />
      <Header />

      <main className="flex-grow">
        {/* Hero */}
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
              <span>Released Under Investigation</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Released Under Investigation (RUI): What Does It Mean?
            </h1>
            <p className="text-xl text-blue-100">
              Understanding RUI, how long it lasts, and what happens next
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          <AnswerFirstBlock>
            Released Under Investigation (RUI) means you have been released from police custody while
            the investigation continues — commonly without bail conditions. If you need advice, ask for
            a solicitor (PACE s.58). See also our guide to{" "}
            <Link href="/police-bail-explained" className="text-blue-700 font-semibold hover:underline">
              police bail explained
            </Link>
            .
          </AnswerFirstBlock>

          <div className="prose prose-lg max-w-none">
            <h2>What Is Released Under Investigation?</h2>
            <p>
              “Released under investigation” is commonly used to describe release without bail while
              the police continue investigating. If you are unsure what your current status is (bail
              vs release without bail), ask your solicitor and ask the police what conditions (if
              any) apply.
            </p>

            <h2>RUI vs Police Bail: Key Differences</h2>
            <p>
              Police bail is a specific legal framework which can include conditions and return
              dates. If bail applies in your case, you should get the exact bail notice/conditions
              and take advice.
            </p>
            <p>
              See: <Link href="/police-bail-explained">Police bail explained</Link>.
            </p>

            <h2>How Long Can RUI Last?</h2>
            <p>
              Investigation timescales vary widely. If you have not heard anything for a long time,
              your solicitor can ask for an update.
            </p>

            <h2>What Happens During RUI?</h2>
            <p>While you are Released Under Investigation:</p>
            <ul>
              <li>You are free to go about your normal life</li>
              <li>The police may contact you for further information or interview</li>
              <li>
                You should keep your contact details up to date with the investigating officer
              </li>
            </ul>

            <h2>Possible Outcomes</h2>
            <p>Eventually, the police will conclude their investigation and make a decision:</p>
            <ul>
              <li>
                <strong>No Further Action (NFA):</strong> The case is dropped – no charges, no
                caution, matter closed
              </li>
              <li>
                <strong>Charge:</strong> You will be summoned to court or re-arrested and charged
              </li>
              <li>
                <strong>Re-arrest:</strong> Police may arrest you again for further questioning
              </li>
            </ul>
            <p>
              If you are unsure what outcome has been recorded, ask for confirmation in writing.
            </p>

            <h2>Your Rights During RUI</h2>
            <p>While RUI carries no formal conditions, you still have rights:</p>
            <ul>
              <li>
                You can seek legal advice at any time (PACE s.58).
                <Ref n={1} />
              </li>
              <li>You can request updates on the investigation through your solicitor.</li>
            </ul>

            <h2>What to Do If You're Released Under Investigation</h2>
            <ol>
              <li>
                <strong>Get legal advice</strong> – A solicitor can advise you on the strength of
                the case and likely outcomes
              </li>
              <li>
                <strong>Stay contactable</strong> – Keep your phone number and address up to date
                with the police
              </li>
              <li>
                <strong>Gather evidence</strong> – If you have evidence that supports your account,
                secure it now
              </li>
              <li>
                <strong>Request updates</strong> – Your solicitor can contact the investigating
                officer for progress updates
              </li>
              <li>
                <strong>Be patient but prepared</strong> – The matter may take time, but you should
                be ready to respond when contacted
              </li>
            </ol>

            <LegalReferences sources={sources} />
          </div>

          {/* Key Takeaways */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>RUI means you're released while the investigation continues</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Unlike bail, there are no conditions and no return date</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>There is no legal time limit – RUI can last months or years</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Outcomes include NFA, caution, charge, or re-arrest</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Seek legal advice and stay contactable</span>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  What does Released Under Investigation (RUI) mean?
                </h3>
                <p className="text-slate-700">
                  Released Under Investigation means you have been released from police custody
                  without charge, but the investigation is ongoing. Unlike bail, there are no
                  conditions and no set date to return.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  How long can Released Under Investigation last?
                </h3>
                <p className="text-slate-700">
                  There is no legal time limit on RUI. Investigations can continue for months or
                  even years. This has been criticised as leaving suspects in limbo, but there is
                  currently no statutory deadline.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  What is the difference between RUI and bail?
                </h3>
                <p className="text-slate-700">
                  With bail, you have conditions to follow and a date to return. With RUI, there are
                  no conditions and no return date. RUI was introduced to reduce the use of bail
                  after 2017 reforms.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can I travel abroad while Released Under Investigation?
                </h3>
                <p className="text-slate-700">
                  Generally yes, as RUI carries no conditions. However, you should be contactable by
                  police. If charged, you may need to appear at court, so extended travel should be
                  considered carefully.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  What happens after being Released Under Investigation?
                </h3>
                <p className="text-slate-700">
                  Eventually, police will decide: charge you, issue a caution, take no further
                  action (NFA), or re-arrest you for further questioning. You should receive written
                  notification of the outcome.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Released Under Investigation?</h3>
            <p className="text-slate-300 mb-6">
              If you've been released under investigation and want advice on your case, I can help.
              I offer free initial consultations and can make enquiries with the investigating
              officer on your behalf.
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

          {/* Related Links */}
          <div className="border-t pt-8 mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/offences-we-deal-with"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Offences We Deal With →</span>
              </Link>
              <Link
                href="/custody-time-limits"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Custody Time Limits →</span>
              </Link>
              <Link
                href="/police-bail-explained"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Police Bail Explained →</span>
              </Link>
              <Link
                href="/what-happens-after-arrest"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">What Happens After Arrest →</span>
              </Link>
              <Link
                href="/services/police-station-representation"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Police Station Representation →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
