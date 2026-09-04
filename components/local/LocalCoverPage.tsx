import { JsonLd } from "@/components/JsonLd";
import { GeneralLegalDisclaimer } from "@/components/conversion/GeneralLegalDisclaimer";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import type { LocalCoverConfig } from "@/lib/seo/local-cover-data";
import Link from "next/link";
import { SITE_URL } from "@/config/site";
import {
  LEGAL_SERVICE_SCHEMA_DESCRIPTION,
  STATION_CONTACT_BUTTON,
} from "@/config/contact";

type Props = {
  config: LocalCoverConfig;
};

function pathwayCtas(config: LocalCoverConfig) {
  const isVoluntary = config.primaryPathway === "voluntary";
  const primaryHref = isVoluntary
    ? "/voluntary-interviews#request"
    : "/current-custody";
  const primaryLabel = isVoluntary
    ? "Request representation"
    : "Current custody check";

  return (
    <div className="flex flex-wrap gap-3 flex-col sm:flex-row" data-nosnippet>
      <Link
        href={primaryHref}
        data-event="contact_click"
        className="btn-gold px-5 py-3 text-sm"
      >
        {primaryLabel}
      </Link>
      <Link
        href="/for-solicitors"
        data-event="contact_click"
        className="inline-flex items-center justify-center rounded-md border-2 border-primary bg-card px-5 py-3 text-sm font-bold text-primary hover:bg-secondary"
      >
        Agency cover for solicitors
      </Link>
    </div>
  );
}

export function LocalCoverPage({ config }: Props) {
  const pageUrl = `${SITE_URL}/${config.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Independent solicitor for police interviews — ${config.town}`,
    description: `${LEGAL_SERVICE_SCHEMA_DESCRIPTION} ${config.metaDescription}`,
    provider: {
      "@type": "LegalService",
      name: "Police Station Agent",
      url: SITE_URL,
      description: LEGAL_SERVICE_SCHEMA_DESCRIPTION,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${config.town}, Kent, UK`,
    },
    url: pageUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: config.town,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="hero-navy py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-wide text-accent-light mb-2 font-semibold">
            Kent police station rep
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
            {config.h1}
          </h1>
          <p className="text-white/90 text-lg mb-6">{config.intro}</p>
          <div className="surface-card p-4 shadow-elevated max-w-xl" data-nosnippet>
            <h2 className="text-base font-bold text-foreground mb-3">
              How to instruct or request representation
            </h2>
            {pathwayCtas(config)}
            <p className="mt-3 text-xs text-muted-foreground">
              <Link href="/contact" className="font-semibold underline text-primary">
                {STATION_CONTACT_BUTTON}
              </Link>{" "}
              — choose a pathway on Contact; solicitor telephone is not listed in public page
              HTML.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <section className="surface-card p-6">
          <h2 className="text-lg font-bold text-foreground mb-2">In brief</h2>
          <p className="text-muted-foreground">{config.answerFirst}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Who this page is for</h2>
          <p className="text-muted-foreground">{config.audience}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary mb-3">Areas covered</h2>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            {config.areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        {config.stations?.length ? (
          <section>
            <h2 className="text-xl font-bold text-primary mb-2">
              Police station location information
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Station addresses below are for orientation only — they are not our office address.
              Numbers on this site are independent solicitor contacts, not Kent Police.
            </p>
            <ul className="space-y-3">
              {config.stations.map((s) => (
                <li key={s.name} className="surface-card p-4 bg-secondary/40">
                  <p className="font-semibold text-foreground">{s.name}</p>
                  {s.address ? <p className="text-sm text-muted-foreground">{s.address}</p> : null}
                  {s.note ? <p className="text-sm text-muted-foreground">{s.note}</p> : null}
                  {s.href ? (
                    <Link href={s.href} className="text-sm text-primary font-semibold hover:underline">
                      Station details →
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="text-xl font-bold text-primary mb-4">Frequently asked questions</h2>
          <dl className="space-y-4">
            {config.faqs.map((f) => (
              <div key={f.question} className="surface-card p-4">
                <dt className="font-semibold text-foreground">{f.question}</dt>
                <dd className="mt-2 text-muted-foreground text-sm">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <InternalLinkHub
          title="Related pages"
          links={[
            { href: "/", text: "Homepage", description: "Police Station Agent" },
            {
              href: "/for-solicitors",
              text: "Police station cover for solicitors",
              description: "Firm instructions / agency cover",
            },
            {
              href: "/free-police-station-advice-kent",
              text: "Police station legal advice",
              description: "Client information",
            },
            {
              href: "/contact",
              text: "Contact pathways",
              description: "Choose voluntary interview, custody, or agency cover",
            },
            ...config.nearbyLinks.map((l) => ({
              href: l.href,
              text: l.label,
              description: "Nearby cover",
            })),
          ]}
        />

        <GeneralLegalDisclaimer />
      </div>
    </>
  );
}
