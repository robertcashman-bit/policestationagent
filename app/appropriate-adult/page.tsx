import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Appropriate Adult: Who They Are & When You Need One UK',
  description: 'An appropriate adult supports vulnerable people at police stations. Learn who can be one, when they\'re needed, and what they do during custody and interviews.',
  alternates: {
    canonical: 'https://policestationagent.com/appropriate-adult',
  },
};

export default function AppropriateAdultPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an appropriate adult?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An appropriate adult is a person who attends the police station to support a vulnerable detainee (under 18 or mentally vulnerable adult). They ensure the person understands proceedings, their rights are protected, and procedures are followed fairly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who can be an appropriate adult?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For young people: parent, guardian, social worker, or other responsible adult. For vulnerable adults: relative, trained volunteer, or social worker. The person must not be a police officer, solicitor acting for the detainee, or someone involved in the alleged offence.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is an appropriate adult required?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An appropriate adult is required for all under 18s and adults who appear to have mental health conditions, learning disabilities, or are otherwise vulnerable. They must be present for interviews, searches, charging, and other key procedures.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does an appropriate adult do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The appropriate adult\'s role is to: support and reassure the detainee, ensure they understand their rights, observe that procedures are fair, intervene if treatment is improper, and assist with communication. They are not there to act as a legal adviser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a parent refuse to be an appropriate adult?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, a parent can decline to act as appropriate adult if they feel unable to fulfil the role. In such cases, police will arrange an alternative, usually a social worker or trained volunteer from the appropriate adult service.',
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
              <span>Appropriate Adult</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Appropriate Adult: Who They Are & What They Do
            </h1>
            <p className="text-xl text-blue-100">
              Essential support for vulnerable people in police custody
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> An appropriate adult is a person who attends the police station 
              to support a <strong>young person (under 18)</strong> or <strong>vulnerable adult</strong>. 
              They ensure the person understands their rights, observe that procedures are fair, and provide 
              reassurance. Police <strong>cannot interview</strong> a vulnerable person without an appropriate 
              adult present.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Is an Appropriate Adult?</h2>
            <p>
              Under PACE Code C, certain detainees are entitled to have an "appropriate adult" present 
              during their time in police custody. This safeguard exists to protect vulnerable people who 
              may not fully understand the procedures or their rights.
            </p>
            <p>
              The appropriate adult is there to support the detainee – not to replace a solicitor or to 
              assist the police. Their role is separate from and in addition to legal representation.
            </p>

            <h2>Who Needs an Appropriate Adult?</h2>
            <p>An appropriate adult is required for:</p>
            <ul>
              <li><strong>All persons under 18</strong> – regardless of maturity or understanding</li>
              <li><strong>Adults who appear to have mental health conditions</strong></li>
              <li><strong>Adults with learning disabilities or difficulties</strong></li>
              <li><strong>Adults who appear unable to understand the process</strong></li>
            </ul>
            <p>
              The custody officer must make an assessment of whether an appropriate adult is needed. 
              If there's any doubt, one should be called.
            </p>

            <h2>Who Can Be an Appropriate Adult?</h2>
            
            <h3>For Young People (Under 18)</h3>
            <ul>
              <li>Parent or guardian (first choice)</li>
              <li>Social worker</li>
              <li>Other responsible adult aged 18 or over</li>
            </ul>

            <h3>For Vulnerable Adults</h3>
            <ul>
              <li>Relative, guardian, or carer</li>
              <li>Trained appropriate adult volunteer</li>
              <li>Social worker or mental health professional</li>
            </ul>

            <h3>Who Cannot Be an Appropriate Adult</h3>
            <ul>
              <li>Police officers or police employees</li>
              <li>The solicitor acting for the detainee</li>
              <li>Anyone involved in the alleged offence</li>
              <li>Victims or witnesses</li>
              <li>Anyone the detainee doesn't want</li>
            </ul>

            <h2>What Does an Appropriate Adult Do?</h2>
            <p>The appropriate adult's responsibilities include:</p>
            <ul>
              <li><strong>Support:</strong> Providing reassurance and emotional support</li>
              <li><strong>Communication:</strong> Helping the detainee understand what's happening</li>
              <li><strong>Rights:</strong> Ensuring the detainee knows their rights</li>
              <li><strong>Observation:</strong> Watching that interviews and procedures are fair</li>
              <li><strong>Intervention:</strong> Speaking up if treatment is improper or oppressive</li>
              <li><strong>Assistance:</strong> Helping with communication if needed</li>
            </ul>

            <h2>When Must an Appropriate Adult Be Present?</h2>
            <p>An appropriate adult must attend for:</p>
            <ul>
              <li>Police interviews</li>
              <li>Reading of rights and procedures</li>
              <li>Charging or cautioning</li>
              <li>Intimate searches</li>
              <li>Strip searches</li>
              <li>Taking of samples (DNA, fingerprints)</li>
              <li>Signing of important documents</li>
            </ul>

            <h2>Appropriate Adult vs Solicitor</h2>
            <p>
              The roles are different and complementary:
            </p>
            <table className="w-full border-collapse my-6">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3 text-left">Appropriate Adult</th>
                  <th className="border p-3 text-left">Solicitor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Provides support and reassurance</td>
                  <td className="border p-3">Provides legal advice</td>
                </tr>
                <tr>
                  <td className="border p-3">Ensures understanding</td>
                  <td className="border p-3">Advises on interview strategy</td>
                </tr>
                <tr>
                  <td className="border p-3">Observes fairness</td>
                  <td className="border p-3">Challenges improper questions</td>
                </tr>
                <tr>
                  <td className="border p-3">Cannot give legal advice</td>
                  <td className="border p-3">Cannot act as appropriate adult</td>
                </tr>
              </tbody>
            </table>
            <p>
              A vulnerable person should have <strong>both</strong> an appropriate adult and a solicitor.
            </p>

            <h2>What If No Appropriate Adult Is Available?</h2>
            <p>
              If no suitable appropriate adult is immediately available, police must:
            </p>
            <ul>
              <li>Wait until one can be found (for interviews)</li>
              <li>Contact local authority emergency services</li>
              <li>Use the appropriate adult volunteer scheme</li>
              <li>Not proceed with interviews until one attends</li>
            </ul>

            <h2>Tips for Acting as Appropriate Adult</h2>
            <ol>
              <li><strong>Listen:</strong> Let the detainee talk and express concerns</li>
              <li><strong>Don't advise:</strong> Leave legal advice to the solicitor</li>
              <li><strong>Take notes:</strong> Record what happens and when</li>
              <li><strong>Speak up:</strong> If something seems wrong, say so</li>
              <li><strong>Stay calm:</strong> Your composure helps the detainee</li>
              <li><strong>Ask for breaks:</strong> If the detainee is struggling</li>
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Under 18s and vulnerable adults must have an appropriate adult</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Usually a parent, guardian, social worker, or trained volunteer</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Police cannot interview without an appropriate adult present</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>The role is support, not legal advice</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>A solicitor should also be requested</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is an appropriate adult?</h3>
                <p className="text-slate-700">An appropriate adult is a person who attends the police station to support a vulnerable detainee. They ensure the person understands proceedings and their rights are protected.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Who can be an appropriate adult?</h3>
                <p className="text-slate-700">For young people: parent, guardian, social worker, or responsible adult. For vulnerable adults: relative, trained volunteer, or social worker. Not police officers or the detainee's solicitor.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">When is an appropriate adult required?</h3>
                <p className="text-slate-700">For all under 18s and adults who appear to have mental health conditions, learning disabilities, or are otherwise vulnerable. Required for interviews, searches, charging, and other key procedures.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What does an appropriate adult do?</h3>
                <p className="text-slate-700">They support and reassure the detainee, ensure they understand their rights, observe that procedures are fair, intervene if treatment is improper, and assist with communication.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can a parent refuse to be an appropriate adult?</h3>
                <p className="text-slate-700">Yes, a parent can decline if they feel unable to fulfil the role. Police will then arrange an alternative, usually a social worker or trained volunteer.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Need Legal Support at the Police Station?</h3>
            <p className="text-slate-300 mb-6">
              If you're acting as appropriate adult or need to support a vulnerable family member, 
              I can provide legal representation to work alongside you.
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
              <Link href="/youth-custody-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Youth Custody Rights →</span>
              </Link>
              <Link href="/vulnerable-adults-in-custody" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Vulnerable Adults in Custody →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Interview Rights →</span>
              </Link>
              <Link href="/pace-code-c" className="p-4 bg-white rounded-lg border hover:border-blue-300">
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
