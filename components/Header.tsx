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

type NavItem = {
  href: string;
  label: string;
  group: "pathways" | "explore";
};

/**
 * Fuller site navigation — no Custody Note product promos in header chrome.
 * CN Store / Mac CTAs live in the footer Network/tools strip and homepage panels only.
 */
const NAV: NavItem[] = [
  { href: PATH_VOLUNTARY_LANDING, label: "Voluntary interviews", group: "pathways" },
  { href: PATH_CUSTODY, label: "Current custody", group: "pathways" },
  { href: PATH_AGENCY, label: "For solicitors", group: "pathways" },
  { href: "/coverage", label: "Coverage", group: "explore" },
  { href: "/police-custody-rights", label: "Your rights", group: "explore" },
  { href: "/faq", label: "FAQ", group: "explore" },
  { href: "/about", label: "About", group: "explore" },
  { href: "/canwehelp", label: "Can we help?", group: "explore" },
  { href: PATH_CONTACT, label: "Contact", group: "explore" },
];

const PATHWAY_NAV = NAV.filter((i) => i.group === "pathways");
const EXPLORE_NAV = NAV.filter((i) => i.group === "explore");

export default function Header({
  forceHidePhone: _forceHidePhone = false,
}: {
  forceHidePhone?: boolean;
} = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border bg-card shadow-card">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-4 py-2.5 lg:py-3">
          <Link
            href="/"
            className="group block min-w-0"
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
            className="hidden items-center gap-0.5 xl:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link href={PATH_CONTACT} className="btn-gold ml-2 !min-h-9 !px-3.5 !text-sm">
              Get a solicitor
            </Link>
          </nav>

          <nav
            className="hidden items-center gap-0.5 lg:flex xl:hidden"
            role="navigation"
            aria-label="Primary navigation"
          >
            {PATHWAY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-2 py-1.5 text-[12px] font-medium text-slate-700 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link href={PATH_CONTACT} className="btn-gold ml-1.5 !min-h-9 !px-3 !text-sm">
              Get a solicitor
            </Link>
            <button
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary text-primary transition-colors hover:bg-secondary/80"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close more menu" : "Open more menu"}
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
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={PATH_CONTACT}
              className="btn-gold hidden !min-h-9 !px-3 !text-sm sm:inline-flex"
            >
              Get a solicitor
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition-colors hover:bg-primary-light"
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
        <div className="border-t border-border bg-card shadow-elevated xl:hidden">
          <nav className="mx-auto max-w-7xl space-y-4 px-3 py-3" aria-label="Mobile navigation">
            <div className="lg:hidden">
              <p className="px-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent-dark">
                Pathways
              </p>
              <div className="space-y-0.5">
                {PATHWAY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-border-subtle pt-3 lg:border-0 lg:pt-0">
              <p className="px-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent-dark">
                Explore
              </p>
              <div className="space-y-0.5">
                {EXPLORE_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={PATH_CONTACT}
              className="btn-gold mx-3 mt-1 w-[calc(100%-1.5rem)] lg:hidden"
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
