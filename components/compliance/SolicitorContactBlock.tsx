import Link from "next/link";
import { SOLICITOR_PHONE_LABEL } from "@/config/contact";

type Props = {
  /** Kept for API compatibility — digits are never published. */
  hideDigits?: boolean;
  /** Suppress snippet extraction around this block. */
  noSnippet?: boolean;
  className?: string;
  heading?: string;
};

/**
 * Labelled independent-solicitor CTAs — pathway links only (no indexable digits).
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
        Solicitor telephone is not listed publicly — use the pathways below; for current custody
        it appears after qualification on Contact.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/voluntary-interviews#request"
          data-event="contact_click"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700"
        >
          Request representation
        </Link>
        <Link
          href="/current-custody"
          data-event="contact_click"
          className="inline-flex items-center justify-center rounded-lg border-2 border-red-700 bg-white px-5 py-3 text-sm font-bold text-red-800 hover:bg-red-50"
        >
          Current custody check
        </Link>
        <Link
          href="/for-solicitors"
          data-event="contact_click"
          className="inline-flex items-center justify-center rounded-lg border-2 border-[#2563eb] bg-white px-5 py-3 text-sm font-bold text-[#2563eb] hover:bg-slate-50"
        >
          Agency cover for solicitors
        </Link>
      </div>
    </div>
  );
}
