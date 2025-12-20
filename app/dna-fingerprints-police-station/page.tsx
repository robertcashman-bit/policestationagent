import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'DNA & Fingerprints at Police Station: Your Rights UK',
  description: 'Police can take DNA and fingerprints when you\'re arrested. Learn when they can take samples, how long they\'re kept, and your rights to have them deleted.',
  alternates: {
    canonical: 'https://policestationagent.com/dna-fingerprints-police-station',
  },
};

export default function DNAFingerprintsPolicePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can police take my DNA when I\'m arrested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, police can take a DNA sample when you\'re arrested for a recordable offence. This is usually a mouth swab. You cannot refuse, and reasonable force can be used if necessary.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I refuse to give fingerprints at the police station?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, you cannot lawfully refuse to provide fingerprints when arrested for a recordable offence. Police have the power to take them without consent and can use reasonable force if necessary.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long are DNA and fingerprints kept on record?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If convicted, DNA and fingerprints are kept indefinitely. If not convicted, retention depends on the offence: serious offences may be retained for 3 years, while minor offences should be deleted. You may be able to apply for early deletion.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get my DNA deleted from the police database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you were not convicted, you may apply to have your DNA and fingerprints deleted. For minor offences with no charge or acquittal, deletion should be automatic. For serious offences, you may need to apply through the Chief Constable.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an intimate sample?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An intimate sample is a sample of blood, semen, urine, pubic hair, or a swab from a body orifice other than the mouth. These require written consent and must be taken by a medical professional. You can refuse an intimate sample.',
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
              <strong>Quick Answer:</strong> When arrested for a recordable offence, police can take your 
              <strong> DNA</strong> (mouth swab) and <strong>fingerprints</strong> without your consent. 
              If convicted, these are kept indefinitely. If not convicted, retention rules vary – you may 
              be able to apply for deletion.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Samples Can Police Take?</h2>
            <p>
              There are different categories of samples police can take, with different rules for each:
            </p>
            <p>
              In my experience representing clients at Kent custody suites, confusion about “what you must give” versus
              “what you can refuse” is common. Knowing the difference between non‑intimate and intimate samples helps you
              make informed decisions and avoid unnecessary complications.
            </p>

            <h3>Non-Intimate Samples (No Consent Required)</h3>
            <ul>
              <li><strong>Fingerprints</strong> – electronic scan or ink impression</li>
              <li><strong>DNA mouth swab</strong> – rubbed inside cheek</li>
              <li><strong>Hair samples (excluding pubic hair)</strong> – including roots</li>
              <li><strong>Swabs from external body surfaces</strong> – not body orifices</li>
              <li><strong>Footprints</strong> – less common but possible</li>
            </ul>
            <p>
              These can be taken without your consent when you're arrested for a recordable offence. 
              Reasonable force may be used if necessary.
            </p>

            <h3>Intimate Samples (Consent Required)</h3>
            <ul>
              <li><strong>Blood</strong></li>
              <li><strong>Semen</strong></li>
              <li><strong>Urine</strong></li>
              <li><strong>Pubic hair</strong></li>
              <li><strong>Swabs from body orifices</strong> (except mouth)</li>
              <li><strong>Dental impressions</strong></li>
            </ul>
            <p>
              Intimate samples require your written consent and must be taken by a medical professional. 
              You can refuse – but the court may draw adverse inferences from your refusal.
            </p>

            <h2>When Can Police Take Samples?</h2>
            <p>
              Police can take non-intimate samples when:
            </p>
            <ul>
              <li>You are arrested for a recordable offence</li>
              <li>You are charged with a recordable offence</li>
              <li>You are informed you will be reported for a recordable offence</li>
              <li>You are convicted of a recordable offence</li>
            </ul>
            <p>
              A "recordable offence" includes most criminal offences that can result in imprisonment, 
              plus some other specified offences.
            </p>

            <h2>How Long Are Samples Kept?</h2>
            
            <h3>If Convicted</h3>
            <p>
              DNA and fingerprints are kept <strong>indefinitely</strong> on the National DNA Database 
              and fingerprint database.
            </p>

            <h3>If Not Convicted</h3>
            <p>
              Retention depends on the nature of the offence and your age:
            </p>
            <table className="w-full border-collapse my-6">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3 text-left">Situation</th>
                  <th className="border p-3 text-left">Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Charged but not convicted (qualifying offence)</td>
                  <td className="border p-3">3 years (can be extended)</td>
                </tr>
                <tr>
                  <td className="border p-3">Arrested but not charged (qualifying offence)</td>
                  <td className="border p-3">3 years (if approved by Commissioner)</td>
                </tr>
                <tr>
                  <td className="border p-3">Minor offence, not convicted</td>
                  <td className="border p-3">Must be deleted</td>
                </tr>
                <tr>
                  <td className="border p-3">Under 18, first minor offence</td>
                  <td className="border p-3">Must be deleted</td>
                </tr>
              </tbody>
            </table>
            <p>
              "Qualifying offences" include serious violent, sexual, and terrorism offences.
            </p>

            <h2>Getting Your DNA Deleted</h2>
            <p>
              If you were not convicted, you may be able to have your DNA and fingerprints deleted:
            </p>
            <ol>
              <li><strong>Automatic deletion:</strong> For minor offences with no charge or acquittal, 
              samples should be automatically deleted</li>
              <li><strong>Application for early deletion:</strong> Apply to the Chief Constable of the 
              force that took the sample</li>
              <li><strong>Review:</strong> If refused, you can apply for review to the Biometrics Commissioner</li>
            </ol>

            <h2>Your Rights When Samples Are Taken</h2>
            <ul>
              <li>You should be told why the sample is being taken</li>
              <li>The process should be recorded on your custody record</li>
              <li>For intimate samples, you must give written consent</li>
              <li>An appropriate adult should be present for under 18s</li>
              <li>The sample should be taken by a trained officer (or medical professional for intimate samples)</li>
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
                <p className="text-slate-700">Yes, police can take a DNA sample when you're arrested for a recordable offence. This is usually a mouth swab. You cannot refuse, and reasonable force can be used.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I refuse to give fingerprints at the police station?</h3>
                <p className="text-slate-700">No, you cannot lawfully refuse when arrested for a recordable offence. Police can take them without consent and can use reasonable force if necessary.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How long are DNA and fingerprints kept on record?</h3>
                <p className="text-slate-700">If convicted, they are kept indefinitely. If not convicted, retention depends on the offence. You may be able to apply for early deletion.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I get my DNA deleted from the police database?</h3>
                <p className="text-slate-700">If you were not convicted, you may apply to have your DNA and fingerprints deleted. For minor offences, deletion should be automatic. For serious offences, you may need to apply.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is an intimate sample?</h3>
                <p className="text-slate-700">An intimate sample is blood, semen, urine, pubic hair, or a swab from a body orifice. These require written consent and must be taken by a medical professional.</p>
              </div>
            </div>
          </div>

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
