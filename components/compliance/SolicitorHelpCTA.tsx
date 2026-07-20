import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";
import CompliantCTAWrapper from "./CompliantCTAWrapper";

interface SolicitorHelpCTAProps {
  heading?: string;
  description?: string;
  /** When true, hide phone from Google snippets (station-adjacent contexts). */
  noSnippetPhone?: boolean;
  contactHref?: string;
  contactLabel?: string;
  className?: string;
}

/**
 * Solicitor-only CTA. Heading must make legal intent dominant before the phone.
 */
export default function SolicitorHelpCTA({
  heading = "Need a solicitor?",
  description = "Independent criminal defence representation for current Kent custody or a booked voluntary interview. Free under Legal Aid where eligible.",
  noSnippetPhone = false,
  contactHref = "/contact",
  contactLabel = "Contact us",
  className = "bg-blue-600 text-white p-6 rounded-lg shadow-lg",
}: SolicitorHelpCTAProps) {
  return (
    <div className={className} data-solicitor-help-cta="true">
      <CompliantCTAWrapper>
        <h2 className="text-xl font-semibold mb-3">{heading}</h2>
        <p className="text-blue-100 mb-4 text-sm md:text-base leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={`tel:${PHONE_TEL}`}
            {...(noSnippetPhone ? { "data-nosnippet": true } : {})}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
          >
            Call {PHONE_DISPLAY}
          </a>
          <Link
            href={contactHref}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition inline-flex items-center gap-2"
          >
            {contactLabel}
          </Link>
        </div>
      </CompliantCTAWrapper>
    </div>
  );
}
