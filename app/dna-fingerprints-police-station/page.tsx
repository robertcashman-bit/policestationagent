import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'DNA & Fingerprints at Police Station: Your Rights UK',
  description:
    'Fingerprints and samples at the police station: what PACE says about fingerprints, intimate samples, and non-intimate samples (England & Wales). Sources included.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/dna-fingerprints-police-station`,
  },
};

export default function DNAFingerprintsPolicePage() {
  const sources: LegalSource[] = [
    {
      id: 'pace-s61',
      label: 'Police and Criminal Evidence Act 1984 (PACE) s.61 (fingerprinting)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/61',
    },
    {
      id: 'pace-s63',
      label: 'PACE s.63 (non-intimate samples)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/63',
    },
    {
      id: 'pace-s62',
      label: 'PACE s.62 (intimate samples)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/62',
    },
    {
      id: 'pace-s65',
      label: 'PACE s.65 (definitions incl. “appropriate consent”, “intimate sample”, “non-intimate sample”)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/65',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can police take my DNA when I\'m arrested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE section 63 sets out rules on non-intimate samples (which can include a mouth swab in many cases) and when they may be taken with or without “appropriate consent”.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I refuse to give fingerprints at the police station?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE section 61 sets out when fingerprints may be taken without “appropriate consent” in specified circumstances.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long are DNA and fingerprints kept on record?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Retention/deletion depends on the legal basis and your circumstances. Take advice on your specific situation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get my DNA deleted from the police database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Whether deletion is possible depends on the legal basis for retention and your circumstances. Take advice on your case.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an intimate sample?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE defines “intimate sample” and section 62 sets out key safeguards (including authorisation and consent requirements).',
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
              <span>DNA & Fingerprints</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              DNA & Fingerprints at the Police Station
            </h1>
            <p className="text-xl text-blue-100">
              Your rights regarding biometric samples and data retention
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> PACE sets out rules for taking fingerprints (s.61) and samples (including non‑intimate samples under s.63 and intimate samples under s.62).<Ref n={1} /> <Ref n={2} /> <Ref n={3} />{' '}
              Key terms (including “appropriate consent”, “intimate sample” and “non‑intimate sample”) are defined in section 65.<Ref n={4} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Samples Can Police Take?</h2>
            <p>
              There are different categories of samples in law, with different rules for each (fingerprints, non‑intimate samples, and intimate samples).<Ref n={1} /> <Ref n={2} /> <Ref n={3} /> <Ref n={4} />
            </p>

            <h3>Fingerprints</h3>
            <p>
              PACE section 61 governs fingerprinting and includes cases where fingerprints may be taken without “appropriate consent” (with consent rules also addressed in the section).<Ref n={1} />
            </p>

            <h3>Non-Intimate Samples</h3>
            <ul>
              <li><strong>DNA mouth swab</strong> – rubbed inside cheek</li>
              <li><strong>Hair samples (excluding pubic hair)</strong> – including roots</li>
              <li><strong>Swabs from external body surfaces</strong> – not body orifices</li>
              <li><strong>Footprints</strong> – less common but possible</li>
            </ul>
            <p>
              PACE section 63 governs non‑intimate samples and includes circumstances where they may be taken without “appropriate consent”.<Ref n={2} /> Terms (including “non‑intimate sample” and “appropriate consent”) are addressed in section 65.<Ref n={4} />
            </p>

            <h3>Intimate Samples</h3>
            <ul>
              <li><strong>Blood</strong></li>
              <li><strong>Semen</strong></li>
              <li><strong>Urine</strong></li>
              <li><strong>Pubic hair</strong></li>
              <li><strong>Swabs from body orifices</strong> (except mouth)</li>
              <li><strong>Dental impressions</strong></li>
            </ul>
            <p>
              PACE section 62 provides that an intimate sample may be taken from a person in police detention only if authorisation and “appropriate consent” requirements are met (subject to the section).<Ref n={3} /> Definitions are in section 65.<Ref n={4} />
            </p>

            <h2>Your Rights When Samples Are Taken</h2>
            <ul>
              <li><strong>Different rules apply</strong> depending on whether it is fingerprints, an intimate sample, or a non‑intimate sample.<Ref n={1} /> <Ref n={2} /> <Ref n={3} /> <Ref n={4} /></li>
              <li><strong>Intimate samples</strong> have additional statutory safeguards (including consent/authorisation requirements).<Ref n={3} /></li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Police can take DNA and fingerprints when you're arrested</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You cannot refuse non-intimate samples</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Intimate samples require your written consent</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>If convicted, records are kept indefinitely</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>If not convicted, you may apply for deletion</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police take my DNA when I'm arrested?</h3>
                <p className="text-slate-700">PACE section 63 sets out rules on non‑intimate samples and when they may be taken with or without “appropriate consent”.<Ref n={2} /> <Ref n={4} /></p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I refuse to give fingerprints at the police station?</h3>
                <p className="text-slate-700">PACE section 61 sets out when fingerprints may be taken without “appropriate consent”.<Ref n={1} /></p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How long are DNA and fingerprints kept on record?</h3>
                <p className="text-slate-700">Retention/deletion depends on the legal basis and your circumstances. Take advice on your specific situation.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I get my DNA deleted from the police database?</h3>
                <p className="text-slate-700">Whether deletion is possible depends on the legal basis for retention and your circumstances. Take advice on your case.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is an intimate sample?</h3>
                <p className="text-slate-700">PACE defines “intimate sample” and section 62 sets out key safeguards (including consent/authorisation requirements).<Ref n={3} /> <Ref n={4} /></p>
              </div>
            </div>
          </div>

          <LegalReferences sources={sources} />

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Questions About DNA & Fingerprints?</h3>
            <p className="text-slate-300 mb-6">
              If you have concerns about samples taken at the police station or need help applying for 
              deletion, I can advise.
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
              <Link href="/pace-code-c" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">PACE Code C →</span>
              </Link>
              <Link href="/arrested-what-to-do" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Arrested: What To Do →</span>
              </Link>
              <Link href="/can-police-take-my-phone" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Phone Seizure Rights →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}


