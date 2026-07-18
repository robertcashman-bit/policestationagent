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
          Police station solicitors across Kent
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
          Duty solicitor and voluntary interview solicitor help across Kent — free Legal Aid for
          people in custody or booked under caution, plus police station agent cover for defence
          firms within about 45 minutes of Maidstone. Legal services by Tuckers Solicitors LLP.
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
          <nav className="mt-4 text-sm text-slate-700" aria-label="Core services">
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link href="/services" className="font-semibold text-blue-700 hover:underline">
                  Police station solicitor services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/police-station-representation"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Police station representation (Legal Aid)
                </Link>
              </li>
              <li>
                <Link href="/for-clients" className="font-semibold text-blue-700 hover:underline">
                  Help for clients in custody or interview
                </Link>
              </li>
              <li>
                <Link href="/freelegaladvice" className="font-semibold text-blue-700 hover:underline">
                  Free legal advice at the police station
                </Link>
              </li>
              <li>
                Firms:{" "}
                <Link href="/for-solicitors" className="font-semibold text-blue-700 hover:underline">
                  police station agent cover for solicitors
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
