"use client";

import { PHONE_DISPLAY, PHONE_TEL, SMS_DISPLAY, SMS_TEL } from "@/config/contact";

type Props = {
  layout?: "horizontal" | "stacked";
  className?: string;
};

export function ConversionCTAGroup({ layout = "horizontal", className = "" }: Props) {
  const flex = layout === "stacked" ? "flex-col" : "flex-col sm:flex-row";
  return (
    <div className={`flex flex-wrap gap-3 ${flex} ${className}`}>
      <a
        href={`tel:${PHONE_TEL}`}
        data-event="call_click"
        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
      >
        Call — {PHONE_DISPLAY}
      </a>
      <a
        href={`sms:${SMS_TEL}`}
        data-event="sms_click"
        className="inline-flex items-center justify-center rounded-lg border-2 border-[#0A2342] bg-white px-5 py-3 text-sm font-bold text-[#0A2342] hover:bg-slate-50"
      >
        Text — {SMS_DISPLAY}
      </a>
    </div>
  );
}
