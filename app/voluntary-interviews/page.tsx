import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { ComprehensiveLegalServiceSchema } from "@/components/schema/ComprehensiveLegalServiceSchema";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { AuthorBio } from "@/components/E-E-A-T/AuthorBio";
import { RegulatoryReferences } from "@/components/E-E-A-T/RegulatoryReferences";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { FAQPage } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Legal Advice at Police Station Kent | Voluntary Interview Solicitor | FREE | PACE Rights",
  description:
    "Legal advice at police station for voluntary interviews in Kent. FREE legal representation under Legal Aid at all Kent police stations. Expert solicitor advice under PACE 1984. Available during extended hours. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/voluntary-interviews`,
  },
  openGraph: {
    title: "Legal Advice at Police Station Kent | Voluntary Interview Solicitor | FREE",
    description:
      "FREE legal advice at police station for voluntary interviews in Kent. Expert solicitor representation under Legal Aid and PACE 1984. Available during extended hours.",
    url: `https://${SITE_DOMAIN}/voluntary-interviews`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function VoluntaryInterviewsPage() {
  const faqItems = [
    {
      question: "Is a voluntary interview the same as an interview after arrest?",
      answer:
        "A voluntary interview is arranged by appointment rather than detention, but it is still an interview under caution and should be treated seriously.",
    },
    {
      question: "Is legal advice free for a voluntary interview?",
      answer:
        "Legal aid is usually available at the police station, so advice and representation for an interview under caution is normally free of charge.",
    },
    {
      question: "Should I attend a voluntary interview without a solicitor?",
      answer:
        "It is sensible to arrange legal advice before you attend. The police may have information you have not seen, and interview decisions can have consequences later.",
    },
    {
      question: "Can I be arrested if I refuse to attend voluntarily?",
      answer:
        "It depends on the circumstances. Refusal may lead the police to consider arrest. It is better to get legal advice before making decisions about attendance.",
    },
    {
      question: "What happens after a voluntary interview?",
      answer:
        "After interview the police may take no further action, release you under investigation (RUI), bail you to return, or charge you. Next steps depend on the facts and evidence.",
    },
  ];

  return (
    <>
      <ComprehensiveLegalServiceSchema
        serviceName="Legal Advice at Police Station"
        serviceDescription="Legal advice at police station is a statutory right under PACE 1984 section 58, providing FREE legal consultation and representation at police custody suites. This service is provided by independent solicitors and is not controlled by the police. Available for voluntary interviews and custody interviews in England & Wales."
        serviceType="Police Station Representation"
        areaServed="Kent"
        jurisdiction="England & Wales"
      />
      <PersonSchema />
      <FAQPage items={faqItems} />
      <Header />
      <main className="min-h-screen bg-white" id="main-content" role="main" aria-live="polite">
        <div className="container mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<div class="bg-slate-50 py-16"><div class="max-w-6xl mx-auto px-4"><div class="text-center mb-12"><div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-red-100 text-red-800 mb-4">Crucial Advice</div><h1 class="text-4xl font-bold text-slate-800 mb-4">Voluntary Police Interviews</h1><p class="text-xl text-slate-600 max-w-3xl mx-auto">Just because it\'s "voluntary" doesn\'t mean it\'s informal. Protect yourself with expert legal advice.</p></div><div class="rounded-xl border bg-card text-card-foreground mb-12 shadow-lg"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold tracking-tight text-2xl flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert w-8 h-8 text-red-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>Understanding the Risks of a Voluntary Interview</div></div><div class="p-6 pt-0 space-y-4"><p class="text-slate-700">The police may invite you for a voluntary interview (sometimes called a "caution plus 3" interview) as an alternative to arresting you. While this may seem less serious, it is a formal, recorded interview under caution. The legal implications are exactly the same as an interview conducted after an arrest.</p><div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500"><h4 class="font-bold text-red-800 mb-2">Key Dangers to Be Aware Of:</h4><ul class="space-y-2"><li class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-red-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-red-700">You are not under arrest, but the interview is still under caution.</span></li><li class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-red-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-red-700">Anything you say can be used as evidence against you.</span></li><li class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-red-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-red-700">The police have planned the interview and have evidence you haven\'t seen.</span></li><li class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-red-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-red-700">Without advice, you might unintentionally harm your case.</span></li></ul></div></div></div><div class="grid md:grid-cols-2 gap-8 mb-12"><div class="rounded-xl border bg-card text-card-foreground shadow"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold leading-none tracking-tight">Your Right to Free Legal Advice</div></div><div class="p-6 pt-0 space-y-4 text-slate-700"><p>You have the same right to free, independent legal advice for a voluntary interview as you do when under arrest. This service is provided by independent solicitors and is not controlled by the police.</p><p>Requesting a solicitor does NOT make you look guilty. It shows that you are taking the situation seriously and protecting your legal rights. We can arrange to meet you before the interview to discuss the case and advise you throughout.</p></div></div><div class="rounded-xl border bg-card text-card-foreground shadow"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold leading-none tracking-tight">How We Help</div></div><div class="p-6 pt-0 space-y-3"><div class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big text-green-500 mt-1 w-5 h-5 flex-shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg><span>Obtain disclosure from the police about the allegation before the interview.</span></div><div class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big text-green-500 mt-1 w-5 h-5 flex-shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg><span>Advise you on the strength of the evidence and the best approach to take.</span></div><div class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big text-green-500 mt-1 w-5 h-5 flex-shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg><span>Sit with you in the interview to ensure it is conducted fairly.</span></div><div class="flex items-start gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big text-green-500 mt-1 w-5 h-5 flex-shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg><span>Make legal representations on your behalf, which can sometimes prevent charges.</span></div></div></div></div><div class="rounded-xl border bg-slate-800 text-white shadow-xl"><div class="p-8 text-center"><h3 class="text-3xl font-bold text-amber-400 mb-4">Invited for an Interview? Call Us First.</h3><p class="text-lg mb-6 max-w-2xl mx-auto">Never attend a voluntary interview without speaking to a solicitor. Call us during extended hours for immediate, free, and confidential advice.</p><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground shadow h-10 rounded-md px-8 bg-red-600 hover:bg-red-700 font-bold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Call for Advice: 01732 247427</a></div></div></div></div></div>',
              }}
            />

            <section className="not-prose max-w-6xl mx-auto px-4 pb-10">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently asked questions</h2>
                <div className="space-y-6">
                  {faqItems.map((item) => (
                    <div key={item.question} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                      <p className="text-slate-700">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Internal Linking Hub */}
            <InternalLinkHub
              title="Related Services and Information"
              links={[
                { href: "/offences-we-deal-with", text: "Offences We Deal With", description: "Types of offences we handle" },
                { href: "/services/police-station-representation", text: "Police Station Representation", description: "Main service page" },
                { href: "/police-station-interviews-kent-rights", text: "Solicitor for Police Interview", description: "Your rights and what to expect" },
                { href: "/services/pre-charge-advice", text: "Police Interview Advice Solicitor", description: "Pre-charge advice" },
                { href: "/police-interview-rights", text: "Police Interview Rights", description: "Detailed rights guide" },
                { href: "/kent-police-stations", text: "Duty Solicitor Kent", description: "All Kent police stations" },
                { href: "/faq", text: "Frequently Asked Questions", description: "Common questions" },
              ]}
            />

            {/* E-E-A-T Signals */}
            <div className="max-w-6xl mx-auto px-4 pb-8">
              <AuthorBio showFull={true} className="mb-8" />
              <RegulatoryReferences />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
