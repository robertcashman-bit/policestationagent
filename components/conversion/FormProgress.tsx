type Props = {
  step: number;
  total: number;
  labels?: string[];
  className?: string;
};

export function FormProgress({ step, total, labels, className = "" }: Props) {
  const safeTotal = Math.max(1, total);
  const safeStep = Math.min(Math.max(1, step), safeTotal);
  const pct = Math.round((safeStep / safeTotal) * 100);

  return (
    <div className={`mb-6 ${className}`} aria-live="polite">
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="text-sm font-semibold text-slate-800">
          Step {safeStep} of {safeTotal}
          {labels?.[safeStep - 1] ? ` — ${labels[safeStep - 1]}` : ""}
        </p>
        <p className="text-xs text-slate-500">{pct}%</p>
      </div>
      <div
        className="h-2 rounded-full bg-slate-200 overflow-hidden"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={safeTotal}
        aria-valuenow={safeStep}
        aria-label={`Form progress: step ${safeStep} of ${safeTotal}`}
      >
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {labels && labels.length === safeTotal ? (
        <ol className="mt-3 hidden sm:grid gap-1" style={{ gridTemplateColumns: `repeat(${safeTotal}, minmax(0, 1fr))` }}>
          {labels.map((label, i) => (
            <li
              key={label}
              className={`text-[10px] uppercase tracking-wide text-center ${
                i + 1 <= safeStep ? "text-primary font-semibold" : "text-slate-400"
              }`}
            >
              {label}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
