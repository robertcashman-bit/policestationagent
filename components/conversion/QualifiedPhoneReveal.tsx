"use client";

import { useEffect } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";
import { FunnelEvents } from "@/lib/analytics";

const CHECKLIST = [
  "Detainee's full name",
  "Date of birth",
  "Police station",
  "Custody record number, if known",
  "Time of arrest, if known",
  "Allegation, if known",
  "Your relationship to the detainee",
  "Whether another solicitor has already been requested",
];

type Props = {
  className?: string;
};

export function QualifiedPhoneReveal({ className = "" }: Props) {
  useEffect(() => {
    FunnelEvents.custodyPhoneReveal();
  }, []);

  return (
    <div
      className={`rounded-xl border-2 border-red-300 bg-red-50 p-5 md:p-6 ${className}`}
      role="region"
      aria-labelledby="qualified-phone-heading"
    >
      <h2 id="qualified-phone-heading" className="text-xl font-black text-slate-900 mb-3">
        You can call for current custody representation
      </h2>
      <p className="text-sm font-semibold text-red-900 mb-4 border border-red-200 bg-white rounded-md p-3">
        Legal representation enquiries only. This number is not Kent Police, cannot transfer you to
        a police station and cannot provide custody updates or general legal advice.
      </p>
      <a
        href={`tel:${PHONE_TEL}`}
        onClick={() => FunnelEvents.custodyPhoneClick()}
        data-event="custody_phone_click"
        className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-lg bg-red-700 hover:bg-red-800 text-white font-black text-lg px-6 py-3"
        aria-label={`Call solicitor for current custody — ${PHONE_DISPLAY}`}
      >
        Call {PHONE_DISPLAY}
      </a>
      <p className="text-xs text-slate-600 mt-2">
        Ask for Robert Cashman / Tuckers Solicitors LLP. Legal representation enquiries only — not
        a general advice line.
      </p>
      <div className="mt-6">
        <h3 className="text-sm font-bold text-slate-900 mb-2">Have ready if possible</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          {CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
