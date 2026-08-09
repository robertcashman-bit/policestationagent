import Link from "next/link";
import { Shield, Users, Star, CheckCircle2, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Police Station Representation",
    badge: "FREE under Legal Aid",
    href: "/services",
    cta: "Police station services",
    icon: Shield,
    description:
      "Expert legal advice during police interviews, voluntary attendances, and custody. Your right to free legal advice is protected by law.",
    points: ["All Kent police stations", "Extended hours service", "Accredited duty solicitor"],
  },
  {
    title: "Agent Cover for Law Firms",
    badge: "Professional service",
    href: "/for-solicitors",
    cta: "Agency cover for firms",
    icon: Users,
    description:
      "Reliable duty solicitor services for criminal law firms. Comprehensive notes and competitive rates.",
    points: ["Detailed attendance notes", "Competitive fixed rates", "35 years experience"],
  },
  {
    title: "Private Client Service",
    badge: "Private client option",
    href: "/privatecrime",
    cta: "Private services",
    icon: Star,
    description:
      "You deal with a senior solicitor directly — we stay involved from first call to the end of the case.",
    points: [
      "Dedicated senior solicitor",
      "Police station to Crown Court",
      "Fixed fee packages available",
    ],
  },
] as const;

export function HomeServicesSection() {
  return (
    <section className="section-pad bg-card" aria-labelledby="home-services-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-accent-dark mb-2">
            How we can help
          </p>
          <h2
            id="home-services-heading"
            className="font-display text-3xl md:text-4xl font-bold text-primary mb-3"
          >
            Police station and court help
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Someone with you at the police station, in court when you need it, and extra support if
            you instruct privately.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.href}
                className="surface-card p-6 flex flex-col hover:shadow-elevated transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-primary text-accent flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-2">{service.title}</h3>
                <span className="inline-flex w-fit items-center rounded-md bg-accent/15 text-accent-dark text-xs font-bold px-2.5 py-1 mb-4">
                  {service.badge}
                </span>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2
                        className="w-4 h-4 text-accent-dark mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="btn-navy w-full gap-2">
                  {service.cta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
