import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { BreadcrumbList } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Offences We Deal With | Police Station Representation in Kent",
  description:
    "Offence types we regularly deal with at the police station, and how early legal advice works before interview. Kent police station representation. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/offences-we-deal-with`,
  },
  openGraph: {
    title: "Offences We Deal With | Police Station Representation in Kent",
    description:
      "Offence types we regularly deal with at the police station, plus guidance on interviews, bail and RUI. Kent coverage.",
    url: `https://${SITE_DOMAIN}/offences-we-deal-with`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

const baseUrl = `https://${SITE_DOMAIN}`;

export default function OffencesWeDealWithPage() {
  const breadcrumbItems = [
    { name: "Home", url: baseUrl },
    { name: "Offences We Deal With", url: `${baseUrl}/offences-we-deal-with` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <BreadcrumbList items={breadcrumbItems} />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Hero Section */}
            <section
              className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 rounded-xl mb-8"
              aria-labelledby="page-title"
            >
              <div className="max-w-3xl mx-auto text-center px-4">
                <h1 id="page-title" className="text-4xl md:text-5xl font-black mb-6 text-white">
                  Offences We Deal With
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  If the police want to interview you about a criminal offence, you are entitled to
                  free, independent legal advice before you attend.
                </p>
              </div>
            </section>

            {/* Intro Section */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Police Station Representation and Legal Aid
              </h2>
              <p className="text-slate-700 mb-4">
                At the police station, you have the right to free legal advice under Legal Aid. This
                is not means-tested for police station interviews. A duty solicitor can attend to
                advise you, help you prepare, and represent you during interview.
              </p>
              <p className="text-slate-700 mb-4">
                We can attend police stations across Kent to provide:
              </p>
              <ul className="space-y-2 text-slate-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Advice before and during police interviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Representation at voluntary attendance interviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Preparation and strategy guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Liaison with the officer in charge (OIC) to obtain disclosure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Post-interview advice on bail, release under investigation (RUI), and next steps</span>
                </li>
              </ul>
              <p className="text-slate-700">
                We cover all Kent custody suites, including Medway, Maidstone, Canterbury, Gravesend, and other police stations across the county.
              </p>
            </section>

            {/* Offence Types Grid */}
            <section className="mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Types of Offences We Handle
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href="/offences/domestic-abuse-allegations"
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-red-400 hover:bg-red-50 transition-all p-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Domestic Abuse Allegations</h3>
                  <p className="text-slate-600">
                    Allegations of domestic abuse are taken seriously by the police. We can provide advice and representation.
                  </p>
                </Link>
                <Link
                  href="/offences/sexual-offences"
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all p-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Sexual Offences</h3>
                  <p className="text-slate-600">
                    Sexual offence allegations require careful, respectful handling. Early legal advice is essential.
                  </p>
                </Link>
                <Link
                  href="/offences/assault-abh-gbh"
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all p-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Assault / ABH / GBH</h3>
                  <p className="text-slate-600">
                    Allegations of assault, actual bodily harm (ABH), or grievous bodily harm (GBH) can lead to serious consequences.
                  </p>
                </Link>
                <Link
                  href="/offences/harassment-stalking"
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all p-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Harassment and Stalking</h3>
                  <p className="text-slate-600">
                    Harassment and stalking allegations can involve restraining orders, bail conditions, and potential criminal charges.
                  </p>
                </Link>
                <Link
                  href="/offences/drug-offences"
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-green-400 hover:bg-green-50 transition-all p-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Drug Offences</h3>
                  <p className="text-slate-600">
                    Drug offence allegations can range from possession to supply offences. Early legal advice is important.
                  </p>
                </Link>
                <Link
                  href="/offences/fraud-theft"
                  className="bg-white rounded-xl border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all p-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Fraud and Theft</h3>
                  <p className="text-slate-600">
                    Fraud and theft allegations can be complex and may involve multiple interviews or ongoing investigations.
                  </p>
                </Link>
              </div>
            </section>

            {/* How Investigations Progress */}
            <section className="bg-blue-50 rounded-xl border-2 border-blue-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                How Police Investigations Usually Progress
              </h2>
              <ol className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">1.</span>
                  <div>
                    <strong className="text-slate-900">Initial Contact:</strong> The police may contact you by phone, letter, or in person. They may ask you to attend a voluntary interview or you may be arrested.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">2.</span>
                  <div>
                    <strong className="text-slate-900">Interview:</strong> Whether voluntary or under arrest, the interview is conducted under caution. Anything you say can be used in evidence. This is why early legal advice is important.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">3.</span>
                  <div>
                    <strong className="text-slate-900">After Interview:</strong> Following interview, the police may release you without charge (no further action), release you under investigation (RUI), bail you to return to the police station, or charge you with an offence.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">4.</span>
                  <div>
                    <strong className="text-slate-900">Ongoing Investigation:</strong> If released under investigation or on bail, the police may continue to gather evidence. You may be asked to return for further interviews.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">5.</span>
                  <div>
                    <strong className="text-slate-900">Decision:</strong> The police, sometimes with the Crown Prosecution Service (CPS), will decide whether to charge you, take no further action, or offer an out-of-court disposal.
                  </div>
                </li>
              </ol>
            </section>

            {/* Why Early Advice Matters */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Why Early Advice Matters (Before Interview)
              </h2>
              <p className="text-slate-700 mb-4">
                Obtaining legal advice before a police interview is important for several reasons:
              </p>
              <ul className="space-y-3 text-slate-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Understanding the Allegations:</strong> We can help you understand what you are being accused of and what evidence the police may have.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Disclosure:</strong> We can contact the officer in charge to request disclosure of the evidence against you before interview.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Preparation:</strong> We can help you prepare for interview, discuss your options, and advise on strategy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Protection:</strong> We can ensure your rights are protected and that the interview is conducted fairly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Outcomes:</strong> Early advice can help you understand potential outcomes and next steps.</span>
                </li>
              </ul>
              <p className="text-slate-700">
                For more information, see our pages on <Link href="/voluntary-police-interview" className="text-blue-600 hover:underline">voluntary police interviews</Link> and <Link href="/your-rights-in-custody" className="text-blue-600 hover:underline">your rights in custody</Link>.
              </p>
            </section>

            {/* Voluntary vs Arrest */}
            <section className="bg-slate-50 rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Voluntary Attendance vs Arrest
              </h2>
              <p className="text-slate-700 mb-4">
                You may be asked to attend a voluntary interview (also called a "caution plus 3" interview) or you may be arrested. Both are serious and carry the same legal risks.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-2">Voluntary Interview</h3>
                  <p className="text-slate-700 text-sm">
                    You are asked to attend at a specific time. You are not under arrest, but the interview is still conducted under caution. Anything you say can be used in evidence.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-2">Arrest</h3>
                  <p className="text-slate-700 text-sm">
                    You are detained and taken to a police station. You may be held in custody for questioning. The interview is conducted under caution.
                  </p>
                </div>
              </div>
              <p className="text-slate-700">
                In both cases, you have the right to free legal advice. We can attend voluntary interviews and custody interviews across Kent.
              </p>
            </section>

            {/* Police Bail and RUI */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Police Bail and Release Under Investigation
              </h2>
              <p className="text-slate-700 mb-4">
                After interview, you may be:
              </p>
              <ul className="space-y-3 text-slate-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Released Under Investigation (RUI):</strong> No bail conditions, but the investigation continues. You may be contacted again.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Police Bail:</strong> Conditions may be imposed, such as not contacting certain people or staying away from specific areas. You must return to the police station on a specified date.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Charged:</strong> You may be charged with an offence and given a court date.</span>
                </li>
              </ul>
              <p className="text-slate-700">
                For more information, see our pages on <Link href="/police-bail-explained" className="text-blue-600 hover:underline">police bail explained</Link> and <Link href="/released-under-investigation" className="text-blue-600 hover:underline">released under investigation</Link>.
              </p>
            </section>

            {/* How We Can Help */}
            <section className="bg-blue-50 rounded-xl border-2 border-blue-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                How We Can Help
              </h2>
              <p className="text-slate-700 mb-4">
                If the police want to interview you about an offence, we can:
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Advise You:</strong> We can explain the allegations, the process, and your options.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Obtain Disclosure:</strong> We can contact the officer in charge to request disclosure of the evidence before interview.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Prepare You:</strong> We can help you prepare for interview, discuss strategy, and advise on your approach.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Represent You:</strong> We can attend the interview with you, ensure your rights are protected, and help you respond to questions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Guide You:</strong> We can advise on bail, RUI, and next steps after interview.</span>
                </li>
              </ul>
              <p className="text-slate-700 mt-4">
                We cover all Kent police stations and can attend voluntary interviews and custody interviews subject to availability and conflicts.
              </p>
            </section>

            {/* FAQs */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Is legal advice free at the police station?</h3>
                  <p className="text-slate-700">
                    Yes. Legal Aid is usually available at the police station for interviews, whether voluntary or under arrest. This is not means-tested.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Do I have to attend a voluntary interview?</h3>
                  <p className="text-slate-700">
                    Attendance is technically voluntary, but refusal may lead to arrest. It is important to obtain legal advice before deciding whether to attend.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Can I have a solicitor at a voluntary interview?</h3>
                  <p className="text-slate-700">
                    Yes. You have the right to free legal advice and representation at voluntary interviews. The police cannot refuse this.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What happens if I am arrested?</h3>
                  <p className="text-slate-700">
                    If arrested, you will be taken to a police station. You have the right to free legal advice. We can attend to advise and represent you.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">How quickly can a solicitor attend?</h3>
                  <p className="text-slate-700">
                    We aim to respond promptly. Attendance times depend on location, custody demand, and solicitor availability.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Which police stations do you cover?</h3>
                  <p className="text-slate-700">
                    We cover all Kent custody suites including Medway, Maidstone, Gravesend, Canterbury, Tonbridge, Folkestone, Ashford, Sittingbourne, Margate, Dover, and Sevenoaks.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What if I am released under investigation?</h3>
                  <p className="text-slate-700">
                    If released under investigation (RUI), the investigation continues. You may be contacted again. We can advise on your position and next steps.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What if I am bailed?</h3>
                  <p className="text-slate-700">
                    If bailed, you must comply with any conditions and return to the police station on the specified date. We can advise on bail conditions and your obligations.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Can you help if I am charged?</h3>
                  <p className="text-slate-700">
                    Yes. We can advise on the charge, court proceedings, and representation. We work with court specialists for ongoing representation.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What if the police contact me again?</h3>
                  <p className="text-slate-700">
                    If contacted again, you should obtain legal advice. We can help you understand why you are being contacted and what to do next.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Do you cover offences outside Kent?</h3>
                  <p className="text-slate-700">
                    We primarily cover Kent police stations. For matters outside Kent, we can advise on options and may be able to assist subject to availability.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">How much does police station representation cost?</h3>
                  <p className="text-slate-700">
                    Legal Aid is usually available at the police station, so representation is free. For more information, see our <Link href="/fees" className="text-blue-600 hover:underline">fees page</Link>.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What if I am a witness or complainant?</h3>
                  <p className="text-slate-700">
                    We represent those accused of offences. If you are a witness or complainant, the police can provide information about support services.
                  </p>
                </div>
              </div>
            </section>

            {/* What Happens Next */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                What Happens Next
              </h2>
              <p className="text-blue-100 mb-6">
                If the police want to interview you about an offence, it is important to obtain legal advice as soon as possible. We can:
              </p>
              <ul className="space-y-3 text-blue-100 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-amber-300 font-bold mt-1">•</span>
                  <span>Advise you on the allegations and process</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-300 font-bold mt-1">•</span>
                  <span>Contact the officer in charge to obtain disclosure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-300 font-bold mt-1">•</span>
                  <span>Help you prepare for interview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-300 font-bold mt-1">•</span>
                  <span>Attend and represent you during interview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-300 font-bold mt-1">•</span>
                  <span>Guide you on bail, RUI, and next steps</span>
                </li>
              </ul>
              <p className="text-blue-100 mb-6">
                We cover police stations across Kent and can attend voluntary interviews and custody interviews subject to availability and conflicts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:01732247427"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-bold transition-colors bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 py-4 rounded-full shadow-xl"
                >
                  Call 01732 247427
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-bold transition-colors border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full shadow-xl"
                >
                  Contact Us
                </Link>
              </div>
            </section>

            {/* Related Pages */}
            <section className="bg-slate-50 rounded-xl border border-slate-200 shadow-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Related Pages</h2>
              <ul className="space-y-2 text-slate-700">
                <li>
                  <Link href="/services" className="text-blue-600 hover:underline">Services</Link>
                </li>
                <li>
                  <Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link>
                </li>
                <li>
                  <Link href="/voluntary-police-interview" className="text-blue-600 hover:underline">Voluntary Police Interview</Link>
                </li>
                <li>
                  <Link href="/police-bail-explained" className="text-blue-600 hover:underline">Police Bail Explained</Link>
                </li>
                <li>
                  <Link href="/released-under-investigation" className="text-blue-600 hover:underline">Released Under Investigation</Link>
                </li>
                <li>
                  <Link href="/your-rights-in-custody" className="text-blue-600 hover:underline">Your Rights in Custody</Link>
                </li>
                <li>
                  <Link href="/fees" className="text-blue-600 hover:underline">Fees</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
