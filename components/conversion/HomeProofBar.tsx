import Link from "next/link";

const PROOF_ITEMS = [
  { value: "30+", label: "Years experience" },
  { value: "21,000+", label: "Clients helped" },
  { value: "Extended", label: "Hours cover" },
  { value: "SRA 127795", label: "Tuckers Solicitors LLP" },
] as const;

export function HomeProofBar() {
  return (
    <section
      className="relative z-10 border-b border-border-subtle bg-[var(--paper)]"
      aria-label="Experience and credentials"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-end md:gap-10">
          <div>
            <p className="section-eyebrow">Established credentials</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-primary md:text-3xl">
              Trust built in Kent custody suites
            </h2>
            <div className="accent-rule mt-4" aria-hidden="true" />
          </div>
          <p className="mt-4 max-w-measure text-sm leading-relaxed text-muted-foreground md:mt-0 md:text-base md:text-right">
            Robert Cashman — accredited duty solicitor &amp; Higher Court Advocate via{" "}
            <strong className="text-primary">Tuckers Solicitors LLP</strong>.{" "}
            <Link href="/about" className="font-semibold text-primary underline-offset-2 hover:underline">
              About Robert
            </Link>
            {" · "}
            <a
              href="#testimonials"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Client testimonials
            </a>
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {PROOF_ITEMS.map((item) => (
            <div
              key={item.label}
              className="bg-card px-4 py-6 text-center md:px-5 md:py-8"
            >
              <div className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl lg:text-4xl">
                {item.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground md:text-[0.7rem]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
