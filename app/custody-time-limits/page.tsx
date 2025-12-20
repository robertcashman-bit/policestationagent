import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'How Long Can Police Hold You? UK Custody Time Limits Explained',
  description: 'Police can hold you for 24 hours without charge, extendable to 36 or 96 hours for serious offences. Learn your PACE rights and what happens at each stage.',
  alternates: {
    canonical: 'https://policestationagent.com/custody-time-limits',
  },
};

export default function CustodyTimeLimitsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long can police hold me without charge in the UK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Police can hold you for up to 24 hours without charge. For serious offences, a senior officer can extend this to 36 hours. For very serious crimes like murder or terrorism, a magistrate can authorise detention up to 96 hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens after 24 hours in police custody?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After 24 hours, the police must either charge you, release you, or apply for an extension. Extensions require authorisation from a superintendent (up to 36 hours) or a magistrate (up to 96 hours) and are only granted for serious offences.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can police extend my detention beyond 24 hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but only for serious arrestable offences. A superintendent can authorise up to 36 hours. Beyond that, police must apply to a magistrates\' court for a warrant of further detention, which can extend custody to 96 hours maximum.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often must detention be reviewed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under PACE, your detention must be reviewed by an inspector after 6 hours, then every 9 hours thereafter. The review officer must be satisfied that your continued detention is necessary.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are my rights if police want to extend my detention?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You have the right to legal representation at any extension hearing. Your solicitor can make representations on your behalf. You should be told the reasons for the extension and have the opportunity to challenge it.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <JsonLd data={faqSchema} />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/police-custody-rights" className="hover:text-white">Custody Rights</Link>
              <span className="mx-2">›</span>
              <span>Custody Time Limits</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Long Can Police Hold You in Custody?
            </h1>
            <p className="text-xl text-blue-100">
              UK custody time limits explained: 24, 36, and 96-hour rules under PACE 1984
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Direct Answer Box - Snippet Optimised */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> Police can hold you for up to <strong>24 hours</strong> without charge. 
              For serious offences, this can be extended to <strong>36 hours</strong> by a senior officer, 
              or up to <strong>96 hours</strong> with a magistrate's authorisation. These limits are set by the 
              Police and Criminal Evidence Act 1984 (PACE).
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Understanding Custody Time Limits</h2>
            <p>
              When you're arrested and taken to a police station, the clock starts ticking. The Police and Criminal 
              Evidence Act 1984 (PACE) sets strict time limits on how long police can detain you before they must 
              either charge you or release you.
            </p>
            <p>
              In my experience representing clients across Kent custody suites, I've seen these time limits applied 
              rigorously. Understanding them is crucial for anyone in police detention.
            </p>

            <h2>The 24-Hour Rule</h2>
            <p>
              For most offences, police have <strong>24 hours from when you arrive at the custody suite</strong> to:
            </p>
            <ul>
              <li>Gather evidence and investigate</li>
              <li>Interview you (with a solicitor present if you request one)</li>
              <li>Make a decision on whether to charge, release, or apply for an extension</li>
            </ul>
            <p>
              The "relevant time" usually starts when you arrive at the police station, not when you were arrested 
              on the street. This is an important distinction that can affect your detention period.
            </p>

            <h2>Extensions to 36 Hours</h2>
            <p>
              If the offence is "serious" (previously called "serious arrestable offences"), a superintendent 
              or officer of higher rank can authorise detention for up to 36 hours. This requires:
            </p>
            <ul>
              <li>The investigation to be proceeding diligently and expeditiously</li>
              <li>Your detention to be necessary to secure or preserve evidence, or obtain evidence by questioning</li>
              <li>The offence to be an indictable offence (one that can be tried in the Crown Court)</li>
            </ul>
            <p>
              In practice, custody sergeants and inspectors take these extensions seriously. I have successfully 
              challenged extensions where the police have not demonstrated genuine necessity.
            </p>

            <h2>The 96-Hour Maximum</h2>
            <p>
              For the most serious offences—such as murder, terrorism, or serious drug trafficking—police can 
              apply to a magistrates' court for a <strong>warrant of further detention</strong>. This can extend 
              your custody up to a maximum of 96 hours (4 days).
            </p>
            <p>
              These hearings are formal court proceedings. You have the right to:
            </p>
            <ul>
              <li>Be represented by a solicitor</li>
              <li>Challenge the application</li>
              <li>Have the magistrates consider whether continued detention is justified</li>
            </ul>

            <h2>What the Law Says: PACE 1984</h2>
            <p>
              The Police and Criminal Evidence Act 1984 (PACE), specifically <strong>Sections 41-44</strong>, 
              governs custody time limits:
            </p>
            <ul>
              <li><strong>Section 41:</strong> Sets the basic 24-hour limit</li>
              <li><strong>Section 42:</strong> Allows superintendent to authorise up to 36 hours</li>
              <li><strong>Section 43:</strong> Provides for warrant of further detention (up to 96 hours)</li>
              <li><strong>Section 44:</strong> Allows for extension of warrant</li>
            </ul>
            <p>
              PACE Code C provides detailed guidance on how these provisions must be applied in practice.
            </p>

            <h2>Detention Reviews</h2>
            <p>
              Your detention must be regularly reviewed by a custody officer to ensure it remains necessary:
            </p>
            <ul>
              <li><strong>First review:</strong> 6 hours after detention was first authorised</li>
              <li><strong>Subsequent reviews:</strong> Every 9 hours thereafter</li>
            </ul>
            <p>
              The review officer must be satisfied that your continued detention is necessary for one of the 
              statutory purposes—typically to secure, preserve or obtain evidence.
            </p>

            <h2>In Practice: What Actually Happens</h2>
            <p>
              In my experience at Kent police stations, most detentions are resolved well within 24 hours. 
              Extensions beyond this are relatively uncommon and are usually reserved for:
            </p>
            <ul>
              <li>Complex investigations involving multiple suspects</li>
              <li>Cases requiring forensic examination results</li>
              <li>Serious offences where extensive interviewing is necessary</li>
              <li>Cases where the suspect has been uncooperative or interviews have been delayed</li>
            </ul>

            <h2>What to Do If You're Facing Extended Detention</h2>
            <p>
              If police are seeking to extend your detention beyond 24 hours:
            </p>
            <ol>
              <li><strong>Request a solicitor immediately</strong> – Legal advice is free and confidential</li>
              <li><strong>Understand the reasons</strong> – You should be told why an extension is being sought</li>
              <li><strong>Your solicitor can make representations</strong> – We can argue against extensions that are not justified</li>
              <li><strong>Keep track of time</strong> – Know when your 24 hours expires</li>
            </ol>
          </div>

          {/* Key Takeaways */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Police can hold you for 24 hours without charge for most offences</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Extensions to 36 hours require superintendent authorisation</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>96 hours is the absolute maximum, requiring court approval</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Your detention must be reviewed every 6-9 hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You have the right to free legal advice at every stage</span>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How long can police hold me without charge in the UK?</h3>
                <p className="text-slate-700">Police can hold you for up to 24 hours without charge. For serious offences, a senior officer can extend this to 36 hours. For very serious crimes like murder or terrorism, a magistrate can authorise detention up to 96 hours.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What happens after 24 hours in police custody?</h3>
                <p className="text-slate-700">After 24 hours, the police must either charge you, release you, or apply for an extension. Extensions require authorisation from a superintendent (up to 36 hours) or a magistrate (up to 96 hours) and are only granted for serious offences.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police extend my detention beyond 24 hours?</h3>
                <p className="text-slate-700">Yes, but only for serious arrestable offences. A superintendent can authorise up to 36 hours. Beyond that, police must apply to a magistrates' court for a warrant of further detention, which can extend custody to 96 hours maximum.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How often must detention be reviewed?</h3>
                <p className="text-slate-700">Under PACE, your detention must be reviewed by an inspector after 6 hours, then every 9 hours thereafter. The review officer must be satisfied that your continued detention is necessary.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What are my rights if police want to extend my detention?</h3>
                <p className="text-slate-700">You have the right to legal representation at any extension hearing. Your solicitor can make representations on your behalf. You should be told the reasons for the extension and have the opportunity to challenge it.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Need Help with Police Custody?</h3>
            <p className="text-slate-300 mb-6">
              If you or someone you know is being held in police custody, you have the right to free legal advice. 
              I provide 24/7 police station representation across all Kent custody suites.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:01732247427" className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg">
                Call 01732 247427
              </a>
              <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg">
                Contact Online
              </Link>
            </div>
            <p className="text-sm text-slate-400 mt-4">
              Robert Cashman – Duty Solicitor with Higher Rights of Audience (Criminal)
            </p>
          </div>

          {/* Related Links */}
          <div className="border-t pt-8 mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/police-custody-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                <span className="font-medium text-blue-600">Your Rights in Police Custody →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                <span className="font-medium text-blue-600">Police Interview Rights →</span>
              </Link>
              <Link href="/released-under-investigation" className="p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
                <span className="font-medium text-blue-600">Released Under Investigation →</span>
              </Link>
              <Link href="/services/police-station-representation" className="p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors">
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
