"use client";

import { PHONE_TEL, whatsAppTextUrl } from "@/config/contact";

const EMAIL = "robertdavidcashman@gmail.com";

export function MobileStickyContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <a
          href={`tel:${PHONE_TEL}`}
          data-event="call_click"
          className="flex flex-col items-center justify-center py-3 text-xs font-semibold text-red-700"
        >
          Call
        </a>
        <a
          href={whatsAppTextUrl("Police station enquiry")}
          data-event="whatsapp_click"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 text-xs font-semibold text-green-700"
        >
          WhatsApp
        </a>
        <a
          href={`mailto:${EMAIL}`}
          data-event="email_click"
          className="flex flex-col items-center justify-center py-3 text-xs font-semibold text-[#0A2342]"
        >
          Email
        </a>
      </div>
    </div>
  );
}
