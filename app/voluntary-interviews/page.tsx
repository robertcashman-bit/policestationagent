import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";
import { VoluntaryInterviewForm } from "@/components/conversion/VoluntaryInterviewForm";
import { ShortVoluntaryRequestForm } from "@/components/conversion/ShortVoluntaryRequestForm";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { PATH_VOLUNTARY, PATH_CONTACT, PATH_CUSTODY } from "@/config/enquiry-paths";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo/page-metadata";
import { StandardPaceSources } from "@/components/legal/StandardPaceSources";

export const metadata: Metadata = {
  title: "Voluntary Interview Kent | Free Solicitor Under Caution",
  description:
    "Voluntary attendance / voluntary interview solicitor in Kent. Police interview letter, interview under caution, Maidstone VAI. Request a free solicitor before you attend. Not Kent Police.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/voluntary-interviews`,
  },
  openGraph: {
    title: "Voluntary Interview Kent | Free Solicitor Under Caution",
    description: `${SEO_NOT_POLICE} Request representation before a voluntary interview under caution in Kent.`,
    url: `https://${SITE_DOMAIN}/voluntary-interviews`,
    siteName: "Police Station Agent",
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voluntary Interview Kent | Free Solicitor Under Caution",
    description: `${SEO_NOT_POLICE} Request representation before a voluntary interview under caution in Kent.`,
    images: [...DEFAULT_TWITTER_IMAGES],
  },
};

const STEPS = [
  {
    title: "Do not discuss the allegation",
    body: "If officers call or leave a letter, take names and the station. Do not give your account on the phone. Say you will instruct a solicitor.",
  },
  {
    title: "Request a free solicitor",
    body: "Police station advice for a voluntary interview under caution is free under Legal Aid where you qualify — it is not means-tested at the station stage.",
  },
  {
    title: "We obtain disclosure",
    body: "Once instructed, we contact the interviewing officer, request disclosure, and advise you in private before the interview.",
  },
  {
    title: "We attend with you",
    body: "We attend the station for the interview under caution, protect your rights, and advise whether to answer questions, make no comment, or use a prepared statement.",
  },
] as const;

const LOCAL_HOOKS = [
  {
    title: "Maidstone (VAI only)",
    body: "Maidstone custody is closed. Interviews here are usually voluntary attendance / VAI only — arrange a solicitor before you go.",
    href: "/blog/maidstone-voluntary-interview-mid-kent-legal-advice",
  },
  {
    title: "Medway",
    body: "Medway (Gillingham) handles custody and interviews. Letter or call about a booked interview? Request representation first.",
    href: "/police-station-rep-medway",
  },
  {
    title: "North Kent / Gravesend",
    body: "North Kent custody suite and local voluntary interviews — instruct before you attend under caution.",
    href: "/police-station-rep-gravesend",
  },
  {
    title: "Dartford & Sevenoaks",
    body: "West Kent voluntary interview invitations — free solicitor advice before the interview date.",
    href: "/blog/sevenoaks-voluntary-interview-legal-advice-kent",
  },
] as const;

export default function VoluntaryInterviewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-10">
          <header className="hero-navy rounded-xl text-white p-6 md:p-8 shadow-elevated space-y-4">
            <p className="text-accent-light text-xs font-bold uppercase tracking-[0.14em]">
              Voluntary interview · Kent · not the police
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
              Voluntary interview solicitor in Kent
            </h1>
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
              Got a police letter, email or call about a{" "}
              <strong className="text-white">voluntary attendance</strong> or{" "}
              <strong className="text-white">interview under caution</strong>? We are criminal
              defence solicitors — not Kent Police. For police use 999 or 101.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#request"
                className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-accent px-6 py-3 font-bold text-accent-foreground hover:bg-accent-light"
              >
                Request a free solicitor
              </a>
              <a
                href="#steps"
                className="inline-flex items-center justify-center min-h-[48px] rounded-md border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
              >
                What to do first
              </a>
            </div>
          </header>

          <section className="rounded-xl border border-red-200 bg-red-50 p-5">
            <h2 className="text-lg font-bold text-red-950 mb-2">Do not attend unrepresented</h2>
            <p className="text-sm text-red-900 leading-relaxed">
              A voluntary interview is under caution. Anything you say can be used in evidence. Get
              advice before agreeing a date where possible. Ignoring a genuine invitation can lead
              to arrest — rearranging so a solicitor can attend is normal.
            </p>
          </section>

          <section id="steps" className="scroll-mt-24 space-y-4">
            <h2 className="font-display text-2xl font-bold text-primary">Plain steps</h2>
            <ol className="space-y-3">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-xl border border-border bg-card p-4 md:p-5 flex gap-4"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-primary">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-700 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="request" className="scroll-mt-24 space-y-4">
            <h2 className="font-display text-2xl font-bold text-primary">Request representation</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Start with the short form. Prefer officer details and letter upload? Use the{" "}
              <a href="#full-form" className="underline font-semibold text-primary">
                full form below
              </a>{" "}
              or the{" "}
              <Link
                href={`${PATH_VOLUNTARY}#request`}
                className="underline font-semibold text-primary"
              >
                dedicated start page
              </Link>
              .
            </p>
            <ShortVoluntaryRequestForm />
          </section>

          <section
            className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-4"
            aria-labelledby="kent-local-heading"
          >
            <h2 id="kent-local-heading" className="font-display text-xl font-bold text-primary">
              Kent voluntary interview cover
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              We cover Kent custody suites and voluntary interview stations, including Maidstone
              (custody closed / VAI only), Medway, North Kent/Gravesend, Canterbury, Tonbridge,
              Folkestone, Margate, Ashford, Dover, Sevenoaks, Dartford and Tunbridge Wells.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {LOCAL_HOOKS.map((hook) => (
                <Link
                  key={hook.title}
                  href={hook.href}
                  className="rounded-lg border border-border bg-secondary/40 p-4 hover:border-accent transition-colors"
                >
                  <h3 className="font-semibold text-primary text-sm">{hook.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-snug">{hook.body}</p>
                </Link>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              Someone detained right now?{" "}
              <Link href={PATH_CUSTODY} className="underline font-semibold text-primary">
                Current custody check
              </Link>
              . Other contact routes:{" "}
              <Link href={PATH_CONTACT} className="underline font-semibold text-primary">
                Contact
              </Link>
              .
            </p>
          </section>

          <section id="full-form" className="scroll-mt-24">
            <h2 className="font-display text-xl font-bold text-primary mb-3">Full request form</h2>
            <VoluntaryInterviewForm reportFormStart={false} />
          </section>

          <PoliceSignposting />
          <StandardPaceSources />
        </div>
      </main>
      <Footer />
    </div>
  );
}
