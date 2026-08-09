import Link from "next/link";

const PROOF_ITEMS = [
  { value: "35+", label: "Years experience" },
  { value: "21,000+", label: "Clients helped" },
  { value: "100%", label: "Kent custody suites" },
  { value: "SRA 127795", label: "Tuckers Solicitors LLP" },
] as const;

export function HomeProofBar() {
  return (
    <section className="mx-auto max-w-5xl px-4 -mt-6 md:-mt-8 relative z-20" aria-label="Experience and credentials">
      <div className="surface-card px-4 py-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {PROOF_ITEMS.map((item) => (
            <div key={item.label} className="px-1">
              <div className="font-display text-xl md:text-2xl font-bold text-primary">{item.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-foreground/80 border-t border-border pt-4">
          Robert Cashman — accredited duty solicitor &amp; Higher Court Advocate via{" "}
          <strong className="text-primary">Tuckers Solicitors LLP</strong>.{" "}
          <Link href="/about" className="font-semibold text-primary hover:underline">
            About Robert
          </Link>
          {" · "}
          <a href="#testimonials" className="font-semibold text-primary hover:underline">
            Client testimonials
          </a>
        </p>
      </div>
    </section>
  );
}
