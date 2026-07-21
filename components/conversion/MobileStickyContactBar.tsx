"use client";

import { SMS_TEL, SMS_DISPLAY } from "@/config/contact";
import RouteAwarePhoneLink from "@/components/compliance/RouteAwarePhoneLink";

export function MobileStickyContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        <RouteAwarePhoneLink variant="sticky" />
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
