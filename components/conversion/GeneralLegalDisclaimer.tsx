export function GeneralLegalDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-slate-600 border-t border-slate-200 pt-4 ${className}`}>
      The information on this website is general information only and is not legal advice on any
      specific case. If you are due to attend a police interview or require police station
      representation, you should obtain advice based on your own circumstances. Legal services are
      provided through Tuckers Solicitors LLP (SRA 127795) where applicable.
    </p>
  );
}
