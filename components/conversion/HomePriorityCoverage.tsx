import Link from "next/link";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";

/**
 * High-detail Kent county outline projected from OpenStreetMap / Nominatim
 * administrative boundary (viewBox 0 0 480 400). Station pins use real lat/lon.
 */
const KENT_OUTLINE_PATH =
  "M20.0 190.7 L25.9 209.9 L23.9 215.5 L26.6 229.0 L25.3 234.0 L52.9 231.2 L59.9 235.7 L56.5 239.0 L56.5 245.7 L62.8 251.0 L79.8 245.3 L95.1 252.9 L94.6 248.0 L110.5 246.2 L112.0 249.4 L110.3 253.0 L113.4 257.2 L121.0 257.9 L118.4 261.3 L118.4 270.7 L127.8 268.1 L135.0 272.5 L133.9 278.5 L137.2 282.2 L155.8 292.7 L154.3 302.0 L156.1 304.5 L176.4 310.0 L177.7 316.7 L186.8 321.5 L204.2 312.4 L207.3 316.2 L214.8 312.4 L219.6 321.6 L228.8 327.7 L239.6 323.3 L251.1 329.4 L250.7 339.1 L252.9 338.0 L261.8 360.2 L270.6 350.3 L275.1 353.1 L278.8 365.7 L274.1 372.7 L311.2 379.8 L314.1 377.6 L314.9 368.3 L311.7 338.3 L312.7 325.6 L330.3 294.7 L350.0 281.1 L380.5 275.8 L378.4 273.9 L390.1 261.4 L421.6 253.5 L417.1 248.3 L424.9 243.4 L426.4 247.0 L426.2 241.5 L437.5 235.3 L443.3 224.7 L445.9 213.6 L445.6 179.2 L439.4 147.8 L439.8 123.3 L453.3 117.9 L456.7 110.0 L459.9 85.1 L453.5 72.6 L398.1 85.8 L386.6 82.8 L331.3 92.4 L330.5 88.6 L330.8 92.3 L320.9 98.7 L308.8 99.1 L310.9 91.2 L303.8 73.8 L291.3 61.5 L238.9 40.9 L233.6 51.7 L212.4 56.9 L206.8 73.9 L207.1 80.9 L203.8 85.1 L203.0 91.2 L206.6 93.0 L199.0 112.0 L184.4 110.4 L178.4 117.2 L166.5 107.7 L165.6 100.2 L151.1 91.5 L149.0 94.4 L151.3 101.9 L148.8 104.5 L150.3 109.2 L132.9 105.9 L143.3 79.3 L150.2 77.2 L149.8 72.9 L154.7 72.9 L157.0 63.6 L161.4 62.1 L161.0 44.5 L150.6 32.7 L137.4 40.9 L117.8 41.1 L113.3 39.1 L107.5 27.9 L95.2 35.5 L79.0 20.0 L75.2 24.5 L72.7 37.6 L57.3 54.5 L55.7 66.7 L60.0 76.5 L55.4 76.3 L56.8 90.9 L52.1 106.9 L46.3 107.0 L46.2 116.1 L36.0 124.7 L35.3 131.2 L37.9 136.8 L36.2 139.1 L22.7 139.4 L27.7 167.6 L20.0 190.7 Z";

type LabelSide = "left" | "right" | "top" | "bottom";

const PRIORITY_STATIONS = [
  {
    href: "/police-station-rep-gravesend",
    title: "North Kent (Gravesend)",
    short: "Gravesend",
    detail: "Thames Way — 24-hour custody",
    x: 124.6,
    y: 45.7,
    label: "top" as LabelSide,
  },
  {
    href: "/police-station-rep-medway",
    title: "Medway",
    short: "Medway",
    detail: "Purser Way — 24-hour custody",
    x: 183.3,
    y: 84.4,
    label: "right" as LabelSide,
  },
  {
    href: "/police-station-rep-tonbridge",
    title: "Tonbridge",
    short: "Tonbridge",
    detail: "West Kent — custody & interviews",
    x: 94.5,
    y: 200.9,
    label: "left" as LabelSide,
  },
] as const;

const SECONDARY_STATIONS = [
  { name: "Maidstone (VAI)", x: 171.8, y: 153.6, label: "right" as LabelSide },
  { name: "Sittingbourne", x: 237.3, y: 109.6, label: "top" as LabelSide },
  { name: "Canterbury", x: 344.7, y: 147.3, label: "top" as LabelSide },
  { name: "Margate", x: 439.6, y: 78.7, label: "left" as LabelSide },
  { name: "Dover", x: 416.9, y: 242.4, label: "left" as LabelSide },
  { name: "Folkestone", x: 374.1, y: 272.6, label: "left" as LabelSide },
  { name: "Ashford", x: 280.4, y: 231.7, label: "bottom" as LabelSide },
  { name: "Sevenoaks", x: 67.6, y: 152.4, label: "left" as LabelSide },
  { name: "Tunbridge Wells", x: 91.2, y: 240.5, label: "bottom" as LabelSide },
] as const;

const CHIPS = [
  "Canterbury",
  "Folkestone",
  "Ashford",
  "Sittingbourne",
  "Margate",
  "Dover",
  "Sevenoaks",
] as const;

function labelAnchor(side: LabelSide, x: number, y: number, priority: boolean) {
  const gap = priority ? 14 : 10;
  switch (side) {
    case "left":
      return { x: x - gap, y: y + 4, anchor: "end" as const };
    case "right":
      return { x: x + gap, y: y + 4, anchor: "start" as const };
    case "top":
      return { x, y: y - gap - 2, anchor: "middle" as const };
    case "bottom":
      return { x, y: y + gap + 10, anchor: "middle" as const };
  }
}

function MapPin({
  x,
  y,
  priority,
}: {
  x: number;
  y: number;
  priority: boolean;
}) {
  if (priority) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r="11" fill="#C9A227" fillOpacity="0.22" />
        <path
          d="M0 -11 C-6.5 -11 -11 -6.2 -11 0 C-11 7.2 0 16 0 16 S11 7.2 11 0 C11 -6.2 6.5 -11 0 -11 Z"
          fill="#C9A227"
          stroke="#8B6914"
          strokeWidth="1"
        />
        <circle cy="-1.5" r="3.2" fill="#1e3a8a" />
      </g>
    );
  }

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="5.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
      <circle r="2" fill="#ffffff" />
    </g>
  );
}

function labelPlateWidth(name: string, priority: boolean) {
  // Approximate serif glyph width for plate sizing
  const per = priority ? 6.4 : 5.4;
  return Math.ceil(name.length * per + (priority ? 18 : 16));
}

function NamedPin({
  name,
  x,
  y,
  side,
  priority,
  href,
  title,
}: {
  name: string;
  x: number;
  y: number;
  side: LabelSide;
  priority: boolean;
  href?: string;
  title?: string;
}) {
  const a = labelAnchor(side, x, y, priority);
  const plateW = labelPlateWidth(name, priority);
  const plateH = priority ? 18 : 15;
  const plateX =
    a.anchor === "end" ? a.x - plateW : a.anchor === "middle" ? a.x - plateW / 2 : a.x;
  const plateY = a.y - plateH + 4;
  const textX =
    a.anchor === "end" ? a.x - 7 : a.anchor === "middle" ? a.x : a.x + 7;

  const label = (
    <g>
      <MapPin x={x} y={y} priority={priority} />
      <rect
        x={plateX}
        y={plateY}
        width={plateW}
        height={plateH}
        rx={4}
        fill={priority ? "#1e3a8a" : "#ffffff"}
        fillOpacity={priority ? 0.94 : 0.96}
        stroke={priority ? "#C9A227" : "#2563eb"}
        strokeWidth={priority ? 1 : 0.8}
        strokeOpacity={0.6}
      />
      <text
        x={textX}
        y={a.y + 1}
        textAnchor={a.anchor}
        fill={priority ? "#F8F1D4" : "#1e3a8a"}
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: priority ? 11 : 9.5,
          fontWeight: 700,
        }}
      >
        {name}
      </text>
      {title ? <title>{title}</title> : <title>{name}</title>}
    </g>
  );

  if (href) {
    return (
      <a
        href={href}
        className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {label}
      </a>
    );
  }

  return label;
}

function KentCoverageMap({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-primary/15 bg-[#e8eef8] shadow-card ${className}`}>
      <svg
        viewBox="0 0 480 400"
        className="h-auto w-full"
        role="img"
        aria-label="Colour map of Kent with named police station pins for Gravesend, Medway, Tonbridge and major towns"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="kent-sea" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c7d7f0" />
            <stop offset="55%" stopColor="#dce6f5" />
            <stop offset="100%" stopColor="#e8eef8" />
          </linearGradient>
          <linearGradient id="kent-land" x1="15%" y1="10%" x2="90%" y2="95%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <filter id="kent-soft" x="-8%" y="-8%" width="116%" height="116%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a8a" floodOpacity="0.18" />
          </filter>
        </defs>

        <rect width="480" height="400" fill="url(#kent-sea)" />

        <path
          d={KENT_OUTLINE_PATH}
          fill="url(#kent-land)"
          stroke="#1e3a8a"
          strokeWidth="2.25"
          strokeLinejoin="round"
          filter="url(#kent-soft)"
        />

        {/* Inner highlight edge */}
        <path
          d={KENT_OUTLINE_PATH}
          fill="none"
          stroke="#93c5fd"
          strokeWidth="1"
          strokeOpacity="0.45"
          strokeLinejoin="round"
          transform="translate(0.5 0.5)"
        />

        {SECONDARY_STATIONS.map((s) => (
          <NamedPin key={s.name} name={s.name} x={s.x} y={s.y} side={s.label} priority={false} />
        ))}

        {PRIORITY_STATIONS.map((s) => (
          <NamedPin
            key={s.href}
            name={s.short}
            x={s.x}
            y={s.y}
            side={s.label}
            priority
            href={s.href}
            title={`${s.title} — ${s.detail}`}
          />
        ))}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-primary/10 bg-white/70 px-3 py-2.5 text-[11px] text-slate-600 sm:justify-start sm:px-4">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#C9A227]" aria-hidden="true" />
          Priority custody cover
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2563eb]" aria-hidden="true" />
          Also covering
        </span>
      </div>
    </div>
  );
}

export function HomePriorityCoverage() {
  return (
    <section
      className="section-pad border-t border-border-subtle bg-card"
      aria-labelledby="priority-coverage-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:items-start">
          <div className="relative">
            <p className="section-eyebrow">Coverage</p>
            <h2 id="priority-coverage-heading" className="section-title mt-2">
              Kent police station cover
            </h2>
            <p className="section-lede">
              We attend Kent custody suites and voluntary interview locations. Regular
              extended-hours cover at North Kent (Gravesend) and Tonbridge — two of the
              county&apos;s main 24-hour custody facilities — alongside Medway, Canterbury
              and the rest of Kent. Maidstone custody is closed (voluntary interviews only).
            </p>
            <div className="relative mx-auto mt-8 max-w-xl lg:mx-0 lg:max-w-none">
              <KentCoverageMap />
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="grid gap-3 sm:grid-cols-3">
              {PRIORITY_STATIONS.map((station) => (
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
