"use client";

import Link from "next/link";

export function MobileStickyContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-primary text-white lg:hidden shadow-[0_-4px_20px_rgb(6_22_40/0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Enquiry pathways"
    >
      <div className="grid grid-cols-3 divide-x divide-white/15">
        <Link
          href="/start/voluntary-interview#request"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 px-1 min-h-[52px] hover:bg-white/5"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-accent-light">
            Voluntary
          </span>
          <span className="text-xs font-bold leading-tight text-center">Interview</span>
        </Link>
        <Link
          href="/current-custody"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 px-1 min-h-[52px] hover:bg-white/5"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-accent-light">
            Current
          </span>
          <span className="text-xs font-bold leading-tight text-center">Custody</span>
        </Link>
        <Link
          href="/for-solicitors"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 px-1 min-h-[52px] hover:bg-white/5"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-accent-light">
            For
          </span>
          <span className="text-xs font-bold leading-tight text-center">Solicitors</span>
        </Link>
      </div>
    </div>
  );
}
