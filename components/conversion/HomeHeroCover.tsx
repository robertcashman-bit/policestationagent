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
        <p className="text-xs uppercase tracking-wide text-blue-200 mb-3">
          Kent &amp; Medway — NOT the police
        </p>
        <h1 id="home-hero-heading" className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          Police Station Cover in Kent &amp; Medway
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-3 max-w-3xl mx-auto">
          Custody attendance and voluntary interview representation for criminal defence firms — and
          free legal advice for clients in custody or booked for interview.
        </p>
        <p className="text-sm text-blue-200 mb-8 max-w-2xl mx-auto">
          Robert Cashman, solicitor at Tuckers Solicitors LLP. Extended-hours cover across Kent
          custody suites including Medway and North Kent (Gravesend).
        </p>
        <div className="flex justify-center mb-6">
          <ConversionCTAGroup layout="stacked" className="max-w-xl" />
        </div>
        <p className="text-sm text-blue-200">
          Firms: see{" "}
          <Link href="/for-solicitors" className="text-amber-300 font-semibold hover:underline">
            police station cover for solicitors
          </Link>{" "}
          or{" "}
          <Link href="/dscc-and-custody-record-support" className="text-amber-300 font-semibold hover:underline">
            DSCC &amp; custody record guide
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
