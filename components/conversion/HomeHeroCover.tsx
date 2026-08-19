"use client";

import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";

/**
 * First-screen job: short identity, one calm sentence, three pathways — no scroll.
 * Brand lives in the header; do not repeat it as a giant hero wordmark.
 */
export function HomeHeroCover() {
  return (
    <section
      className="relative overflow-hidden hero-navy text-white pt-3 pb-4 sm:pt-4 sm:pb-5 md:pt-6 md:pb-8"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent-light sm:text-[0.7rem]">
          Criminal defence solicitor · Kent
        </p>
        <h1
          id="home-hero-heading"
          className="mt-1 max-w-measure font-display text-[1.25rem] font-bold leading-tight text-white sm:text-2xl md:text-[1.75rem]"
        >
          Police station representation when it matters
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-snug text-white/85 sm:text-[0.95rem]">
          Choose your route for current Kent custody, a booked voluntary interview, or solicitor
          agency cover. Need the police? Use{" "}
          <a href="tel:999" className="font-bold text-accent-light underline underline-offset-2">
            999
          </a>{" "}
          or{" "}
          <a href="tel:101" className="font-bold text-accent-light underline underline-offset-2">
            101
          </a>
          .
        </p>

        <div id="pathways" className="mt-3 scroll-mt-2 sm:mt-4 md:mt-5">
          <AudiencePathSelector
            variant="firstScreen"
            heading="Three routes. One clear next step."
            subheading="Pick the route that matches your situation."
          />
        </div>
      </div>
    </section>
  );
}
