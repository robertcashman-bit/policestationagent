import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';
import { SITE_DOMAIN } from '@/config/site';

export const metadata: Metadata = {
  title: 'Your Rights in Police Custody (England & Wales) | PACE Code C',
  description:
    'A plain-English summary of core rights in police custody and where to find the rules (PACE + Code C). Sources included.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/your-rights-in-custody`,
  },
  openGraph: {
    title: 'Your Rights in Police Custody (England & Wales) | PACE Code C',
    description:
      'A plain-English summary of core rights in police custody and where to find the rules (PACE + Code C). Sources included.',
    type: 'website',
    url: `https://${SITE_DOMAIN}/your-rights-in-custody`,
  },
};

export default function Page() {
  const sources: LegalSource[] = [
    {
      id: 'pace-s56',
      label: 'Police and Criminal Evidence Act 1984 (PACE) s.56 (right to have someone informed)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/56',
    },
    {
      id: 'pace-s58',
      label: 'PACE s.58 (right to legal advice)',
      href: 'https://www.legislation.gov.uk/ukpga/1984/60/section/58',
    },
    {
      id: 'code-c-2023',
      label: 'Home Office: PACE Code C (December 2023) – detention, treatment and questioning (PDF)',
      href: 'https://www.gov.uk/government/publications/pace-code-c-2023',
    },
  ];

  const useLegacy = process.env.NEXT_PUBLIC_USE_LEGACY_LEGAL_PAGES === '1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          {useLegacy ? (
            <div
              className="prose prose-lg max-w-6xl mx-auto px-4 py-16"
              dangerouslySetInnerHTML={{
                __html: `<div class="fixed right-3 top-4 z-40 text-[10px] text-slate-400 select-none pointer-events-none bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-200/50" aria-hidden="true">v4.4.0 — 11/12/2025</div><div class="bg-slate-50 py-16"><div class="max-w-4xl mx-auto px-4"><div class="text-center mb-12"><div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-amber-100 text-amber-800 mb-4">Know Your Rights</div><h1 class="text-4xl font-bold text-slate-800 mb-4">Your Rights in Police Custody</h1><p class="text-xl text-slate-600 max-w-3xl mx-auto">Understanding your fundamental rights if you are arrested and taken to a police station.</p></div><div class="rounded-xl border bg-white text-slate-900 mb-12 shadow-lg"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold leading-none tracking-tight">The Most Important Right: Legal Advice</div></div><div class="p-6 pt-0 space-y-4 text-slate-700 leading-relaxed"><p>When you are arrested, the police must inform you of your rights. The most crucial of these is your right to free and independent legal advice from a solicitor. It is vital that you exercise this right immediately. Tell the custody sergeant you want to speak to a solicitor. Do not answer any questions about the alleged offence until you have spoken to one.</p></div></div><div class="rounded-xl border bg-white text-slate-900 shadow mb-12"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold tracking-tight text-center text-2xl">Your Key Rights at the Police Station</div></div><div class="p-6 pt-0 grid md:grid-cols-2 gap-8"><div class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-6 h-6"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg></div><div><h3 class="font-semibold text-lg text-slate-800">Free Legal Advice</h3><p class="text-slate-600">You have the right to speak to a solicitor for free, independent legal advice at any time. You should exercise this right immediately.</p></div></div><div class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-6 h-6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div><h3 class="font-semibold text-lg text-slate-800">Right to Silence</h3><p class="text-slate-600">You do not have to answer police questions. A solicitor will advise you on whether it is in your best interest to remain silent, answer questions, or provide a prepared statement.</p></div></div><div class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg></div><div><h3 class="font-semibold text-lg text-slate-800">Right to Tell Someone</h3><p class="text-slate-600">You have the right to have one person informed of your arrest. This can be a friend, family member, or employer.</p></div></div><div class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-6 h-6"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg></div><div><h3 class="font-semibold text-lg text-slate-800">Right to See the Rules (PACE)</h3><p class="text-slate-600">You can ask to see the Codes of Practice (known as PACE) which govern police procedures. Your solicitor will ensure these rules are followed.</p></div></div></div></div><div class="rounded-xl border bg-blue-800 text-white shadow-xl"><div class="p-8 text-center"><h3 class="text-3xl font-bold text-amber-400 mb-4">Exercise Your Rights - Call Us</h3><p class="text-lg mb-6 max-w-2xl mx-auto">If you or someone you know has been arrested, call us immediately. We will ensure your rights are protected from the very beginning.</p><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow h-10 rounded-md px-8 bg-red-600 hover:bg-red-700 font-bold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Emergency Legal Advice</a></div></div></div></div>`,
              }}
            />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-14">
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">Your rights in police custody</h1>
                <p className="text-lg text-slate-700">
                  This page summarises a few core rights and points you to the official rules. For details on interviews, bail, and time limits, use the linked guides below.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-10">
                <p className="text-slate-900">
                  <strong>Quick Answer:</strong> You have a right to legal advice (PACE s.58).<Ref n={2} /> You also have a right to have someone informed of your arrest (PACE s.56).<Ref n={1} /> The day‑to‑day rules on detention, treatment and questioning are set out in PACE Code C.<Ref n={3} />
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2>Key rights to ask for immediately</h2>
                <ul>
                  <li>
                    <strong>Legal advice</strong> (free and independent): ask to speak to a solicitor. (PACE s.58.)<Ref n={2} />
                  </li>
                  <li>
                    <strong>Someone told you are in custody</strong>: ask for a friend/relative to be informed. (PACE s.56.)<Ref n={1} />
                  </li>
                  <li>
                    <strong>Know the rules</strong>: ask to see PACE Code C, and ask your solicitor to check custody record entries. (Code C.)<Ref n={3} />
                  </li>
                </ul>

                <h2>Next: the most relevant detailed guides</h2>
                <ul>
                  <li>
                    <Link href="/police-custody-rights">Police custody rights (detailed guide)</Link>
                  </li>
                  <li>
                    <Link href="/police-interview-rights">Police interview rights (PACE Code C)</Link>
                  </li>
                  <li>
                    <Link href="/custody-time-limits">Police custody time limits (PACE)</Link>
                  </li>
                  <li>
                    <Link href="/pace-code-c">PACE Code C explained</Link>
                  </li>
                </ul>

                <LegalReferences sources={sources} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


