/**
 * Official police contact only — never place the solicitor number here.
 */
export default function PoliceAssistanceBlock() {
  return (
    <aside
      className="rounded-lg border border-slate-300 bg-slate-100 p-4 md:p-5 mb-6"
      data-police-assistance="true"
      aria-label="Official police contact"
    >
      <h2 className="font-semibold text-slate-900 mb-2 text-base md:text-lg">
        Need the police?
      </h2>
      <p className="text-sm text-slate-700 leading-relaxed mb-3">
        This website is an independent criminal defence solicitor service. For
        official police contact, use Kent Police / national police numbers — not
        the solicitor telephone on this site.
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
    </aside>
  );
}
