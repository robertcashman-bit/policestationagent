import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'How Long Can Police Hold You? UK Custody Time Limits Explained',
  description:
    'Under PACE 1984, police detention without charge is generally limited to 24 hours, extendable to 36 hours by a superintendent and (in some cases) up to 96 hours with a magistrates’ court warrant. Learn how “relevant time” is calculated and how reviews work.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/custody-time-limits`,
  },
};

export default function CustodyTimeLimitsPage() {
  const sources: LegalSource[] = [
    {
      id: 'pace-s40',
      label: 'Police and Criminal Evidence Act 1984 (PACE) s.40 (reviews of detention; 6-hour / 9-hour review timetable)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/40',
    },
    {
      id: 'pace-s41',
      label: 'PACE s.41 (24-hour limit; “relevant time” definition)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/41',
    },
    {
      id: 'pace-s42',
      label: 'PACE s.42 (superintendent authorisation up to 36 hours in indictable cases)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/42',
    },
    {
      id: 'pace-s43',
      label: 'PACE s.43 (warrants of further detention by magistrates’ court)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/43',
    },
    {
      id: 'pace-s44',
      label: 'PACE s.44 (extensions of warrants; maximum 96 hours after relevant time)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/44',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long can police hold me without charge in the UK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under PACE, police detention without charge is generally limited to 24 hours (calculated from “relevant time”). In indictable cases, a superintendent can authorise detention up to 36 hours. With a magistrates’ court warrant, detention can be extended up to a maximum of 96 hours after relevant time.',
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
          text: 'Yes. Under PACE, a superintendent can authorise detention up to 36 hours in indictable cases if the statutory conditions are met. Beyond that, police must apply to a magistrates’ court for a warrant of further detention; extensions are subject to statutory limits, including the 96-hour maximum after relevant time.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often must detention be reviewed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PACE provides that the first review must be not later than six hours after detention was first authorised, the second not later than nine hours after the first, and subsequent reviews at intervals of not more than nine hours.',
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
              Police and Criminal Evidence Act 1984 (PACE).<Ref n={2} /> <Ref n={3} /> <Ref n={5} />
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
              Note: some situations can involve different detention rules under other legislation. This page focuses on the PACE detention framework.<Ref n={2} />
            </p>

            <h2>The 24-Hour Rule</h2>
            <p>
              Under PACE, a person generally must not be kept in police detention for more than 24 hours without being charged (subject to PACE sections 42 and 43).<Ref n={2} />{' '}
              The 24-hour period is calculated from “relevant time” as defined in PACE section 41(2).<Ref n={2} />
            </p>
            <ul>
              <li>Gather evidence and investigate</li>
              <li>Interview you (with a solicitor present if you request one)</li>
              <li>Make a decision on whether to charge, release, or apply for an extension</li>
            </ul>
            <p>
              In many cases “relevant time” is linked to arrival at a police station, but PACE section 41(2) sets out multiple scenarios and (in some cases) uses the earlier of arrival time and “24 hours after arrest”.<Ref n={2} />
            </p>

            <h2>Extensions to 36 Hours</h2>
            <p>
              A superintendent (or above) responsible for the station can authorise detention up to 36 hours after relevant time if the statutory conditions in PACE section 42 are met (including necessity and that the offence is indictable).<Ref n={3} /> This requires:
            </p>
            <ul>
              <li>The investigation to be proceeding diligently and expeditiously</li>
              <li>Your detention to be necessary to secure or preserve evidence, or obtain evidence by questioning</li>
              <li>The offence to be an indictable offence (PACE s.42).<Ref n={3} /></li>
            </ul>

            <h2>The 96-Hour Maximum</h2>
            <p>
              Police can apply to a magistrates’ court for a <strong>warrant of further detention</strong> under PACE section 43 (subject to statutory requirements).<Ref n={4} />{' '}
              Under PACE section 44, detention under warrants (and extensions) is capped so that it cannot end later than 96 hours after relevant time.<Ref n={5} />
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
              <li><strong>Section 41:</strong> basic 24-hour limit and “relevant time” definition<Ref n={2} /></li>
              <li><strong>Section 42:</strong> superintendent authorisation up to 36 hours (in indictable cases, if conditions met)<Ref n={3} /></li>
              <li><strong>Section 43:</strong> warrants of further detention by magistrates’ court<Ref n={4} /></li>
              <li><strong>Section 44:</strong> extensions of warrants and the 96-hour cap after relevant time<Ref n={5} /></li>
            </ul>
            <p>
              Detention reviews are addressed in PACE section 40 (including the first 6-hour review and subsequent 9-hour reviews).<Ref n={1} />
            </p>

            <h2>Detention Reviews</h2>
            <p>
              Your detention must be regularly reviewed by a custody officer to ensure it remains necessary:
            </p>
            <ul>
              <li><strong>First review:</strong> not later than 6 hours after detention was first authorised (PACE s.40(3))<Ref n={1} /></li>
              <li><strong>Second review:</strong> not later than 9 hours after the first (PACE s.40(3))<Ref n={1} /></li>
              <li><strong>Subsequent reviews:</strong> intervals of not more than 9 hours (PACE s.40(3))<Ref n={1} /></li>
            </ul>
            <p>
              The review officer must be satisfied that your continued detention is necessary for one of the 
              statutory purposes—typically to secure, preserve or obtain evidence.
            </p>

            <h2>What to Do If You're Facing Extended Detention</h2>
            <p>
              If police are seeking to extend your detention beyond 24 hours:
            </p>
            <ol>
              <li><strong>Request a solicitor immediately</strong> – Legal advice is free and confidential</li>
              <li><strong>Understand the reasons</strong> – You should be told why an extension is being sought</li>
              <li><strong>Your solicitor can make representations</strong> – particularly if the statutory conditions are not met</li>
              <li><strong>Keep track of time</strong> – the key time limits are tied to “relevant time” under PACE s.41</li>
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
                <p className="text-slate-700">Under PACE, police detention without charge is generally limited to 24 hours (from “relevant time”). A superintendent can authorise detention up to 36 hours in indictable cases if conditions are met, and a magistrates’ court can issue/extend warrants subject to the 96-hour cap after relevant time.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What happens after 24 hours in police custody?</h3>
                <p className="text-slate-700">After 24 hours, the police must either charge you, release you, or apply for an extension. Extensions require authorisation from a superintendent (up to 36 hours) or a magistrate (up to 96 hours) and are only granted for serious offences.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police extend my detention beyond 24 hours?</h3>
                <p className="text-slate-700">Yes. Under PACE, a superintendent can authorise detention up to 36 hours in indictable cases if conditions are met. Beyond that, police must apply to a magistrates’ court for a warrant of further detention; extensions are subject to statutory limits, including the 96-hour maximum after relevant time.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How often must detention be reviewed?</h3>
                <p className="text-slate-700">PACE provides that the first review must be not later than six hours after detention was first authorised, the second not later than nine hours after the first, and subsequent reviews at intervals of not more than nine hours.</p>
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
              I provide extended hours police station representation across all Kent custody suites.
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

          <LegalReferences sources={sources} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
