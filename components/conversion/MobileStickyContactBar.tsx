"use client";

import Link from "next/link";

export function MobileStickyContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Enquiry pathways"
    >
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <Link
          href="/start/voluntary-interview#request"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 px-1 text-blue-800 min-h-[52px]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide">Voluntary</span>
          <span className="text-xs font-black leading-tight text-center">Interview</span>
        </Link>
        <Link
          href="/current-custody"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 px-1 text-red-800 min-h-[52px]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide">Current</span>
          <span className="text-xs font-black leading-tight text-center">Custody</span>
        </Link>
        <Link
          href="/for-solicitors"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 px-1 text-amber-900 min-h-[52px]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide">For</span>
          <span className="text-xs font-black leading-tight text-center">Solicitors</span>
        </Link>
      </div>
    </div>
  );
}
