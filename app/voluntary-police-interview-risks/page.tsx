import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Voluntary Police Interview Risks (England & Wales) | Know Your Rights',
  description:
    'A voluntary interview is still a formal interview. What to do before you attend, your right to legal advice, and silence/adverse inference basics. Sources included.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/voluntary-police-interview-risks`,
  },
  openGraph: {
    title: 'Voluntary Police Interview Risks (England & Wales) | Know Your Rights',
    description:
      'A voluntary interview is still a formal interview. What to do before you attend, your right to legal advice, and silence/adverse inference basics. Sources included.',
    url: `https://${SITE_DOMAIN}/voluntary-police-interview-risks`,
    siteName: 'Police Station Agent',
    type: 'website',
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
      id: 'code-c-2023',
      label: 'Home Office: PACE Code C (December 2023) – detention, treatment and questioning (PDF)',
      href: 'https://www.gov.uk/government/publications/pace-code-c-2023',
    },
    {
      id: 'cjpoa-s34',
      label: 'Criminal Justice and Public Order Act 1994 s.34 (adverse inferences from silence in certain circumstances)',
      href: 'https://www.legislation.gov.uk/ukpga/1994/33/section/34',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">The risks of a “voluntary” police interview</h1>
          <p className="text-lg text-slate-700 mb-8">
            A voluntary interview is still a formal interview process. Get advice on your specific case before attending.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-10 rounded-r-lg">
            <p className="text-slate-900">
              <strong>Quick Answer:</strong> You have a right to legal advice (PACE s.58).<Ref n={1} /> Interview rules are governed by PACE Code C.<Ref n={2} /> Silence can carry risks in some circumstances under CJPOA 1994 s.34.<Ref n={3} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What to do before you go</h2>
            <ul>
              <li>
                <strong>Ask for a solicitor</strong> and take advice before the interview (PACE s.58).<Ref n={1} />
              </li>
              <li>
                <strong>Ask what the allegation is</strong> and what evidence will be put to you.
              </li>
              <li>
                <strong>Do not guess</strong> or try to “clear it up” without advice—interviews are recorded and can be used in evidence (Code C and the interview recording codes).<Ref n={2} />
              </li>
            </ul>

            <h2>Related guides</h2>
            <ul>
              <li>
                <Link href="/what-happens-if-ignore-police-interview">What happens if you ignore a police interview invitation</Link>
              </li>
              <li>
                <Link href="/police-interview-rights">Police interview rights (PACE Code C)</Link>
              </li>
              <li>
                <Link href="/no-comment-interview">No comment interview (risks and strategy)</Link>
              </li>
            </ul>

            <LegalReferences sources={sources} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}







































