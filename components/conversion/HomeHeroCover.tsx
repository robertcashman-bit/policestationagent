"use client";

import Link from "next/link";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";

export function HomeHeroCover() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white pt-28 pb-20 md:pt-32 md:pb-24"
      aria-labelledby="home-hero-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <p className="text-xs uppercase tracking-wide text-white mb-3 font-semibold">
          Kent — NOT the police
        </p>
        <h1 id="home-hero-heading" className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">
          At the police station or booked for interview?
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
          We attend Kent custody suites and voluntary interviews — for people who need free advice
          now, and for defence firms who need reliable cover.
        </p>

        <div className="rounded-xl bg-white p-5 md:p-6 shadow-lg max-w-xl mx-auto text-left">
          <p className="text-slate-800 text-sm md:text-base mb-4">
            Robert Cashman, solicitor at Tuckers Solicitors LLP. Kent-wide cover in the evenings and
            at weekends too — including{" "}
            <Link href="/police-station-rep-gravesend" className="font-semibold text-blue-700 hover:underline">
              Gravesend
            </Link>{" "}
            and{" "}
            <Link href="/police-station-rep-tonbridge" className="font-semibold text-blue-700 hover:underline">
              Tonbridge
            </Link>
            , plus Medway, Maidstone, Canterbury and the rest of Kent.
          </p>
          <ConversionCTAGroup layout="stacked" />
          <p className="text-slate-700 text-sm mt-4">
            Firms: see{" "}
            <Link href="/for-solicitors" className="font-semibold text-blue-700 hover:underline">
              police station cover for solicitors
            </Link>{" "}
            or our{" "}
            <Link href="/dscc-and-custody-record-support" className="font-semibold text-blue-700 hover:underline">
              DSCC &amp; custody record guide
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
