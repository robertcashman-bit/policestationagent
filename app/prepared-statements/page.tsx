import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Prepared Statements in Police Interviews: A Complete Guide',
  description: 'A prepared statement lets you put your account on record while avoiding police questioning. Learn when to use one and how they protect against adverse inferences.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/prepared-statements`,
  },
};

export default function PreparedStatementsPage() {
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
        name: 'What is a prepared statement in a police interview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A prepared statement is a written document, prepared with your solicitor, that sets out your account of events. It is read out at the start of a police interview, after which you answer "no comment" to questions. It puts your defence on record while avoiding the risks of live questioning.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does a prepared statement protect against adverse inferences?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A prepared statement may reduce the risk of adverse inferences if it clearly mentions the facts you later rely on. However, whether an adverse inference can be drawn depends on the circumstances and the court.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use a prepared statement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A prepared statement is useful when: you have a clear account to give but want to avoid police questioning, you need to put facts on record to prevent adverse inferences, the disclosure is limited, or you want to control exactly what information is provided.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can police ask questions after a prepared statement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, police can still ask questions after you read your prepared statement. You can answer "no comment" to these questions. The interview will continue, but you\'ve already put your key points on record.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who writes the prepared statement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The prepared statement is drafted by your solicitor based on your instructions. It should accurately reflect your account while being carefully worded to avoid inadvertent admissions or inconsistencies.',
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
              <span>Prepared Statements</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Prepared Statements: A Middle Ground in Police Interviews
            </h1>
            <p className="text-xl text-blue-100">
              Put your account on record while avoiding the risks of police questioning
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Direct Answer */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> A prepared statement is a written account, drafted with your solicitor, 
              that you read out at the start of a police interview. You then answer "no comment" to questions. 
              This approach lets you <strong>put key facts on record</strong> (which may matter later when a court considers adverse inferences)<Ref n={1} />{' '}
              while <strong>avoiding the risks of live questioning</strong>.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Is a Prepared Statement?</h2>
            <p>
              A prepared statement is a carefully drafted written document that sets out your account of the 
              events you've been arrested for. It is prepared during your private consultation with your solicitor, 
              based on your instructions and the disclosure you've received from the police.
            </p>
            <p>
              At the start of the police interview, you (or your solicitor) will read the statement aloud. 
              It is then recorded as part of the interview. After that, you answer "no comment" to any questions 
              the police ask.
            </p>

            <h2>Why Use a Prepared Statement?</h2>
            <p>
              The prepared statement is a tactical tool that offers the benefits of both answering questions 
              and staying silent:
            </p>
            <ul>
              <li>
                <strong>May reduce adverse-inference risk:</strong> If you mention the facts you later rely on, it can help explain your position if your defence is later challenged on silence.<Ref n={1} />
              </li>
              <li><strong>Avoids live questioning:</strong> You don't have to respond to potentially leading, 
              confusing, or aggressive questions</li>
              <li><strong>Controls the narrative:</strong> You decide exactly what information to provide, 
              carefully worded to avoid inadvertent admissions</li>
              <li><strong>Gives you time:</strong> Unlike a full interview, you can take time to consider 
              your account properly before committing to it</li>
            </ul>

            <h2>When Is a Prepared Statement Appropriate?</h2>
            <p>
              In my experience representing clients at Kent police stations, a prepared statement works well when:
            </p>
            <ul>
              <li>You have a clear account to give but want to avoid cross-examination by police</li>
              <li>The disclosure is limited and you want to avoid being trapped by questions about 
              evidence you haven't seen</li>
              <li>You want to establish a defence early (e.g., alibi, self-defence, mistaken identity)</li>
              <li>You're concerned about the way questions might be put or the interview environment</li>
              <li>There's a risk of saying something that could be taken out of context</li>
            </ul>

            <h2>What Should a Prepared Statement Include?</h2>
            <p>
              A good prepared statement typically includes:
            </p>
            <ul>
              <li>Your version of events relevant to the alleged offence</li>
              <li>Any specific defence you intend to rely on (alibi, self-defence, etc.)</li>
              <li>Key facts that support your account</li>
              <li>A statement that you are making this on legal advice</li>
              <li>A statement that you will answer "no comment" to questions</li>
            </ul>
            <p>
              Importantly, the statement must be accurate and based on your genuine instructions. 
              Your solicitor will help you draft it in a way that is legally sound.
            </p>

            <h2>What Happens After Reading the Statement?</h2>
            <p>
              After the prepared statement is read:
            </p>
            <ol>
              <li>The police will proceed with their planned interview questions</li>
              <li>You answer "no comment" to each question</li>
              <li>The interview will be recorded as normal</li>
              <li>Your solicitor will be present throughout</li>
            </ol>
            <p>
              The police may try to persuade you to answer questions, but you are under no obligation 
              to do so. The prepared statement speaks for itself.
            </p>

            <h2>Does a Prepared Statement Stop Adverse Inferences?</h2>
            <p>
              A prepared statement can be relevant to adverse inferences, because section 34 CJPOA 1994 is concerned with a failure to mention facts later relied on in a defence.<Ref n={1} />{' '}
              However, whether an inference can be drawn is fact-specific and depends on what was (and was not) mentioned, and what was reasonable “in the circumstances” at the time.<Ref n={1} />
            </p>
            <ul>
              <li>A prepared statement cannot “guarantee” no inference will be drawn.</li>
              <li>If you later rely on a fact that was not mentioned when you could reasonably have been expected to mention it, the court may consider drawing inferences under s.34.<Ref n={1} /></li>
            </ul>
            <p>
              However, if you raise something at trial that wasn't in your prepared statement, 
              adverse inferences may still be possible for that omission.
            </p>

            <h2>Limitations of Prepared Statements</h2>
            <p>
              Prepared statements are not always the best approach:
            </p>
            <ul>
              <li>If you have a strong case and can answer questions well, a full interview may be more persuasive</li>
              <li>Police may interpret the statement differently than you intended</li>
              <li>You can't respond to new evidence the police reveal during interview</li>
              <li>Some courts are sceptical of prepared statements, especially if very short or vague</li>
            </ul>
          </div>

          {/* Key Takeaways */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>A prepared statement puts your account on record without answering questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>It should protect against adverse inferences if properly drafted</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Your solicitor drafts it based on your instructions and disclosure</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You still answer "no comment" to police questions after reading it</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>It's a tactical choice that isn't right for every case</span>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is a prepared statement in a police interview?</h3>
                <p className="text-slate-700">A prepared statement is a written document, prepared with your solicitor, that sets out your account of events. It is read out at the start of an interview, after which you answer "no comment" to questions.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Does a prepared statement protect against adverse inferences?</h3>
                <p className="text-slate-700">Yes, if the prepared statement covers the key facts you later rely on at trial, it should protect against adverse inferences. It shows you mentioned your defence at the earliest opportunity.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">When should I use a prepared statement?</h3>
                <p className="text-slate-700">A prepared statement is useful when you have a clear account but want to avoid questioning, need to put facts on record, the disclosure is limited, or you want to control exactly what information is provided.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police ask questions after a prepared statement?</h3>
                <p className="text-slate-700">Yes, police can still ask questions after you read your prepared statement. You can answer "no comment" to these questions. The interview will continue, but your key points are on record.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Who writes the prepared statement?</h3>
                <p className="text-slate-700">The prepared statement is drafted by your solicitor based on your instructions. It should accurately reflect your account while being carefully worded to avoid inadvertent admissions.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Need Help with Your Interview Strategy?</h3>
            <p className="text-slate-300 mb-6">
              If you're facing a police interview and want advice on whether a prepared statement is right 
              for your case, I can help. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).
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
              <Link href="/no-comment-interview" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">No Comment Interviews →</span>
              </Link>
              <Link href="/adverse-inference" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Adverse Inferences Explained →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Your Interview Rights →</span>
              </Link>
              <Link href="/services/police-station-representation" className="p-4 bg-white rounded-lg border hover:border-blue-300">
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
