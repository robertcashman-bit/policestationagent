import { JsonLd } from "@/components/JsonLd";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";
import { GeneralLegalDisclaimer } from "@/components/conversion/GeneralLegalDisclaimer";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import type { LocalCoverConfig } from "@/lib/seo/local-cover-data";
import Link from "next/link";
import { SITE_URL } from "@/config/site";

type Props = {
  config: LocalCoverConfig;
};

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
    name: `Police station cover — ${config.town}`,
    description: config.metaDescription,
    provider: {
      "@type": "LegalService",
      name: "Police Station Agent",
      url: SITE_URL,
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

      <section className="bg-gradient-to-br from-[#0A2342] via-blue-900 to-indigo-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs uppercase tracking-wide text-white mb-2 font-semibold">Kent police station cover</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{config.h1}</h1>
          <p className="text-white text-lg mb-6">{config.intro}</p>
          <div className="rounded-xl bg-white p-4 shadow-lg max-w-xl">
            <ConversionCTAGroup />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">In brief</h2>
          <p className="text-slate-700">{config.answerFirst}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Who this page is for</h2>
          <p className="text-slate-700">{config.audience}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Areas covered</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            {config.areas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        {config.stations?.length ? (
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Police stations</h2>
            <ul className="space-y-3">
              {config.stations.map((s) => (
                <li key={s.name} className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                  <p className="font-semibold text-slate-900">{s.name}</p>
                  {s.address ? <p className="text-sm text-slate-600">{s.address}</p> : null}
                  {s.note ? <p className="text-sm text-slate-600">{s.note}</p> : null}
                  {s.href ? (
                    <Link href={s.href} className="text-sm text-blue-700 font-semibold hover:underline">
                      Station details →
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently asked questions</h2>
          <dl className="space-y-4">
            {config.faqs.map((f) => (
              <div key={f.question} className="rounded-lg border border-slate-200 p-4">
                <dt className="font-semibold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-slate-700 text-sm">{f.answer}</dd>
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
              description: "Firm instructions",
            },
            {
              href: "/free-police-station-advice-kent",
              text: "Police station legal advice",
              description: "Client information",
            },
            { href: "/contact", text: "Contact", description: "Telephone and instructions" },
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
