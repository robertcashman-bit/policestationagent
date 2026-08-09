import Link from "next/link";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";

const STATIONS = [
  {
    href: "/police-station-rep-gravesend",
    title: "North Kent (Gravesend)",
    detail: "Thames Way — 24-hour custody",
    x: 28,
    y: 22,
  },
  {
    href: "/police-station-rep-medway",
    title: "Medway",
    detail: "Purser Way — 24-hour custody",
    x: 42,
    y: 38,
  },
  {
    href: "/police-station-rep-tonbridge",
    title: "Tonbridge",
    detail: "West Kent — custody & interviews",
    x: 36,
    y: 62,
  },
] as const;

const CHIPS = [
  "Maidstone",
  "Canterbury",
  "Folkestone",
  "Ashford",
  "Sittingbourne",
  "Margate",
  "Dover",
  "Sevenoaks",
] as const;

function KentOutline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M72 28c18-10 38-14 58-8 16 5 32 18 40 34 8 16 10 36 6 54-3 14-2 28 6 40 8 12 14 28 10 42-4 16-18 28-34 34-14 5-30 4-44 10-12 5-26 14-40 12-16-2-28-16-34-30-6-16-8-34-4-50 3-14 2-28-4-40C26 108 22 90 28 74c6-18 24-34 44-46z"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary/25"
      />
      <path
        d="M80 70c22 8 40 22 52 42 10 16 18 36 14 54"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
        className="text-accent/50"
      />
      {STATIONS.map((s) => (
        <g key={s.title}>
          <circle cx={s.x * 2} cy={s.y * 2.2} r="4" className="fill-accent" />
          <circle
            cx={s.x * 2}
            cy={s.y * 2.2}
            r="8"
            className="stroke-accent/40 fill-none"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}

export function HomePriorityCoverage() {
  return (
    <section
      className="section-pad border-t border-border-subtle bg-card"
      aria-labelledby="priority-coverage-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12 lg:items-start">
          <div className="relative">
            <p className="section-eyebrow">Coverage</p>
            <h2 id="priority-coverage-heading" className="section-title mt-2">
              Kent police station cover
            </h2>
            <p className="section-lede">
              We attend all Kent custody suites and voluntary interview locations. Regular
              extended-hours cover at North Kent (Gravesend) and Tonbridge — two of the
              county&apos;s main 24-hour custody facilities — alongside Medway, Maidstone,
              Canterbury and the rest of Kent.
            </p>
            <div className="relative mx-auto mt-8 max-w-xs lg:mx-0">
              <KentOutline className="w-full text-primary" />
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="grid gap-3 sm:grid-cols-3">
              {STATIONS.map((station) => (
                <Link
                  key={station.href}
                  href={station.href}
                  className="rounded-xl border border-border bg-background p-4 lift-hover"
                >
                  <p className="font-display text-base font-bold text-primary">{station.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{station.detail}</p>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Also covering
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-md border border-border-subtle bg-secondary/70 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              <Link
                href="/free-police-station-advice-kent"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                Free police station advice in Kent
              </Link>
              {" · "}
              <Link
                href="/kent-police-station-reps"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                All Kent police station reps
              </Link>
            </p>

            <div className="mt-6 max-w-md">
              <ConversionCTAGroup layout="stacked" className="w-full" />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              All Kent stations:{" "}
              <Link
                href="/locations"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                browse locations
              </Link>{" "}
              or{" "}
              <Link
                href="/police-stations"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                police station directory
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
