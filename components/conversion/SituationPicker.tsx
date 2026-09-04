"use client";

import { useState } from "react";
import Link from "next/link";
import { SITUATION_OPTIONS, type SituationId, PATH_CUSTODY, PATH_AGENCY } from "@/config/enquiry-paths";
import { FunnelEvents } from "@/lib/analytics";
import { ShortVoluntaryRequestForm } from "@/components/conversion/ShortVoluntaryRequestForm";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";

type Props = {
  className?: string;
};

/**
 * Contact-page gate: pick situation before any form or call-back path.
 * "Something else" deflects to 101 / police website with no call-back offer.
 */
export function SituationPicker({ className = "" }: Props) {
  const [situation, setSituation] = useState<SituationId | null>(null);

  function select(id: SituationId) {
    setSituation(id);
    if (id === "voluntary") FunnelEvents.pathwayVoluntary();
    else if (id === "custody") FunnelEvents.pathwayCustody();
    else if (id === "agency") FunnelEvents.pathwayAgency();
    else FunnelEvents.situationOther();
  }

  return (
    <section
      className={className}
      aria-labelledby="situation-picker-heading"
      data-testid="situation-picker"
    >
      <h2 id="situation-picker-heading" className="font-display text-lg font-bold text-primary md:text-xl">
        What is your situation?
      </h2>
      <p className="mt-1 mb-4 text-sm leading-relaxed text-slate-700">
        Choose one option before we can help. This stops police-style enquiries reaching the wrong
        place.
      </p>

      <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Situation">
        {SITUATION_OPTIONS.map((opt) => {
          const selected = situation === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => select(opt.id)}
              className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                selected
                  ? opt.id === "other"
                    ? "border-slate-500 bg-slate-100 ring-2 ring-slate-400/40"
                    : "border-accent bg-accent/10 ring-2 ring-accent/40"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className="font-display text-sm font-bold text-primary md:text-base">
                {opt.title}
              </span>
              <span className="mt-1 block text-xs leading-snug text-muted-foreground md:text-sm">
                {opt.description}
              </span>
            </button>
          );
        })}
      </div>

      {situation === "voluntary" ? (
        <div className="mt-6 space-y-4" data-testid="situation-voluntary">
          <p className="text-sm text-slate-700 leading-relaxed">
            Next step: tell us the station and date if you know them. We will contact you about free
            representation for a Kent interview under caution. Do not discuss the allegation with
            the officer until you have a solicitor.
          </p>
          <ShortVoluntaryRequestForm />
        </div>
      ) : null}

      {situation === "custody" ? (
        <div
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 space-y-3"
          data-testid="situation-custody"
        >
          <h3 className="font-display text-base font-bold text-red-950">
            Current custody needs a short check first
          </h3>
          <p className="text-sm text-red-900 leading-relaxed">
            Immediate family may instruct for someone currently detained in Kent. Friends cannot.
            We do not take crime reports or give status updates for past arrests.
          </p>
          <Link
            href={PATH_CUSTODY}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-destructive px-5 py-2.5 text-sm font-bold text-white hover:bg-red-800"
          >
            Check whether we can help
          </Link>
        </div>
      ) : null}

      {situation === "agency" ? (
        <div
          className="mt-6 rounded-xl border border-accent/40 bg-accent/5 p-5 space-y-3"
          data-testid="situation-agency"
        >
          <h3 className="font-display text-base font-bold text-primary">
            Solicitor / firm agency cover
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Use the agency pathway for police station attendance instructions. Do not use the public
            custody form for firm work.
          </p>
          <Link
            href={PATH_AGENCY}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent-dark"
          >
            Request agency cover
          </Link>
        </div>
      ) : null}

      {situation === "other" ? (
        <div
          className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-5 space-y-4"
          data-testid="situation-other"
          role="status"
        >
          <h3 className="font-display text-base font-bold text-slate-900">
            We cannot help with police enquiries
          </h3>
          <p className="text-sm text-slate-800 leading-relaxed">
            We are criminal defence solicitors — not Kent Police. We do not take crime reports,
            deal with station opening times, lost property, police complaints, or “how do I contact
            the police” questions. We do not offer a call-back for these enquiries.
          </p>
          <ul className="text-sm text-slate-900 space-y-2">
            <li>
              <strong>Emergency:</strong>{" "}
              <a href="tel:999" className="font-bold text-red-700 underline">
                999
              </a>
            </li>
            <li>
              <strong>Non-emergency:</strong>{" "}
              <a href="tel:101" className="font-bold underline">
                101
              </a>
            </li>
            <li>
              <strong>Kent Police website:</strong>{" "}
              <a
                href="https://www.kent.police.uk/"
                className="font-bold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                kent.police.uk
              </a>
            </li>
          </ul>
          <p className="text-xs text-slate-600">
            If you actually have a police interview letter or someone in custody now, go back and
            choose that option instead.
          </p>
          <button
            type="button"
            className="text-sm font-semibold text-primary underline"
            onClick={() => setSituation(null)}
          >
            Choose a different situation
          </button>
        </div>
      ) : null}

      {!situation ? (
        <div className="mt-6">
          <PoliceSignposting compact />
        </div>
      ) : null}
    </section>
  );
}
