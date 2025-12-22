import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Can Police Take My Phone? Your Rights When Police Seize Devices UK',
  description:
    'When can police seize your phone, how long can they keep it, and what are the rules on being required to disclose a PIN/password (England & Wales). Sources included.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/can-police-take-my-phone`,
  },
};

export default function CanPoliceTakeMyPhonePage() {
  const sources: LegalSource[] = [
    {
      id: 'pace-s19',
      label: 'Police and Criminal Evidence Act 1984 (PACE) s.19 (general power of seizure)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/19',
    },
    {
      id: 'pace-s22',
      label: 'PACE s.22 (retention of seized property)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/22',
    },
    {
      id: 'ripa-s49',
      label: 'Regulation of Investigatory Powers Act 2000 (RIPA) s.49 (notices requiring disclosure)',
      href: 'https://www.legislation.gov.uk/ukpga/2000/23/section/49',
    },
    {
      id: 'ripa-s53',
      label: 'RIPA s.53 (offence: failure to comply with a section 49 notice)',
      href: 'https://www.legislation.gov.uk/ukpga/2000/23/section/53',
    },
    {
      id: 'ppa-1897-s1',
      label: 'Police (Property) Act 1897 s.1 (court power to order delivery of property in police possession)',
      href: 'https://www.legislation.gov.uk/ukpga/Vict/60-61/30/section/1',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can police take my phone when I\'m arrested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Police may be able to seize a phone as evidence depending on the circumstances and the power being used. PACE includes a general power of seizure in certain search situations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I have to give police my phone PIN or password?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You are not always required to volunteer a PIN/password. However, under RIPA 2000 section 49, a notice can require disclosure of protected information, and section 53 creates an offence for knowingly failing to comply.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long can police keep my phone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE section 22 allows retention of seized property so long as is necessary in all the circumstances, subject to statutory limits (including that a photograph/copy must be used instead where sufficient for certain purposes).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can police search my phone without a warrant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The powers used for seizure/search depend on the circumstances. If police have seized your phone, ask what legal power they rely on and get legal advice.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get my phone back if I\'m released without charge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If police keep property, you can request its return. In some situations you may apply to a court for an order about property in police possession under the Police (Property) Act 1897.',
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
              <span>Phone Seizure</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Can Police Take My Phone? Your Rights Explained
            </h1>
            <p className="text-xl text-blue-100">
              Understanding phone seizure, passwords, and data access
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> Police may be able to seize your phone as evidence depending on the circumstances and the legal power being used (PACE includes a general power of seizure in certain search situations).<Ref n={1} />{' '}
              If seized, PACE section 22 allows retention so long as is necessary in all the circumstances (subject to limits, including where a photograph/copy is sufficient).<Ref n={2} />{' '}
              If you receive a formal section 49 notice under RIPA, failing to comply can be an offence under section 53.<Ref n={3} /> <Ref n={4} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>When Can Police Take Your Phone?</h2>
            <p>
              Police powers depend on the context (for example, during searches). PACE includes a general power of seizure in certain situations, including where a constable has reasonable grounds to believe an item is evidence and it is necessary to seize it to prevent it being concealed, lost, altered or destroyed.<Ref n={1} />
            </p>

            <h2>Do You Have to Give Your PIN or Password?</h2>
            <h3>General Position</h3>
            <p>
              Do not guess. If police ask you to unlock your phone or disclose a password, get legal advice based on the exact power they are using.
            </p>

            <h3>The RIPA Exception</h3>
            <p>
              Under <strong>Section 49 of the Regulation of Investigatory Powers Act 2000 (RIPA)</strong>, 
              a notice can require disclosure of protected information in the circumstances set out in the Act.<Ref n={3} />{' '}
              Section 53 makes it an offence to knowingly fail to make the disclosure required by virtue of the giving of a section 49 notice.<Ref n={4} />
            </p>

            <h2>How Long Can Police Keep Your Phone?</h2>
            <p>
              PACE section 22 provides that seized property may be retained so long as is necessary in all the circumstances (subject to the provisions in that section).<Ref n={2} /> This can include retention for use as evidence at trial, forensic examination, or investigation in connection with an offence.<Ref n={2} />
            </p>

            <h2>Getting Your Phone Back</h2>
            <p>
              If police retain your phone, you can request its return once it is no longer needed. If there is a dispute about return of property in police possession, a court of summary jurisdiction may make orders under the Police (Property) Act 1897.<Ref n={5} />
            </p>

            <h2>Practical Advice</h2>
            <ul>
              <li><strong>Ask what power is being used:</strong> different powers have different rules.</li>
              <li><strong>Get legal advice:</strong> before disclosing passwords or unlocking a device.</li>
              <li><strong>Ask about RIPA:</strong> is there a formal section 49 notice?<Ref n={3} /></li>
              <li><strong>Document:</strong> Note when your phone was seized and by whom</li>
              <li><strong>Request return:</strong> Once the matter is concluded</li>
            </ul>
          </div>

          <LegalReferences sources={sources} />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Police can seize your phone on arrest</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You're not generally obliged to give your PIN/password</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>A RIPA Section 49 notice can make refusal an offence</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Phones can be kept for weeks or months</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Get legal advice before deciding on password disclosure</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police take my phone when I'm arrested?</h3>
                <p className="text-slate-700">Yes, police can seize your phone when you're arrested as part of a search incident to arrest. They can take it to search for evidence related to the offence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Do I have to give police my phone PIN or password?</h3>
                <p className="text-slate-700">Generally, you are not obliged to give police your PIN or password. However, under Section 49 RIPA, police with proper authority can require disclosure, and refusal can be a criminal offence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How long can police keep my phone?</h3>
                <p className="text-slate-700">Police can keep your phone for as long as necessary for the investigation. This could be weeks or months. If not charged, you may apply for its return.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police search my phone without a warrant?</h3>
                <p className="text-slate-700">If you're arrested, police can seize your phone without a warrant. To examine its contents, they may need authorisation under PACE. Phones are often examined after seizure using forensic tools.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I get my phone back if I'm released without charge?</h3>
                <p className="text-slate-700">If released without charge, you should be able to reclaim your phone. However, police may retain it if the investigation continues. A solicitor can help expedite return.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Phone Seized by Police?</h3>
            <p className="text-slate-300 mb-6">
              If police have taken your phone and you need advice on your rights or help getting it back, 
              I can assist. Free consultations available.
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
              <Link href="/police-custody-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Your Custody Rights →</span>
              </Link>
              <Link href="/arrested-what-to-do" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Arrested: What To Do →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Interview Rights →</span>
              </Link>
              <Link href="/released-under-investigation" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Released Under Investigation →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}


