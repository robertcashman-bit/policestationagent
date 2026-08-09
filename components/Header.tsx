"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PATH_AGENCY,
  PATH_CONTACT,
  PATH_CUSTODY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";
import { CHROME_BRAND_TAGLINE, CHROME_HELP_STRIP } from "@/config/contact";

const NAV = [
  { href: "/", label: "Home" },
  { href: PATH_VOLUNTARY_LANDING, label: "Voluntary interviews" },
  { href: PATH_CUSTODY, label: "Current custody" },
  { href: PATH_AGENCY, label: "For solicitors" },
  { href: "/coverage", label: "Areas Covered" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: PATH_CONTACT, label: "Contact" },
] as const;

export default function Header({
  forceHidePhone: _forceHidePhone = false,
}: {
  forceHidePhone?: boolean;
} = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border bg-card shadow-card">
      <div className="hidden sm:block bg-primary text-primary-foreground text-xs sm:text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold tracking-wide text-white/90">{CHROME_HELP_STRIP}</p>
          <Link
            href={PATH_AGENCY}
            className="text-accent-light hover:text-white font-semibold underline-offset-2 hover:underline"
          >
            For defence firms
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3.5 border-b border-border/80">
          <Link
            href="/"
            className="block group"
            aria-label="Police Station Agent home page"
          >
            <div className="font-display text-lg sm:text-xl font-bold text-primary leading-tight group-hover:text-primary-light transition-colors">
              Police Station Agent
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 leading-tight mt-0.5">
              {CHROME_BRAND_TAGLINE}
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link href={PATH_CONTACT} className="btn-gold hidden sm:inline-flex lg:hidden">
              Get a solicitor
            </Link>
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 bg-primary hover:bg-primary-light text-white rounded-md shadow-md"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
                className="px-3 py-2 text-sm text-slate-700 hover:text-primary font-medium rounded-md hover:bg-secondary whitespace-nowrap transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href={PATH_CONTACT} className="btn-gold">
            Get a solicitor
          </Link>
        </nav>
      </div>

      {/* Pathway shortcuts live on MobileStickyContactBar — avoid duplicating here. */}

      {mobileMenuOpen ? (
        <div className="lg:hidden border-t border-border bg-card shadow-elevated">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-secondary font-medium rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={PATH_CONTACT}
              className="btn-gold mx-4 mt-2 w-[calc(100%-2rem)]"
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
