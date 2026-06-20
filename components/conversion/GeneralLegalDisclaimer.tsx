import { LegalAccuracyNotice } from "@/components/legal/LegalAccuracyNotice";

export function GeneralLegalDisclaimer({ className = "" }: { className?: string }) {
  return (
    <LegalAccuracyNotice variant="text" className={`border-t border-slate-200 pt-4 text-sm ${className}`} />
  );
}
