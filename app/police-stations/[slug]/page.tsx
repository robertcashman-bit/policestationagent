import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { PlaceSchema } from "@/components/StructuredData";
import StationNotPoliceIntro from "@/components/compliance/StationNotPoliceIntro";
import PoliceAssistanceBlock from "@/components/compliance/PoliceAssistanceBlock";
import SolicitorHelpCTA from "@/components/compliance/SolicitorHelpCTA";
import Script from "next/script";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const station = db.prepare("SELECT * FROM police_stations WHERE slug = ?").get(params.slug) as
    | {
        name: string;
        address: string | null;
      }
    | undefined;

  if (!station) {
    return {
      title: "Police Station Not Found",
    };
  }

  const townName = station.name.replace(/\s*Police\s*Station.*/i, "").trim();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

  return {
    title: `${townName} Police Station Information | Independent Criminal Defence Solicitors`,
    description: `${SEO_NOT_POLICE} Independent guide to ${townName} police station information. FREE Legal Aid criminal defence solicitors for Kent custody and booked voluntary interviews — not a police contact number.`,
    alternates: {
      canonical: `${siteUrl}/police-stations/${params.slug}`,
    },
    openGraph: {
      title: `${townName} Police Station Information | Independent Criminal Defence Solicitors`,
      description: `${SEO_NOT_POLICE} Independent legal representation for Kent custody and booked voluntary interviews.`,
      url: `${siteUrl}/police-stations/${params.slug}`,
      siteName: "Police Station Agent",
      type: "website",
    },
  };
}

export default async function PoliceStationPage(props: PageProps) {
  const params = await props.params;
  const station = db.prepare("SELECT * FROM police_stations WHERE slug = ?").get(params.slug) as
    | {
        id: number;
        name: string;
        slug: string;
        address: string | null;
        content: string | null;
      }
    | undefined;

  if (!station) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const townName = station.name.replace(/\s*Police\s*Station.*/i, "").trim();
  const stationLabel = `${townName} Police Station`;

  // Place = station location only (no telephone).
  // LegalService on station pages: no telephone — number lives on /contact with do/don't scope.
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${siteUrl}/police-stations/${params.slug}#legalservice`,
    name: "Police Station Agent — Independent Criminal Defence Solicitors",
    description: `${SEO_NOT_POLICE} Independent criminal solicitor for ${townName} custody and booked voluntary interviews — not a police contact number. Telephone and scope (what we do / don't do) on the Contact page.`,
    url: `${siteUrl}/contact`,
    areaServed: [
      {
        "@type": "City",
        name: townName,
        containedIn: { "@type": "AdministrativeArea", name: "Kent" },
      },
      { "@type": "AdministrativeArea", name: "Kent" },
    ],
    serviceType: "Police Station Representation",
    priceRange: "Free under Legal Aid",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      {station.address ? (
        <PlaceSchema
          name={stationLabel}
          address={station.address}
          url={`${siteUrl}/police-stations/${params.slug}`}
          description={`Independent information about ${stationLabel}. Not an official police page.`}
          areaServed="Kent"
        />
      ) : null}
      <Script
        id="legal-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalServiceSchema),
        }}
      />
      <Header forceHidePhone />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/police-stations"
                className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left w-5 h-5"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back to Kent police station information
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {townName} Police Station Information
              </h1>
              <p className="text-lg text-blue-100 mb-4">
                Independent legal representation information — not an official police contact page.
              </p>
              {station.address && (
                <div className="flex items-center gap-2 text-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin w-5 h-5"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p className="text-lg">{station.address}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <StationNotPoliceIntro stationLabel={stationLabel} />
            <PoliceAssistanceBlock />

            {station.content ? (
              <div className="prose prose-lg max-w-none mb-12">
                <div
                  dangerouslySetInnerHTML={{ __html: station.content }}
                  className="prose prose-lg max-w-none"
                />
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl mb-12 border-l-4 border-blue-600 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  Independent representation at {stationLabel}
                </h2>
                <p className="text-slate-700 leading-relaxed text-lg mb-4">
                  Police Station Agent provides independent criminal defence solicitors for people
                  detained or invited for interview at {stationLabel}. We are not the police.
                </p>
                <div className="mt-6 space-y-3">
                  <p className="text-slate-700">Free legal advice under Legal Aid where eligible</p>
                  <p className="text-slate-700">
                    Available for urgent custody and booked voluntary interviews
                  </p>
                  <p className="text-slate-700">Expert representation during interviews under caution</p>
                </div>
              </div>
            )}

            <SolicitorHelpCTA
              heading={`Need a solicitor at ${stationLabel}?`}
              description={`If you or an immediate family member needs independent legal representation for current custody or a booked voluntary interview at ${stationLabel}, contact us. We cannot transfer you to the police.`}
              noSnippetPhone
              contactHref="/contact"
              contactLabel={`Contact Police Station Rep for ${townName}`}
            />
          </div>
        </section>
      </main>
      <Footer forceHidePhone />
    </div>
  );
}
