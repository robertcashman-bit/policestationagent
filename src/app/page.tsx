import type { Metadata } from "next";
import Link from "next/link";
import { CustodyNoteLogo } from "@/components/CustodyNoteLogo";
import { AppScreenshots } from "@/components/AppScreenshots";
import { JsonLd, softwareJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title:
    "Custody Note – The custody note app for freelance police station reps",
  description:
    "Desktop app for freelance police station representatives and criminal solicitors. LAA-compliant custody notes, time recording, firm billing, and PDF export. 30-day free trial.",
  openGraph: {
    title:
      "Custody Note – The custody note app for freelance police station reps",
    description:
      "Desktop app for freelance police station representatives and criminal solicitors. LAA-compliant custody notes, time recording, firm billing, and PDF export.",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      {/* Hero */}
      <section className="hero-gradient-bg relative overflow-hidden border-b border-custody-light/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="logo-glow relative">
                <CustodyNoteLogo className="relative z-10 h-16 w-16 sm:h-20 sm:w-20" />
              </div>
            </div>
            <h1 className="mt-8 animate-fade-in-up text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The custody note app for{" "}
              <span className="bg-gradient-to-r from-custody-accent to-custody-sky bg-clip-text text-transparent">
                freelance reps
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-fade-in-up text-lg leading-relaxed text-custody-light/80">
              Built for freelance police station representatives and criminal
              solicitors who attend stations on behalf of defence firms.
              LAA-compliant notes, time recording, firm billing, and PDF
              export — so you can focus on the client, not the admin.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
              <Link
                href="/trial"
                className="rounded-lg bg-custody-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-custody-accent/25 transition-all duration-200 hover:bg-custody-accentLight hover:shadow-xl hover:shadow-custody-accent/30 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Start 30-day free trial
              </Link>
              <Link
                href="/buy"
                className="rounded-lg border border-custody-light/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all duration-200 hover:bg-white/10 hover:border-custody-light/40 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Subscribe
              </Link>
            </div>
            <p className="mt-5 text-sm text-custody-light/50">
              No credit card for trial. Subscription only — cancel any time.
            </p>

            {/* Trust bar */}
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-custody-light/10 pt-8">
              {[
                { icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: "LAA-compliant" },
                { icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", text: "Works offline" },
                { icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z", text: "Encrypted backup" },
                { icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", text: "Used across England & Wales" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-custody-light/60">
                  <svg className="h-4 w-4 text-custody-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-custody-slate/10 py-16 dark:border-custody-light/10 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white sm:text-3xl">
            Built for freelance reps and solicitors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-custody-slate dark:text-custody-light/80">
            Whether you cover one firm or twenty, Custody Note tracks every
            attendance, records your time, and keeps your notes LAA-compliant
            and audit-ready—across every firm you work for.
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2" role="list">
            {[
              "Freelance police station representatives (accredited and probationary)",
              "Freelance criminal solicitors attending police stations",
              "Duty solicitors covering for criminal defence firms",
              "Reps and solicitors billing multiple instructing firms",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-custody-slate/15 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-custody-light/10 dark:bg-custody-slate/30"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-custody-accent/20 text-custody-blue dark:bg-custody-accent/30 dark:text-custody-accent" aria-hidden="true">
                  ✓
                </span>
                <span className="text-sm text-custody-navy dark:text-custody-light/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-b border-custody-slate/10 bg-custody-light/30 py-16 dark:border-custody-light/10 dark:bg-custody-slate/20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white sm:text-3xl">
            Everything a freelance rep needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-custody-slate dark:text-custody-light/80">
            One desktop app for attendances, telephone advice, billing, and
            compliance.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Attendance, Tel Advice & Quick Capture",
                description:
                  "Record in-person attendances and telephone advice (INVB) from one home screen. Quick Capture lets you grab initial case details the moment you get the call.",
                icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z",
              },
              {
                title: "Firm tracking & billing",
                description:
                  "Log which firm instructed each case. Track disbursements with VAT treatment, time recording, and LAA fee codes so you can bill every firm accurately.",
                icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
              },
              {
                title: "LAA compliance",
                description:
                  "LAA outcome codes, stage reached, and fee codes built in. Structured notes and time records that meet Legal Aid Agency and audit requirements.",
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
              },
              {
                title: "Custody record & PACE",
                description:
                  "1st, 2nd and 3rd PACE review times — due and actual — with notes. Arrest & detention, welfare and vulnerability tracked in one place.",
                icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Case & disclosure",
                description:
                  "Client details, offence picker with type-ahead search, disclosure and OIC fields. Reasons for advice and sufficient benefit test (LAA) built in.",
                icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
              },
              {
                title: "PDF export & offline",
                description:
                  "Export notes to PDF for firms, clients and courts. Runs on your machine — works offline at the station with no internet needed.",
                icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border-l-4 border-custody-accent/60 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-custody-slate/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-custody-accent/10 text-custody-blue transition-colors group-hover:bg-custody-accent/20 dark:bg-custody-accent/20 dark:text-custody-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-custody-navy dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-custody-slate dark:text-custody-light/80">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="border-b border-custody-slate/10 py-16 dark:border-custody-light/10 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white sm:text-3xl">
            See the app
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-custody-slate dark:text-custody-light/80">
            A desktop app designed around the custody visit workflow.
          </p>
          <div className="mt-12">
            <AppScreenshots />
          </div>
        </div>
      </section>

      {/* How it works summary */}
      <section className="border-b border-custody-slate/10 bg-custody-light/30 py-16 dark:border-custody-light/10 dark:bg-custody-slate/20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white sm:text-3xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-custody-slate dark:text-custody-light/80">
            From the first call to billing the firm &mdash; four simple steps.
          </p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Quick Capture",
                description:
                  "Grab case details the moment you get the call.",
              },
              {
                step: "2",
                title: "Attend & Record",
                description:
                  "Full attendance notes, PACE reviews, and time recording at the station.",
              },
              {
                step: "3",
                title: "Export PDF",
                description:
                  "Generate a professional custody note with one click.",
              },
              {
                step: "4",
                title: "Bill the firm",
                description:
                  "Track each firm separately with accurate time and disbursements.",
              },
            ].map(({ step, title, description }) => (
              <div
                key={step}
                className="flex flex-col items-center rounded-xl border border-custody-slate/15 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-custody-light/10 dark:bg-custody-slate/30"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-custody-blue to-custody-accent text-lg font-bold text-white shadow-md shadow-custody-accent/20">
                  {step}
                </span>
                <h3 className="mt-3 font-semibold text-custody-navy dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-custody-blue hover:text-custody-accent dark:text-custody-accent dark:hover:text-custody-light"
            >
              See the full walkthrough &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Cloud Backup highlight */}
      <section className="border-b border-custody-slate/10 py-16 dark:border-custody-light/10 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-custody-accent bg-gradient-to-br from-custody-light/50 to-white p-8 shadow-sm dark:from-custody-slate/40 dark:to-custody-slate/20 sm:p-10">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-custody-accent/10 dark:bg-custody-accent/20">
                <svg
                  className="h-7 w-7 text-custody-blue dark:text-custody-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                  />
                </svg>
              </div>
              <div className="mt-4 sm:ml-6 sm:mt-0">
                <h3 className="text-xl font-semibold text-custody-navy dark:text-white">
                  Incorruptible Cloud Backup
                </h3>
                <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
                  Your records are too important to risk. Cloud Backup encrypts
                  your database on your machine and uploads it to a secure UK
                  data centre with 90-day tamper protection. Nobody &mdash; not
                  even us &mdash; can alter or delete your backups.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                  <Link
                    href="/cloud-backup"
                    className="rounded-lg bg-custody-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-custody-accent"
                  >
                    Learn more
                  </Link>
                  <Link
                    href="/pricing"
                    className="rounded-lg border border-custody-slate/30 px-5 py-2.5 text-sm font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
                  >
                    See pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-custody-slate/10 bg-custody-light/20 py-16 dark:border-custody-light/5 dark:bg-custody-navy/30 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white sm:text-3xl">
            What reps are saying
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "Custody Note has completely changed how I manage station visits. I used to spend hours typing up notes after the fact \u2014 now it\u2019s all done at the station.",
                name: "Sarah M.",
                role: "Freelance Police Station Rep, London",
              },
              {
                quote:
                  "Billing multiple firms was a nightmare. Now I just filter by firm and export \u2014 invoicing takes minutes instead of a whole afternoon.",
                name: "James T.",
                role: "Criminal Duty Solicitor, Manchester",
              },
              {
                quote:
                  "The cloud backup gives me total peace of mind. I know my records are safe even if my laptop dies. And the encryption means client confidentiality is never at risk.",
                name: "Angela R.",
                role: "Accredited Rep, Birmingham",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="relative rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-custody-light/10 dark:bg-custody-slate/30"
              >
                <svg className="absolute -top-2 left-4 h-8 w-8 text-custody-accent/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.2 11 15c0 1.934-1.567 3.5-3.5 3.5-1.073 0-2.099-.49-2.917-1.179zM15.583 17.321C14.553 16.227 14 15 14 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C20.591 11.69 22 13.2 22 15c0 1.934-1.567 3.5-3.5 3.5-1.073 0-2.099-.49-2.917-1.179z" />
                </svg>
                <blockquote className="relative text-[0.925rem] leading-relaxed text-custody-slate dark:text-custody-light/80">
                  {t.quote}
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-custody-accent to-custody-blue text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-custody-navy dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-custody-slate dark:text-custody-light/60">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="benefits"
        className="border-b border-custody-slate/10 bg-custody-light/20 py-16 dark:border-custody-light/5 dark:bg-custody-navy/30 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white sm:text-3xl">
            Why freelance reps use Custody Note
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-custody-slate dark:text-custody-light/80">
            Less admin, fewer compliance headaches, more time for clients.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Bill every firm accurately",
                body: "Track which firm instructed each case, record time and disbursements with VAT, and export everything you need to invoice.",
                icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
              },
              {
                title: "Your records, your machine",
                body: "Data stays on your device. Export and back up when you choose — no firm or third party controls your files.",
                icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
              },
              {
                title: "Works at any station",
                body: "Runs offline with no internet needed. Use it at any police station without relying on Wi-Fi or mobile signal.",
                icon: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
              },
              {
                title: "Stay LAA-compliant",
                body: "Notes and time records that align with LAA outcome codes, stage reached, and audit expectations — ready when you need them.",
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
              },
              {
                title: "Save hours every week",
                body: "Structured templates, quick capture, and one-click PDF export mean less rework and no duplicate typing.",
                icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Simple pricing",
                body: "Subscription only — no per-seat charges, no hidden fees, no firm approval needed. Cancel any time.",
                icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="group rounded-lg border border-custody-slate/15 bg-white/80 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-custody-light/10 dark:bg-custody-slate/30"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-custody-accent/10 text-custody-blue transition-colors group-hover:bg-custody-accent/20 dark:bg-custody-accent/20 dark:text-custody-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-custody-navy dark:text-white">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-custody-blue via-custody-accentDark to-custody-accent py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready to try Custody Note?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Download the app and start your 30-day free trial. No credit card
            required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-custody-blue shadow-lg transition-all duration-200 hover:bg-custody-light hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
            >
              Download now
            </Link>
            <Link
              href="/trial"
              className="rounded-lg border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start free trial
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
