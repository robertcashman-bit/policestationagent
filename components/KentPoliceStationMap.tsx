"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  KENT_MAP_BASE,
  KENT_MAP_STATIONS,
  type KentMapStation,
} from "@/lib/kent-station-map-data";

/** High-detail Kent county outline (same projection as homepage coverage map). */
const KENT_OUTLINE_PATH =
  "M20.0 190.7 L25.9 209.9 L23.9 215.5 L26.6 229.0 L25.3 234.0 L52.9 231.2 L59.9 235.7 L56.5 239.0 L56.5 245.7 L62.8 251.0 L79.8 245.3 L95.1 252.9 L94.6 248.0 L110.5 246.2 L112.0 249.4 L110.3 253.0 L113.4 257.2 L121.0 257.9 L118.4 261.3 L118.4 270.7 L127.8 268.1 L135.0 272.5 L133.9 278.5 L137.2 282.2 L155.8 292.7 L154.3 302.0 L156.1 304.5 L176.4 310.0 L177.7 316.7 L186.8 321.5 L204.2 312.4 L207.3 316.2 L214.8 312.4 L219.6 321.6 L228.8 327.7 L239.6 323.3 L251.1 329.4 L250.7 339.1 L252.9 338.0 L261.8 360.2 L270.6 350.3 L275.1 353.1 L278.8 365.7 L274.1 372.7 L311.2 379.8 L314.1 377.6 L314.9 368.3 L311.7 338.3 L312.7 325.6 L330.3 294.7 L350.0 281.1 L380.5 275.8 L378.4 273.9 L390.1 261.4 L421.6 253.5 L417.1 248.3 L424.9 243.4 L426.4 247.0 L426.2 241.5 L437.5 235.3 L443.3 224.7 L445.9 213.6 L445.6 179.2 L439.4 147.8 L439.8 123.3 L453.3 117.9 L456.7 110.0 L459.9 85.1 L453.5 72.6 L398.1 85.8 L386.6 82.8 L331.3 92.4 L330.5 88.6 L330.8 92.3 L320.9 98.7 L308.8 99.1 L310.9 91.2 L303.8 73.8 L291.3 61.5 L238.9 40.9 L233.6 51.7 L212.4 56.9 L206.8 73.9 L207.1 80.9 L203.8 85.1 L203.0 91.2 L206.6 93.0 L199.0 112.0 L184.4 110.4 L178.4 117.2 L166.5 107.7 L165.6 100.2 L151.1 91.5 L149.0 94.4 L151.3 101.9 L148.8 104.5 L150.3 109.2 L132.9 105.9 L143.3 79.3 L150.2 77.2 L149.8 72.9 L154.7 72.9 L157.0 63.6 L161.4 62.1 L161.0 44.5 L150.6 32.7 L137.4 40.9 L117.8 41.1 L113.3 39.1 L107.5 27.9 L95.2 35.5 L79.0 20.0 L75.2 24.5 L72.7 37.6 L57.3 54.5 L55.7 66.7 L60.0 76.5 L55.4 76.3 L56.8 90.9 L52.1 106.9 L46.3 107.0 L46.2 116.1 L36.0 124.7 L35.3 131.2 L37.9 136.8 L36.2 139.1 L22.7 139.4 L27.7 167.6 L20.0 190.7 Z";

/** ~miles to SVG radius using Lon/Lat scale around West Kingsdown */
const RING_10 = 55;
const RING_30 = 165;

type Props = {
  className?: string;
  /** Compact mode for embedding without the full info footer */
  compact?: boolean;
  /** Show printable-friendly denser list */
  showList?: boolean;
};

function StationPin({
  station,
  active,
  onFocus,
}: {
  station: KentMapStation;
  active: boolean;
  onFocus: (id: number | null) => void;
}) {
  const fill = station.custody ? "#C9A227" : "#2563eb";
  const stroke = station.custody ? "#8B6914" : "#1e3a8a";
  const r = active ? 14 : 11;

  return (
    <g
      transform={`translate(${station.x} ${station.y})`}
      className="cursor-pointer transition-transform duration-300 ease-out"
      style={{ transformOrigin: `${station.x}px ${station.y}px` }}
      onMouseEnter={() => onFocus(station.id)}
      onMouseLeave={() => onFocus(null)}
      onFocus={() => onFocus(station.id)}
      onBlur={() => onFocus(null)}
    >
      {active ? <circle r="20" fill={fill} fillOpacity="0.18" className="animate-pulse" /> : null}
      <circle
        r={r}
        fill={fill}
        stroke="#ffffff"
        strokeWidth="2"
        className="transition-all duration-300"
      />
      <text
        textAnchor="middle"
        y="4"
        fill="#ffffff"
        style={{ fontSize: 11, fontWeight: 800, fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        {station.id}
      </text>
      <title>
        {station.name} — {station.miles} miles, ~{station.driveMins} mins
        {station.custody ? " (custody suite)" : ""}
      </title>
      <circle r={r + 4} fill="transparent" stroke={stroke} strokeOpacity={active ? 0.55 : 0} />
    </g>
  );
}

function MapCanvas({
  activeId,
  onFocus,
  uid,
}: {
  activeId: number | null;
  onFocus: (id: number | null) => void;
  uid: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/15 bg-[#e8eef8] shadow-[var(--shadow-card)]">
      <svg
        viewBox="0 0 480 400"
        className="h-auto w-full"
        role="img"
        aria-label="Map of Kent police stations and custody suites relative to West Kingsdown base location"
      >
        <defs>
          <linearGradient id={`${uid}-sea`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c7d7f0" />
            <stop offset="55%" stopColor="#dce6f5" />
            <stop offset="100%" stopColor="#e8eef8" />
          </linearGradient>
          <linearGradient id={`${uid}-land`} x1="15%" y1="10%" x2="90%" y2="95%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <filter id={`${uid}-soft`} x="-8%" y="-8%" width="116%" height="116%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e3a8a" floodOpacity="0.18" />
          </filter>
        </defs>

        <rect width="480" height="400" fill={`url(#${uid}-sea)`} />

        <path
          d={KENT_OUTLINE_PATH}
          fill={`url(#${uid}-land)`}
          stroke="#1e3a8a"
          strokeWidth="2.25"
          strokeLinejoin="round"
          filter={`url(#${uid}-soft)`}
        />

        {/* Range rings from West Kingsdown */}
        <circle
          cx={KENT_MAP_BASE.x}
          cy={KENT_MAP_BASE.y}
          r={RING_30}
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="1.25"
          strokeDasharray="6 5"
          strokeOpacity="0.35"
        />
        <circle
          cx={KENT_MAP_BASE.x}
          cy={KENT_MAP_BASE.y}
          r={RING_10}
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          strokeOpacity="0.45"
        />
        <text
          x={KENT_MAP_BASE.x + RING_10 + 4}
          y={KENT_MAP_BASE.y - 4}
          fill="#1e3a8a"
          fillOpacity="0.7"
          style={{ fontSize: 10, fontWeight: 600 }}
        >
          10 mi
        </text>
        <text
          x={KENT_MAP_BASE.x + RING_30 - 28}
          y={KENT_MAP_BASE.y + 14}
          fill="#1e3a8a"
          fillOpacity="0.65"
          style={{ fontSize: 10, fontWeight: 600 }}
        >
          30 mi
        </text>

        {/* Base location */}
        <g transform={`translate(${KENT_MAP_BASE.x} ${KENT_MAP_BASE.y})`}>
          <circle r="16" fill="#b91c1c" fillOpacity="0.15" className="origin-center animate-pulse" />
          <path
            d="M0 -12 L3.5 -3.5 L12 -2.5 L5.5 3.5 L7.5 12 L0 7 L-7.5 12 L-5.5 3.5 L-12 -2.5 L-3.5 -3.5 Z"
            fill="#dc2626"
            stroke="#7f1d1d"
            strokeWidth="1"
          />
          <title>
            {KENT_MAP_BASE.label}: {KENT_MAP_BASE.name} {KENT_MAP_BASE.postcode}
          </title>
        </g>
        <rect
          x={KENT_MAP_BASE.x - 52}
          y={KENT_MAP_BASE.y - 36}
          width="104"
          height="18"
          rx="4"
          fill="#1e3a8a"
          fillOpacity="0.92"
        />
        <text
          x={KENT_MAP_BASE.x}
          y={KENT_MAP_BASE.y - 23}
          textAnchor="middle"
          fill="#F8F1D4"
          style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.04em" }}
        >
          BASE · {KENT_MAP_BASE.postcode}
        </text>

        {KENT_MAP_STATIONS.map((station) => (
          <StationPin
            key={station.id}
            station={station}
            active={activeId === station.id}
            onFocus={onFocus}
          />
        ))}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-primary/10 bg-white/75 px-3 py-2.5 text-[11px] text-slate-600 sm:justify-start sm:px-4">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#dc2626]" aria-hidden="true" />
          Base location
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#C9A227]" aria-hidden="true" />
          Custody suite
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2563eb]" aria-hidden="true" />
          Police station / contact point
        </span>
      </div>
    </div>
  );
}

function StationList({
  activeId,
  onFocus,
}: {
  activeId: number | null;
  onFocus: (id: number | null) => void;
}) {
  return (
    <ol className="space-y-2">
      {KENT_MAP_STATIONS.map((station, index) => {
        const active = activeId === station.id;
        return (
          <li
            key={station.id}
            className="motion-safe:animate-fade-up"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <Link
              href={station.href}
              className={`group flex items-start gap-3 rounded-xl border px-3 py-3 transition-all duration-300 ${
                active
                  ? "border-accent/50 bg-primary/5 shadow-sm"
                  : "border-border-subtle bg-card hover:border-primary/30 hover:bg-secondary/40"
              }`}
              onMouseEnter={() => onFocus(station.id)}
              onMouseLeave={() => onFocus(null)}
              onFocus={() => onFocus(station.id)}
              onBlur={() => onFocus(null)}
            >
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  station.custody ? "bg-[#C9A227]" : "bg-[#2563eb]"
                }`}
              >
                {station.id}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="font-display text-sm font-bold text-primary group-hover:text-primary">
                    {station.shortName}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-slate-500">
                    {station.miles} mi · ~{station.driveMins} mins
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{station.address}</span>
                {station.custody ? (
                  <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8B6914]">
                    Custody suite
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export default function KentPoliceStationMap({
  className = "",
  compact = false,
  showList = true,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section
      className={`not-prose ${className}`}
      aria-labelledby="kent-station-map-heading"
    >
      <div className="mb-6 max-w-3xl">
        <p className="section-eyebrow">Coverage map</p>
        <h2 id="kent-station-map-heading" className="section-title mt-2">
          Kent police stations &amp; custody suites
        </h2>
        <p className="section-lede">
          Distances from our West Kingsdown base ({KENT_MAP_BASE.postcode}). Use this to plan
          attendance across Kent — then open a station page for local detail.
        </p>
      </div>

      <div
        className={`grid gap-6 ${showList ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start" : ""}`}
      >
        <MapCanvas activeId={activeId} onFocus={setActiveId} uid={uid} />
        {showList ? (
          <div>
            <h3 className="mb-3 font-display text-lg font-bold text-primary">
              Stations from West Kingsdown
            </h3>
            <StationList activeId={activeId} onFocus={setActiveId} />
          </div>
        ) : null}
      </div>

      {!compact ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border-subtle bg-card/80 p-4">
            <h3 className="text-sm font-bold text-primary">About this map</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Miles are approximate straight-line distances. Drive times are typical in normal
              traffic and can vary. For official station finder updates see{" "}
              <a
                href="https://www.kent.police.uk/contact/af/contact-us-beta/find-a-police-station/"
                className="font-semibold text-primary underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Kent Police station finder
              </a>
              .
            </p>
          </div>
          <div className="rounded-xl border border-border-subtle bg-card/80 p-4">
            <h3 className="text-sm font-bold text-primary">Useful for your work</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
              <li>Planning court nights and custody coverage</li>
              <li>Knowing nearby custody options quickly</li>
              <li>Checking relative travel across Kent</li>
            </ul>
          </div>
          <div className="rounded-xl border border-accent/30 bg-secondary/50 p-4">
            <h3 className="text-sm font-bold text-primary">Printable version</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Prefer a dedicated shareable page?{" "}
              <Link
                href="/resources/kent-police-station-map"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                Open the printable Kent police station map
              </Link>
              .
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
