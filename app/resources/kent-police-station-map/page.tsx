import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN, SITE_URL } from "@/config/site";
import PrintButton from "@/components/PrintButton";
import KentPoliceStationMap from "@/components/KentPoliceStationMap";
import { KENT_MAP_BASE, KENT_MAP_STATIONS } from "@/lib/kent-station-map-data";
import { BreadcrumbList } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Kent Police Station Map | Distances from West Kingsdown",
  description:
    "Quick-reference map of Kent police stations and custody suites from West Kingsdown (TN15). Distances, typical drive times, and links to station pages. Printable resource for defence work.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/resources/kent-police-station-map`,
  },
  openGraph: {
    title: "Kent Police Station & Custody Map",
    description:
      "Distances and drive times from West Kingsdown across Kent custody suites and major police stations.",
    url: `${SITE_URL}/resources/kent-police-station-map`,
    type: "website",
  },
};

export default function KentPoliceStationMapPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const breadcrumbItems = [
    { name: "Home", url: siteUrl },
    { name: "Resources", url: `${siteUrl}/resources` },
    { name: "Kent police station map", url: `${siteUrl}/resources/kent-police-station-map` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col print:bg-white">
      <BreadcrumbList items={breadcrumbItems} />
      <div className="print:hidden">
        <Header forceHidePhone />
      </div>
      <main
        className="flex-grow mx-auto w-full max-w-6xl px-4 py-12 md:px-6 print:max-w-none print:px-2 print:py-4"
        id="main-content"
      >
        <p className="mb-2 text-sm text-slate-500 print:hidden">
          <Link href="/resources" className="text-blue-700 underline underline-offset-2">
            ← Resources
          </Link>
          {" · "}
          <Link href="/coverage" className="text-blue-700 underline underline-offset-2">
            Areas covered
          </Link>
        </p>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between print:mb-4">
          <div>
            <p className="section-eyebrow print:hidden">Printable resource</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">
              Kent police station map
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Custody suites and major stations relative to our West Kingsdown base (
              {KENT_MAP_BASE.postcode}). Independent defence resource — not an official Kent Police
              directory.
            </p>
          </div>
          <div className="print:hidden">
            <PrintButton className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900" />
          </div>
        </div>

        <KentPoliceStationMap compact showList />

        <section className="mt-10 hidden print:block">
          <h2 className="mb-3 text-lg font-bold">Station list</h2>
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Station</th>
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Miles</th>
                <th className="py-2">Drive</th>
              </tr>
            </thead>
            <tbody>
              {KENT_MAP_STATIONS.map((s) => (
                <tr key={s.id} className="border-b border-slate-200">
                  <td className="py-1.5 pr-3">{s.id}</td>
                  <td className="py-1.5 pr-3">{s.name}</td>
                  <td className="py-1.5 pr-3">{s.custody ? "Custody" : "Station"}</td>
                  <td className="py-1.5 pr-3">{s.miles}</td>
                  <td className="py-1.5">~{s.driveMins} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-600 print:mt-8">
          <p>
            <strong>Author:</strong> Robert Cashman, accredited duty solicitor (Kent) ·{" "}
            <span className="print:hidden">
              <Link href="/">policestationagent.com</Link>
            </span>
            <span className="hidden print:inline">policestationagent.com</span>
          </p>
          <p className="mt-2 print:hidden">
            You may link to this page for educational or professional planning purposes.{" "}
            <Link href="/link-to-us" className="text-blue-700 underline underline-offset-2">
              Link to us
            </Link>
            .
          </p>
        </footer>
      </main>
      <div className="print:hidden">
        <Footer forceHidePhone />
      </div>
    </div>
  );
}
