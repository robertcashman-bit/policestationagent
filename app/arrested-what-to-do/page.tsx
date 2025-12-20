import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Arrested? What to Do at the Police Station (England & Wales) | PACE Rights',
  description:
    'Practical steps after arrest: ask for a solicitor, have someone informed, and understand interview/custody rules under PACE and Code C. Sources included.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/arrested-what-to-do`,
  },
  openGraph: {
    title: 'Arrested? What to Do at the Police Station (England & Wales) | PACE Rights',
    description:
      'Practical steps after arrest: ask for a solicitor, have someone informed, and understand interview/custody rules under PACE and Code C. Sources included.',
    type: 'website',
    url: `https://${SITE_DOMAIN}/arrested-what-to-do`,
  },
};

export default function Page() {
  const sources: LegalSource[] = [
    {
      id: 'pace-s56',
      label: 'Police and Criminal Evidence Act 1984 (PACE) s.56 (right to have someone informed)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/56',
    },
    {
      id: 'pace-s58',
      label: 'PACE s.58 (right to legal advice)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/58',
    },
    {
      id: 'pace-s41',
      label: 'PACE s.41 (limits on detention without charge)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/41',
    },
    {
      id: 'pace-s42',
      label: 'PACE s.42 (authorisation of continued detention by superintendent)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/42',
    },
    {
      id: 'pace-s43',
      label: 'PACE s.43 (warrants of further detention)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/43',
    },
    {
      id: 'pace-s44',
      label: 'PACE s.44 (extension of warrants of further detention)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/44',
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
    {
      id: 'govuk-arrested',
      label: 'GOV.UK: Arrested? Your rights',
      href: 'https://www.gov.uk/arrested-your-rights',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Arrested: what to do at the police station</h1>
          <p className="text-lg text-slate-700 mb-8">
            This is general information for England &amp; Wales. If you are under arrest or invited for interview, get advice on your specific situation.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-10 rounded-r-lg">
            <p className="text-slate-900">
              <strong>Quick Answer:</strong> Ask for a solicitor (PACE s.58).<Ref n={2} /> Ask for someone to be informed you are in custody (PACE s.56).<Ref n={1} /> The practical rules on detention and interviews are in PACE Code C.<Ref n={7} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>5 practical steps</h2>
            <ol>
              <li>
                <strong>Ask for legal advice</strong> as soon as you can (PACE s.58).<Ref n={2} />
              </li>
              <li>
                <strong>Ask for someone to be informed</strong> (PACE s.56).<Ref n={1} />
              </li>
              <li>
                <strong>Do not guess or “fill in gaps”</strong> if you are asked questions before you have advice.
              </li>
              <li>
                <strong>Understand the caution/silence risk</strong>: in some circumstances, a court may draw adverse inferences where you later rely on facts you did not mention when questioned under caution (CJPOA 1994 s.34).<Ref n={8} />
              </li>
              <li>
                <strong>Be aware of detention time limits</strong>: PACE sets a 24-hour standard limit, with statutory extension routes in certain cases (PACE ss.41–44).<Ref n={3} /> <Ref n={4} /> <Ref n={5} /> <Ref n={6} />
              </li>
            </ol>

            <h2>Related guides</h2>
            <ul>
              <li>
                <Link href="/police-custody-rights">Police custody rights (detailed)</Link>
              </li>
              <li>
                <Link href="/police-interview-rights">Police interview rights (PACE Code C)</Link>
              </li>
              <li>
                <Link href="/custody-time-limits">Custody time limits (PACE)</Link>
              </li>
              <li>
                <Link href="/no-comment-interview">No comment interview: risks and strategy</Link>
              </li>
            </ul>

            <p>
              You can also read GOV.UK’s overview of arrest rights and what to expect.<Ref n={9} />
            </p>

            <LegalReferences sources={sources} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
