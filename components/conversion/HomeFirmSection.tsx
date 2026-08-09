import Link from "next/link";

const FIRM_BULLETS = [
  "A duty solicitor on the ground — not only an accredited rep",
  "Clear attendance notes you can put straight on the file and bill from",
  "Agency attendance at police stations within about 45 minutes of Maidstone",
  "Evenings and weekends included",
  "Fixed rates for Legal Aid and private clients — told upfront",
] as const;

export function HomeFirmSection() {
  return (
    <section
      className="section-pad"
      aria-labelledby="firm-cover-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="b2b-panel relative overflow-hidden rounded-2xl border border-white/10 px-6 py-10 text-white shadow-elevated md:px-10 md:py-14">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-30 md:block"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10 md:grid md:grid-cols-[1.4fr_0.85fr] md:gap-12 md:items-start">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-light">
                For criminal defence firms
              </p>
              <h2
                id="firm-cover-heading"
                className="mt-2 font-display text-3xl font-bold text-white md:text-4xl"
              >
                Police station agent cover for solicitors
              </h2>
              <p className="mt-4 max-w-measure text-base leading-relaxed text-white/75 md:text-lg">
                Instruct Robert Cashman for reliable police station agency attendance anywhere
                within about 45 minutes of Maidstone — custody, voluntary interviews, and
                pre-booked attendances.
              </p>
              <ul className="mt-6 space-y-3">
                {FIRM_BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm text-white/85 md:text-base"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-8 md:mt-0 md:border-t-0 md:border-l md:pl-10 md:pt-0"
              data-nosnippet
            >
              <p className="text-xs text-white/55">
                Professional instruction routes — telephone details are on the agency and contact
                pages for firms.
              </p>
              <Link
                href="/contact"
                className="btn-gold"
                data-event="contact_click"
              >
                Instruct cover (Contact)
              </Link>
              <Link
                href="/for-solicitors#firm-enquiry"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/30 bg-white/5 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Firm enquiry form
              </Link>
              <Link
                href="/for-solicitors"
                className="text-center text-sm font-semibold text-accent-light underline-offset-2 hover:underline"
              >
                Full firm services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
