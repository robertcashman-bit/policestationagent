import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const SERVICES = [
  {
    title: "Police Station Representation",
    badge: "FREE under Legal Aid",
    href: "/services",
    cta: "Police station services",
    description:
      "Expert legal advice during police interviews, voluntary attendances, and custody. Your right to free legal advice is protected by law.",
    points: ["All Kent police stations", "Extended hours service", "Accredited duty solicitor"],
    emphasis: "primary" as const,
  },
  {
    title: "Agent Cover for Law Firms",
    badge: "Professional service",
    href: "/for-solicitors",
    cta: "Agency cover for firms",
    description:
      "Reliable duty solicitor services for criminal law firms. Comprehensive notes and competitive rates.",
    points: ["Detailed attendance notes", "Competitive fixed rates", "35 years experience"],
    emphasis: "accent" as const,
  },
  {
    title: "Private Client Service",
    badge: "Private client option",
    href: "/privatecrime",
    cta: "Private services",
    description:
      "You deal with a senior solicitor directly — we stay involved from first call to the end of the case.",
    points: [
      "Dedicated senior solicitor",
      "Police station to Crown Court",
      "Fixed fee packages available",
    ],
    emphasis: "muted" as const,
  },
] as const;

export function HomeServicesSection() {
  const [lead, ...rest] = SERVICES;

  return (
    <section className="section-pad bg-[var(--cream)]" aria-labelledby="home-services-heading">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-measure-wide">
          <p className="section-eyebrow">How we can help</p>
          <h2 id="home-services-heading" className="section-title mt-2">
            Police station and court help
          </h2>
          <p className="section-lede">
            Someone with you at the police station, in court when you need it, and extra support if
            you instruct privately.
          </p>
        </div>

        <article className="mt-10 overflow-hidden rounded-2xl border border-primary/20 bg-primary text-white shadow-elevated md:grid md:grid-cols-[1.35fr_1fr]">
          <div className="p-6 md:p-10">
            <span className="inline-flex rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
              {lead.badge}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
              {lead.title}
            </h3>
            <p className="mt-3 max-w-measure text-white/80">{lead.description}</p>
            <ul className="mt-6 space-y-2">
              {lead.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-white/85">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Link href={lead.href} className="btn-gold mt-8 gap-2">
              {lead.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div
            className="relative hidden border-l border-white/10 md:block"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgb(201_162_39/0.18),transparent_55%)]" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-display text-5xl font-bold leading-none text-white/10">Custody</p>
              <p className="mt-2 text-sm text-white/50">Active investigations · Booked interviews</p>
            </div>
          </div>
        </article>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((service, index) => (
            <article
              key={service.href}
              className={`rounded-xl border bg-card p-6 shadow-card lift-hover ${
                index === 0 ? "md:-mt-0 border-accent/30" : "border-border"
              }`}
            >
              <span
                className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${
                  service.emphasis === "accent"
                    ? "bg-accent/15 text-accent-dark"
                    : "bg-secondary text-primary"
                }`}
              >
                {service.badge}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-primary">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={service.href} className="btn-navy mt-6 gap-2">
                {service.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
