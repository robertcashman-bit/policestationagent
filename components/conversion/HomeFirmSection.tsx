import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";

const FIRM_BULLETS = [
  "Qualified duty solicitor attendance — not just an accredited rep",
  "Detailed attendance notes for your file and LAA billing",
  "All Kent custody suites — Medway, Maidstone, Gravesend, Canterbury, Tonbridge & more",
  "Extended-hours cover including evenings and weekends",
  "Competitive fixed rates for Legal Aid and private client work",
] as const;

export function HomeFirmSection() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-10"
      aria-labelledby="firm-cover-heading"
    >
      <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <p className="text-xs font-semibold tracking-wide text-amber-700 uppercase">
              For criminal defence firms
            </p>
            <h2 id="firm-cover-heading" className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
              Kent police station cover for solicitors
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Instruct Robert Cashman for reliable police station attendance across Kent. Custody,
              voluntary interviews, and pre-booked attendances.
            </p>
            <ul className="mt-4 space-y-2">
              {FIRM_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                  <span className="text-amber-600 font-bold mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 shrink-0 md:min-w-[220px]">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 shadow-md transition-colors"
              data-event="call_click"
            >
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/for-solicitors#firm-enquiry"
              className="inline-flex items-center justify-center rounded-lg border-2 border-amber-500 bg-white hover:bg-amber-50 text-slate-900 font-bold px-6 py-3 transition-colors"
            >
              Firm enquiry form
            </Link>
            <Link
              href="/for-solicitors"
              className="text-center text-sm font-semibold text-blue-700 hover:underline"
            >
              Full firm services →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
