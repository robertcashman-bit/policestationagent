import { SEO_NOT_POLICE, SERVICE_SCOPE_SHORT } from "@/config/contact";

/**
 * Sitewide scope + not-police disclaimer. Reduces wrong callers (police, general advice).
 * Calm note styling — help-first chrome leads; this is secondary disambiguation.
 */
export default function NotPoliceScopeBanner() {
  return (
    <div
      className="bg-slate-100 border-b border-slate-200 text-slate-800"
      role="note"
      aria-label="Important: who we are and who we help"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 text-center text-xs sm:text-sm leading-snug">
        <p>
          <strong className="font-semibold text-slate-900">{SEO_NOT_POLICE}</strong>{" "}
          <span className="text-slate-600">{SERVICE_SCOPE_SHORT}</span>
        </p>
      </div>
    </div>
  );
}
