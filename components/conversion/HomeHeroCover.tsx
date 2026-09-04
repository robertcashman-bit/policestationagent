"use client";

import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";

/**
 * First-screen job: VA-first for search visitors, clear not-police, three pathways.
 * Soften 101 so it does not compete with the solicitor CTAs in the first viewport.
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
          Got a police interview letter? Get a free solicitor first
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-snug text-white/90 sm:text-[0.95rem]">
          We are criminal defence solicitors — <strong className="text-white">not Kent Police</strong>.
          If you have a letter, email or call about a voluntary interview under caution, use the
          route below.
        </p>

        <div id="pathways" className="mt-3 scroll-mt-2 sm:mt-4 md:mt-5">
          <AudiencePathSelector
            variant="firstScreen"
            heading="Three routes. Voluntary interview is the usual path for letters."
            subheading="Pick the route that matches your situation."
            highlightVoluntary
          />
        </div>

        <p className="mt-3 text-[0.7rem] leading-snug text-white/55 sm:text-xs">
          Need the police instead? Emergency 999 · non-emergency 101 — we cannot take crime reports
          or police enquiries.
        </p>
      </div>
    </section>
  );
}
