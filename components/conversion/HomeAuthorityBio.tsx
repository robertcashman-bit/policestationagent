import Link from "next/link";

const CREDENTIALS = [
  { title: "Practice Director", detail: "Major Legal Aid Practice" },
  { title: "Duty Solicitor", detail: "Police Station Specialist" },
  { title: "Higher Court Advocate", detail: "Crown Court advocacy" },
  { title: "30+ years", detail: "Criminal defence experience" },
] as const;

export function HomeAuthorityBio() {
  return (
    <section
      className="section-pad bg-background"
      aria-labelledby="authority-bio-heading"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border bg-primary-dark text-white shadow-elevated md:grid md:grid-cols-2">
        <div className="p-8 md:p-12 lg:p-14">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-light">
            Robert Cashman
          </p>
          <h2
            id="authority-bio-heading"
            className="mt-2 font-display text-3xl font-bold text-white md:text-4xl"
          >
            Expert Criminal Defence Solicitor
          </h2>
          <div className="accent-rule mt-4 bg-accent" aria-hidden="true" />
          <p className="mt-5 max-w-measure text-base leading-relaxed text-white/80 md:text-lg">
            With over 30 years of criminal law experience, including roles as Practice Director and
            Higher Court Advocate, I specialise exclusively in police station representation.
          </p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {CREDENTIALS.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                <dt className="font-semibold text-white">{item.title}</dt>
                <dd className="mt-0.5 text-sm text-white/65">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-5 text-sm font-bold text-primary transition-colors hover:bg-secondary"
          >
            About Robert Cashman
          </Link>
        </div>
        <div className="relative min-h-[280px] md:min-h-full">
          {/* Extensionless legacy asset — keep <img> for compatibility */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/photo-1589829545856-d10d557cf95f"
            alt="Robert Cashman - Criminal Defence Solicitor Kent"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent md:bg-gradient-to-l"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
