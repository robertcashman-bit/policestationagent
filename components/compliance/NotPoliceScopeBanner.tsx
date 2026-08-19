import Link from "next/link";
import { SEO_NOT_POLICE, SERVICE_SCOPE_SHORT } from "@/config/contact";

/**
 * Single slim sitewide trust line: SRA provider + not-police + scope.
 * Replaces the old stacked ComplianceStrip + fat disclaimer bars.
 */
export default function NotPoliceScopeBanner() {
  return (
    <div
      className="border-b border-primary/30 bg-primary-dark text-white"
      role="note"
      aria-label="Who provides legal services and who we help"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 px-3 py-1 text-center text-[10px] leading-snug text-white/90 sm:px-4 sm:text-[11px]">
        <Link
          href="/regulatory-information"
          className="font-semibold text-accent-light underline-offset-2 hover:underline"
        >
          Legal services via Tuckers Solicitors LLP (SRA 127795)
        </Link>
        <span className="text-white/40" aria-hidden="true">
          ·
        </span>
        <span>
          <strong className="font-semibold text-white">{SEO_NOT_POLICE}</strong>{" "}
          <span className="text-white/75">{SERVICE_SCOPE_SHORT}</span>
        </span>
      </div>
    </div>
  );
}
