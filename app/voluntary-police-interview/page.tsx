import Header from "@/components/Header";
import { normalizeScrapedHtml } from "@/lib/scraped-html";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { FAQPage } from "@/components/StructuredData";
import { AnswerFirstBlock } from "@/components/conversion/AnswerFirstBlock";

export const metadata: Metadata = {
  title: "Voluntary Police Interview Solicitor | Legal Advice Before Attendance (Kent)",
  description:
    "Voluntary police interview (caution) legal advice before attendance. Free legal advice at the police station under Legal Aid. Kent coverage. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/voluntary-police-interview`,
  },
  openGraph: {
    title: "Voluntary Police Interview Solicitor | Legal Advice Before Attendance (Kent)",
    description:
      "Advice and representation for voluntary police interviews (under caution) across Kent. Free police station legal advice under Legal Aid.",
    url: `https://${SITE_DOMAIN}/voluntary-police-interview`,
    siteName: "Police Station Agent",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function VoluntaryPoliceInterviewPage() {
  const faqItems = [
    {
      question: "Is a voluntary police interview under caution?",
      answer:
        "Yes. Even when an interview is arranged by appointment, it is usually conducted under caution and recorded, and what is said can be used as evidence.",
    },
    {
      question: "Is legal advice free at a voluntary police interview?",
      answer:
        "Legal aid is usually available at the police station, so advice and representation for an interview under caution is normally free of charge.",
    },
    {
      question: "Can the police refuse me a solicitor at interview?",
      answer:
        "In most cases, no. You have a right to legal advice and the police should not proceed with a PACE interview until you have had the opportunity to speak to a solicitor (subject to limited exceptions).",
    },
    {
      question: "What is the difference between a voluntary interview and arrest?",
      answer:
        "A voluntary interview is arranged by appointment and you attend without being detained. Arrest involves detention in custody. Both interviews are under caution and both require careful legal advice.",
    },
    {
      question: "What should I do when the police contact me about an interview?",
      answer:
        "Do not discuss the allegation on the phone. Ask for the officer’s details, confirm the station/time proposed, and arrange legal advice before you attend.",
    },
  ];

  return (
    <>
      <FAQPage items={faqItems} />
      <Header />
      <main
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
        id="main-content"
        role="main"
        aria-live="polite"
      >
        <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
          <AnswerFirstBlock>
            A voluntary police interview is conducted under caution. A police station solicitor can
            obtain disclosure, advise you before attendance, and represent you in interview. Legal
            advice at the police station is free under Legal Aid for most interviewees.
          </AnswerFirstBlock>
          <div
            dangerouslySetInnerHTML={{
              __html: normalizeScrapedHtml(`<div class="bg-gradient-to-br from-slate-50 via-blue-50 to-white"><section class="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white pt-32 pb-32 md:pt-28 md:pb-40" aria-labelledby="hero-heading"><div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" aria-hidden="true"></div><div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" aria-hidden="true"></div><div class="max-w-7xl mx-auto px-4 relative z-10"><div class="text-center max-w-5xl mx-auto"><h1 id="hero-heading" class="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-lg">Invited to a Voluntary Police Interview? Speak to a Solicitor Before You Attend</h1><h2 class="text-xl md:text-2xl text-blue-100 mb-6 leading-relaxed max-w-4xl mx-auto font-medium">A voluntary interview is still conducted under caution. Independent legal advice before attendance can significantly affect what happens next.</h2><p class="text-base md:text-lg text-blue-200 mb-8 leading-relaxed max-w-4xl mx-auto">This service is for people who have received a police invitation, call, or letter proposing a voluntary interview. It is not intended for general or hypothetical enquiries.</p><div class="flex flex-wrap justify-center gap-4 mb-10"><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-full shadow-xl border-2 border-amber-500">Arrange Voluntary Interview Legal Advice</a><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-full shadow-xl">Call About a Voluntary Police Interview</a></div></div></div><div class="absolute bottom-0 left-0 right-0" aria-hidden="true"><svg viewBox="0 0 1440 120" class="w-full h-auto" role="presentation"><path fill="#f8fafc" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path></svg></div></section><section class="py-20 bg-white"><div class="max-w-4xl mx-auto px-4"><h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6">What Is a Voluntary Police Interview?</h2><p class="text-lg text-slate-700 leading-relaxed mb-8">A voluntary police interview takes place by appointment rather than following arrest. You attend the police station voluntarily, but the interview is conducted under caution and anything said may be used in evidence. The absence of arrest does not reduce the seriousness of the process.</p><h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-12">Why Legal Advice Matters Before Attendance</h2><ul class="space-y-4 text-lg text-slate-700 mb-8"><li class="flex items-start gap-3"><span class="text-amber-500 font-bold mt-1">•</span><span>You are not obliged to answer questions without advice</span></li><li class="flex items-start gap-3"><span class="text-amber-500 font-bold mt-1">•</span><span>Early advice can influence whether the interview proceeds</span></li><li class="flex items-start gap-3"><span class="text-amber-500 font-bold mt-1">•</span><span>Disclosure may be obtained before attendance</span></li><li class="flex items-start gap-3"><span class="text-amber-500 font-bold mt-1">•</span><span>Representation ensures your rights are protected</span></li></ul><h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 mt-12">Free Legal Advice</h2><p class="text-lg text-slate-700 leading-relaxed">Legal advice at a voluntary police interview is free of charge under Legal Aid and cannot be refused by the police.</p></div></section></div>`),
            }}

          />

          <div className="not-prose mt-10">
            <InternalLinkHub
              title="Related Services and Information"
              links={[
                {
                  href: "/services/police-station-representation",
                  text: "Police Station Representation",
                  description: "Solicitor attendance for interviews under caution",
                },
                {
                  href: "/voluntary-interviews",
                  text: "Voluntary Interviews (Guide)",
                  description: "Practical guidance on voluntary attendance interviews",
                },
                {
                  href: "/your-rights-in-custody",
                  text: "Your Rights in Custody",
                  description: "PACE rights, time limits, and what to expect",
                },
                {
                  href: "/police-bail-explained",
                  text: "Police Bail Explained",
                  description: "Bail conditions, return dates, and extensions",
                },
                {
                  href: "/released-under-investigation",
                  text: "Released Under Investigation (RUI)",
                  description: "What RUI means and practical next steps",
                },
                {
                  href: "/fees",
                  text: "Legal Aid & Fees",
                  description: "Funding options and the police-station Legal Aid position",
                },
                {
                  href: "/contact",
                  text: "Contact",
                  description: "Telephone first for urgent police station matters",
                },
              ]}
            />
          </div>

          <section className="not-prose mt-12 rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div key={item.question} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                  <p className="text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
