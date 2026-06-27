"use client";

import { PHONE_TEL, PHONE_DISPLAY, SMS_TEL, SMS_DISPLAY } from "@/config/contact";

export function MobileStickyContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        <a
          href={`tel:${PHONE_TEL}`}
          data-event="call_click"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-red-700"
          aria-label={`Call ${PHONE_DISPLAY}`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wide">Call</span>
          <span className="text-sm font-black leading-none">{PHONE_DISPLAY}</span>
        </a>
        <a
          href={`sms:${SMS_TEL}`}
          data-event="sms_click"
          className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[#0A2342]"
          aria-label={`Text ${SMS_DISPLAY}`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wide">Text</span>
          <span className="text-sm font-black leading-none">{SMS_DISPLAY}</span>
        </a>
      </div>
    </div>
  );
}
