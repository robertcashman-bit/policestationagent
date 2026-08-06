"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PATH_AGENCY,
  PATH_CONTACT,
  PATH_CUSTODY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";
import {
  CHROME_BRAND_TAGLINE,
  CHROME_HELP_STRIP,
  CHROME_NOT_POLICE_QUIET,
} from "@/config/contact";

const NAV = [
  { href: "/", label: "Home" },
  { href: PATH_VOLUNTARY_LANDING, label: "Voluntary Interviews" },
  { href: PATH_CUSTODY, label: "Current Custody" },
  { href: PATH_AGENCY, label: "For Solicitors" },
  { href: "/coverage", label: "Areas Covered" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: PATH_CONTACT, label: "Contact" },
] as const;

const MOBILE_PATHWAYS = [
  { href: `${PATH_VOLUNTARY_LANDING}#request`, label: "Voluntary interview", tone: "text-blue-800" },
  { href: PATH_CUSTODY, label: "Current custody", tone: "text-red-800" },
  { href: PATH_AGENCY, label: "Solicitor cover", tone: "text-amber-900" },
] as const;

export default function Header({
  forceHidePhone: _forceHidePhone = false,
}: {
  forceHidePhone?: boolean;
} = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-slate-200/60 relative z-50">
      <div className="bg-slate-900 text-white text-xs sm:text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold tracking-wide text-slate-100">{CHROME_HELP_STRIP}</p>
          <Link
            href={PATH_AGENCY}
            className="text-amber-200 hover:text-white font-semibold underline-offset-2 hover:underline"
          >
            For defence firms
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 border-b border-slate-200">
          <Link
            href="/"
            className="block hover:text-blue-600 transition-colors group"
            aria-label="Police Station Agent home page"
          >
            <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
              Police Station Agent
            </div>
            <div className="text-[10px] sm:text-xs font-normal text-slate-700 leading-tight mt-0.5">
              {CHROME_BRAND_TAGLINE}
            </div>
            <div className="text-[10px] sm:text-xs font-normal text-slate-500 leading-tight">
              {CHROME_NOT_POLICE_QUIET}
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={PATH_CONTACT}
              className="hidden sm:inline-flex lg:hidden items-center justify-center min-h-[44px] rounded-md bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm px-4 shadow-md"
            >
              Get a solicitor
            </Link>
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow-md"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <nav
          className="hidden lg:flex items-center justify-between h-14 gap-1"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-0.5 flex-wrap">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium rounded-md hover:bg-slate-50 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={PATH_CONTACT}
            className="inline-flex items-center justify-center min-h-[44px] rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm px-5 shadow-md"
          >
            Get a solicitor
          </Link>
        </nav>
      </div>

      <div className="lg:hidden border-t border-slate-200 bg-slate-50">
        <div className="grid grid-cols-3 divide-x divide-slate-200">
          {MOBILE_PATHWAYS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`flex items-center justify-center min-h-[44px] px-1 py-2 text-[11px] font-bold text-center ${p.tone} hover:bg-white`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-slate-700 hover:text-blue-700 hover:bg-slate-50 font-medium rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={PATH_CONTACT}
              className="block mx-4 mt-2 text-center min-h-[44px] leading-[44px] rounded-md bg-amber-400 text-slate-900 font-extrabold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a solicitor
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
