"use client";

import Link from "next/link";
import { PATHWAY_CARDS } from "@/config/enquiry-paths";
import { FunnelEvents } from "@/lib/analytics";

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
      <h2
        id={headingId}
        className="font-display text-lg md:text-xl font-bold text-primary mb-1"
      >
        {heading}
      </h2>
      {subheading ? (
        <p className="text-slate-700 text-sm mb-4 leading-relaxed">{subheading}</p>
      ) : null}
      <div className="grid md:grid-cols-3 gap-3">
        {PATHWAY_CARDS.map((card) => {
          const isUrgent = card.accent === "red";
          const isFirm = card.accent === "amber";
          return (
            <Link
              key={card.id}
              href={card.href}
              onClick={() => trackPathway(card.id)}
              data-event={card.event}
              className={`group rounded-lg border transition-all duration-200 p-4 bg-card flex flex-col shadow-sm hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isUrgent
                  ? "border-destructive/30 hover:border-destructive"
                  : isFirm
                    ? "border-accent/40 hover:border-accent"
                    : "border-border hover:border-primary/40"
              }`}
            >
              <div
                className={`w-full rounded-md px-3 py-2 mb-3 transition-colors ${
                  isUrgent
                    ? "bg-red-50 group-hover:bg-red-100/80"
                    : isFirm
                      ? "bg-accent/10 group-hover:bg-accent/15"
                      : "bg-secondary group-hover:bg-primary/5"
                }`}
              >
                <h3 className="font-bold text-primary text-sm md:text-base leading-snug">
                  {card.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground flex-1 mb-4">
                {card.description}
              </p>
              <span
                className={`inline-flex items-center justify-center min-h-[44px] rounded-md px-4 text-sm font-bold transition-colors ${
                  isUrgent
                    ? "bg-destructive text-white group-hover:bg-red-800"
                    : isFirm
                      ? "bg-accent text-accent-foreground group-hover:bg-accent-dark"
                      : "bg-primary text-white group-hover:bg-primary-light"
                }`}
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
