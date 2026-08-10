/**
 * HEADER COMPLIANCE STRIP COMPONENT
 *
 * Appears on every page, above nav, desktop + mobile.
 * Links to regulatory information page/section.
 */

import Link from "next/link";

export default function ComplianceStrip() {
  return (
    <div className="bg-primary-dark text-white text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <Link
          href="/regulatory-information"
          className="text-white underline transition-opacity hover:opacity-90"
        >
          Legal services provided by Tuckers Solicitors LLP (SRA ID: 127795).
        </Link>
      </div>
    </div>
  );
}
