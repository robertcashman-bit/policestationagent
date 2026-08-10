import { SITE } from '@/lib/site';
import { LEGAL_ADVICE_ARTICLE_DISCLAIMER_INTRO } from '@/lib/legalCopy';

export default function LegalAdviceArticleDisclaimer() {
  return (
    <section className="border-t pt-8 space-y-4 bg-gray-50 p-6 rounded-lg mt-8">
      <h2 className="text-xl font-semibold">Legal Disclaimer</h2>
      <div className="space-y-3 text-sm text-gray-700">
        <p>{LEGAL_ADVICE_ARTICLE_DISCLAIMER_INTRO}</p>
        <p>
          If you are at a police station or facing a police interview, ask the custody officer to
          arrange free, independent legal advice from a solicitor. {SITE.name} cannot assist with
          real cases.
        </p>
        <p className="text-xs text-gray-600 italic mt-4">Last updated: {SITE.legalUpdated}.</p>
      </div>
    </section>
  );
}
