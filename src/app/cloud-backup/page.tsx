import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, buildFaqJsonLd, buildBreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cloud Backup – Encrypted, tamper-proof backup for Custody Note",
  description:
    "Incorruptible, encrypted cloud backup for Custody Note. AWS Object Lock with 90-day tamper protection, SRA-compliant data isolation, UK data centre. Never lose your attendance records.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com"}/cloud-backup` },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com";

const cloudFaqs = [
  {
    q: "Can you read my backed-up data?",
    a: "No. Your data is encrypted on your machine with a key derived from your licence before it ever leaves your computer. We only store ciphertext.",
  },
  {
    q: "What happens if I cancel my subscription?",
    a: "Your existing backups remain in storage and are protected by Object Lock for 90 days. You can resubscribe and access them again. After 90 days without an active subscription, backups may be deleted.",
  },
  {
    q: "Can another subscriber see my data?",
    a: "No. Each subscriber has a unique, hashed storage prefix. AWS credentials are scoped to only allow access to your own prefix. There is no shared access.",
  },
  {
    q: "How do I restore from cloud backup?",
    a: "Open Custody Note, go to Settings, and click \u201cRestore from Cloud\u201d. You\u2019ll see a list of your recent backups \u2014 pick one to restore. The app downloads and decrypts it locally.",
  },
  {
    q: "Does cloud backup work offline?",
    a: "Cloud backup uploads require an internet connection. The app will queue uploads when you\u2019re offline and send them when you reconnect. Local encrypted backups continue every 2 minutes regardless.",
  },
  {
    q: "Where is my data stored?",
    a: "Amazon Web Services S3, London region (eu-west-2). Data never leaves the United Kingdom.",
  },
];

export default function CloudBackupPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(cloudFaqs)} />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "Home", url: siteUrl }, { name: "Cloud Backup", url: `${siteUrl}/cloud-backup` }])} />
      {/* Hero */}
      <section className="border-b border-custody-slate/10 bg-gradient-to-b from-custody-light/80 to-white py-16 dark:from-custody-slate/50 dark:to-custody-navy sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-custody-accent/10 px-4 py-1.5 text-sm font-semibold text-custody-blue dark:bg-custody-accent/20 dark:text-custody-accent">
            Add-on for subscribers
          </span>
          <h1 className="mt-4 text-3xl font-bold text-custody-navy dark:text-white sm:text-4xl lg:text-5xl">
            Incorruptible cloud backup
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-custody-slate dark:text-custody-light/80">
            Your attendance records are critical. Cloud Backup keeps an
            encrypted, tamper-proof copy in a UK data centre so you can recover
            everything &mdash; even if your computer is lost, stolen, or
            destroyed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/buy?plan=cloud"
              className="rounded-lg bg-custody-blue px-6 py-3 text-base font-medium text-white hover:bg-custody-accent"
            >
              Subscribe with Cloud Backup
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-custody-slate/30 px-6 py-3 text-base font-medium text-custody-navy hover:bg-custody-light dark:border-custody-light/20 dark:text-white dark:hover:bg-custody-slate"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="border-b border-custody-slate/10 py-16 dark:border-custody-light/10 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white">
            Why cloud backup matters
          </h2>
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-800/30 dark:bg-red-950/20">
              <h3 className="font-semibold text-red-800 dark:text-red-200">
                Without cloud backup
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-red-700 dark:text-red-300/80">
                <li>&bull; Records exist only on your computer</li>
                <li>&bull; Hard drive failure = permanent data loss</li>
                <li>&bull; Theft or damage = no recovery</li>
                <li>&bull; No off-site protection</li>
                <li>&bull; Manual exports are easy to forget</li>
              </ul>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800/30 dark:bg-green-950/20">
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                With cloud backup
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-green-700 dark:text-green-300/80">
                <li>&bull; Automatic encrypted uploads every 2 minutes</li>
                <li>&bull; Tamper-proof for 90 days (Object Lock)</li>
                <li>&bull; Restore on any machine, any time</li>
                <li>&bull; UK data centre (London)</li>
                <li>&bull; Zero effort after setup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-custody-slate/10 bg-custody-light/30 py-16 dark:border-custody-light/10 dark:bg-custody-slate/20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white">
            How it works
          </h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-8">
            {[
              {
                step: 1,
                title: "Subscribe to Cloud Backup",
                description:
                  "Choose the Standard + Cloud Backup plan. Your licence key activates cloud backup automatically in the app.",
              },
              {
                step: 2,
                title: "Your data is encrypted on your machine",
                description:
                  "Before any data leaves your computer, Custody Note encrypts it with AES-256-GCM using a key derived from your licence. Nobody \u2014 not even us \u2014 can read your data.",
              },
              {
                step: 3,
                title: "Encrypted backup uploaded to AWS",
                description:
                  "The encrypted file is uploaded to Amazon Web Services S3 in the London (eu-west-2) region using temporary, scoped credentials unique to your account.",
              },
              {
                step: 4,
                title: "Locked and tamper-proof for 90 days",
                description:
                  "AWS S3 Object Lock in Compliance mode prevents anyone \u2014 including AWS administrators \u2014 from deleting or modifying the backup for 90 days.",
              },
              {
                step: 5,
                title: "Restore any time",
                description:
                  "If you need to recover, open Settings in the app, click Restore from Cloud, and pick the backup you want. Your data is decrypted locally and restored.",
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-custody-blue text-lg font-bold text-white dark:bg-custody-accent">
                  {step}
                </span>
                <div>
                  <h3 className="font-semibold text-custody-navy dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-custody-slate dark:text-custody-light/80">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SRA compliance */}
      <section className="border-b border-custody-slate/10 py-16 dark:border-custody-light/10 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white">
            SRA compliance and data isolation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-custody-slate dark:text-custody-light/80">
            Designed to meet the Solicitors Regulation Authority requirements
            for confidentiality and data protection.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Per-subscriber isolation",
                icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
                description:
                  "Each subscriber\u2019s backups are stored under a unique, hashed prefix in S3. No subscriber can see or access another\u2019s data.",
              },
              {
                title: "Client-side encryption",
                icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
                description:
                  "Data is encrypted on your machine before upload. The server only ever sees ciphertext. Your encryption key never leaves your device.",
              },
              {
                title: "Temporary, scoped credentials",
                icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
                description:
                  "AWS credentials are issued for just 15 minutes and only grant access to your own prefix. They cannot access any other subscriber\u2019s data.",
              },
              {
                title: "UK data residency",
                icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
                description:
                  "All backups are stored in the AWS London (eu-west-2) region. Data never leaves the United Kingdom.",
              },
              {
                title: "Immutable storage",
                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
                description:
                  "S3 Object Lock Compliance mode guarantees that backups cannot be altered or deleted for 90 days, even by AWS staff.",
              },
              {
                title: "TLS in transit",
                icon: "M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33",
                description:
                  "All connections to AWS use TLS 1.2+. Unencrypted connections are explicitly denied by bucket policy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border-l-4 border-custody-accent/60 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-custody-slate/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-custody-accent/10 text-custody-blue transition-colors group-hover:bg-custody-accent/20 dark:bg-custody-accent/20 dark:text-custody-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-custody-navy dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-custody-slate/10 bg-custody-light/30 py-16 dark:border-custody-light/10 dark:bg-custody-slate/20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-custody-navy dark:text-white">
            Cloud Backup FAQ
          </h2>
          <dl className="mt-8 space-y-4">
            {cloudFaqs.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-lg border border-custody-slate/15 bg-white p-5 dark:border-custody-light/10 dark:bg-custody-slate/30"
              >
                <dt className="font-medium text-custody-navy dark:text-white">
                  {q}
                </dt>
                <dd className="mt-2 text-sm text-custody-slate dark:text-custody-light/80">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-custody-blue py-16 dark:bg-custody-slate sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Protect your records today
          </h2>
          <p className="mt-4 text-custody-light/90">
            Add cloud backup to your subscription for total peace of mind.
            Automatic, encrypted, incorruptible.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/buy?plan=cloud"
              className="rounded-lg bg-white px-6 py-3 text-base font-medium text-custody-blue hover:bg-custody-light"
            >
              Subscribe with Cloud Backup
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-white/40 px-6 py-3 text-base font-medium text-white hover:bg-white/10"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
