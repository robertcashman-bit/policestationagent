import Link from "next/link";
import { ContextualCTA } from "@/components/conversion/ContextualCTA";

/**
 * Promotional block for blog posts — pathway CTAs, not generic call buttons.
 */
export default function BlogPromotionalBlock() {
  return (
    <div className="mt-16 pt-8 border-t-2 border-slate-200">
      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8 border border-blue-100 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Police Station Advice & Representation
        </h2>
        <p className="text-slate-700 mb-6 leading-relaxed">
          Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795) across Kent. Robert
          Cashman offers police-station Legal Aid representation for active custody and forthcoming
          interviews under caution — not a free general legal advice telephone service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            href="/start/voluntary-interview#request"
            className="inline-flex items-center justify-center min-h-[44px] rounded-md text-sm font-medium h-10 px-6 bg-blue-800 hover:bg-blue-900 text-white shadow-md"
          >
            Have the police invited you to an interview? Request representation
          </Link>
          <Link
            href="/current-custody"
            className="inline-flex items-center justify-center min-h-[44px] rounded-md text-sm font-medium h-10 px-6 border border-red-700 text-red-800 hover:bg-red-50"
          >
            Is someone detained now? Check criteria
          </Link>
        </div>
        <ContextualCTA variant="agency" />
        <p className="text-xs text-slate-500 mt-4">
          Police Station Agent is not Kent Police. For police assistance call 101 or 999 in an
          emergency.
        </p>
      </div>
    </div>
  );
}
