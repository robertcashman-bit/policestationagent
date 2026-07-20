import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { BreadcrumbList } from "@/components/StructuredData";

const baseUrl = `https://${SITE_DOMAIN}`;

export const metadata: Metadata = {
  title: "Sexual Offences | Police Station Representation Kent | Legal Aid",
  description:
    "Expert police station representation for sexual offence allegations across Kent. Free legal advice under Legal Aid. Early advice before interview is essential. Call 01732 247427.",
  alternates: {
    canonical: "https://policestationagent.com/offences/sexual-offences",
  },
};

export default function SexualOffencesPage() {
  const breadcrumbItems = [
    { name: "Home", url: baseUrl },
    { name: "Offences We Deal With", url: `${baseUrl}/offences-we-deal-with` },
    { name: "Sexual Offences", url: `${baseUrl}/offences/sexual-offences` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <BreadcrumbList items={breadcrumbItems} />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <section
              className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 rounded-xl mb-8"
              aria-labelledby="page-title"
            >
              <div className="max-w-3xl mx-auto text-center px-4">
                <h1 id="page-title" className="text-4xl md:text-5xl font-black mb-6 text-white">
                  Sexual Offences
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  If the police want to interview you about a sexual offence allegation, it is essential to obtain legal advice as soon as possible.
                </p>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Understanding Sexual Offence Allegations
              </h2>
              <p className="text-slate-700 mb-4">
                Sexual offence allegations can involve various offences, including rape, sexual assault, indecent assault, and other related matters. The police may contact you by phone, letter, or in person. You may be asked to attend a voluntary interview or you may be arrested.
              </p>
              <p className="text-slate-700 mb-4">
                Allegations of sexual offences are serious and are treated as such by the police and courts. The process requires careful handling, and early legal advice is important to protect your interests and ensure your rights are respected.
              </p>
              <p className="text-slate-700">
                We provide police station representation and advice for sexual offence allegations across Kent. We can attend police stations including Medway, Maidstone, Canterbury, Gravesend, and other custody suites across the county.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl border-2 border-blue-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                If the Police Want to Interview You
              </h2>
              <p className="text-slate-700 mb-4">
                If the police want to interview you about a sexual offence allegation:
              </p>
              <ol className="space-y-3 text-slate-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">1.</span>
                  <span><strong>Obtain Legal Advice Immediately:</strong> Contact a solicitor before speaking to the police. We can advise you on the allegations, the process, and your rights.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">2.</span>
                  <span><strong>Do Not Attend Unrepresented:</strong> Do not attend a voluntary interview without legal advice. We can help you prepare and represent you during interview.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">3.</span>
                  <span><strong>Understand the Allegations:</strong> We can contact the officer in charge to obtain disclosure of the evidence against you before interview.</span>
                </li>
              </ol>
              <p className="text-slate-700">
                We can attend police stations across Kent to provide advice and representation. Legal Aid is usually available at the police station for sexual offence interviews.
              </p>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Voluntary Attendance vs Arrest
              </h2>
              <p className="text-slate-700 mb-4">
                You may be asked to attend a voluntary interview or you may be arrested for a sexual offence allegation.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-2">Voluntary Interview</h3>
                  <p className="text-slate-700 text-sm">
                    You may be asked to attend the police station at a specific time. The interview is conducted under caution. Anything you say can be used in evidence. You have the right to free legal advice.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-2">Arrest</h3>
                  <p className="text-slate-700 text-sm">
                    You may be arrested and taken to a police station. You may be held in custody for questioning. You have the right to free legal advice.
                  </p>
                </div>
              </div>
              <p className="text-slate-700">
                In both cases, early legal advice is essential. We can attend voluntary interviews and custody interviews across Kent.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl border-2 border-blue-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Police Bail and Release Under Investigation
              </h2>
              <p className="text-slate-700 mb-4">
                After interview for a sexual offence allegation, you may be:
              </p>
              <ul className="space-y-3 text-slate-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Released Under Investigation (RUI):</strong> The investigation continues. You may be contacted again. There are usually no conditions, but the police may apply for restrictions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Police Bail:</strong> Conditions may be imposed, such as not contacting certain people, not going to specific areas, or other restrictions. You must return to the police station on a specified date.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Charged:</strong> You may be charged with an offence and given a court date.</span>
                </li>
              </ul>
              <p className="text-slate-700">
                Bail conditions in sexual offence cases can be restrictive. We can advise on bail conditions and your obligations. For more information, see our page on <Link href="/police-bail-explained" className="text-blue-600 hover:underline">police bail explained</Link>.
              </p>
              <p className="text-slate-700 mt-4">
                If released under investigation, see our page on <Link href="/released-under-investigation" className="text-blue-600 hover:underline">released under investigation</Link> for guidance.
              </p>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                How We Can Help
              </h2>
              <p className="text-slate-700 mb-4">
                If the police want to interview you about a sexual offence allegation, we can:
              </p>
              <ul className="space-y-3 text-slate-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Advise You:</strong> We can explain the allegations, the evidence, the process, and your options.</span>
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
                  <span><strong>After interview (information):</strong> Bail, RUI and next steps are explained during attendance — not as free post-release phone advice.</span>
                </li>
              </ul>
              <p className="text-slate-700">
                We cover all Kent police stations and can attend voluntary interviews and custody interviews subject to availability and conflicts.
              </p>
            </section>

            <section className="bg-slate-50 rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                The Importance of Early Advice
              </h2>
              <p className="text-slate-700 mb-4">
                Early legal advice is essential for sexual offence allegations because:
              </p>
              <ul className="space-y-3 text-slate-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Understanding the Allegations:</strong> We can help you understand what you are being accused of and what evidence the police may have.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Disclosure:</strong> We can obtain disclosure of the evidence before interview, which can help you prepare.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Protection:</strong> We can ensure your rights are protected and that the interview is conducted fairly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Bail Conditions:</strong> We can advise on potential bail conditions and help you understand your obligations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Outcomes:</strong> Early advice can help you understand potential outcomes and next steps.</span>
                </li>
              </ul>
              <p className="text-slate-700">
                For more information on voluntary interviews, see our page on <Link href="/voluntary-police-interview" className="text-blue-600 hover:underline">voluntary police interviews</Link>.
              </p>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Your Rights in Custody
              </h2>
              <p className="text-slate-700 mb-4">
                If arrested for a sexual offence allegation, you have rights in custody, including:
              </p>
              <ul className="space-y-2 text-slate-700 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>The right to free legal advice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>The right to have someone informed of your arrest</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>The right to medical attention if needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>The right to read the Codes of Practice</span>
                </li>
              </ul>
              <p className="text-slate-700">
                For more information, see our page on <Link href="/your-rights-in-custody" className="text-blue-600 hover:underline">your rights in custody</Link>.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl border-2 border-blue-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Is legal advice free for sexual offence allegations?</h3>
                  <p className="text-slate-700">Yes. Legal Aid is usually available at the police station for sexual offence interviews, whether voluntary or under arrest.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What if I am arrested for a sexual offence?</h3>
                  <p className="text-slate-700">If arrested, you will be taken to a police station. You have the right to free legal advice. We can attend to advise and represent you.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Can I have a solicitor at a voluntary interview for sexual offences?</h3>
                  <p className="text-slate-700">Yes. You have the right to free legal advice and representation at voluntary interviews. The police cannot refuse this.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What are bail conditions in sexual offence cases?</h3>
                  <p className="text-slate-700">Bail conditions may include not contacting certain people, not going to specific areas, or other restrictions. Conditions can be restrictive.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What if I am released under investigation?</h3>
                  <p className="text-slate-700">If released under investigation (RUI), the investigation continues. You may be contacted again. The police may continue to gather evidence.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Can bail conditions be changed?</h3>
                  <p className="text-slate-700">Bail conditions can sometimes be varied by applying to the police or court. We can advise on the process.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What happens if I breach bail conditions?</h3>
                  <p className="text-slate-700">Breaching bail conditions is a criminal offence and can lead to arrest and further charges. It is important to comply with conditions.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">How long can a sexual offence investigation take?</h3>
                  <p className="text-slate-700">Investigations can take weeks or months, especially if released under investigation. The police will contact you when they have made a decision.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What if the police want to interview me again?</h3>
                  <p className="text-slate-700">If contacted again, you should obtain legal advice. We can help you understand why you are being contacted and what to do next.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Can you help if I am charged?</h3>
                  <p className="text-slate-700">Yes. We can advise on the charge, court proceedings, and representation. We work with court specialists for ongoing representation.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Which police stations do you cover?</h3>
                  <p className="text-slate-700">We cover all Kent custody suites, including Medway, Maidstone, Canterbury, Gravesend, and other police stations across Kent.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">How quickly can a solicitor attend?</h3>
                  <p className="text-slate-700">We aim to respond promptly. Attendance times depend on location, custody demand, and solicitor availability.</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                What Happens Next
              </h2>
              <p className="text-blue-100 mb-6">
                If the police want to interview you about a sexual offence allegation, it is essential to obtain legal advice as soon as possible. We can:
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
                  <span>Explain typical next steps after interview (information only — not free post-release phone advice)</span>
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

            <section className="bg-slate-50 rounded-xl border border-slate-200 shadow-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Related Pages</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">Other Offences</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li><Link href="/offences-we-deal-with" className="text-blue-600 hover:underline">Offences We Deal With</Link></li>
                    <li><Link href="/offences/domestic-abuse-allegations" className="text-blue-600 hover:underline">Domestic Abuse Allegations</Link></li>
                    <li><Link href="/offences/assault-abh-gbh" className="text-blue-600 hover:underline">Assault / ABH / GBH</Link></li>
                    <li><Link href="/offences/harassment-stalking" className="text-blue-600 hover:underline">Harassment / Stalking</Link></li>
                    <li><Link href="/offences/drug-offences" className="text-blue-600 hover:underline">Drug Offences</Link></li>
                    <li><Link href="/offences/fraud-theft" className="text-blue-600 hover:underline">Fraud / Theft</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">Legal Advice & Rights</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li><Link href="/voluntary-police-interview" className="text-blue-600 hover:underline">Voluntary Police Interview</Link></li>
                    <li><Link href="/police-bail-explained" className="text-blue-600 hover:underline">Police Bail Explained</Link></li>
                    <li><Link href="/released-under-investigation" className="text-blue-600 hover:underline">Released Under Investigation</Link></li>
                    <li><Link href="/your-rights-in-custody" className="text-blue-600 hover:underline">Your Rights in Custody</Link></li>
                    <li><Link href="/fees" className="text-blue-600 hover:underline">Fees</Link></li>
                    <li><Link href="/contact" className="text-blue-600 hover:underline">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
