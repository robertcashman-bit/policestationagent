import Link from "next/link";

const STAGES = [
  {
    title: "Police Station",
    body: "Expert early intervention",
  },
  {
    title: "Handed to the right advocate",
    body: "To court specialists",
  },
  {
    title: "Court Defence",
    body: "Magistrates & Crown",
  },
] as const;

export function HomeCourtJourney() {
  return (
    <section
      className="relative overflow-hidden bg-primary-dark py-16 text-white md:py-20"
      aria-labelledby="court-journey-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 20%, rgb(201 162 39 / 0.14), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-light">
          From station to court
        </p>
        <h2
          id="court-journey-heading"
          className="mt-2 max-w-measure font-display text-3xl font-bold text-white md:text-4xl"
        >
          Police Station → Court → Resolution
        </h2>
        <p className="mt-4 max-w-measure-wide text-base leading-relaxed text-white/80 md:text-lg">
          Expert police station representation with a clean handover to the court advocate who will
          appear for you through our professional association with{" "}
          <strong className="text-white">Tuckers Solicitors LLP</strong>. Your case handled by the
          right expert at every stage.
        </p>

        <ol className="mt-10 grid gap-0 md:grid-cols-3">
          {STAGES.map((stage, index) => (
            <li
              key={stage.title}
              className="relative border-t border-white/15 py-6 md:border-t-0 md:border-l md:px-6 md:py-2 first:md:border-l-0 first:md:pl-0"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-light">
                Step {index + 1}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-white">{stage.title}</h3>
              <p className="mt-1 text-sm text-white/70">{stage.body}</p>
              {index < STAGES.length - 1 ? (
                <span
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-accent/50 md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link href="/courtrepresentation" className="btn-gold">
            Learn about court representation
          </Link>
        </div>
      </div>
    </section>
  );
}
