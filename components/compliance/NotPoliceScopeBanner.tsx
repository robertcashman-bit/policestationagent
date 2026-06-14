import { SEO_NOT_POLICE, SERVICE_SCOPE_SHORT } from "@/config/contact";

/**
 * Sitewide scope + not-police disclaimer. Reduces wrong callers (police, general advice).
 */
export default function NotPoliceScopeBanner() {
  return (
    <div
      className="bg-amber-50 border-b border-amber-200 text-slate-900"
      role="note"
      aria-label="Important: who we are and who we help"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 text-center text-xs sm:text-sm leading-snug">
        <p>
          <strong className="font-bold text-red-800">{SEO_NOT_POLICE}</strong>{" "}
          <span className="text-slate-700">{SERVICE_SCOPE_SHORT}</span>
        </p>
      </div>
    </div>
  );
}
