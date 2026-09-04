import Link from "next/link";
import { PATH_VOLUNTARY, PATH_VOLUNTARY_LANDING, PATH_CUSTODY } from "@/config/enquiry-paths";

type Props = {
  className?: string;
  /** Where this CTA sits — for analytics data-event only */
  placement?: string;
};

/**
 * Persistent Kent VA conversion block for high-traffic rights/guide pages.
 * Links the canonical request form: /start/voluntary-interview#request
 */
export function PersistentKentVaCta({ className = "", placement = "guide" }: Props) {
  return (
    <aside
      className={`rounded-xl border-2 border-accent/50 bg-primary-dark p-5 md:p-6 text-white shadow-elevated ${className}`}
      aria-label="Request Kent voluntary interview solicitor"
      data-kent-va-cta="true"
      data-placement={placement}
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-accent-light mb-2">
        Kent voluntary interview · not the police
      </p>
      <h2 className="font-display text-lg md:text-xl font-bold text-white mb-2">
        Got a police letter or interview under caution in Kent?
      </h2>
      <p className="text-sm text-white/85 leading-relaxed mb-4">
        Free solicitor representation at the police station where you qualify. Do not discuss the
        allegation on the phone — request representation first. We are criminal defence solicitors,
        not Kent Police.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-2">
        <Link
          href={`${PATH_VOLUNTARY}#request`}
          data-event="gsc_guide_va_cta"
          className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-bold text-accent-foreground hover:bg-accent-light"
        >
          Request VA solicitor
        </Link>
        <Link
          href={PATH_VOLUNTARY_LANDING}
          className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
        >
          Kent voluntary interviews
        </Link>
        <Link
          href={PATH_CUSTODY}
          className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-red-300/50 bg-red-700/80 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
        >
          Someone in custody now
        </Link>
      </div>
    </aside>
  );
}

/**
 * Defence-not-station banner for pages matching police-station SERP queries
 * (Dover / Canterbury / Tunbridge Wells and similar).
 */
export function DefenceNotStationBanner({
  stationLabel,
  className = "",
}: {
  stationLabel?: string;
  className?: string;
}) {
  const label = stationLabel ? `${stationLabel} ` : "";
  return (
    <aside
      className={`rounded-xl border border-red-200 bg-red-50 p-4 md:p-5 ${className}`}
      aria-label="Not a police station contact page"
      data-defence-not-station="true"
    >
      <p className="text-sm md:text-base font-bold text-red-950 mb-1">
        NOT {label}Kent Police — independent criminal defence solicitors
      </p>
      <p className="text-sm text-red-900 leading-relaxed mb-3">
        This page is for legal representation at police stations, not station opening times,
        custody suite numbers, lost property, or crime reports. For police assistance use 999 or
        101.
      </p>
      <Link
        href={`${PATH_VOLUNTARY}#request`}
        className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-light"
      >
        Request VA solicitor
      </Link>
    </aside>
  );
}
