"use client";

import Link from "next/link";
import { PATHWAY_CARDS } from "@/config/enquiry-paths";
import { FunnelEvents } from "@/lib/analytics";

function trackPathway(id: (typeof PATHWAY_CARDS)[number]["id"]) {
  if (id === "voluntary") FunnelEvents.pathwayVoluntary();
  else if (id === "custody") FunnelEvents.pathwayCustody();
  else FunnelEvents.pathwayAgency();
}

const SHORT_LABELS: Record<(typeof PATHWAY_CARDS)[number]["id"], string> = {
  voluntary: "Booked interview",
  custody: "Current custody",
  agency: "Solicitor cover",
};

type Props = {
  className?: string;
  heading?: string;
  subheading?: string;
  headingId?: string;
  /** Centrepiece density for homepage; compact for contact; firstScreen for above-the-fold */
  variant?: "compact" | "centrepiece" | "firstScreen";
};

export function AudiencePathSelector({
  className = "",
  heading = "Choose how we can help",
  subheading = "Three separate routes — pick the one that matches your situation.",
  headingId = "audience-path-heading",
  variant = "compact",
}: Props) {
  const isCentrepiece = variant === "centrepiece";
  const isFirstScreen = variant === "firstScreen";

  return (
    <section className={className} aria-labelledby={headingId}>
      <div className={isCentrepiece || isFirstScreen ? "mx-auto max-w-6xl" : undefined}>
        {isFirstScreen ? (
          <div className="mb-2 flex items-end justify-between gap-3 sm:mb-3 md:mb-4">
            <div>
              <h2
                id={headingId}
                className="font-display text-sm font-bold text-white sm:text-base md:text-lg"
              >
                {heading}
              </h2>
              {subheading ? (
                <p className="mt-0.5 hidden text-xs text-white/70 sm:block sm:text-sm">
                  {subheading}
                </p>
              ) : null}
            </div>
          </div>
        ) : isCentrepiece ? (
          <div className="mb-8 md:mb-10 md:flex md:items-end md:justify-between md:gap-8">
            <div className="max-w-measure-wide">
              <p className="section-eyebrow">Choose your pathway</p>
              <h2 id={headingId} className="section-title mt-2">
                {heading}
              </h2>
              {subheading ? <p className="section-lede">{subheading}</p> : null}
            </div>
            <p
              className="mt-4 hidden text-right text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary/50 md:block"
              aria-hidden="true"
            >
              Booked · Custody · Cover
            </p>
          </div>
        ) : (
          <>
            <h2
              id={headingId}
              className="mb-1 font-display text-lg font-bold text-primary md:text-xl"
            >
              {heading}
            </h2>
            {subheading ? (
              <p className="mb-4 text-sm leading-relaxed text-slate-700">{subheading}</p>
            ) : null}
          </>
        )}

        <div
          className={
            isFirstScreen
              ? "grid gap-1.5 sm:gap-2 md:grid-cols-3 md:gap-3 md:items-stretch"
              : isCentrepiece
                ? "grid gap-4 md:grid-cols-3 md:gap-5 md:items-stretch"
                : "grid gap-3 md:grid-cols-3"
          }
        >
          {PATHWAY_CARDS.map((card) => {
            const isUrgent = card.accent === "red";
            const isFirm = card.accent === "amber";

            if (isFirstScreen) {
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  onClick={() => trackPathway(card.id)}
                  data-event={card.event}
                  className={`group flex min-h-[48px] items-center gap-2.5 rounded-lg border bg-white px-3 py-2.5 text-left shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:min-h-0 md:flex-col md:items-stretch md:p-4 ${
                    isUrgent
                      ? "border-destructive/40 hover:border-destructive"
                      : isFirm
                        ? "border-accent/50 hover:border-accent"
                        : "border-white/80 hover:border-primary/40"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${
                        isUrgent
                          ? "text-destructive"
                          : isFirm
                            ? "text-accent-dark"
                            : "text-primary/70"
                      }`}
                    >
                      {SHORT_LABELS[card.id]}
                    </p>
                    <h3 className="mt-0.5 font-display text-[0.95rem] font-bold leading-snug text-primary md:text-base">
                      {card.title}
                    </h3>
                    <p className="mt-1 hidden text-xs leading-snug text-muted-foreground md:block">
                      {card.description}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center justify-center rounded-md px-2.5 py-1.5 text-[0.7rem] font-bold md:mt-3 md:min-h-[40px] md:w-full md:px-3 md:text-sm ${
                      isUrgent
                        ? "bg-destructive text-white group-hover:bg-red-800"
                        : isFirm
                          ? "bg-accent text-accent-foreground group-hover:bg-accent-dark"
                          : "bg-primary text-white group-hover:bg-primary-light"
                    }`}
                  >
                    <span className="md:hidden" aria-hidden="true">
                      →
                    </span>
                    <span className="hidden md:inline">{card.button}</span>
                    <span className="sr-only md:hidden">{card.button}</span>
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={card.id}
                href={card.href}
                onClick={() => trackPathway(card.id)}
                data-event={card.event}
                className={`group relative flex flex-col overflow-hidden rounded-xl border bg-card lift-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isCentrepiece ? "p-5 shadow-card md:p-6" : "p-4 shadow-sm"
                } ${
                  isUrgent
                    ? "border-destructive/35 hover:border-destructive"
                    : isFirm
                      ? "border-accent/45 hover:border-accent"
                      : "border-border hover:border-primary/40"
                }`}
              >
                <span
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    isUrgent ? "bg-destructive" : isFirm ? "bg-accent" : "bg-primary"
                  }`}
                  aria-hidden="true"
                />
                <p
                  className={`font-semibold uppercase tracking-[0.14em] ${
                    isCentrepiece ? "text-[0.7rem]" : "text-[0.65rem]"
                  } ${
                    isUrgent
                      ? "text-destructive"
                      : isFirm
                        ? "text-accent-dark"
                        : "text-primary/70"
                  }`}
                >
                  {SHORT_LABELS[card.id]}
                </p>
                <div
                  className={`mt-3 rounded-md px-3 py-2 transition-colors ${
                    isUrgent
                      ? "bg-red-50 group-hover:bg-red-100/80"
                      : isFirm
                        ? "bg-accent/10 group-hover:bg-accent/15"
                        : "bg-secondary group-hover:bg-primary/5"
                  }`}
                >
                  <h3
                    className={`font-bold leading-snug text-primary ${
                      isCentrepiece ? "font-display text-lg md:text-xl" : "text-sm md:text-base"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  className={`mt-3 flex-1 text-muted-foreground ${
                    isCentrepiece ? "text-sm leading-relaxed md:text-[0.95rem]" : "text-xs md:text-sm"
                  }`}
                >
                  {card.description}
                </p>
                <span
                  className={`mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md px-4 text-sm font-bold transition-colors ${
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
      </div>
    </section>
  );
}
