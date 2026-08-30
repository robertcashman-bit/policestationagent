import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbList } from "@/components/StructuredData";
import { SITE_URL } from "@/config/site";
import KentPoliceStationMap from "@/components/KentPoliceStationMap";
import NearestStationFinder from "@/components/NearestStationFinder";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo/page-metadata";

export const metadata: Metadata = {
  title: "Kent Police Station Rep Coverage | All Towns | FREE extended hours",
  description:
    "Police station rep coverage across all Kent towns. FREE extended hours representation at Kent operational custody suites (Medway, North Kent/Gravesend, Canterbury, Tonbridge, Folkestone, Margate) and voluntary interview stations including Maidstone (custody closed / VAI only).",
  alternates: {
    canonical: `${SITE_URL}/coverage`,
  },
  openGraph: {
    title: "Kent Police Station Coverage | Duty Solicitor – Police Station Agent",
    description:
      "We cover all Kent custody suites and major voluntary interview stations with duty solicitor-led representation.",
    url: `${SITE_URL}/coverage`,
    siteName: "Police Station Agent",
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kent Police Station Coverage | Duty Solicitor – Police Station Agent",
    description:
      "We cover all Kent custody suites and major voluntary interview stations with duty solicitor-led representation.",
    images: [...DEFAULT_TWITTER_IMAGES],
  },
};

const CUSTODY_SUITES = [
  {
    href: "/medway-psa-station",
    title: "Medway Custody Suite",
    detail: "Expert police station reps available.",
  },
  {
    href: "/north-kent-gravesend-psa-station",
    title: "North Kent Custody (Gravesend)",
    detail: "Expert police station reps available.",
  },
  {
    href: "/tonbridge-psa-station",
    title: "Tonbridge Custody Suite",
    detail: "Expert police station reps available.",
  },
  {
    href: "/canterbury-psa-station",
    title: "Canterbury Custody Suite",
    detail: "Expert police station reps available.",
  },
  {
    href: "/folkestone-psa-station",
    title: "Folkestone Custody Suite",
    detail: "Expert police station reps available.",
  },
  {
    href: "/margate-psa-station",
    title: "Margate Custody Suite",
    detail: "Expert police station reps available.",
  },
] as const;

const VOLUNTARY_STATIONS = [
  { href: "/maidstone-psa-station", title: "Maidstone (custody closed / VAI only)" },
  { href: "/ashford-psa-station", title: "Ashford Police Station" },
  { href: "/dover-psa-station", title: "Dover Police Station" },
  { href: "/sevenoaks-psa-station", title: "Sevenoaks Police Station" },
  { href: "/sittingbourne-psa-station", title: "Sittingbourne Police Station" },
  { href: "/swanley-psa-station", title: "Swanley (VAI / local cover)" },
  { href: "/tunbridge-wells-psa-station", title: "Tunbridge Wells Police Station" },
  { href: "/bluewater-psa-station", title: "Bluewater area (VAI / local cover)" },
] as const;

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const breadcrumbItems = [
    { name: "Home", url: siteUrl },
    { name: "Coverage", url: `${siteUrl}/coverage` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <BreadcrumbList items={breadcrumbItems} />
      <Header forceHidePhone />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <section className="relative overflow-hidden hero-navy section-seam-from-navy">
          <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
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
                className="mx-auto mb-4 h-14 w-14 text-accent-light"
                aria-hidden="true"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                Police Station Rep Coverage in Kent
              </h1>
              <p className="mt-4 text-lg text-white/90 md:text-xl">
                Police Station Agent provides accredited representation at all Kent custody suites
                and major voluntary interview police stations.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="#custody-suites"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-primary transition hover:bg-accent-light"
                >
                  View Police Stations
                </Link>
                <Link
                  href="/coverage/areas"
                  className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  View Areas
                </Link>
                <Link
                  href="/resources/kent-police-station-map"
                  className="inline-flex items-center justify-center rounded-lg border border-accent/50 bg-accent/15 px-6 py-3 font-semibold text-accent-light transition hover:bg-accent/25"
                >
                  Station map
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border-subtle bg-card py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <KentPoliceStationMap />
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <NearestStationFinder />

            <div
              id="custody-suites"
              className="mb-12 scroll-mt-24 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
            >
              <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-primary">
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
                  className="h-8 w-8 text-primary"
                  aria-hidden="true"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
                Kent Police Custody Suites
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {CUSTODY_SUITES.map((station) => (
                  <Link
                    key={station.href}
                    href={station.href}
                    className="block rounded-lg border border-border p-6 transition-all hover:border-accent hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">{station.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{station.detail}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-12 rounded-xl border border-blue-200 bg-blue-50/80 p-6 shadow-[var(--shadow-card)] md:p-8">
              <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-primary">
                Voluntary Interview Stations
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {VOLUNTARY_STATIONS.map((station) => (
                  <Link
                    key={station.href}
                    href={station.href}
                    className="block rounded-lg border border-border bg-white p-6 transition-all hover:border-accent hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">{station.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Representation for voluntary interviews.
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary-dark p-8 text-center text-white shadow-xl">
              <h3 className="font-display text-3xl font-bold text-accent-light">
                Need a Police Station Rep Anywhere in Kent?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
                If you or a client need representation at any Kent police station during extended
                hours, contact us for immediate expert advice.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-bold text-primary-dark transition hover:bg-accent-light"
              >
                Contact for representation
              </Link>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-100 p-6 text-center">
              <h3 className="font-bold text-slate-800">Looking for Specific Police Stations?</h3>
              <p className="mb-4 mt-2 text-slate-600">
                View detailed information about individual police stations we cover, including
                custody facilities and voluntary interview arrangements.
              </p>
              <Link
                href="#custody-suites"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-primary/90"
              >
                View All Police Stations
              </Link>
            </div>

            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
              <h3 className="font-bold text-slate-800">London &amp; M25 Coverage Also Available</h3>
              <p className="mb-4 mt-2 text-slate-600">
                Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795) for selected
                Metropolitan Police stations by arrangement. Ideal for cases on the London/Kent
                border.
              </p>
              <Link
                href="/outofarea"
                className="inline-flex items-center justify-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Learn More About London Coverage
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer forceHidePhone />
    </div>
  );
}
