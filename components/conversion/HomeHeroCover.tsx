"use client";

import { CHROME_HERO_EYEBROW } from "@/config/contact";

/**
 * Compact hero: brand + framing only.
 * Three pathways are the first-screen job in HomePathwaySection — no competing CTAs here.
 */
export function HomeHeroCover() {
  return (
    <section
      className="relative overflow-hidden hero-navy text-white pt-10 pb-8 md:pt-14 md:pb-10"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="font-display text-[1.85rem] font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl animate-fade-up">
          Police Station Agent
        </p>
        <div className="accent-rule mt-3 origin-left animate-accent-draw" aria-hidden="true" />
        <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent-light sm:tracking-[0.18em]">
          {CHROME_HERO_EYEBROW}
        </p>
        <h1
          id="home-hero-heading"
          className="mt-2 max-w-measure font-display text-[1.45rem] font-bold leading-[1.15] text-white sm:text-3xl md:text-4xl"
        >
          Police station representation when it matters
        </h1>
        <p className="mt-3 max-w-measure text-sm leading-relaxed text-white/85 md:text-base">
          Fast, experienced criminal defence for current Kent custody and forthcoming voluntary
          interviews under caution — plus reliable agency cover for defence firms.
        </p>

        <div className="mt-6 max-w-xl border-l-2 border-accent/50 pl-4 md:pl-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
            Need the police?
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/80">
            This site is for solicitor representation. For official police assistance use{" "}
            <a href="tel:999" className="font-bold text-accent-light underline underline-offset-2">
              999
            </a>{" "}
            or{" "}
            <a href="tel:101" className="font-bold text-accent-light underline underline-offset-2">
              101
            </a>
            — then choose a pathway if you need a defence solicitor.
          </p>
        </div>
      </div>
    </section>
  );
}
