import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'PACE Code C: Your Rights in Police Detention Explained',
  description: 'PACE Code C sets out your rights in police custody including legal advice, rest periods, meals and interviews. Understand what police must do and your protections.',
  alternates: {
    canonical: 'https://policestationagent.com/pace-code-c',
  },
};

export default function PaceCodeCPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is PACE Code C?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE Code C is a Code of Practice under the Police and Criminal Evidence Act 1984. It sets out the rules police must follow when detaining and questioning suspects, including rights to legal advice, rest, meals, and fair treatment in custody.',
        },
      },
      {
        '@type': 'Question',
        name: 'What rights does PACE Code C give me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE Code C gives you the right to: free legal advice, have someone informed of your arrest, see a copy of the Codes of Practice, regular meals and drinks, adequate rest periods, medical attention if needed, and an interpreter if required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can police break PACE Code C rules?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If police breach PACE Code C, evidence obtained may be excluded at trial. The breach should be noted on the custody record. Serious breaches can lead to complaints and disciplinary action. Your solicitor should challenge any breaches.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often must I be given rest in custody?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE Code C requires at least 8 hours rest in any 24-hour period, normally at night. Interviews should not continue beyond midnight. You should receive three meals a day and refreshments as reasonably required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a copy of PACE Code C?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you have a right to consult the Codes of Practice. The custody officer should make a copy available to you on request. Your solicitor will also be familiar with the Codes and can explain your rights.',
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
              <span>PACE Code C</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PACE Code C: Your Rights in Police Custody
            </h1>
            <p className="text-xl text-blue-100">
              The rules that protect you during detention and questioning
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> PACE Code C is a Code of Practice that sets out the rules police 
              must follow when you're in custody. It covers your rights to <strong>legal advice</strong>, 
              <strong>rest periods</strong>, <strong>meals</strong>, <strong>medical care</strong>, and 
              <strong>fair treatment</strong> during interviews. If police breach these rules, evidence may 
              be excluded from court.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Is PACE Code C?</h2>
            <p>
              PACE Code C is one of several Codes of Practice issued under the Police and Criminal Evidence 
              Act 1984 (PACE). It specifically deals with <strong>the detention, treatment and questioning 
              of persons by police officers</strong>.
            </p>
            <p>
              Every custody suite in England and Wales must operate in accordance with Code C. It sets 
              minimum standards for how you should be treated while in police detention and provides 
              important protections against abuse of power.
            </p>
            <p>
              As a duty solicitor attending police stations across Kent, I use PACE Code C daily to protect 
              my clients' rights. Understanding these rules helps you know what to expect and what to challenge.
            </p>

            <h2>Your Core Rights Under Code C</h2>
            
            <h3>1. Right to Free Legal Advice</h3>
            <p>
              You are entitled to free, independent legal advice at any time during your detention. This includes:
            </p>
            <ul>
              <li>A private consultation with a solicitor before interview</li>
              <li>A solicitor present during interview</li>
              <li>Further consultations as needed</li>
              <li>The duty solicitor if you don't have your own solicitor</li>
            </ul>
            <p>
              The custody officer must inform you of this right and record your decision. Delaying access 
              to a solicitor is only permitted in exceptional circumstances.
            </p>

            <h3>2. Right to Have Someone Informed</h3>
            <p>
              You have the right to have one person informed of your whereabouts. This can only be delayed 
              in specific circumstances (serious arrestable offences where it might lead to interference 
              with evidence or alerting other suspects).
            </p>

            <h3>3. Right to Consult the Codes of Practice</h3>
            <p>
              You can ask to see a copy of the Codes of Practice at any time. The custody officer should 
              make this available.
            </p>

            <h2>Conditions of Detention</h2>
            <p>PACE Code C sets minimum standards for your physical conditions in custody:</p>

            <h3>Rest Periods</h3>
            <ul>
              <li>At least 8 hours rest in any 24-hour period, normally at night</li>
              <li>Rest should be uninterrupted unless required for the investigation</li>
              <li>Interviews should not normally continue beyond midnight</li>
            </ul>

            <h3>Meals and Refreshments</h3>
            <ul>
              <li>Three meals a day at recognised mealtimes</li>
              <li>Refreshments (drinks) as reasonably required</li>
              <li>Dietary and religious requirements should be met</li>
            </ul>

            <h3>Cell Conditions</h3>
            <ul>
              <li>Cells must be adequately heated, cleaned and ventilated</li>
              <li>Access to toilet facilities</li>
              <li>Clean bedding if detained overnight</li>
              <li>Reasonable privacy during washing</li>
            </ul>

            <h3>Medical Care</h3>
            <ul>
              <li>Access to medical attention if you're unwell or injured</li>
              <li>Regular medication if required</li>
              <li>Healthcare professional assessment if needed</li>
            </ul>

            <h2>Interview Rules</h2>
            <p>Code C contains detailed rules about how interviews must be conducted:</p>
            <ul>
              <li><strong>Caution:</strong> You must be cautioned before questioning</li>
              <li><strong>Recording:</strong> Interviews must normally be recorded</li>
              <li><strong>Breaks:</strong> Short refreshment breaks every 2 hours, meal breaks at mealtimes</li>
              <li><strong>Oppression:</strong> Interviewing officers must not use oppressive techniques</li>
              <li><strong>Vulnerable persons:</strong> Additional protections apply (appropriate adult)</li>
            </ul>

            <h2>Special Categories</h2>
            <p>PACE Code C provides enhanced protections for:</p>
            <ul>
              <li><strong>Under 18s:</strong> Must have an appropriate adult present</li>
              <li><strong>Vulnerable adults:</strong> Mental health or learning difficulties require appropriate adult</li>
              <li><strong>Non-English speakers:</strong> Right to an interpreter</li>
              <li><strong>Hearing/speech impaired:</strong> Appropriate communication support</li>
            </ul>

            <h2>What Happens If Police Breach Code C?</h2>
            <p>
              PACE Code C breaches can have significant consequences:
            </p>
            <ul>
              <li><strong>Evidence exclusion:</strong> Courts can exclude evidence obtained in breach of Code C under Section 78 PACE</li>
              <li><strong>Complaints:</strong> You can complain to the IOPC (Independent Office for Police Conduct)</li>
              <li><strong>Custody record:</strong> Breaches should be noted on the custody record</li>
              <li><strong>Trial challenges:</strong> Defence can challenge evidence based on breaches</li>
            </ul>
            <p>
              In my experience, I have successfully had evidence excluded where police failed to provide 
              proper rest breaks or conducted interviews without proper safeguards.
            </p>

            <h2>Practical Tips</h2>
            <ol>
              <li><strong>Request a solicitor:</strong> This is your most important protection</li>
              <li><strong>Ask about your rights:</strong> The custody officer should explain them</li>
              <li><strong>Speak up:</strong> If conditions are unacceptable, tell your solicitor</li>
              <li><strong>Keep track of time:</strong> Know when you arrived and when breaks are due</li>
              <li><strong>Request meals:</strong> Don't miss designated mealtimes</li>
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>PACE Code C sets out the rules for your treatment in custody</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You have the right to free legal advice at any time</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Minimum 8 hours rest in 24 hours, three meals a day</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Special protections exist for young and vulnerable people</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Breaches can lead to evidence being excluded at trial</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is PACE Code C?</h3>
                <p className="text-slate-700">PACE Code C is a Code of Practice under PACE 1984. It sets out the rules police must follow when detaining and questioning suspects, including rights to legal advice, rest, meals, and fair treatment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What rights does PACE Code C give me?</h3>
                <p className="text-slate-700">PACE Code C gives you the right to: free legal advice, have someone informed, see the Codes of Practice, regular meals and drinks, adequate rest, medical attention, and an interpreter if required.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police break PACE Code C rules?</h3>
                <p className="text-slate-700">If police breach Code C, evidence obtained may be excluded at trial. Breaches should be noted on the custody record. Serious breaches can lead to complaints and disciplinary action.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How often must I be given rest in custody?</h3>
                <p className="text-slate-700">PACE Code C requires at least 8 hours rest in any 24-hour period, normally at night. Interviews should not continue beyond midnight. You should receive three meals a day.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I see a copy of PACE Code C?</h3>
                <p className="text-slate-700">Yes, you have a right to consult the Codes of Practice. The custody officer should make a copy available on request. Your solicitor will also be familiar with the Codes.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Know Your Rights in Custody</h3>
            <p className="text-slate-300 mb-6">
              If you're in police custody, make sure your rights under PACE Code C are respected. 
              I can provide immediate assistance at any Kent police station.
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
              <Link href="/custody-time-limits" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Custody Time Limits →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Interview Rights →</span>
              </Link>
              <Link href="/appropriate-adult" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Appropriate Adults →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
