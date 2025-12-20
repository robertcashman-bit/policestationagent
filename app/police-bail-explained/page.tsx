import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Police Bail Explained: Conditions, Time Limits & Your Rights UK',
  description: 'Police bail means release with conditions while investigation continues. Learn about bail conditions, 28-day limits, breaches, and the difference from RUI.',
  alternates: {
    canonical: 'https://policestationagent.com/police-bail-explained',
  },
};

export default function PoliceBailExplainedPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is police bail?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Police bail is when you are released from custody with conditions while the investigation continues. You must return to the police station on a specified date. Bail can include conditions like not contacting certain people or staying away from certain locations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does police bail last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Initial police bail lasts up to 28 days. It can be extended to 3 months by a superintendent, or longer with magistrates\' court approval. After the Policing and Crime Act 2017 reforms, bail is used more sparingly.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I breach police bail conditions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Breaching police bail conditions is not a criminal offence itself, but you can be arrested and brought back to the police station. The breach may result in being held in custody rather than re-released on bail.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between bail and RUI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bail has conditions and a return date. Released Under Investigation (RUI) has no conditions and no return date. Bail is now reserved for cases where conditions are necessary and proportionate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I challenge police bail conditions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can ask the police to vary or remove conditions. If refused, you can apply to a magistrates\' court to have conditions varied. Your solicitor can make representations on your behalf.',
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
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/police-custody-rights" className="hover:text-white">Custody Rights</Link>
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
              <strong> conditions</strong> (such as not contacting witnesses) and a <strong>return date</strong> 
              to come back to the station. Initial bail lasts up to <strong>28 days</strong> and can be extended. 
              Breaching conditions can result in arrest.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Is Police Bail?</h2>
            <p>
              Police bail (also called "pre-charge bail") is when you are released from police custody while 
              the investigation into the alleged offence continues. Unlike unconditional release, bail comes 
              with conditions you must follow and a date to return to the police station.
            </p>
            <p>
              Following reforms in the Policing and Crime Act 2017, police bail is now used more sparingly. 
              Before these reforms, almost everyone was released on bail. Now, bail is only granted when 
              conditions are "necessary and proportionate."
            </p>

            <h2>Common Bail Conditions</h2>
            <p>Bail conditions vary depending on the alleged offence but commonly include:</p>
            <ul>
              <li><strong>Non-contact:</strong> Not contacting the alleged victim or witnesses</li>
              <li><strong>Exclusion zones:</strong> Staying away from certain addresses or areas</li>
              <li><strong>Residence:</strong> Living at a specified address</li>
              <li><strong>Curfew:</strong> Being at home between certain hours</li>
              <li><strong>Reporting:</strong> Signing on at a police station regularly</li>
              <li><strong>Surrender of passport:</strong> Not leaving the country</li>
            </ul>

            <h2>Bail Time Limits</h2>
            <p>The Policing and Crime Act 2017 introduced strict time limits on police bail:</p>
            <ul>
              <li><strong>Initial period:</strong> Up to 28 days</li>
              <li><strong>First extension:</strong> Up to 3 months total (by superintendent)</li>
              <li><strong>Further extensions:</strong> Require magistrates' court approval</li>
            </ul>
            <p>
              In practice, I have seen bail periods extended multiple times for complex investigations. 
              However, the police must justify each extension, and you have the right to make representations.
            </p>

            <h2>What Happens If You Breach Bail?</h2>
            <p>
              Breaching police bail conditions is <strong>not itself a criminal offence</strong>. However:
            </p>
            <ul>
              <li>You can be arrested and brought back to the police station</li>
              <li>The custody sergeant may decide not to release you again</li>
              <li>You may be held in custody until charged or brought before a court</li>
              <li>The breach may be used as evidence against you</li>
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
                  <td className="border p-3">28 days initially</td>
                  <td className="border p-3">No limit</td>
                </tr>
                <tr>
                  <td className="border p-3">Breach consequences</td>
                  <td className="border p-3">Arrest possible</td>
                  <td className="border p-3">N/A</td>
                </tr>
              </tbody>
            </table>

            <h2>Challenging Bail Conditions</h2>
            <p>If you believe your bail conditions are unreasonable, you can:</p>
            <ol>
              <li><strong>Ask the police to vary them:</strong> Make representations to the custody sergeant or investigating officer</li>
              <li><strong>Apply to the magistrates' court:</strong> If the police refuse, you can apply to court to have conditions varied or removed</li>
              <li><strong>Get legal representation:</strong> A solicitor can argue on your behalf</li>
            </ol>

            <h2>What Happens at Your Bail Date?</h2>
            <p>When you return to the police station on your bail date, several things can happen:</p>
            <ul>
              <li><strong>Charged:</strong> You are formally charged and given a court date</li>
              <li><strong>Re-bailed:</strong> Investigation continues, new return date set</li>
              <li><strong>Released under investigation:</strong> Bail ends but investigation continues without conditions</li>
              <li><strong>No further action:</strong> Case closed, you are free to go</li>
              <li><strong>Cautioned:</strong> Given a formal warning instead of prosecution</li>
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
                <p className="text-slate-700">Police bail is when you are released from custody with conditions while the investigation continues. You must return to the police station on a specified date.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How long does police bail last?</h3>
                <p className="text-slate-700">Initial police bail lasts up to 28 days. It can be extended to 3 months by a superintendent, or longer with magistrates' court approval.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What happens if I breach police bail conditions?</h3>
                <p className="text-slate-700">Breaching conditions is not a criminal offence itself, but you can be arrested and brought back to the police station. You may be held in custody rather than re-released.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is the difference between bail and RUI?</h3>
                <p className="text-slate-700">Bail has conditions and a return date. RUI has no conditions and no return date. Bail is reserved for cases where conditions are necessary.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I challenge police bail conditions?</h3>
                <p className="text-slate-700">Yes, you can ask the police to vary or remove conditions. If refused, you can apply to a magistrates' court. Your solicitor can make representations on your behalf.</p>
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
              <a href="tel:01732247427" className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg">
                Call 01732 247427
              </a>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg">
                Contact Online
              </Link>
            </div>
          </div>

          <div className="border-t pt-8 mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/released-under-investigation" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Released Under Investigation →</span>
              </Link>
              <Link href="/custody-time-limits" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Custody Time Limits →</span>
              </Link>
              <Link href="/services/bail-applications" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Bail Applications →</span>
              </Link>
              <Link href="/police-custody-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Your Custody Rights →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
