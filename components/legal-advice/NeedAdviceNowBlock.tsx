import { SITE } from '@/lib/site';
import { NO_LEGAL_ADVICE_DISCLAIMER, POLICE_STATION_HELP_TEXT } from '@/lib/legalCopy';

/**
 * Public-facing block for legal-advice articles.
 * Signposts custody-officer route only — never DSCC public phone advice.
 */
export default function NeedAdviceNowBlock() {
  return (
    <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
      <h2 className="text-xl font-semibold mb-3 text-amber-900">If you need legal advice now</h2>
      <p className="text-gray-800 mb-3 leading-relaxed">{POLICE_STATION_HELP_TEXT}</p>
      <p className="text-gray-700 text-sm leading-relaxed">
        {SITE.name} is an online training platform for police station representatives.{' '}
        {NO_LEGAL_ADVICE_DISCLAIMER}
      </p>
    </section>
  );
}
