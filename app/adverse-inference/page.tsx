import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Adverse Inference: What Happens If You Stay Silent in Police Interview',
  description: 'Adverse inference means courts can treat your silence as suspicious. Learn when it applies, how to avoid it, and what Section 34 CJPOA 1994 means for your case.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/adverse-inference`,
  },
};

export default function AdverseInferencePage() {
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
        name: 'What is an adverse inference?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An adverse inference is when a court or jury is allowed to treat your silence during a police interview as evidence against you. If you fail to mention something you later rely on at trial, they may conclude you made it up afterwards.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I be convicted based on adverse inference alone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An adverse inference is not “proof” by itself. Section 34 allows a court or jury to draw inferences that appear proper in the circumstances, but your case still depends on the totality of the evidence.',
        },
      },
      {
        '@type': 'Question',
        name: 'When can adverse inferences be drawn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Adverse inferences can be drawn under Section 34 CJPOA 1994 when: you were cautioned before interview, you failed to mention a fact when questioned, you later rely on that fact at trial, and it was reasonable to expect you to mention it at the time.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I avoid adverse inference?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To avoid adverse inference: answer questions fully if you have a defence, or provide a prepared statement covering key facts. The statement should include any fact you intend to rely on at trial.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does having a solicitor protect against adverse inference?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Having a solicitor helps because their advice may explain your silence. Courts are less likely to draw adverse inferences if you followed legal advice. However, this doesn\'t provide complete protection.',
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
              <span>Adverse Inference</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Adverse Inference: What Silence Can Mean in Court
            </h1>
            <p className="text-xl text-blue-100">
              Understanding Section 34 and how your silence can be used against you
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Direct Answer */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> An adverse inference is when a court or jury is permitted to treat 
              your silence during police interview as evidence that supports the prosecution case. Under 
              <strong> Section 34 of the Criminal Justice and Public Order Act 1994</strong>, if you fail to 
              mention a fact you later rely on in your defence, the court or jury may draw inferences that appear proper (depending on the circumstances).<Ref n={1} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Is Adverse Inference?</h2>
            <p>
              An adverse inference is a conclusion that a court or jury may draw from your silence. 
              In simple terms, if you don't mention something during police interview but then rely 
              on it at trial, the court may think: "If that was true, why didn't you say so at the time?"
            </p>
            <p>
              Whether an inference can be drawn depends on whether the fact was one you could reasonably have been expected to mention at the time (that “reasonableness” test is in section 34 itself).<Ref n={1} />
            </p>

            <h2>The Legal Framework: Section 34 CJPOA 1994</h2>
            <p>
              Section 34 of the Criminal Justice and Public Order Act 1994 sets out when adverse inferences 
              can be drawn. The conditions are:
            </p>
            <ol>
              <li>You were cautioned before being questioned</li>
              <li>You failed to mention a fact when questioned or charged</li>
              <li>You later rely on that fact in your defence at trial</li>
              <li>It was a fact that, in the circumstances at the time, you could reasonably have been expected to mention</li>
            </ol>
            <p>
              Section 34 also includes an important safeguard: where the accused was at an authorised place of detention, section 34(1)–(2) do not apply if they were not allowed an opportunity to consult a solicitor before being questioned/charged/informed (s.34(2A)).<Ref n={1} />
            </p>

            <h2>What Can't Adverse Inference Do?</h2>
            <p>
              It's important to understand the limitations:
            </p>
            <ul>
              <li><strong>It’s discretionary:</strong> the court/jury may draw “such inferences … as appear proper” in the circumstances (s.34(2)).<Ref n={1} /></li>
              <li><strong>It’s conditional:</strong> section 34 only applies where its conditions are met (including the “reasonably have been expected to mention” test).<Ref n={1} /></li>
              <li><strong>There may be good reasons for silence</strong> – Which the court should consider</li>
            </ul>

            <h2>When Adverse Inferences Are Most Dangerous</h2>
            <p>
              Adverse inference arguments are most commonly made where:
            </p>
            <ul>
              <li>You raise a new defence at trial that you never mentioned before (e.g., alibi, self-defence)</li>
              <li>The defence is specific and detailed – something you clearly would have known at the time</li>
              <li>There's no good explanation for why you didn't mention it earlier</li>
              <li>The jury finds the late mention suspicious in context</li>
            </ul>

            <h2>How to Protect Against Adverse Inference</h2>
            <p>
              There are several ways to avoid or minimise the risk of adverse inference:
            </p>

            <h3>1. Answer Questions Fully</h3>
            <p>
              If you have an innocent explanation, putting it on record during interview prevents adverse 
              inference. The court can't criticise you for not mentioning something you did mention.
            </p>

            <h3>2. Use a Prepared Statement</h3>
            <p>
              A <Link href="/prepared-statements" className="text-blue-600 hover:underline">prepared statement</Link> allows 
              you to put key facts on record while avoiding live questioning. If you later rely on facts that were never mentioned, section 34 is the mechanism by which inferences may be considered (depending on what was reasonable at the time).<Ref n={1} />
            </p>

            <h3>3. Act on Legal Advice</h3>
            <p>
              If you remain silent on your solicitor's advice, this is relevant context. Courts are less likely 
              to draw adverse inferences if you followed professional legal advice, though this isn't absolute protection.
            </p>

            <h3>4. Document the Reasons for Silence</h3>
            <p>
              If there are good reasons for not answering (e.g., insufficient disclosure, unfitness), your 
              solicitor should make a record of this at the time.
            </p>

            <h2>The Role of Legal Advice</h2>
            <p>
              Having a solicitor present is crucial when considering your interview strategy. The courts have 
              held that:
            </p>
            <ul>
              <li>Following legal advice can be a relevant factor in considering adverse inference</li>
              <li>But it doesn't automatically prevent adverse inference</li>
              <li>The reason behind the advice may be explored at trial</li>
              <li>Genuine reliance on advice is treated differently from tactical silence</li>
            </ul>

            <h2>In Practice: What Actually Happens</h2>
            <p>
              In practice, the impact of adverse inference can vary depending on the rest of the evidence. For example, a court or jury may consider that:
            </p>
            <ul>
              <li>Police interviews can be stressful and confusing</li>
              <li>People don't always think clearly under pressure</li>
              <li>Legal advice may legitimately lead to silence</li>
              <li>The prosecution must prove its case regardless</li>
            </ul>
            <p>
              The key is making informed decisions at the police station, with proper legal advice, 
              about what to say and what not to say.
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Adverse inference means courts can treat silence as suspicious</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You cannot be convicted on adverse inference alone</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>It applies when you fail to mention something you later rely on at trial</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>A prepared statement can protect against adverse inference</span>
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
                <h3 className="font-bold text-lg text-blue-900 mb-2">What is an adverse inference?</h3>
                <p className="text-slate-700">An adverse inference is when a court or jury is allowed to treat your silence during a police interview as evidence against you. If you fail to mention something you later rely on at trial, they may conclude you made it up afterwards.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I be convicted based on adverse inference alone?</h3>
                <p className="text-slate-700">No, you cannot be convicted solely on the basis of adverse inference. It is supporting evidence only. The prosecution must still prove the case beyond reasonable doubt with other evidence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">When can adverse inferences be drawn?</h3>
                <p className="text-slate-700">Adverse inferences can be drawn under Section 34 CJPOA 1994 when: you were cautioned before interview, you failed to mention a fact when questioned, you later rely on that fact at trial, and it was reasonable to expect you to mention it.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How can I avoid adverse inference?</h3>
                <p className="text-slate-700">To avoid adverse inference: answer questions fully if you have a defence, or provide a prepared statement covering key facts. The statement should include any fact you intend to rely on at trial.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Does having a solicitor protect against adverse inference?</h3>
                <p className="text-slate-700">Having a solicitor helps because their advice may explain your silence. Courts are less likely to draw adverse inferences if you followed legal advice. However, this doesn't provide complete protection.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Worried About Adverse Inference?</h3>
            <p className="text-slate-300 mb-6">
              Understanding adverse inference is crucial before any police interview. I can advise on the best 
              strategy for your case – whether that's a full interview, no comment, or a prepared statement.
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
              <Link href="/prepared-statements" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Prepared Statements →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Your Interview Rights →</span>
              </Link>
              <Link href="/police-custody-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Your Custody Rights →</span>
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
