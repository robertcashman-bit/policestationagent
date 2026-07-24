import Link from "next/link";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  SMS_DISPLAY,
  SMS_TEL,
  SOLICITOR_CONTACT_CTA,
  SOLICITOR_PHONE_LABEL,
  SOLICITOR_SMS_ARIA,
  SOLICITOR_SMS_LABEL,
  SOLICITOR_TEL_ARIA,
} from "@/config/contact";

type Props = {
  /** When true, link to /contact instead of publishing tel/sms digits. */
  hideDigits?: boolean;
  /** Suppress snippet extraction around this block. */
  noSnippet?: boolean;
  className?: string;
  heading?: string;
};

/**
 * Labelled independent-solicitor CTAs (never presented as police contact).
 */
export default function SolicitorContactBlock({
  hideDigits = false,
  noSnippet = false,
  className = "",
  heading = "Independent solicitor contact details",
}: Props) {
  return (
    <div
      className={className || "rounded-xl bg-white p-4 shadow-lg max-w-xl"}
      {...(noSnippet ? { "data-nosnippet": true } : {})}
      data-solicitor-contact-block="true"
    >
      <h2 className="text-base font-bold text-slate-900 mb-2">{heading}</h2>
      <p className="text-xs text-slate-600 mb-3">
        {SOLICITOR_PHONE_LABEL} — legal representation enquiries only. Not a police number.
      </p>
      {hideDigits ? (
        <div className="flex flex-wrap gap-3">
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
      ) : (
        <div className="flex flex-wrap gap-3">
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
            {SOLICITOR_SMS_LABEL} — {SMS_DISPLAY}
          </a>
        </div>
      )}
    </div>
  );
}
