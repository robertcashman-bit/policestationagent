"use client";

import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";
import { ROBERT_CASHMAN_PHOTO_PATH } from "@/config/site";

/**
 * First-screen job: short identity, face, three pathways — no scroll on 1280×800.
 * Brand lives in the header; do not repeat it as a giant hero wordmark.
 */
export function HomeHeroCover() {
  return (
    <section
      className="relative overflow-hidden hero-navy text-white pt-3 pb-4 sm:pt-4 sm:pb-5 md:pt-5 md:pb-6"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
          <div className="min-w-0 flex-1">
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
          </div>

          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ROBERT_CASHMAN_PHOTO_PATH}
              alt="Robert Cashman, criminal defence solicitor"
              width={160}
              height={160}
              decoding="async"
              className="h-16 w-16 rounded-full object-cover object-top ring-2 ring-accent/80 sm:h-20 sm:w-20 md:h-[7.5rem] md:w-[7.5rem] md:ring-[3px]"
            />
          </div>
        </div>

        <div id="pathways" className="mt-3 scroll-mt-2 sm:mt-3.5 md:mt-4">
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
