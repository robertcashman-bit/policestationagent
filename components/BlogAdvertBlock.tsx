/**
 * MANDATORY ADVERT BLOCK — pathway CTAs only (no generic paid-call CTA).
 */

import Link from "next/link";

type Props = {
  hideDigits?: boolean;
};

export default function BlogAdvertBlock(_props: Props = {}) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        Police-station Legal Aid representation in Kent
      </h3>

      <p className="text-slate-700 mb-4">
        <strong>Robert Cashman</strong> is a qualified criminal solicitor and accredited duty
        solicitor. Legal services at the police station are provided through{" "}
        <strong>Tuckers Solicitors LLP</strong> (SRA ID: 127795). This is a private defence website
        — <strong>NOT Kent Police</strong>.
      </p>

      <p className="text-slate-700 mb-4">
        Advice connected with an active police interview under caution is normally available under
        police-station Legal Aid. This is not a free general legal advice telephone service for
        historic or unrelated matters.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          href="/start/voluntary-interview#request"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900 font-semibold transition-colors min-h-[44px]"
        >
          Have the police invited you to an interview? Request representation
        </Link>
        <Link
          href="/current-custody"
          className="inline-flex items-center justify-center px-6 py-3 border-2 border-red-700 text-red-800 rounded-md hover:bg-red-50 font-semibold transition-colors min-h-[44px]"
        >
          Is someone detained now? Check criteria
        </Link>
        <Link
          href="/for-solicitors"
          className="inline-flex items-center justify-center px-6 py-3 border-2 border-amber-600 text-amber-950 rounded-md hover:bg-amber-50 font-semibold transition-colors min-h-[44px]"
        >
          Need police station cover? Send agency instructions
        </Link>
      </div>

      <p className="text-sm text-slate-600 mt-4">
        For police assistance call 101, or 999 in an emergency. We cannot transfer calls to the
        police.
      </p>
    </div>
  );
}
