import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { SITE_DOMAIN } from '@/config/site';
import { LegalReferences, Ref, type LegalSource } from '@/components/LegalReferences';

export const metadata: Metadata = {
  title: 'What to Do If a Loved One is Arrested | Family Guide | Police Station Agent',
  description: 'Practical guide for families when a loved one is arrested in Kent. Learn what to do, your rights, and how to get immediate legal representation.',
  alternates: {
    canonical: `https://${SITE_DOMAIN}/what-to-do-if-a-loved-one-is-arrested`,
  },
  openGraph: {
    title: 'What to Do If a Loved One is Arrested | Family Guide | Police Station Agent',
    description: 'Practical guide for families when a loved one is arrested in Kent. Learn what to do and how to get immediate legal representation.',
    url: `https://${SITE_DOMAIN}/what-to-do-if-a-loved-one-is-arrested`,
    siteName: 'Police Station Agent',
    type: 'website',
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
      id: 'govuk-arrested',
      label: 'GOV.UK: Arrested? Your rights',
      href: 'https://www.gov.uk/arrested-your-rights',
    },
    {
      id: 'code-c-2023',
      label: 'Home Office: PACE Code C (December 2023) – detention, treatment and questioning (PDF)',
      href: 'https://assets.publishing.service.gov.uk/media/6580543083ba38000de1b792/PACE+Code+C+2023.pdf',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-6">What to Do If a Loved One is Arrested</h1>
            
            <p className="lead text-xl text-slate-700 mb-8">
              Finding out that a loved one has been arrested can be distressing. This guide explains what you can do to help and how to ensure they get the best legal representation.
            </p>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Immediate Steps</h2>
              
              <h3 className="text-2xl font-semibold mb-3 mt-6">1. Stay Calm</h3>
              <p className="mb-4">
                While it's natural to be worried, staying calm will help you take the right steps to help your loved one.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">2. Find Out Which Police Station</h3>
              <p className="mb-4">
                Ask the police which station your loved one has been taken to. Your loved one has a right to have someone informed of their arrest (PACE s.56).<Ref n={1} />
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">3. Instruct a Solicitor Immediately</h3>
              <p className="mb-4">
                You can instruct a solicitor on behalf of your loved one. This is crucial because:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Legal advice at the police station is free in many situations (see GOV.UK overview)<Ref n={3} /></li>
                <li>The solicitor can attend the police station to represent them</li>
                <li>Early legal advice can significantly improve the outcome</li>
                <li>The solicitor can ensure their rights are protected</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">What Information to Provide</h2>
              <p className="mb-4">When calling a solicitor, have ready:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The name of the person arrested</li>
                <li>Which police station they are at</li>
                <li>When they were arrested (if known)</li>
                <li>What they have been arrested for (if known)</li>
                <li>Any relevant medical conditions or vulnerabilities</li>
                <li>Your contact details</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Your Loved One's Rights</h2>
              <p className="mb-4">
                While in custody, your loved one has important rights including legal advice (PACE s.58) and having someone informed (PACE s.56).<Ref n={2} /> <Ref n={1} />
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Right to free legal advice</li>
                <li>Right to have someone informed of their arrest</li>
                <li>Right to remain silent</li>
                <li>Right to medical attention if needed</li>
                <li>Right to be treated properly and with dignity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">What Happens Next</h2>
              <p className="mb-4">After arrest, the process typically involves:</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li><strong>Booking in:</strong> Your loved one will be processed at the police station</li>
                <li><strong>Legal advice:</strong> A solicitor will attend to provide representation</li>
                <li><strong>Interview:</strong> They may be interviewed (with their solicitor present)</li>
                <li><strong>Decision:</strong> The police will decide whether to charge, release under investigation, or take no further action</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Can You Visit?</h2>
              <p className="mb-4">
                Generally, you cannot visit someone in police custody. However, you can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Call the police station to check on their welfare</li>
                <li>Ensure they have requested legal advice</li>
                <li>Provide information to their solicitor if helpful</li>
                <li>Be available to collect them if they are released</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">If Your Loved One is Vulnerable</h2>
              <p className="mb-4">
                If your loved one is vulnerable (e.g. mental health issues, learning disabilities), inform the solicitor immediately. PACE Code C contains safeguards for vulnerable detainees, including appropriate adult safeguards.<Ref n={4} />
              </p>
            </section>

            <section className="mb-8 bg-red-50 p-6 rounded-lg border border-red-200">
              <h2 className="text-2xl font-semibold mb-4 text-red-800">Emergency: Act Quickly</h2>
              <p className="mb-4">
                Time is important. The sooner a solicitor is instructed, the better. Your loved one should not be interviewed without legal representation unless they specifically waive this right.
              </p>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-semibold mb-4">Get Immediate Legal Representation</h2>
              <p className="mb-4">
                If a loved one has been arrested, call us immediately. We provide free extended hours legal advice and representation at all Kent police stations. You can instruct us on their behalf.
              </p>
              <p className="mb-4">
                <strong>Call us now on <a href="tel:01732247427" className="text-blue-600 hover:text-blue-800 font-semibold">01732 247427</a></strong> for immediate assistance.
              </p>
            </section>

            <LegalReferences sources={sources} heading="Sources" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
