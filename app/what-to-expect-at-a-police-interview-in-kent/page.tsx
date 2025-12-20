import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'What to Expect at a Police Interview (England & Wales) | Guide',
  description:
    'What typically happens in a police interview: legal advice, caution, recording, and the rules that apply (PACE Code C/E/F). Sources included.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/what-to-expect-at-a-police-interview-in-kent`,
  },
  openGraph: {
    title: 'What to Expect at a Police Interview (England & Wales) | Guide',
    description:
      'What typically happens in a police interview: legal advice, caution, recording, and the rules that apply (PACE Code C/E/F). Sources included.',
    type: 'website',
    url: `https://${SITE_DOMAIN}/what-to-expect-at-a-police-interview-in-kent`,
    siteName: 'Police Station Agent',
  },
};

export default function Page() {
  const sources: LegalSource[] = [
    {
      id: 'pace-s58',
      label: 'Police and Criminal Evidence Act 1984 (PACE) s.58 (right to legal advice)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/58',
    },
    {
      id: 'pace-code-c-2023',
      label: 'Home Office: PACE Code C (December 2023) – detention, treatment and questioning (PDF)',
      href: 'https://assets.publishing.service.gov.uk/media/6580543083ba38000de1b792/PACE+Code+C+2023.pdf',
    },
    {
      id: 'pace-code-e-2016',
      label: 'Home Office: PACE Code E (2016) – audio recording of interviews (PDF)',
      href: 'https://assets.publishing.service.gov.uk/media/5a8092dbe5274a2e87dba95d/52344_00_Pace_Code_E_Accessible_v0.3.pdf',
    },
    {
      id: 'pace-code-f-2013',
      label: 'Home Office: PACE Code F (2013) – visual recording of interviews (PDF)',
      href: 'https://assets.publishing.service.gov.uk/media/5a7d4e9740f0b60a7f1a9b6d/2013_PACE_Code_F.pdf',
    },
    {
      id: 'cjpoa-s34',
      label: 'Criminal Justice and Public Order Act 1994 s.34 (adverse inferences from silence in certain circumstances)',
      href: 'https://www.legislation.gov.uk/ukpga/1994/33/section/34',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">What to expect at a police interview</h1>
          <p className="text-lg text-slate-700 mb-8">
            This is general information for England &amp; Wales. The exact process can vary by case and station.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-10 rounded-r-lg">
            <p className="text-slate-900">
              <strong>Quick Answer:</strong> Ask for legal advice (PACE s.58).<Ref n={1} /> Interview rules are set out in PACE Code C, and interviews are recorded under Codes E/F.<Ref n={2} /> <Ref n={3} /> <Ref n={4} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Typical stages</h2>
            <ol>
              <li>
                <strong>Legal advice:</strong> ask for a solicitor and take advice before answering questions (PACE s.58).<Ref n={1} />
              </li>
              <li>
                <strong>Caution and questions:</strong> the interview is under caution and follows Code C safeguards.<Ref n={2} />
              </li>
              <li>
                <strong>Recording:</strong> interviews are typically audio recorded (Code E) or visually recorded (Code F).<Ref n={3} /> <Ref n={4} />
              </li>
              <li>
                <strong>Silence risk (in some cases):</strong> CJPOA 1994 s.34 is the key statute about adverse inferences from a failure to mention facts later relied on in a defence.<Ref n={5} />
              </li>
            </ol>

            <h2>Related guides</h2>
            <ul>
              <li>
                <Link href="/police-interview-rights">Police interview rights (PACE Code C)</Link>
              </li>
              <li>
                <Link href="/preparing-for-police-interview">Preparing for a police interview</Link>
              </li>
              <li>
                <Link href="/no-comment-interview">No comment interview</Link>
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