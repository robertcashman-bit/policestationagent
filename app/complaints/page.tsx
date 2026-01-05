import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Complaints | Police Station Agent",
  description: "Information about making a complaint regarding legal services provided by Tuckers Solicitors LLP.",
  alternates: {
    canonical: "https://policestationagent.com/complaints",
  },
  openGraph: {
    title: "Complaints | Police Station Agent",
    description: "Information about making a complaint regarding legal services provided by Tuckers Solicitors LLP.",
    url: "https://policestationagent.com/complaints",
    siteName: 'Police Station Agent',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Complaints</h1>
            
            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <p>
                Police Station Agent does not itself provide regulated legal services.
              </p>
              
              <p>
                All legal services advertised on this website are provided by Tuckers Solicitors LLP, a firm authorised and regulated by the Solicitors Regulation Authority (SRA ID: 127795).
              </p>
              
              <p>
                If you are unhappy with any aspect of the legal service you have received, you have the right to make a complaint. Tuckers Solicitors LLP operates a formal complaints procedure which explains:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>how to raise a complaint;</li>
                <li>how it will be investigated;</li>
                <li>the timescales involved; and</li>
                <li>how to escalate your complaint to the Legal Ombudsman if you remain dissatisfied.</li>
              </ul>
              
              <p>
                You can view the full complaints procedure here:
              </p>
              
              <p>
                <Link 
                  href="https://www.tuckerssolicitors.com/service-standards-complaints-procedures/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                >
                  https://www.tuckerssolicitors.com/service-standards-complaints-procedures/
                </Link>
              </p>
              
              <p>
                This link will take you to the official complaints procedure of Tuckers Solicitors LLP.
              </p>
              
              <p>
                If you have concerns about professional conduct, you may also contact the Solicitors Regulation Authority (SRA):
              </p>
              
              <p>
                <Link 
                  href="https://www.sra.org.uk/consumers/complaints/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                >
                  https://www.sra.org.uk/consumers/complaints/
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
