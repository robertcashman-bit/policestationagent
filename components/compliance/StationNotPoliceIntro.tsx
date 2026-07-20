import { SEO_NOT_POLICE } from "@/config/contact";

/**
 * Opening disambiguation for police-station information pages.
 * Must appear before station facts and before any solicitor telephone CTA.
 */
export default function StationNotPoliceIntro({
  stationLabel,
}: {
  stationLabel?: string;
}) {
  const place = stationLabel ? ` about ${stationLabel}` : "";

  return (
    <aside
      className="rounded-lg border border-red-200 bg-red-50 p-4 md:p-5 mb-6"
      data-station-not-police="true"
      aria-label="Not the police — independent legal service"
    >
      <p className="text-sm md:text-base text-slate-800 leading-relaxed mb-3">
        <strong className="text-red-900">{SEO_NOT_POLICE}</strong> This page
        provides independent police station information{place} for people who need
        a criminal defence solicitor. We are not Kent Police, we do not operate
        police stations, and we cannot transfer calls to police or deal with
        police enquiries.
      </p>
      <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
        <li>
          Need police assistance? Call <strong>999</strong> (emergency) or{" "}
          <strong>101</strong> (non-emergency).
        </li>
        <li>
          Need a solicitor for custody or a booked voluntary interview? Use the
          legal contact options on this page.
        </li>
      </ul>
    </aside>
  );
}
