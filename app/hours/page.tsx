import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { PATH_VOLUNTARY_LANDING, PATH_CUSTODY, PATH_AGENCY } from "@/config/enquiry-paths";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";

export const metadata: Metadata = {
  title: "Solicitor Availability Hours Kent | Defence Cover — Not Station Times",
  description: `${SEO_NOT_POLICE} When our Kent police station defence team is available for custody and voluntary interviews. Not Kent Police station opening times.`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/hours`,
  },
  openGraph: {
    title: "Solicitor Availability Hours Kent | Not Station Opening Times",
    description: `${SEO_NOT_POLICE} Defence solicitor availability for Kent custody and voluntary interviews — not police station opening hours.`,
    url: `https://${SITE_DOMAIN}/hours`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function HoursPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-8">
          <header className="hero-navy rounded-xl text-white p-6 md:p-8 shadow-elevated space-y-3">
            <p className="text-accent-light text-xs font-bold uppercase tracking-[0.14em]">
              Solicitor availability · not the police
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
              When our defence team is available
            </h1>
            <p className="text-white/90 leading-relaxed">
              {SEO_NOT_POLICE} This page is about{" "}
              <strong className="text-white">solicitor representation hours</strong> for Kent
              custody and voluntary interviews — not Kent Police station opening times, front-desk
              hours, or lost-property counters.
            </p>
          </header>

          <aside
            className="rounded-xl border border-red-200 bg-red-50 p-5"
            role="note"
            aria-label="Not Kent Police opening times"
          >
            <h2 className="font-display text-base font-bold text-red-950 mb-2">
              Looking for police station opening times?
            </h2>
            <p className="text-sm text-red-900 leading-relaxed mb-3">
              We cannot provide Kent Police opening hours, custody suite numbers, or switchboard
              transfers. For police assistance use 999 (emergency) or 101 (non-emergency), or the
              official Kent Police website.
            </p>
            <PoliceSignposting compact />
          </aside>

          <section className="rounded-xl border border-border bg-card p-5 md:p-6">
            <h2 className="font-display text-xl font-bold text-primary mb-4">
              Representation availability
            </h2>
            <ul className="divide-y divide-border text-sm">
              <li className="grid gap-1 py-4 sm:grid-cols-3 sm:items-center">
                <span className="font-semibold text-foreground">Monday – Friday</span>
                <span className="text-muted-foreground sm:text-center">9:00 am – late</span>
                <span className="text-xs text-muted-foreground sm:text-right">
                  Custody &amp; booked interviews
                </span>
              </li>
              <li className="grid gap-1 py-4 sm:grid-cols-3 sm:items-center">
                <span className="font-semibold text-foreground">Saturday – Sunday</span>
                <span className="text-muted-foreground sm:text-center">On call</span>
                <span className="text-xs text-muted-foreground sm:text-right">
                  Urgent custody / interviews
                </span>
              </li>
              <li className="grid gap-1 py-4 sm:grid-cols-3 sm:items-center">
                <span className="font-semibold text-foreground">Bank holidays</span>
                <span className="text-muted-foreground sm:text-center">On call</span>
                <span className="text-xs text-muted-foreground sm:text-right">
                  Urgent custody / interviews
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-700">
              Holiday variations: see{" "}
              <Link href="/christmashours" className="underline font-semibold text-primary">
                Christmas / holiday hours
              </Link>
              .
            </p>
          </section>

          <section className="rounded-xl border border-primary/20 bg-primary-dark p-6 text-white text-center space-y-4">
            <h2 className="font-display text-2xl font-bold text-accent-light">
              Need representation?
            </h2>
            <p className="text-white/90 text-sm max-w-xl mx-auto">
              Criminal justice does not keep office hours. Use the pathway that matches your
              situation — we do not publish a public switchboard for police enquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                href={`${PATH_VOLUNTARY_LANDING}#request`}
                className="inline-flex items-center justify-center min-h-[44px] rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent-light"
              >
                Request VA solicitor
              </Link>
              <Link
                href={PATH_CUSTODY}
                className="inline-flex items-center justify-center min-h-[44px] rounded-md bg-destructive px-5 py-2.5 text-sm font-bold text-white hover:bg-red-800"
              >
                Current custody check
              </Link>
              <Link
                href={PATH_AGENCY}
                className="inline-flex items-center justify-center min-h-[44px] rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20"
              >
                Agency cover
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
