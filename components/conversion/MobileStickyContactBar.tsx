"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Routes where the bottom pathway bar would fight the primary on-page CTAs. */
const HIDE_STICKY_PATHS = new Set(["/", ""]);

export function MobileStickyContactBar() {
  const pathname = usePathname() || "/";
  const path = pathname.replace(/\/$/, "") || "/";
  const hidden = HIDE_STICKY_PATHS.has(path) || path === "/admin" || path.startsWith("/admin/");

  useEffect(() => {
    document.body.classList.toggle("has-mobile-sticky-bar", !hidden);
    return () => {
      document.body.classList.remove("has-mobile-sticky-bar");
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-primary/20 bg-primary text-white lg:hidden shadow-[0_-4px_20px_rgb(29_78_216/0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Enquiry pathways"
    >
      <div className="grid grid-cols-3 divide-x divide-white/15">
        <Link
          href="/voluntary-interviews#request"
          className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[48px] hover:bg-white/5"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-accent-light">
            Voluntary
          </span>
          <span className="text-xs font-bold leading-tight text-center">Interview</span>
        </Link>
        <Link
          href="/current-custody"
          className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[48px] hover:bg-white/5"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-accent-light">
            Current
          </span>
          <span className="text-xs font-bold leading-tight text-center">Custody</span>
        </Link>
        <Link
          href="/for-solicitors"
          className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[48px] hover:bg-white/5"
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
