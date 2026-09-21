/**
 * Single calm authority bar under homepage pathways.
 * Locked facts only — no CTAs, no phone digits, no new claims.
 */
const FACTS = [
  "30 years plus",
  "Tuckers Solicitors LLP",
  "SRA 127795",
  "Extended hours",
  "Independent defence — not the police",
] as const;

export function HomeAuthorityStrip() {
  return (
    <aside
      className="border-b border-border-subtle bg-[var(--paper)]"
      aria-label="Credentials"
      data-testid="home-authority-strip"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 px-4 py-3.5 text-center sm:gap-x-3 md:px-6 md:py-4">
        {FACTS.map((fact, index) => (
          <span key={fact} className="inline-flex items-center gap-x-2.5 sm:gap-x-3">
            {index > 0 ? (
              <span className="text-accent/80" aria-hidden="true">
                ·
              </span>
            ) : null}
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary/80 sm:text-xs">
              {fact}
            </span>
          </span>
        ))}
      </div>
    </aside>
  );
}
