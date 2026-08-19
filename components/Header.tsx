"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PATH_AGENCY,
  PATH_CONTACT,
  PATH_CUSTODY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";
import { CHROME_BRAND_TAGLINE } from "@/config/contact";

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
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-3 py-2 lg:py-2.5">
          <Link
            href="/"
            className="block min-w-0 group"
            aria-label="Police Station Agent home page"
          >
            <div className="font-display text-base font-bold leading-tight text-primary transition-colors group-hover:text-primary-light sm:text-lg">
              Police Station Agent
            </div>
            <div className="mt-0.5 text-[10px] font-semibold leading-tight text-slate-600 sm:text-[11px]">
              {CHROME_BRAND_TAGLINE}
            </div>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link href={PATH_CONTACT} className="btn-gold ml-2 !min-h-9 !px-3 !text-sm">
              Get a solicitor
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href={PATH_CONTACT} className="btn-gold hidden !min-h-9 !px-3 !text-sm sm:inline-flex">
              Get a solicitor
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md hover:bg-primary-light"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-border bg-card shadow-elevated lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-3 py-2" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2.5 font-medium text-foreground hover:bg-secondary hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={PATH_CONTACT}
              className="btn-gold mx-3 mt-1 w-[calc(100%-1.5rem)]"
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
