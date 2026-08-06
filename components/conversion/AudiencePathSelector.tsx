"use client";

import Link from "next/link";
import { PATHWAY_CARDS } from "@/config/enquiry-paths";
import { FunnelEvents } from "@/lib/analytics";

const ACCENT = {
  blue: {
    border: "border-blue-200 hover:border-blue-500",
    bg: "bg-blue-50 group-hover:bg-blue-100",
    btn: "bg-blue-700 hover:bg-blue-800 text-white",
    title: "group-hover:text-blue-800",
  },
  red: {
    border: "border-red-200 hover:border-red-500",
    bg: "bg-red-50 group-hover:bg-red-100",
    btn: "bg-red-700 hover:bg-red-800 text-white",
    title: "group-hover:text-red-800",
  },
  amber: {
    border: "border-amber-200 hover:border-amber-500",
    bg: "bg-amber-50 group-hover:bg-amber-100",
    btn: "bg-amber-500 hover:bg-amber-400 text-slate-900",
    title: "group-hover:text-amber-900",
  },
} as const;

function trackPathway(id: (typeof PATHWAY_CARDS)[number]["id"]) {
  if (id === "voluntary") FunnelEvents.pathwayVoluntary();
  else if (id === "custody") FunnelEvents.pathwayCustody();
  else FunnelEvents.pathwayAgency();
}

type Props = {
  className?: string;
  heading?: string;
  subheading?: string;
  headingId?: string;
};

export function AudiencePathSelector({
  className = "",
  heading = "Choose how we can help",
  subheading = "Three separate routes — pick the one that matches your situation.",
  headingId = "audience-path-heading",
}: Props) {
  return (
    <section className={className} aria-labelledby={headingId}>
      <h2 id={headingId} className="text-lg md:text-xl font-black text-slate-900 mb-1">
        {heading}
      </h2>
      {subheading ? <p className="text-slate-600 text-sm mb-4">{subheading}</p> : null}
      <div className="grid md:grid-cols-3 gap-3">
        {PATHWAY_CARDS.map((card) => {
          const accent = ACCENT[card.accent];
          return (
            <Link
              key={card.id}
              href={card.href}
              onClick={() => trackPathway(card.id)}
              data-event={card.event}
              className={`group rounded-xl border-2 ${accent.border} transition-all duration-200 p-4 bg-white flex flex-col`}
            >
              <div className={`w-full rounded-lg ${accent.bg} px-3 py-2 mb-3 transition-colors`}>
                <h3
                  className={`font-bold text-slate-900 text-sm md:text-base leading-snug ${accent.title}`}
                >
                  {card.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-600 flex-1 mb-4">{card.description}</p>
              <span
                className={`inline-flex items-center justify-center min-h-[44px] rounded-md px-4 text-sm font-bold ${accent.btn}`}
              >
                {card.button}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
