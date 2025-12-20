import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Youth Custody Rights: Under 18 at a Police Station UK',
  description: 'If you\'re under 18 and arrested, you have extra protections including an appropriate adult, special interview rules, and different custody procedures. Know your rights.',
  alternates: {
    canonical: 'https://policestationagent.com/youth-custody-rights',
  },
};

export default function YouthCustodyRightsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What rights do under 18s have at a police station?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under 18s have enhanced rights including: an appropriate adult must be present during interview and other procedures, parents/guardians should be informed, special custody conditions apply, and there are stricter time limits. Legal advice is also free.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an appropriate adult for a young person?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An appropriate adult for a young person is usually a parent, guardian, or social worker who attends the police station to support them. They ensure the young person understands what is happening and their rights are protected.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can police interview a child without a parent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, police cannot interview a child (under 18) without an appropriate adult present. This is usually a parent or guardian. If parents are unavailable, a social worker or other suitable adult must attend before interview begins.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can a 16 year old be held in police cells?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Young people should not be held in cells unless absolutely necessary. If detained, they must never be placed in a cell with an adult. Police should seek alternative secure accommodation where possible for under 18s.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long can police hold a minor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The same custody time limits apply to minors as adults (24 hours, extendable), but police should aim to deal with young people as quickly as possible. Overnight detention of under 18s should be avoided where possible.',
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
              <span>Youth Custody</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Youth Custody Rights: Under 18 at a Police Station
            </h1>
            <p className="text-xl text-blue-100">
              Special protections for young people in police custody
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> If you're under 18 and arrested, you have extra protections. 
              An <strong>appropriate adult</strong> (usually a parent) must be present during interview. 
              You have the right to <strong>free legal advice</strong>. Police should contact your 
              parents/guardians immediately and aim to deal with you as quickly as possible.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Special Protections for Young People</h2>
            <p>
              The law recognises that young people need additional safeguards in the criminal justice system. 
              PACE Code C contains specific provisions for those under 18 to ensure they are treated 
              appropriately and their rights are protected.
            </p>
            <p>
              As a duty solicitor, I have represented many young people at Kent police stations. 
              Understanding these special protections is essential for parents and young people alike.
            </p>

            <h2>The Appropriate Adult</h2>
            <p>
              One of the most important protections for under 18s is the requirement for an 
              <strong> appropriate adult</strong> to be present during:
            </p>
            <ul>
              <li>Police interviews</li>
              <li>Intimate and strip searches</li>
              <li>Charging and cautioning</li>
              <li>Any time the young person is asked to provide a sample (DNA, fingerprints)</li>
              <li>Reading and signing of important documents</li>
            </ul>
            
            <h3>Who Can Be an Appropriate Adult?</h3>
            <ul>
              <li><strong>Parent or guardian</strong> – the first choice in most cases</li>
              <li><strong>Social worker</strong> – if parents are unavailable or unsuitable</li>
              <li><strong>Other responsible adult</strong> – over 18, not a police officer</li>
            </ul>
            <p>
              The appropriate adult's role is to support the young person, ensure they understand 
              what is happening, and observe that the interview is conducted fairly.
            </p>

            <h2>Custody Conditions for Young People</h2>
            <p>
              Young people should be treated differently in custody:
            </p>
            <ul>
              <li><strong>Cells:</strong> Should not be used unless no alternative; never shared with adults</li>
              <li><strong>Overnight detention:</strong> Should be avoided where possible</li>
              <li><strong>Local authority accommodation:</strong> Police may seek this instead of cells</li>
              <li><strong>Speed:</strong> Cases should be dealt with as quickly as possible</li>
            </ul>

            <h2>What Happens When a Young Person Is Arrested</h2>
            <ol>
              <li><strong>Arrival at custody:</strong> Custody officer assesses the young person's needs</li>
              <li><strong>Contact parents:</strong> Police must inform parents/guardians as soon as practicable</li>
              <li><strong>Appropriate adult arranged:</strong> Interview cannot proceed without them</li>
              <li><strong>Legal advice offered:</strong> Free and confidential</li>
              <li><strong>Interview:</strong> With solicitor and appropriate adult present</li>
              <li><strong>Decision:</strong> Charge, caution, NFA, or release under investigation</li>
            </ol>

            <h2>Youth Cautions and Reprimands</h2>
            <p>
              For minor first offences, young people may receive:
            </p>
            <ul>
              <li><strong>Youth Caution:</strong> Formal warning recorded by police</li>
              <li><strong>Youth Conditional Caution:</strong> Caution with conditions attached</li>
              <li><strong>Community Resolution:</strong> Informal outcome for minor matters</li>
            </ul>
            <p>
              These alternatives to prosecution are often appropriate for young people but still 
              have consequences and should only be accepted with legal advice.
            </p>

            <h2>Interview Rules for Young People</h2>
            <p>
              Special interview rules apply:
            </p>
            <ul>
              <li>Appropriate adult must be present throughout</li>
              <li>Breaks should be more frequent</li>
              <li>Language should be appropriate to the young person's age</li>
              <li>Interview should not be oppressive or intimidating</li>
              <li>The young person's welfare must be considered</li>
            </ul>

            <h2>After the Police Station</h2>
            <p>If charged, a young person will typically:</p>
            <ul>
              <li>Be released on bail or to local authority care</li>
              <li>Appear before a <strong>Youth Court</strong> (not adult Magistrates' Court)</li>
              <li>Have their case heard by specially trained magistrates</li>
              <li>Receive youth-specific sentences if convicted</li>
            </ul>

            <h2>Advice for Parents</h2>
            <ol>
              <li><strong>Go to the police station</strong> – Your child needs you as appropriate adult</li>
              <li><strong>Request a solicitor</strong> – Legal advice is free and important</li>
              <li><strong>Stay calm</strong> – Your support matters</li>
              <li><strong>Don't discuss the case</strong> – Wait for legal advice first</li>
              <li><strong>Take notes</strong> – Record times and what happens</li>
            </ol>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Under 18s must have an appropriate adult present during interview</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Parents/guardians should be informed as soon as possible</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Young people should not be placed in cells with adults</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Free legal advice is available and highly recommended</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Cases should be dealt with as quickly as possible</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What rights do under 18s have at a police station?</h3>
                <p className="text-slate-700">Under 18s have enhanced rights including: an appropriate adult must be present, parents should be informed, special custody conditions apply, and there are stricter procedures. Legal advice is free.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is an appropriate adult for a young person?</h3>
                <p className="text-slate-700">An appropriate adult is usually a parent, guardian, or social worker who attends to support the young person. They ensure the young person understands what is happening and their rights are protected.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police interview a child without a parent?</h3>
                <p className="text-slate-700">No, police cannot interview a child without an appropriate adult present. If parents are unavailable, a social worker or other suitable adult must attend before interview begins.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can a 16 year old be held in police cells?</h3>
                <p className="text-slate-700">Young people should not be held in cells unless absolutely necessary. If detained, they must never be placed with an adult. Police should seek alternative accommodation where possible.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How long can police hold a minor?</h3>
                <p className="text-slate-700">The same time limits apply as for adults, but police should aim to deal with young people quickly. Overnight detention should be avoided where possible.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Young Person Arrested?</h3>
            <p className="text-slate-300 mb-6">
              If your child has been arrested or you need to act as appropriate adult, I can provide 
              immediate legal assistance at any Kent police station.
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
              <Link href="/appropriate-adult" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Appropriate Adult Role →</span>
              </Link>
              <Link href="/police-custody-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">General Custody Rights →</span>
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
