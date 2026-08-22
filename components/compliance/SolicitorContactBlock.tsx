import Link from "next/link";
import {
  SOLICITOR_CONTACT_CTA,
  SOLICITOR_PHONE_LABEL,
} from "@/config/contact";

type Props = {
  /** Kept for API compatibility — digits are never published. */
  hideDigits?: boolean;
  /** Suppress snippet extraction around this block. */
  noSnippet?: boolean;
  className?: string;
  heading?: string;
};

/**
 * Labelled independent-solicitor CTAs — Contact pathways only (no indexable digits).
 */
export default function SolicitorContactBlock({
  hideDigits: _hideDigits = true,
  noSnippet = false,
  className = "",
  heading = "Independent solicitor contact details",
}: Props) {
  void _hideDigits;
  return (
    <div
      className={className || "rounded-xl bg-white p-4 shadow-lg max-w-xl"}
      {...(noSnippet ? { "data-nosnippet": true } : {})}
      data-solicitor-contact-block="true"
    >
      <h2 className="text-base font-bold text-slate-900 mb-2">{heading}</h2>
      <p className="text-xs text-slate-600 mb-3">
        {SOLICITOR_PHONE_LABEL} — legal representation enquiries only. Not a police number.
        Telephone and SMS are on the Contact page pathways (not published as digits here).
      </p>
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
          className="inline-flex items-center justify-center rounded-lg border-2 border-[#2563eb] bg-white px-5 py-3 text-sm font-bold text-[#2563eb] hover:bg-slate-50"
        >
          Solicitor SMS (Contact)
        </Link>
      </div>
    </div>
  );
}
