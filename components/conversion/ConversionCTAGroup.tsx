"use client";

import Link from "next/link";
import {
  PATH_AGENCY,
  PATH_CUSTODY,
  PATH_VOLUNTARY,
} from "@/config/enquiry-paths";

type Props = {
  layout?: "horizontal" | "stacked";
  className?: string;
  /** Kept for call-site compatibility; phone digits are never shown here. */
  forceHideDigits?: boolean;
};

export function ConversionCTAGroup({
  layout = "horizontal",
  className = "",
  forceHideDigits: _forceHideDigits = false,
}: Props) {
  const flex = layout === "stacked" ? "flex-col" : "flex-col sm:flex-row";

  return (
    <div className={`flex flex-wrap gap-3 ${flex} ${className}`} data-nosnippet>
      <Link
        href={`${PATH_VOLUNTARY}#request`}
        className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
      >
        Request voluntary interview representation
      </Link>
      <Link
        href={PATH_CUSTODY}
        className="inline-flex items-center justify-center rounded-lg bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800"
      >
        Current custody pathway
      </Link>
      <Link
        href={PATH_AGENCY}
        className="inline-flex items-center justify-center rounded-lg border-2 border-amber-600 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-950 hover:bg-amber-100"
      >
        Agency cover for solicitors
      </Link>
    </div>
  );
}
