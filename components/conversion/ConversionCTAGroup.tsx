"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  SMS_DISPLAY,
  SMS_TEL,
  SOLICITOR_CONTACT_CTA,
  SOLICITOR_SMS_ARIA,
  SOLICITOR_TEL_ARIA,
} from "@/config/contact";
import { isPoliceContactIntentPath } from "@/lib/seo/station-contact-routes";

type Props = {
  layout?: "horizontal" | "stacked";
  className?: string;
  /** When true, never publish tel digits (LocalCover / station landings). */
  forceHideDigits?: boolean;
};

export function ConversionCTAGroup({
  layout = "horizontal",
  className = "",
  forceHideDigits = false,
}: Props) {
  const pathname = usePathname();
  const hideDigits = forceHideDigits || isPoliceContactIntentPath(pathname);
  const flex = layout === "stacked" ? "flex-col" : "flex-col sm:flex-row";

  if (hideDigits) {
    return (
      <div className={`flex flex-wrap gap-3 ${flex} ${className}`} data-nosnippet>
        <Link
          href="/contact"
          data-event="contact_click"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
        >
          {SOLICITOR_CONTACT_CTA}
        </Link>
        <Link
          href="/contact"
          data-event="contact_click"
          className="inline-flex items-center justify-center rounded-lg border-2 border-[#0A2342] bg-white px-5 py-3 text-sm font-bold text-[#0A2342] hover:bg-slate-50"
        >
          Solicitor SMS (Contact)
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${flex} ${className}`}>
      <a
        href={`tel:${PHONE_TEL}`}
        data-event="call_click"
        aria-label={SOLICITOR_TEL_ARIA}
        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
      >
        Call independent solicitor — {PHONE_DISPLAY}
      </a>
      <a
        href={`sms:${SMS_TEL}`}
        data-event="sms_click"
        aria-label={SOLICITOR_SMS_ARIA}
        className="inline-flex items-center justify-center rounded-lg border-2 border-[#0A2342] bg-white px-5 py-3 text-sm font-bold text-[#0A2342] hover:bg-slate-50"
      >
        Solicitor SMS — {SMS_DISPLAY}
      </a>
    </div>
  );
}
