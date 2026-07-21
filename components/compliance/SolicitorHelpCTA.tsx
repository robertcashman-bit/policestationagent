import Link from "next/link";
import {
  STATION_CONTACT_BUTTON,
  STATION_PHONE_LABEL,
  STATION_PHONE_SCOPE,
  STATION_SOLICITOR_CTA,
} from "@/config/contact";
import CompliantCTAWrapper from "./CompliantCTAWrapper";

interface SolicitorHelpCTAProps {
  heading?: string;
  description?: string;
  /** Kept for callers; digits are never shown — Contact page holds the number. */
  noSnippetPhone?: boolean;
  contactHref?: string;
  contactLabel?: string;
  className?: string;
}

/**
 * Station-safe solicitor CTA: no telephone digits.
 * Order: NOT THE POLICE → criminal solicitors → urgent rep → Contact (phone last there).
 */
export default function SolicitorHelpCTA({
  heading = STATION_PHONE_LABEL,
  description = STATION_SOLICITOR_CTA,
  contactHref = "/contact",
  contactLabel = STATION_CONTACT_BUTTON,
  className = "bg-blue-600 text-white p-6 rounded-lg shadow-lg",
}: SolicitorHelpCTAProps) {
  return (
    <div className={className} data-solicitor-help-cta="true">
      <CompliantCTAWrapper>
        <h2 className="text-xl font-semibold mb-3">{heading}</h2>
        <p className="text-blue-100 mb-2 text-sm md:text-base leading-relaxed">{description}</p>
        <p className="text-amber-100 mb-4 text-xs md:text-sm font-medium leading-relaxed">
          {STATION_PHONE_SCOPE}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={contactHref}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
          >
            {contactLabel}
          </Link>
        </div>
      </CompliantCTAWrapper>
    </div>
  );
}
