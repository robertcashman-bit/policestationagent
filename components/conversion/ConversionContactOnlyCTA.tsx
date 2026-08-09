import Link from "next/link";
import { SOLICITOR_CONTACT_CTA } from "@/config/contact";

type Props = {
  layout?: "horizontal" | "stacked";
  className?: string;
};

/**
 * Server-safe CTAs with no firm tel:/sms: digits in the module graph.
 * Use on police-contact-intent landings so RSC/search cannot quote the number.
 */
export function ConversionContactOnlyCTA({
  layout = "horizontal",
  className = "",
}: Props) {
  const flex = layout === "stacked" ? "flex-col" : "flex-col sm:flex-row";

  return (
    <div className={`flex flex-wrap gap-3 ${flex} ${className}`} data-nosnippet>
      <Link
        href="/contact"
        data-event="contact_click"
        className="btn-gold px-5 py-3 text-sm"
      >
        {SOLICITOR_CONTACT_CTA}
      </Link>
      <Link
        href="/contact"
        data-event="contact_click"
        className="inline-flex items-center justify-center rounded-md border-2 border-primary bg-card px-5 py-3 text-sm font-bold text-primary hover:bg-secondary"
      >
        Solicitor SMS (Contact)
      </Link>
    </div>
  );
}
