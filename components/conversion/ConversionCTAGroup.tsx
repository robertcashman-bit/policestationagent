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
      <Link href={`${PATH_VOLUNTARY}#request`} className="btn-navy text-sm px-5 py-3 rounded-lg">
        Request voluntary interview representation
      </Link>
      <Link
        href={PATH_CUSTODY}
        className="inline-flex items-center justify-center rounded-lg bg-destructive px-5 py-3 text-sm font-bold text-white hover:bg-red-800"
      >
        Current custody pathway
      </Link>
      <Link
        href={PATH_AGENCY}
        className="inline-flex items-center justify-center rounded-lg border-2 border-accent bg-accent/10 px-5 py-3 text-sm font-bold text-accent-foreground hover:bg-accent/20"
      >
        Agency cover for solicitors
      </Link>
    </div>
  );
}
