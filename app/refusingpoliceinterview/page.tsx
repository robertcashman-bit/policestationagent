import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Refusing a Police Interview: What It Means (England & Wales)",
  description:
    "You cannot be forced to answer questions, but there can be legal risks to silence in some circumstances (CJPOA s.34). Get legal advice first. Sources included.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/refusingpoliceinterview`,
  },
  openGraph: {
    title: "Refusing a Police Interview: What It Means (England & Wales)",
    description:
      "You cannot be forced to answer questions, but there can be legal risks to silence in some circumstances (CJPOA s.34). Get legal advice first. Sources included.",
    type: "website",
    url: `https://${SITE_DOMAIN}/refusingpoliceinterview`,
  },
};

export default function Page() {
  const sources: LegalSource[] = [
    {
      id: "cjpoa-s34",
      label:
        "Criminal Justice and Public Order Act 1994 s.34 (adverse inferences from silence in certain circumstances)",
      href: "https://www.legislation.gov.uk/ukpga/1994/33/section/34",
    },
    {
      id: "pace-s58",
      label: "Police and Criminal Evidence Act 1984 (PACE) s.58 (right to legal advice)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/58",
    },
    {
      id: "pace-code-c-2023",
      label:
        "Home Office: PACE Code C (December 2023) – detention, treatment and questioning (PDF)",
      href: "https://assets.publishing.service.gov.uk/media/6580543083ba38000de1b792/PACE+Code+C+2023.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Refusing a police interview: what it means
          </h1>
          <p className="text-lg text-slate-700 mb-8">
            You cannot be forced to answer questions. But silence can have legal consequences in
            some situations, so get legal advice first.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-10 rounded-r-lg">
            <p className="text-slate-900">
              <strong>Quick Answer:</strong> CJPOA 1994 s.34 is the key statute about adverse
              inferences where someone later relies on facts they did not mention when questioned
              under caution (or when charged/informed).
              <Ref n={1} /> You also have a right to legal advice (PACE s.58).
              <Ref n={2} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Refusing vs “no comment”</h2>
            <p>
              Different choices carry different risks. The exact impact depends on your case and
              what the police put to you.
            </p>
            <ul>
              <li>
                <strong>No comment interview</strong>: can still engage CJPOA s.34 depending on
                later reliance on facts.
                <Ref n={1} />
              </li>
              <li>
                <strong>Prepared statement</strong>: can sometimes put an account on record while
                limiting answers (see our prepared statement guide).
              </li>
            </ul>

            <h2>Next steps</h2>
            <ul>
              <li>
                <Link href="/no-comment-interview">No comment interview (guide)</Link>
              </li>
              <li>
                <Link href="/prepared-statements">Prepared statements (guide)</Link>
              </li>
              <li>
                <Link href="/adverse-inference">Adverse inference (CJPOA s.34 explained)</Link>
              </li>
              <li>
                <Link href="/police-interview-rights">Police interview rights (PACE Code C)</Link>
              </li>
            </ul>

            <LegalReferences sources={sources} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
