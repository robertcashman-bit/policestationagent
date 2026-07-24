import { NOT_POLICE_NOTICE } from "@/config/contact";

type Props = {
  className?: string;
};

/**
 * Prominent disambiguation notice: independent solicitor site, not Kent Police.
 */
export default function NotPoliceNotice({ className = "" }: Props) {
  return (
    <aside
      role="note"
      data-station-not-police="true"
      className={
        className ||
        "rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-slate-800 leading-relaxed mb-4"
      }
      aria-label="Not Kent Police — independent solicitor website"
    >
      <p>{NOT_POLICE_NOTICE}</p>
    </aside>
  );
}
