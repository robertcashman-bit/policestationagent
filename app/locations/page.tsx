import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DOMAIN } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbList } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Police Station Reps in Kent | All Towns",
  description:
    "Police station rep and police station reps across Kent — browse town rep pages, custody suites, and solicitor coverage by area.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/locations`,
  },
  openGraph: {
    title: "Police Station Reps in Kent | All Towns",
    description:
      "Police station rep and police station reps across Kent — browse town rep pages, custody suites, and solicitor coverage by area.",
    url: `https://${SITE_DOMAIN}/locations`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

const stations = [
  { href: "/medway-police-station", label: "Medway Police Station" },
  { href: "/maidstone-police-station", label: "Maidstone Police Station" },
  { href: "/canterbury-police-station", label: "Canterbury Police Station" },
  { href: "/ashford-police-station", label: "Ashford Police Station" },
  { href: "/folkestone-police-station", label: "Folkestone Police Station" },
  { href: "/dover-police-station", label: "Dover Police Station" },
  { href: "/police-station-rep-gravesend", label: "North Kent (Gravesend) Police Station" },
  { href: "/police-station-rep-tonbridge", label: "Tonbridge Police Station" },
  { href: "/tunbridge-wells-police-station", label: "Tunbridge Wells Police Station" },
  { href: "/sevenoaks-police-station", label: "Sevenoaks Police Station" },
  { href: "/sittingbourne-police-station", label: "Sittingbourne Police Station" },
  { href: "/swanley-police-station", label: "Swanley Police Station" },
  { href: "/margate-police-station", label: "Margate Police Station" },
  { href: "/bluewater-police-station", label: "Bluewater Police Station" },
  { href: "/coldharbour-police-station", label: "Coldharbour Police Station" },
];

const solicitorsByTown = [
  { href: "/maidstone-solicitor", label: "Maidstone solicitor" },
  { href: "/canterbury-solicitor", label: "Canterbury solicitor" },
  { href: "/ashford-solicitor", label: "Ashford solicitor" },
  { href: "/folkestone-solicitor", label: "Folkestone solicitor" },
  { href: "/dover-solicitor", label: "Dover solicitor" },
  { href: "/medway-solicitor", label: "Medway solicitor" },
  { href: "/police-station-rep-gravesend", label: "Gravesend police station cover" },
  { href: "/police-station-rep-tonbridge", label: "Tonbridge police station cover" },
  { href: "/tunbridge-wells-solicitor", label: "Tunbridge Wells solicitor" },
  { href: "/sevenoaks-solicitor", label: "Sevenoaks solicitor" },
  { href: "/sittingbourne-solicitor", label: "Sittingbourne solicitor" },
  { href: "/swanley-solicitor", label: "Swanley solicitor" },
  { href: "/dartford-solicitor", label: "Dartford solicitor" },
  { href: "/bromley-solicitor", label: "Bromley solicitor" },
  { href: "/rochester-solicitor", label: "Rochester solicitor" },
  { href: "/ramsgate-solicitor", label: "Ramsgate solicitor" },
  { href: "/sandwich-solicitor", label: "Sandwich solicitor" },
  { href: "/whitstable-solicitor", label: "Whitstable solicitor" },
  { href: "/faversham-solicitor", label: "Faversham solicitor" },
  { href: "/deal-solicitor", label: "Deal solicitor" },
  { href: "/gillingham-solicitor", label: "Gillingham solicitor" },
  { href: "/chatham-solicitor", label: "Chatham solicitor" },
  { href: "/herne-bay-solicitor", label: "Herne Bay solicitor" },
  { href: "/bluewater-solicitor", label: "Bluewater solicitor" },
];

const repByTown = [
  { href: "/police-station-rep-medway", label: "Police station rep in Medway" },
  { href: "/police-station-rep-maidstone", label: "Police station rep in Maidstone" },
  { href: "/police-station-rep-canterbury", label: "Police station rep in Canterbury" },
  { href: "/police-station-rep-ashford", label: "Police station rep in Ashford" },
  { href: "/police-station-rep-folkestone", label: "Police station rep in Folkestone" },
  { href: "/police-station-rep-dover", label: "Police station rep in Dover" },
  { href: "/police-station-rep-gravesend", label: "Police station rep in Gravesend" },
  { href: "/police-station-rep-tonbridge", label: "Police station rep in Tonbridge" },
  { href: "/police-station-rep-tunbridge-wells", label: "Police station rep in Tunbridge Wells" },
  { href: "/police-station-rep-sevenoaks", label: "Police station rep in Sevenoaks" },
  { href: "/police-station-rep-sittingbourne", label: "Police station rep in Sittingbourne" },
  { href: "/police-station-rep-swanley", label: "Police station rep in Swanley" },
  { href: "/police-station-rep-margate", label: "Police station rep in Margate" },
  { href: "/police-station-rep-dartford", label: "Police station rep in Dartford" },
  { href: "/police-station-rep-bluewater", label: "Police station rep in Bluewater" },
];

const other = [
  { href: "/coverage", label: "Coverage overview" },
  { href: "/police-stations", label: "All police stations" },
  { href: "/areas", label: "All areas" },
  { href: "/services", label: "All services" },
  { href: "/kent-police-stations", label: "Kent police stations (guide)" },
  { href: "/kent-police-station-reps", label: "Kent police station reps (guide)" },
  { href: "/arrival-times-delays", label: "Arrival times & delays" },
  { href: "/case-status", label: "Case status" },
  { href: "/guided-assistant", label: "Guided assistant" },
  { href: "/join", label: "Join / work with us" },
];

function LinkGrid({ items }: { items: Array<{ href: string; label: string }> }) {
  return (
    <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 text-slate-900 shadow-sm"
        >
          <span className="font-semibold">{i.label}</span>
          <span className="text-slate-500 ml-2">→</span>
        </Link>
      ))}
    </div>
  );
}

export default function LocationsPage() {
  const siteUrl = `https://${SITE_DOMAIN}`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <BreadcrumbList
        items={[
          { name: "Home", url: siteUrl },
          { name: "Locations", url: `${siteUrl}/locations` },
        ]}
      />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1>Police Station Reps in Kent</h1>
            <p className="lead">
              Use this page as a hub to find the right local page (police station rep, town solicitor
              page, or coverage guide). This also helps search engines and users discover your key location
              pages.
            </p>

            <h2>Quick start</h2>
            <LinkGrid items={other} />

            <h2>Kent police stations</h2>
            <p>
              If you’re looking for a specific custody suite page, start here. For the complete
              directory, see <Link href="/police-stations">All Police Stations</Link>.
            </p>
            <LinkGrid items={stations} />

            <h2>Solicitors by town (Kent)</h2>
            <p>Town-based pages to help users quickly find the nearest coverage information.</p>
            <LinkGrid items={solicitorsByTown} />

            <h2>Police station rep pages (by town)</h2>
            <p>
              Additional town landing pages for police station representation. If you’re a firm
              looking for agent cover, see <Link href="/for-solicitors">For Solicitors</Link>.
            </p>
            <LinkGrid items={repByTown} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
