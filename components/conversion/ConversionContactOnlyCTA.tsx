import Link from "next/link";

type Props = {
  layout?: "horizontal" | "stacked";
  className?: string;
  /** Default voluntary pathway; use custody for suite pages. */
  pathway?: "voluntary" | "custody";
};

/**
 * Server-safe pathway CTAs with no firm tel:/sms: digits in the module graph.
 * Use on police-contact-intent landings so RSC/search cannot quote the number.
 */
export function ConversionContactOnlyCTA({
  layout = "horizontal",
  className = "",
  pathway = "voluntary",
}: Props) {
  const flex = layout === "stacked" ? "flex-col" : "flex-col sm:flex-row";
  const primaryHref =
    pathway === "custody" ? "/current-custody" : "/voluntary-interviews#request";
  const primaryLabel =
    pathway === "custody" ? "Current custody check" : "Request representation";

  return (
    <div className={`flex flex-wrap gap-3 ${flex} ${className}`} data-nosnippet>
      <Link
        href={primaryHref}
        data-event="contact_click"
        className="btn-gold px-5 py-3 text-sm"
      >
        {primaryLabel}
      </Link>
      <Link
        href="/for-solicitors"
        data-event="contact_click"
        className="inline-flex items-center justify-center rounded-md border-2 border-primary bg-card px-5 py-3 text-sm font-bold text-primary hover:bg-secondary"
      >
        Agency cover for solicitors
      </Link>
    </div>
  );
}
