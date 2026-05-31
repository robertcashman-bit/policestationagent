import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "PACE Rights at the Police Station — Printable Guide",
  description:
    "Plain English summary of key PACE rights in police custody. Printable guide with gov.uk sources. Free to link and share.",
  alternates: { canonical: `https://${SITE_DOMAIN}/resources/pace-rights-guide` },
};

export default function PaceRightsGuidePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col print:bg-white">
      <div className="print:hidden">
        <Header />
      </div>
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 print:py-6 print:max-w-none" id="main-content">
        <p className="text-sm text-slate-500 print:hidden mb-2">
          <Link href="/resources" className="text-blue-600 underline">
            ← Resources
          </Link>
        </p>
        <h1 className="text-3xl font-black mb-2">PACE Rights at the Police Station</h1>
        <p className="text-sm text-slate-600 mb-8">
          Summary for general information — not legal advice. Sources: PACE 1984, PACE Code C (
          <a href="https://www.gov.uk/government/publications/pace-code-c-2023" className="underline">
            gov.uk
          </a>
          ).
        </p>

        <article className="prose prose-slate max-w-none print:prose-sm">
          <h2>Right to legal advice</h2>
          <p>
            Under section 58 PACE 1984, a detainee has the right to consult a solicitor privately
            and free of charge at the police station (Legal Aid).
          </p>
          <h2>Right to silence</h2>
          <p>
            You do not have to answer police questions. There can be consequences in court if you
            later rely on facts you did not mention — your solicitor will advise you.
          </p>
          <h2>Custody time limits</h2>
          <p>
            Detention without charge is generally limited to 24 hours, extendable in indictable cases
            with authorisation. See our{" "}
            <Link href="/custody-time-limits" className="print:no-underline">
              custody time limits guide
            </Link>
            .
          </p>
          <h2>Treatment in custody</h2>
          <p>
            PACE Code C covers rest periods, meals, medical attention, and vulnerable detainee
            safeguards (including appropriate adults for juveniles).
          </p>
          <h2>After the police station</h2>
          <p>
            Outcomes may include charge, release under investigation, or no further action. See{" "}
            <Link href="/released-under-investigation" className="print:no-underline">
              RUI explained
            </Link>
            .
          </p>
        </article>

        <footer className="mt-12 pt-6 border-t text-sm text-slate-600 print:mt-8">
          <p>
            <strong>Author:</strong> Robert Cashman, accredited duty solicitor (Kent) ·{" "}
            <span className="print:hidden">
              <Link href="https://www.policestationagent.com">policestationagent.com</Link>
            </span>
            <span className="hidden print:inline">policestationagent.com</span>
          </p>
          <p className="mt-2 print:hidden">
            You may link to this page for educational purposes.{" "}
            <Link href="/link-to-us" className="text-blue-600 underline">
              Link to us
            </Link>
          </p>
        </footer>

        <PrintButton />
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
