"use client";

import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";

/**
 * First-screen job: two public pathways (VA + custody) + one short trust line.
 * No hero photo. Agency cover stays in nav / firm section / footer — not above the fold.
 */
export function HomeHeroCover() {
  return (
    <section
      className="relative overflow-hidden hero-navy text-white pt-4 pb-5 sm:pt-5 sm:pb-6 md:pt-8 md:pb-10"
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
          className="mt-1.5 max-w-measure font-display text-[1.35rem] font-bold leading-tight text-white sm:text-2xl md:text-[1.85rem]"
        >
          Got a police interview letter? Get a free solicitor first
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
          We are criminal defence solicitors — <strong className="text-white">not Kent Police</strong>.
          If you have a letter, email or call about a voluntary interview under caution, use the
          route below.
        </p>

        <div id="pathways" className="mt-5 scroll-mt-2 sm:mt-6 md:mt-7">
          <AudiencePathSelector
            variant="firstScreen"
            heading="Two clear routes. Voluntary interview is the usual path for letters."
            subheading="Pick the route that matches your situation."
            highlightVoluntary
          />
        </div>

        <p className="mt-5 text-sm leading-snug text-white/70 sm:mt-6 sm:text-[0.95rem]">
          Independent criminal defence · Legal Aid where eligible · Extended hours — not 24/7
        </p>

        <p className="mt-2 text-[0.7rem] leading-snug text-white/45 sm:text-xs">
          Need the police instead? Emergency 999 · non-emergency 101 — we cannot take crime reports
          or police enquiries.
        </p>
      </div>
    </section>
  );
}
