"use client";

import Link from "next/link";
import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";
import { CHROME_HERO_EYEBROW } from "@/config/contact";
import { PATH_CONTACT, PATH_VOLUNTARY_LANDING } from "@/config/enquiry-paths";

export function HomeHeroCover() {
  return (
    <section
      className="relative overflow-hidden hero-navy text-white pt-12 pb-14 md:pt-16 md:pb-20"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <p className="text-xs uppercase tracking-[0.14em] text-accent-light mb-3 font-semibold">
          {CHROME_HERO_EYEBROW}
        </p>
        <h1
          id="home-hero-heading"
          className="font-display text-3xl md:text-[2.75rem] lg:text-5xl font-bold mb-4 leading-[1.15] text-white max-w-3xl"
        >
          Police station representation when it matters
        </h1>
        <p className="text-base md:text-lg text-white/85 mb-6 max-w-2xl leading-relaxed">
          Fast, experienced criminal defence for current Kent custody and forthcoming voluntary
          interviews under caution — plus reliable agency cover for defence firms.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link href={PATH_CONTACT} className="btn-gold">
            Find representation
          </Link>
          <Link href={`${PATH_VOLUNTARY_LANDING}#request`} className="btn-ghost-light">
            Booked interview
          </Link>
          <Link href="/coverage" className="btn-ghost-light">
            View coverage
          </Link>
        </div>

        <div className="rounded-lg border border-white/15 bg-black/25 backdrop-blur-[2px] p-4 md:p-5 mb-8 max-w-3xl">
          <p className="font-semibold text-accent-light mb-1.5 text-sm tracking-wide uppercase">
            Need the police?
          </p>
          <p className="text-sm text-white/80 leading-relaxed mb-3">
            This site is for solicitor representation. For official police assistance use the
            numbers below — then choose a pathway if you need a defence solicitor.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white">
            <li>
              Emergency:{" "}
              <a href="tel:999" className="font-bold text-accent-light underline underline-offset-2">
                999
              </a>
            </li>
            <li>
              Non-emergency:{" "}
              <a href="tel:101" className="font-bold text-accent-light underline underline-offset-2">
                101
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-card p-5 md:p-6 shadow-elevated text-left border border-accent/20">
          <AudiencePathSelector
            heading="Choose your pathway"
            subheading="Select the route that matches your situation. The solicitor telephone is shown only after you qualify for current custody, or on the agency page for firms."
          />
        </div>
      </div>
    </section>
  );
}
