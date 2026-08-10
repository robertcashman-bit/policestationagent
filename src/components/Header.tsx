"use client";

import { useState } from "react";
import Link from "next/link";
import { CustodyNoteLogo } from "./CustodyNoteLogo";

const nav = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Download", href: "/download" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-custody-slate/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-custody-light/10 dark:bg-custody-navy/95 dark:supports-[backdrop-filter]:dark:bg-custody-navy/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-custody-navy dark:text-white"
        >
          <CustodyNoteLogo className="h-8 w-8 shrink-0" />
          <span>Custody Note</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-custody-slate transition-colors hover:text-custody-accent dark:text-custody-light/90 dark:hover:text-custody-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/trial"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-custody-slate transition-colors hover:bg-custody-light hover:text-custody-navy dark:text-custody-light/90 dark:hover:bg-custody-slate dark:hover:text-white sm:inline-flex"
          >
            Start trial
          </Link>
          <Link
            href="/buy"
            className="hidden rounded-lg bg-custody-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-custody-accent sm:inline-flex"
          >
            Buy
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-custody-slate hover:bg-custody-light dark:text-custody-light/90 dark:hover:bg-custody-slate md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav
          className="border-t border-custody-slate/10 bg-white px-4 pb-4 pt-2 dark:border-custody-light/5 dark:bg-custody-navy md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-custody-slate transition-colors hover:bg-custody-light hover:text-custody-navy dark:text-custody-light/90 dark:hover:bg-custody-slate dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-custody-slate/10 dark:border-custody-light/10" />
            <Link
              href="/trial"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-custody-slate transition-colors hover:bg-custody-light dark:text-custody-light/90 dark:hover:bg-custody-slate"
            >
              Start trial
            </Link>
            <Link
              href="/buy"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-custody-blue px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-custody-accent"
            >
              Buy
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
