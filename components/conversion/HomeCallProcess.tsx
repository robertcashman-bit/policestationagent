const STEPS = [
  "We check whether this is a voluntary interview letter or current custody",
  "We contact you on the details you provided, then speak to the officer for disclosure",
  "We tell you plainly what to expect, how to prepare, and who will attend",
] as const;

export function HomeCallProcess() {
  return (
    <section className="section-pad bg-background" aria-labelledby="call-process-heading">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12 md:items-start">
          <div>
            <p className="section-eyebrow">After you request help</p>
            <h2 id="call-process-heading" className="section-title mt-2">
              What happens after you request help
            </h2>
            <div className="accent-rule mt-4" aria-hidden="true" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Use the pathways on this site — we do not publish a public switchboard number on every
              page. Once we have your request, this is the usual sequence.
            </p>
          </div>
          <ol className="mt-8 space-y-3 md:mt-0">
            {STEPS.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-xl border border-border bg-card px-4 py-3.5 shadow-card">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-secondary font-display text-sm font-bold text-primary shadow-sm"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <p className="pt-1.5 text-base leading-relaxed text-foreground/85 md:text-lg">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
