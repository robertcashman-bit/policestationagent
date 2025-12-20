import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'No Comment Interview: When to Stay Silent in Police Interview UK',
  description: 'Should you go "no comment" in a police interview? Learn when staying silent protects you, when it could harm your defence, and how adverse inferences work.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/no-comment-interview`,
  },
};

export default function NoCommentInterviewPage() {
  const sources: LegalSource[] = [
    {
      id: 'cjpoa-s34',
      label: 'Criminal Justice and Public Order Act 1994 s.34 (inferences from failure to mention facts)',
      href: 'https://www.legislation.gov.uk/ukpga/1994/33/section/34',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does "no comment" mean in a police interview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"No comment" means you are choosing not to answer a question in interview. In some circumstances, if you later rely on a fact in your defence that you did not mention when questioned under caution, a court or jury may be able to draw inferences under section 34 CJPOA 1994.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I be punished for saying "no comment" in interview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Section 34 CJPOA 1994 allows a court or jury to draw inferences that appear proper where a suspect fails to mention facts later relied on in a defence, if it was reasonable to have mentioned them at the time.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I go "no comment" in a police interview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You should consider "no comment" when: the police haven\'t disclosed enough about the allegations, you need time to gather evidence, the questions are confusing or misleading, or your solicitor advises it. Always get legal advice first.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an adverse inference?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An adverse inference is an inference a court or jury may draw from a failure to mention facts when questioned under caution, where section 34 CJPOA 1994 applies.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a prepared statement better than "no comment"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A prepared statement can be a middle ground: it can put key facts on record while you still answer “no comment” to questions. Whether it reduces the risk of adverse inferences depends on the facts and what was reasonable in the circumstances.',
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
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">›</span>
              <Link href="/police-interview-rights" className="hover:text-white">Interview Rights</Link>
              <span className="mx-2">›</span>
              <span>No Comment Interview</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              No Comment Interview: When Should You Stay Silent?
            </h1>
            <p className="text-xl text-blue-100">
              Understanding your right to silence and when "no comment" protects you
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Direct Answer */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> You have the right to answer "no comment" to any question in a 
              police interview. However, if you later rely on a fact in your defence that you did not mention when questioned under caution, section 34 CJPOA 1994 may allow the court or jury to draw inferences that appear proper (depending on what was reasonable in the circumstances).<Ref n={1} />{' '}
              Always get legal advice before deciding.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Does "No Comment" Mean?</h2>
            <p>
              "No comment" is a phrase used to decline to answer a question in interview.
            </p>
            <p>
              The decision to go "no comment" is a major tactical choice. It depends on what the police have disclosed, what you are being asked about, and the risks of saying something inaccurate or incomplete.
            </p>

            <h2>Your Right to Silence</h2>
            <p>
              One key legal risk of silence is adverse inference: section 34 CJPOA 1994 deals with failures to mention facts when questioned under caution (or when charged/informed) that are later relied on in a defence.<Ref n={1} />
            </p>
            <p>This has two practical consequences:</p>
            <ol>
              <li><strong>You can stay silent</strong> – but</li>
              <li><strong>Silence can be relevant later</strong> if you rely on facts you did not mention when you could reasonably have been expected to mention them.<Ref n={1} /></li>
            </ol>

            <h2>When "No Comment" Is Advisable</h2>
            <p>
              In my practice, I often advise clients to go "no comment" in the following situations:
            </p>
            <ul>
              <li><strong>Insufficient disclosure:</strong> When the police haven't told you enough about what you're accused of to respond meaningfully</li>
              <li><strong>Need to gather evidence:</strong> When you need to verify facts, check documents, or speak to witnesses before giving your account</li>
              <li><strong>Complex legal issues:</strong> When the case involves complicated legal points that require proper analysis</li>
              <li><strong>Risk of self-incrimination:</strong> When answering questions honestly could incriminate you in other matters</li>
              <li><strong>Fitness concerns:</strong> When you're unwell, under the influence, or otherwise unfit to be interviewed properly</li>
            </ul>

            <h2>When "No Comment" May Be Risky</h2>
            <p>
              Staying silent isn't always the best strategy. Consider these situations:
            </p>
            <ul>
              <li><strong>Clear alibi:</strong> If you have an innocent explanation that can be verified, putting it on record early can be powerful</li>
              <li><strong>Overwhelming evidence:</strong> If the evidence against you is strong, cooperation may help</li>
              <li><strong>Positive defence:</strong> If you're going to rely on a specific defence at trial, mentioning it now protects you from adverse inferences</li>
            </ul>

            <h2>Understanding Adverse Inferences</h2>
            <p>
              Under the Criminal Justice and Public Order Act 1994, the court can draw <strong>adverse inferences</strong> 
              from a failure to mention facts in certain circumstances. This means:
            </p>
            <ul>
              <li>If you fail to mention a fact during interview that you later rely on at trial...</li>
              <li>...the court or jury may treat your silence as evidence that you made up the defence later</li>
              <li>This is fact-specific and depends on what was reasonable to expect at the time (s.34).<Ref n={1} /></li>
            </ul>

            <h2>The Prepared Statement Alternative</h2>
            <p>
              A <Link href="/prepared-statements" className="text-blue-600 hover:underline">prepared statement</Link> offers 
              a middle ground between full interview and complete silence. This is a written statement, prepared with 
              your solicitor, which sets out your account of events. You then answer "no comment" to questions.
            </p>
            <p>
              Benefits of a prepared statement:
            </p>
            <ul>
              <li>Puts key facts on record (which can matter for s.34 if you later rely on those facts)<Ref n={1} /></li>
              <li>Avoids the risks of live questioning</li>
              <li>Gives you control over what information you provide</li>
              <li>Can be carefully considered and legally reviewed before use</li>
            </ul>

            <h2>In Practice: My Experience</h2>
            <p>
              Having represented hundreds of clients at Kent police stations, I can tell you that "no comment" 
              is a legitimate and often sensible approach – but it should never be a default position without 
              proper consideration.
            </p>
            <p>
              I always conduct a thorough consultation before interview, reviewing the disclosure, understanding 
              your instructions, and advising on the best approach for your specific situation. Sometimes that's 
              "no comment," sometimes a prepared statement, and sometimes a full account.
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You have an absolute right to stay silent in police interview</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You cannot be convicted solely for saying "no comment"</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Adverse inferences may arise if you later rely on something you didn't mention</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>A prepared statement can protect against adverse inferences</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Always get legal advice before deciding your interview strategy</span>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What does "no comment" mean in a police interview?</h3>
                <p className="text-slate-700">"No comment" is a response used during police interviews to exercise your right to silence. It means you are choosing not to answer a question. You cannot be punished for saying "no comment," but the court may draw adverse inferences in certain circumstances.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I be punished for saying "no comment" in interview?</h3>
                <p className="text-slate-700">No, you cannot be convicted simply for staying silent. However, if you later rely on a defence in court that you could have mentioned during interview, the court may draw an "adverse inference" – meaning they may view your silence as suspicious.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">When should I go "no comment" in a police interview?</h3>
                <p className="text-slate-700">You should consider "no comment" when: the police haven't disclosed enough about the allegations, you need time to gather evidence, the questions are confusing or misleading, or your solicitor advises it. Always get legal advice first.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is an adverse inference?</h3>
                <p className="text-slate-700">An adverse inference is when a court treats your silence during police interview as potentially supporting the prosecution case. If you fail to mention something you later rely on in court, the jury may conclude you made it up afterwards.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Is a prepared statement better than "no comment"?</h3>
                <p className="text-slate-700">A prepared statement can be an effective middle ground. It allows you to put your account on record (protecting against adverse inferences) while avoiding the risks of a full police interview. Your solicitor can help you prepare this.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Facing a Police Interview?</h3>
            <p className="text-slate-300 mb-6">
              Don't decide on your interview strategy without professional advice. I provide free, independent 
              legal representation at police stations across Kent, including advice on whether to go "no comment."
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

          {/* Related Links */}
          <div className="border-t pt-8 mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/prepared-statements" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Prepared Statements Explained →</span>
              </Link>
              <Link href="/adverse-inference" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Understanding Adverse Inferences →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Your Interview Rights →</span>
              </Link>
              <Link href="/voluntary-interviews" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Voluntary Interview Advice →</span>
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
