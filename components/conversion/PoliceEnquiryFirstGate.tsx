"use client";

import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { FunnelEvents } from "@/lib/analytics";

type Props = {
  /** When true, show the hard-stop deflection panel */
  active: boolean;
  onActivate: () => void;
  onClear: () => void;
  className?: string;
  /** Compact question for embedding above forms */
  compact?: boolean;
};

/**
 * Shared first-question deflector: crime report / police number → 101 hard stop.
 * Used on VA forms and non-urgent Contact admin form before any call-back path.
 */
export function PoliceEnquiryFirstGate({
  active,
  onActivate,
  onClear,
  className = "",
  compact = false,
}: Props) {
  if (active) {
    return (
      <div
        className={`rounded-xl border border-slate-300 bg-slate-50 p-5 space-y-3 ${className}`}
        data-testid="police-enquiry-hard-stop"
        role="status"
      >
        <h2 className="text-lg font-bold text-slate-900">
          We cannot help with police enquiries
        </h2>
        <p className="text-sm text-slate-800 leading-relaxed">
          We are criminal defence solicitors — not Kent Police. We do not take crime reports, give
          police station numbers, or deal with lost property, opening times, or police complaints.
          We do not offer a call-back for these enquiries.
        </p>
        <PoliceSignposting compact />
        <p className="text-sm text-slate-700">
          Emergency{" "}
          <a href="tel:999" className="font-bold text-red-700 underline">
            999
          </a>{" "}
          · Non-emergency{" "}
          <a href="tel:101" className="font-bold underline">
            101
          </a>{" "}
          ·{" "}
          <a
            href="https://www.kent.police.uk/"
            className="font-bold underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            kent.police.uk
          </a>
        </p>
        <button
          type="button"
          className="text-sm font-semibold text-primary underline"
          onClick={onClear}
        >
          I need a solicitor for an interview or custody — go back
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border border-amber-200 bg-amber-50/90 p-4 ${className}`}
      data-testid="police-enquiry-first-gate"
    >
      <p className={`font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"} mb-2`}>
        First — are you reporting a crime or looking for a police number?
      </p>
      <p className="text-xs text-slate-700 mb-3 leading-relaxed">
        If yes, use official police contacts. This website cannot help with those enquiries.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-slate-400 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100"
          onClick={() => {
            FunnelEvents.enquiryOutOfScope("police_number_or_crime_report");
            onActivate();
          }}
        >
          Yes — I need the police / 101
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-light"
          onClick={onClear}
          data-testid="police-enquiry-gate-no"
        >
          No — I need a defence solicitor
        </button>
      </div>
    </div>
  );
}
