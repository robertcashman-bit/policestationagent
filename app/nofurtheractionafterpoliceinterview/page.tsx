import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'No Further Action (NFA) After a Police Interview: What It Means',
  description:
    'What “No Further Action” generally means after an interview, what might happen next, and where to find the CPS decision-making test. Sources included.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/nofurtheractionafterpoliceinterview`,
  },
  openGraph: {
    title: 'No Further Action (NFA) After a Police Interview: What It Means',
    description:
      'What “No Further Action” generally means after an interview, what might happen next, and where to find the CPS decision-making test. Sources included.',
    type: 'website',
    url: `https://${SITE_DOMAIN}/nofurtheractionafterpoliceinterview`,
  },
};

export default function Page() {
  const sources: LegalSource[] = [
    {
      id: 'cps-code',
      label: 'CPS: The Code for Crown Prosecutors (Full Code Test: evidential stage + public interest stage)',
      href: 'https://www.cps.gov.uk/publication/code-crown-prosecutors',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">“No Further Action” (NFA): what it generally means</h1>
          <p className="text-lg text-slate-700 mb-8">
            “No Further Action” is commonly used to mean that, at that point, no charge/prosecution will follow from the investigation you were interviewed about.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-10 rounded-r-lg">
            <p className="text-slate-900">
              <strong>Quick Answer:</strong> If your case is referred to the Crown Prosecution Service, the CPS applies the “Full Code Test” (evidential stage + public interest stage).<Ref n={1} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What to do next</h2>
            <ul>
              <li>Ask for written confirmation of the outcome (if you have not received it).</li>
              <li>If you have an ongoing investigation status (bail/RUI), take advice on what that status means for you.</li>
            </ul>

            <h2>Related guides</h2>
            <ul>
              <li>
                <Link href="/after-a-police-interview">After a police interview</Link>
              </li>
              <li>
                <Link href="/police-bail-explained">Police bail explained</Link>
              </li>
              <li>
                <Link href="/released-under-investigation">Released under investigation (RUI)</Link>
              </li>
            </ul>

            <LegalReferences sources={sources} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}