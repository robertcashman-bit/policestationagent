/**
 * Compact Kent client quotes placed just below the pathways-only hero —
 * closer than the full testimonials carousel further down. No photos.
 */
const QUOTES = [
  {
    quote:
      "I was terrified when the police contacted me. Robert attended quickly and handled everything professionally. Case dropped.",
    author: "TC",
    location: "Canterbury",
  },
  {
    quote:
      "Excellent duty solicitor. Arrived within 30 minutes and gave me confidence during a very stressful time.",
    author: "DM",
    location: "Medway",
  },
] as const;

export function HomePathwaySocialProof() {
  return (
    <section
      className="border-b border-border-subtle bg-[var(--paper)]"
      aria-labelledby="pathway-social-proof-heading"
      data-testid="pathway-social-proof"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <p className="section-eyebrow">Kent clients</p>
        <h2
          id="pathway-social-proof-heading"
          className="mt-1 font-display text-lg font-bold text-primary md:text-xl"
        >
          What people say after we helped
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {QUOTES.map((item) => (
            <blockquote
              key={`${item.author}-${item.location}`}
              className="rounded-xl border border-border border-l-4 border-l-accent bg-card px-4 py-3 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
                “{item.quote}”
              </p>
              <footer className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {item.author} · {item.location}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
