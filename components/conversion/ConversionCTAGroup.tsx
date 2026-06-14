"use client";

import {
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsAppTextUrl,
  WHATSAPP_TEXT_ONLY_NOTE,
} from "@/config/contact";

const EMAIL = "robertdavidcashman@gmail.com";

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
        Call Robert Cashman — {PHONE_DISPLAY}
      </a>
      <a
        href={whatsAppTextUrl("Police station cover instruction — please confirm availability.")}
        data-event="whatsapp_click"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
      >
        WhatsApp Now
      </a>
      <a
        href={`mailto:${EMAIL}?subject=Police%20station%20instructions`}
        data-event="email_click"
        className="inline-flex items-center justify-center rounded-lg border-2 border-[#0A2342] bg-white px-5 py-3 text-sm font-bold text-[#0A2342] hover:bg-slate-50"
      >
        Email Instructions
      </a>
      <p className="w-full text-xs text-slate-500">{WHATSAPP_TEXT_ONLY_NOTE}</p>
    </div>
  );
}
