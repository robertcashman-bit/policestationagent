import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Can Police Take My Phone? Your Rights When Police Seize Devices UK',
  description: 'Police can seize your phone if arrested or with a warrant. Learn when they can take it, how long they can keep it, and whether you must give your PIN or password.',
  alternates: {
    canonical: 'https://policestationagent.com/can-police-take-my-phone',
  },
};

export default function CanPoliceTakeMyPhonePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can police take my phone when I\'m arrested?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, police can seize your phone when you\'re arrested as part of a search incident to arrest. They can take it to search for evidence related to the offence. Your phone will be listed on the custody record.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I have to give police my phone PIN or password?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generally, you are not obliged to give police your PIN or password. However, under Section 49 of the Regulation of Investigatory Powers Act 2000, police with proper authority can require disclosure of encryption keys, and refusal can be a criminal offence.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long can police keep my phone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Police can keep your phone for as long as necessary for the investigation. This could be weeks or months. If you\'re not charged, you may be able to apply for its return. If charged, it may be retained as evidence until after trial.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can police search my phone without a warrant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you\'re arrested, police can seize your phone without a warrant. To examine its contents, they may need authorisation under PACE. In practice, phones are often examined after seizure using forensic tools.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get my phone back if I\'m released without charge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If released without charge, you should be able to reclaim your phone. However, police may retain it if the investigation continues. You can apply for its return, and a solicitor can help expedite this.',
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
              <span>Phone Seizure</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Can Police Take My Phone? Your Rights Explained
            </h1>
            <p className="text-xl text-blue-100">
              Understanding phone seizure, passwords, and data access
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> Yes, police can seize your phone when you're arrested. 
              You are <strong>not generally required</strong> to give your PIN or password, but in some 
              circumstances (under RIPA 2000), refusing can be a criminal offence. Police can keep your 
              phone for weeks or months during an investigation.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>When Can Police Take Your Phone?</h2>
            <p>
              Police have several powers to seize your mobile phone:
            </p>
            <ul>
              <li><strong>On arrest:</strong> As part of a search incident to arrest</li>
              <li><strong>With a warrant:</strong> If a court has authorised a search of your property</li>
              <li><strong>With consent:</strong> If you voluntarily hand it over</li>
              <li><strong>Under specific powers:</strong> Terrorism, serious crime investigations</li>
            </ul>
            <p>
              In my experience, phones are routinely seized during arrests, particularly for offences 
              involving communications, drugs, fraud, or allegations with a digital element.
            </p>

            <h2>Do You Have to Give Your PIN or Password?</h2>
            <p>
              This is a question I'm asked regularly at police stations. The answer is nuanced:
            </p>
            
            <h3>General Position</h3>
            <p>
              You have a right to silence and are not obliged to answer questions, including questions 
              about your phone password. You can say "no comment" when asked for your PIN.
            </p>

            <h3>The RIPA Exception</h3>
            <p>
              Under <strong>Section 49 of the Regulation of Investigatory Powers Act 2000 (RIPA)</strong>, 
              police with proper authorisation can serve a notice requiring you to disclose encryption 
              keys or passwords. Refusing to comply is a criminal offence carrying:
            </p>
            <ul>
              <li>Up to 2 years imprisonment (general cases)</li>
              <li>Up to 5 years for national security or child indecency cases</li>
            </ul>
            <p>
              However, such notices require senior authorisation and are typically used for serious 
              investigations, not routine matters.
            </p>

            <h2>How Long Can Police Keep Your Phone?</h2>
            <p>
              There is no fixed time limit. Police can retain your phone:
            </p>
            <ul>
              <li>For as long as necessary for the investigation</li>
              <li>Until forensic examination is complete</li>
              <li>As evidence if you're charged (potentially until after trial)</li>
            </ul>
            <p>
              I have seen phones retained for months, particularly in complex investigations or where 
              there are forensic backlogs.
            </p>

            <h2>What Can Police Access on Your Phone?</h2>
            <p>
              With appropriate authorisation, police can access:
            </p>
            <ul>
              <li>Messages (SMS, WhatsApp, Signal, etc.)</li>
              <li>Call logs and contacts</li>
              <li>Photos and videos</li>
              <li>Browser history and app data</li>
              <li>Location data and GPS history</li>
              <li>Deleted data (often recoverable)</li>
              <li>Cloud-linked content</li>
            </ul>
            <p>
              Police use specialist forensic tools to extract this data, often even from locked devices.
            </p>

            <h2>Getting Your Phone Back</h2>
            <p>
              You can apply for the return of your phone:
            </p>
            <ol>
              <li><strong>After release:</strong> Request it from the officer in charge</li>
              <li><strong>During RUI:</strong> Write to the police requesting return</li>
              <li><strong>Through a solicitor:</strong> We can make formal representations</li>
              <li><strong>Court application:</strong> Apply to the court for return (if refused)</li>
            </ol>
            <p>
              Police should return your phone once it's no longer needed. However, they may retain 
              images of the data even after returning the physical device.
            </p>

            <h2>Practical Advice</h2>
            <ul>
              <li><strong>Know your rights:</strong> You don't have to unlock your phone on request</li>
              <li><strong>Get legal advice:</strong> Before deciding whether to provide passwords</li>
              <li><strong>Ask about RIPA:</strong> Is there a formal Section 49 notice?</li>
              <li><strong>Document:</strong> Note when your phone was seized and by whom</li>
              <li><strong>Request return:</strong> Once the matter is concluded</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Police can seize your phone on arrest</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You're not generally obliged to give your PIN/password</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>A RIPA Section 49 notice can make refusal an offence</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Phones can be kept for weeks or months</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Get legal advice before deciding on password disclosure</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police take my phone when I'm arrested?</h3>
                <p className="text-slate-700">Yes, police can seize your phone when you're arrested as part of a search incident to arrest. They can take it to search for evidence related to the offence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Do I have to give police my phone PIN or password?</h3>
                <p className="text-slate-700">Generally, you are not obliged to give police your PIN or password. However, under Section 49 RIPA, police with proper authority can require disclosure, and refusal can be a criminal offence.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">How long can police keep my phone?</h3>
                <p className="text-slate-700">Police can keep your phone for as long as necessary for the investigation. This could be weeks or months. If not charged, you may apply for its return.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can police search my phone without a warrant?</h3>
                <p className="text-slate-700">If you're arrested, police can seize your phone without a warrant. To examine its contents, they may need authorisation under PACE. Phones are often examined after seizure using forensic tools.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">Can I get my phone back if I'm released without charge?</h3>
                <p className="text-slate-700">If released without charge, you should be able to reclaim your phone. However, police may retain it if the investigation continues. A solicitor can help expedite return.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Phone Seized by Police?</h3>
            <p className="text-slate-300 mb-6">
              If police have taken your phone and you need advice on your rights or help getting it back, 
              I can assist. Free consultations available.
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
              <Link href="/arrested-what-to-do" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Arrested: What To Do →</span>
              </Link>
              <Link href="/police-interview-rights" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Interview Rights →</span>
              </Link>
              <Link href="/released-under-investigation" className="p-4 bg-white rounded-lg border hover:border-blue-300">
                <span className="font-medium text-blue-600">Released Under Investigation →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
