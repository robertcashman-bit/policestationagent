import Link from "next/link";

type Props = {
  className?: string;
  compact?: boolean;
};

/**
 * Official police contact only — never place the solicitor number here.
 */
export function PoliceSignposting({ className = "", compact = false }: Props) {
  return (
    <aside
      className={`rounded-lg border border-slate-300 bg-slate-100 p-4 ${className}`}
      data-police-assistance="true"
      aria-label="Official police contact"
    >
      <h2 className="font-semibold text-slate-900 mb-2 text-base">
        {compact ? "Need the police?" : "Official police contact"}
      </h2>
      <p className="text-sm text-slate-700 leading-relaxed mb-3">
        This website is an independent criminal defence solicitor service — not Kent Police. We
        cannot transfer calls to the police, provide custody updates for uninstructed callers, or
        take crime reports.
      </p>
      <ul className="text-sm text-slate-800 space-y-2">
        <li>
          <strong>Emergency:</strong>{" "}
          <a href="tel:999" className="font-bold text-red-700 underline">
            999
          </a>
        </li>
        <li>
          <strong>Non-emergency:</strong>{" "}
          <a href="tel:101" className="font-bold text-slate-900 underline">
            101
          </a>
        </li>
      </ul>
      {!compact ? (
        <p className="text-xs text-slate-600 mt-3">
          For solicitor help with a booked interview or current custody, use the pathways on this
          site. For non-urgent written messages, use the enquiry form further down this page. See
          also the{" "}
          <Link href="/faq#immediate-custody-only" className="underline font-medium text-slate-800">
            FAQ
          </Link>
          .
        </p>
      ) : null}
    </aside>
  );
}
