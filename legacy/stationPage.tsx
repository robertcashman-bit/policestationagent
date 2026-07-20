import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SEO_NOT_POLICE } from '@/config/contact';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const station = db.prepare('SELECT * FROM police_stations WHERE slug = ?').get(params.slug) as {
    name: string;
    content: string | null;
  } | undefined;

  if (!station) {
    return {
      title: 'Police Station Not Found',
    };
  }

  const townName = station.name.replace(/\s*Police\s*Station.*/i, '').trim();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://policestationagent.com';

  return {
    title: `${townName} Police Station Information | Independent Criminal Defence Solicitors`,
    description: `${SEO_NOT_POLICE} Independent legal representation information for ${townName} — not a police contact number.`,
    alternates: {
      canonical: `${siteUrl}/police-stations/${params.slug}`,
    },
  };
}

export default function PoliceStationPage({ params }: PageProps) {
  const station = db.prepare('SELECT * FROM police_stations WHERE slug = ?').get(params.slug) as {
    id: number;
    name: string;
    slug: string;
    address: string | null;
    phone: string | null;
    content: string | null;
  } | undefined;

  if (!station) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://policestationagent.com';
  const townName = station.name.replace(/\s*Police\s*Station.*/i, '').trim();
  const stationLabel = `${townName} Police Station`;

  // Place = station only (no telephone). LegalService = firm (no station streetAddress).
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: stationLabel,
    description: `Independent information about ${stationLabel}. Not an official police page.`,
    ...(station.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: station.address,
            addressRegion: 'Kent',
            addressCountry: 'GB',
          },
        }
      : {}),
    url: `${siteUrl}/police-stations/${station.slug}`,
  };

  const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${siteUrl}/police-stations/${station.slug}#legalservice`,
    name: 'Police Station Agent — Independent Criminal Defence Solicitors',
    description: `${SEO_NOT_POLICE} Independent police station representation for Kent custody and booked voluntary interviews.`,
    url: siteUrl,
    telephone: '+441732247427',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Kent',
    },
    serviceType: 'Police Station Representation',
    priceRange: 'Free under Legal Aid',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={placeSchema} />
      <JsonLd data={legalServiceSchema} />
      <Header />
      <main className="flex-grow">
        <section className="bg-[#0A2342] text-white py-12">
          <div className="container-custom">
            <Link
              href="/police-stations"
              className="inline-flex items-center gap-2 text-gray-200 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Kent police station information
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {townName} Police Station Information
            </h1>
            <p className="text-gray-200 mb-4">
              Independent solicitor information — not an official police contact page.
            </p>
            {station.address && (
              <div className="flex items-center gap-2 text-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{station.address}</span>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <aside className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8">
                <p className="text-sm text-slate-800">
                  <strong className="text-red-900">{SEO_NOT_POLICE}</strong> We cannot transfer
                  calls to police stations. For police assistance call 999 or 101. For a solicitor,
                  use the legal contact options below.
                </p>
              </aside>

              {station.content ? (
                <div className="prose prose-lg max-w-none mb-12 text-gray-700">
                  <div
                    dangerouslySetInnerHTML={{ __html: station.content }}
                    className="space-y-4"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-xl mb-12 border-l-4 border-[#0A2342]">
                  <h2 className="text-2xl font-semibold mb-4">
                    Independent representation at {stationLabel}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We provide professional legal representation at {stationLabel}. Our experienced
                    solicitors are available under Legal Aid for urgent custody and booked interview
                    matters.
                  </p>
                </div>
              )}

              <div className="bg-[#0A2342] text-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Need a solicitor?</h2>
                <p className="text-gray-200 mb-4">
                  If you need independent legal representation for current custody or a booked
                  voluntary interview at {stationLabel}, contact us. We are not the police.
                </p>
                <Link
                  href="/contact"
                  className="bg-white text-[#0A2342] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
                >
                  Contact Us Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
