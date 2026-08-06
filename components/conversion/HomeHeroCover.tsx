"use client";

import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";
import { CHROME_HERO_EYEBROW } from "@/config/contact";

export function HomeHeroCover() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white pt-16 pb-16 md:pt-20 md:pb-20"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.18),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <p className="text-xs uppercase tracking-wide text-amber-200/90 mb-3 font-semibold">
          {CHROME_HERO_EYEBROW}
        </p>
        <h1
          id="home-hero-heading"
          className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white max-w-3xl"
        >
          Do you need a solicitor for a police interview?
        </h1>
        <p className="text-base md:text-lg text-blue-100 mb-6 max-w-3xl">
          Independent legal representation for people in current Kent police custody or attending a
          forthcoming voluntary interview under caution. Police station agency cover is also
          available for criminal defence firms.
        </p>

        <div className="rounded-xl border border-white/15 bg-slate-950/50 p-4 md:p-5 mb-8 max-w-3xl">
          <p className="font-semibold text-slate-100 mb-2">Looking for the police?</p>
          <p className="text-sm text-slate-200 leading-relaxed">
            We’re independent criminal defence solicitors — not Kent Police. For police help use the
            official numbers below; for solicitor help with custody or a booked interview, choose a
            pathway underneath.
          </p>
          <ul className="mt-3 text-sm text-slate-100 space-y-1.5">
            <li>
              Emergency:{" "}
              <a href="tel:999" className="font-bold text-white underline">
                999
              </a>
            </li>
            <li>
              Non-emergency police:{" "}
              <a href="tel:101" className="font-bold text-white underline">
                101
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-5 md:p-6 shadow-xl text-left">
          <AudiencePathSelector
            heading="Choose your pathway"
            subheading="Select the route that matches your situation. The solicitor telephone is not shown until you qualify for current custody or enter the agency page."
          />
        </div>
      </div>
    </section>
  );
}
