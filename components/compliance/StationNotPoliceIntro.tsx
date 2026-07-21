import { STATION_SOLICITOR_CTA } from "@/config/contact";
import Link from "next/link";

/**
 * Opening disambiguation for police-station information pages.
 * Order: NOT THE POLICE → criminal solicitors → Contact (no firm telephone digits).
 */
export default function StationNotPoliceIntro({
  stationLabel,
}: {
  stationLabel?: string;
}) {
  const place = stationLabel ? ` (${stationLabel})` : "";

  return (
    <aside
      className="rounded-lg border border-red-200 bg-red-50 p-4 md:p-5 mb-6"
      data-station-not-police="true"
      aria-label="Not the police — independent criminal solicitors"
    >
      <p className="text-sm md:text-base text-slate-800 leading-relaxed mb-3">
        <strong className="text-red-900">NOT THE POLICE.</strong> We are{" "}
        <strong>criminal solicitors</strong> serving this station{place}.
      </p>
      <p className="text-sm text-slate-700 leading-relaxed mb-3">{STATION_SOLICITOR_CTA}</p>
      <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
        <li>
          Need police assistance? Call <strong>999</strong> (emergency) or{" "}
          <strong>101</strong> (non-emergency).
        </li>
        <li>
          Need urgent police station representation for custody or a forthcoming interview?{" "}
          <Link href="/contact" className="font-semibold text-blue-800 underline">
            Contact — what we do &amp; don&apos;t do
          </Link>{" "}
          (solicitor telephone last on that page).
        </li>
      </ul>
    </aside>
  );
}
