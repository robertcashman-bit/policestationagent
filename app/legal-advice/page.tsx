import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NeedAdviceNowBlock from '@/components/legal-advice/NeedAdviceNowBlock';
import { LEGAL_ADVICE_ARTICLE_DISCLAIMER_INTRO, LEGAL_ADVICE_INFORMATION_BASIS } from '@/lib/legalCopy';
import { getLegalAdviceArticlesByCategory, legalAdvicePath } from '@/lib/legal-advice/content';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Police Station Legal Advice Hub | UK Legal Information',
  description:
    'General information about your rights during police interviews, arrest, detention, and bail in England and Wales. Police station procedures explained.',
  path: '/legal-advice',
  keywords: ['police station', 'legal information', 'police interview', 'arrest', 'PACE', 'legal rights', 'UK law'],
  openGraph: {
    title: 'Police Station Legal Advice Hub',
    description: 'General information about your rights during police interviews and procedures in England and Wales.',
  },
});

export default function LegalAdviceIndexPage() {
  const articlesByCategory = getLegalAdviceArticlesByCategory();

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Police Station Legal Advice Hub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          General information about your legal rights during police interviews, arrest, and detention
          in England and Wales.
        </p>
      </header>

      <div className="space-y-12">
        {Object.entries(articlesByCategory).map(([category, pages]) => (
          <section key={category} className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="text-3xl font-semibold">{category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <Card key={page.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">
                      <Link
                        href={legalAdvicePath(page)}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {page.h1}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700">{page.description}</CardDescription>
                    <Link
                      href={legalAdvicePath(page)}
                      className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Read more &rarr;
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-gray-50 rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-semibold">About This Information</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            This hub provides {LEGAL_ADVICE_INFORMATION_BASIS} about rights during police station
            procedures in England and Wales.
          </p>
          <p>
            <strong>Remember:</strong> You have the right to free, independent legal advice at any
            police station. Ask the custody officer to arrange the duty solicitor or your own
            solicitor.
          </p>
        </div>
      </section>

      <NeedAdviceNowBlock />

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-xl font-semibold">Legal Disclaimer</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <p>{LEGAL_ADVICE_ARTICLE_DISCLAIMER_INTRO}</p>
          <p>
            If you are facing a police interview, have been arrested, or need advice about your
            specific situation, ask the custody officer to arrange free, independent legal advice
            from a solicitor.
          </p>
          <p>
            We accept no liability for any loss or damage arising from reliance on the information
            contained on this website. Laws and procedures may change, and individual circumstances
            vary.
          </p>
        </div>
      </section>
    </div>
  );
}
