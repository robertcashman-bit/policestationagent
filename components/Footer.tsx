import Link from 'next/link';
import { getFormattedVersion, getLastUpdateDateTime } from '@/lib/version';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appVersion = getFormattedVersion();
  const lastUpdate = getLastUpdateDateTime();
  
  return (
    <footer className="bg-slate-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 text-sm">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-4 text-lg text-white">Police Station Agent</h3>
            <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="text-xs text-amber-200 font-semibold mb-1">Serving All Kent Towns:</p>
              <p className="text-xs text-white/90">
                Medway, Maidstone, Canterbury, Gravesend, Tonbridge, Folkestone, Ashford, Dartford, Sittingbourne, Sevenoaks, Tunbridge Wells, Margate, Dover, Swanley, Bluewater
              </p>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-3 text-white text-sm">Contact</h4>
              <address className="not-italic space-y-2">
                <div>
                  <a href="tel:01732247427" className="text-slate-200 hover:text-white transition-colors font-medium text-sm">
                    01732 247427
                  </a>
                </div>
                <div>
                  <a href="mailto:robertcashman@defencelegalservices.co.uk" className="text-slate-200 hover:text-white transition-colors font-medium break-all text-xs">
                    robertcashman@defencelegalservices.co.uk
                  </a>
                </div>
                <div>
                  <a href="sms:07535494446?body=I%20need%20police%20station%20representation" className="text-blue-300 hover:text-blue-200 flex items-center gap-2 font-medium transition-colors text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-4 h-4">
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                    </svg>
                    Text: 07535 494446
                  </a>
                </div>
              </address>
            </div>
            <div className="flex gap-4 mt-6" role="list" aria-label="Social media links">
              <a 
                href="https://www.facebook.com/policestationagent" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700 transition-colors" 
                title="Facebook" 
                aria-label="Visit our Facebook page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-6 h-6" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/police-station-agent" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:text-blue-600 transition-colors" 
                title="LinkedIn" 
                aria-label="Visit our LinkedIn page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-6 h-6" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href="https://twitter.com/policestation" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-300 hover:text-white" 
                title="Twitter/X" 
                aria-label="Visit our Twitter page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-6 h-6" aria-hidden="true">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Services Column */}
          <div>
            <h3 className="font-bold mb-4 text-lg text-white">Services</h3>
            <nav aria-label="Footer services links">
              <ul className="space-y-2.5">
                <li>
                  <Link href="/services" className="text-slate-200 hover:text-white transition-colors font-medium text-sm">
                    Police Station Rep Services Kent
                  </Link>
                </li>
                <li>
                  <Link href="/services/police-station-representation" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Representation
                  </Link>
                </li>
                <li>
                  <Link href="/voluntary-interviews" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Voluntary Interviews
                  </Link>
                </li>
                <li>
                  <Link href="/courtrepresentation" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Court Representation
                  </Link>
                </li>
                <li>
                  <Link href="/for-solicitors" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Agent Cover for Law Firms
                  </Link>
                </li>
                <li>
                  <Link href="/privatecrime" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Private Client Service
                  </Link>
                </li>
                <li>
                  <Link href="/fees" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Legal Aid & Fees
                  </Link>
                </li>
                <li>
                  <Link href="/for-clients" className="text-slate-200 hover:text-white transition-colors text-sm">
                    For Clients
                  </Link>
                </li>
                <li>
                  <Link href="/emergency-police-station-representation" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Emergency Representation
                  </Link>
                </li>
                <li>
                  <Link href="/court-representation" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Court Representation (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/servicesvoluntaryinterviews" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Voluntary Interviews (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/private-crime" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Private Crime (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/forsolicitors" className="text-slate-200 hover:text-white transition-colors text-sm">
                    For Solicitors (Alt)
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Help & Advice Column */}
          <div>
            <h3 className="font-bold mb-4 text-lg text-white">Help & Advice</h3>
            <nav aria-label="Footer help and advice links">
              <ul className="space-y-2.5">
                <li>
                  <Link href="/faq" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/police-custody-rights" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                    Police Custody Rights
                  </Link>
                </li>
                <li>
                  <Link href="/police-interview-rights" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                    Police Interview Rights
                  </Link>
                </li>
                <li>
                  <Link href="/custody-time-limits" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Custody Time Limits
                  </Link>
                </li>
                <li>
                  <Link href="/pace-code-c" className="text-slate-200 hover:text-white transition-colors text-sm">
                    PACE Code C Rights
                  </Link>
                </li>
                <li>
                  <Link href="/no-comment-interview" className="text-slate-200 hover:text-white transition-colors text-sm">
                    No Comment Interviews
                  </Link>
                </li>
                <li>
                  <Link href="/prepared-statements" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Prepared Statements
                  </Link>
                </li>
                <li>
                  <Link href="/adverse-inference" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Adverse Inferences
                  </Link>
                </li>
                <li>
                  <Link href="/released-under-investigation" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Released Under Investigation
                  </Link>
                </li>
                <li>
                  <Link href="/police-bail-explained" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Bail Explained
                  </Link>
                </li>
                <li>
                  <Link href="/youth-custody-rights" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Youth Custody Rights
                  </Link>
                </li>
                <li>
                  <Link href="/appropriate-adult" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Appropriate Adults
                  </Link>
                </li>
                <li>
                  <Link href="/can-police-take-my-phone" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Can Police Take My Phone?
                  </Link>
                </li>
                <li>
                  <Link href="/dna-fingerprints-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    DNA & Fingerprints
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-200 hover:text-white transition-colors text-sm font-medium">
                    Legal Advice Blog
                  </Link>
                </li>
                <li>
                  <Link href="/what-to-do-if-a-loved-one-is-arrested" className="text-slate-200 hover:text-white transition-colors text-sm">
                    What to Do if a Loved One is Arrested
                  </Link>
                </li>
                <li>
                  <Link href="/arrested-what-to-do" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Arrested - What to Do
                  </Link>
                </li>
                <li>
                  <Link href="/article-loved-one-arrested-kent" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Loved One Arrested in Kent
                  </Link>
                </li>
                <li>
                  <Link href="/arrival-times-delays" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Arrival Times & Delays
                  </Link>
                </li>
                <li>
                  <Link href="/booking-in-procedure-in-kent" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Booking Procedure in Kent
                  </Link>
                </li>
                <li>
                  <Link href="/importance-of-early-legal-advice" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Importance of Early Legal Advice
                  </Link>
                </li>
                <li>
                  <Link href="/preparing-for-police-interview" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Preparing for Police Interview
                  </Link>
                </li>
                <li>
                  <Link href="/voluntary-police-interview-risks" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Voluntary Interview Risks
                  </Link>
                </li>
                <li>
                  <Link href="/what-happens-if-ignore-police-interview" className="text-slate-200 hover:text-white transition-colors text-sm">
                    What Happens if You Ignore Interview
                  </Link>
                </li>
                <li>
                  <Link href="/vulnerable-adults-in-custody" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Vulnerable Adults in Custody
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-interviews-kent-rights" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Interviews Kent Rights
                  </Link>
                </li>
                <li>
                  <Link href="/policeinterviewhelp" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Interview Help
                  </Link>
                </li>
                <li>
                  <Link href="/refusingpoliceinterview" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Refusing Police Interview
                  </Link>
                </li>
                <li>
                  <Link href="/afterapoliceinterview" className="text-slate-200 hover:text-white transition-colors text-sm">
                    After Police Interview (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/nofurtheractionafterpoliceinterview" className="text-slate-200 hover:text-white transition-colors text-sm">
                    No Further Action After Interview (Alt)
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Locations Column */}
          <div>
            <h3 className="font-bold mb-4 text-lg text-white">Kent Locations</h3>
            <nav aria-label="Footer location links">
              <ul className="space-y-2.5">
                <li>
                  <Link href="/police-stations" className="text-slate-200 hover:text-white transition-colors font-medium text-sm">
                    All Kent Police Stations
                  </Link>
                </li>
                <li>
                  <Link href="/coverage" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Service Coverage Areas
                  </Link>
                </li>
                <li>
                  <Link href="/medway-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Medway Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/maidstone-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Maidstone Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/canterbury-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Canterbury Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/north-kent-gravesend-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Gravesend Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/tonbridge-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Tonbridge Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/folkestone-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Folkestone Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/margate-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Margate Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/sevenoaks-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Sevenoaks Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/kent-police-station-reps" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Kent Police Station Reps
                  </Link>
                </li>
                <li>
                  <Link href="/kent-police-stations" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Kent Police Stations
                  </Link>
                </li>
                <li>
                  <Link href="/psastations" className="text-slate-200 hover:text-white transition-colors text-sm">
                    PSA Stations
                  </Link>
                </li>
                <li>
                  <Link href="/policestationreps" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Reps (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/accreditedpolicerep" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Accredited Police Rep
                  </Link>
                </li>
                <li>
                  <Link href="/areas" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Areas
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="/out-of-area" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Out of Area
                  </Link>
                </li>
                <li>
                  <Link href="/outofarea" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Out of Area (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/ashford-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Ashford Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/ashford-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Ashford PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/ashford-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Ashford Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/bluewater-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Bluewater Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/bluewater-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Bluewater PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/bluewater-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Bluewater Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/bromley-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Bromley Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/canterbury-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Canterbury PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/canterbury-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Canterbury Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/chatham-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Chatham Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/coldharbour-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Coldharbour Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/dartford-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Dartford Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/deal-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Deal Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/dover-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Dover Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/dover-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Dover PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/dover-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Dover Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/faversham-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Faversham Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/folkestone-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Folkestone PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/folkestone-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Folkestone Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/gillingham-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Gillingham Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/gravesend-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Gravesend Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/gravesend-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Gravesend Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/herne-bay-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Herne Bay Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/maidstone-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Maidstone PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/maidstone-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Maidstone Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/margate-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Margate PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/margate-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Margate Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/medway-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Medway PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/medway-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Medway Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/north-kent-gravesend-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    North Kent Gravesend PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/ramsgate-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Ramsgate Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/rochester-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Rochester Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/sandwich-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Sandwich Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/sevenoaks-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Sevenoaks PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/sevenoaks-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Sevenoaks Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/sittingbourne-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Sittingbourne Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/sittingbourne-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Sittingbourne PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/sittingbourne-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Sittingbourne Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/swanley-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Swanley Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/swanley-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Swanley PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/swanley-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Swanley Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/tonbridge-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Tonbridge PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/tonbridge-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Tonbridge Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/tunbridge-wells-police-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Tunbridge Wells Police Station
                  </Link>
                </li>
                <li>
                  <Link href="/tunbridge-wells-psa-station" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Tunbridge Wells PSA Station
                  </Link>
                </li>
                <li>
                  <Link href="/tunbridge-wells-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Tunbridge Wells Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/whitstable-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Whitstable Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-ashford" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Ashford
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-canterbury" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Canterbury
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-dartford" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Dartford
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-folkestone" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Folkestone
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-gravesend" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Gravesend
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-kent" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Kent
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-maidstone" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Maidstone
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-medway" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Medway
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-sevenoaks" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Sevenoaks
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-sittingbourne" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Sittingbourne
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-agent-tonbridge" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Agent Tonbridge
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-ashford" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Ashford
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-bluewater" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Bluewater
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-canterbury" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Canterbury
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-dartford" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Dartford
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-dover" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Dover
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-folkestone" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Folkestone
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-gravesend" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Gravesend
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-maidstone" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Maidstone
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-margate" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Margate
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-medway" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Medway
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-sevenoaks" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Sevenoaks
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-sittingbourne" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Sittingbourne
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-swanley" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Swanley
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-tonbridge" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Tonbridge
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-rep-tunbridge-wells" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Rep Tunbridge Wells
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Legal & Resources Column */}
          <div>
            <h3 className="font-bold mb-4 text-lg text-white">Legal & Resources</h3>
            <nav aria-label="Footer legal and resource links">
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about" className="text-slate-200 hover:text-white transition-colors font-medium text-sm">
                    About Qualified Duty Solicitor
                  </Link>
                </li>
                <li>
                  <Link href="/why-use-us" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Why Use Us
                  </Link>
                </li>
                <li>
                  <Link href="/what-we-do" className="text-slate-200 hover:text-white transition-colors text-sm">
                    What We Do
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privateclientfaq" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Private Client FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/can-we-help" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Can We Help
                  </Link>
                </li>
                <li>
                  <Link href="/canwehelp" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Can We Help (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/whatisapolicestationrep" className="text-slate-200 hover:text-white transition-colors text-sm">
                    What is a Police Station Rep (Alt)
                  </Link>
                </li>
                <li>
                  <Link href="/hours" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Hours
                  </Link>
                </li>
                <li>
                  <Link href="/extendedhours" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Extended Hours
                  </Link>
                </li>
                <li>
                  <Link href="/christmashours" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Christmas Hours
                  </Link>
                </li>
                <li>
                  <Link href="/guided-assistant" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Guided Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Join
                  </Link>
                </li>
                <li>
                  <Link href="/repcover" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Rep Cover
                  </Link>
                </li>
                <li>
                  <Link href="/arrestednow" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Arrested Now
                  </Link>
                </li>
                <li>
                  <Link href="/home" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Home
                  </Link>
                </li>
                <li className="pt-2 mt-2 border-t border-slate-700">
                  <h4 className="font-semibold mb-2 text-white text-xs">Legal & Compliance</h4>
                  <ul className="space-y-1.5">
                    <li>
                      <Link href="/terms-and-conditions" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Terms of Use
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Cookies Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/gdpr" className="text-slate-300 hover:text-white transition-colors text-xs">
                        GDPR
                      </Link>
                    </li>
                    <li>
                      <Link href="/accessibility" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Accessibility
                      </Link>
                    </li>
                    <li>
                      <Link href="/attendanceterms" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Agency Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/servicerates" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Service Rates
                      </Link>
                    </li>
                    <li>
                      <Link href="/complaints" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Complaints
                      </Link>
                    </li>
                    <li>
                      <Link href="/f-a-q" className="text-slate-300 hover:text-white transition-colors text-xs">
                        FAQ (Alt)
                      </Link>
                    </li>
                    <li>
                      <Link href="/g-d-p-r" className="text-slate-300 hover:text-white transition-colors text-xs">
                        GDPR (Alt)
                      </Link>
                    </li>
                    <li>
                      <Link href="/termsandconditions" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Terms (Alt)
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm">
          <p className="text-xs text-slate-400 mb-4">We act in relation to active police investigations and interviews. We do not provide general criminal law advice or hypothetical consultations.</p>
          <div className="footer-disclaimer-box mb-6 max-w-4xl mx-auto p-5 bg-white rounded-lg border border-slate-300 shadow-sm">
            <p className="leading-relaxed mb-3 font-semibold">
              Robert Cashman is a criminal defence solicitor. All legal services are provided through Tuckers Solicitors, which is authorised and regulated by the Solicitors Regulation Authority (SRA ID: 127795).
            </p>
            <p className="leading-relaxed text-sm">
              <span className="font-semibold">Accredited Court & Police Station Duty Solicitor:</span> Police Station Agent specialises in duty solicitor-led police station representation across Kent.
            </p>
          </div>
          <p className="mb-4 font-medium text-slate-300">
            Copyright {currentYear} by Defence Legal Services Limited T/A Police Station Agent. Company No. 09900871
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-slate-300">
            <Link href="/privacy" className="hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1 text-white">
              Web Privacy
            </Link>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">|</span>
            <Link href="/terms-and-conditions" className="hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1 text-white">
              Web Terms
            </Link>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">|</span>
            <Link href="/attendanceterms" className="hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1 text-white">
              Agency Terms
            </Link>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">|</span>
            <Link href="/servicerates" className="hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1 text-white">
              Agency Rates
            </Link>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">|</span>
            <Link href="/cookies" className="hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1 text-white">
              Cookies
            </Link>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">|</span>
            <Link href="/complaints" className="hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1 text-white">
              Complaints
            </Link>
            <span className="hidden md:inline text-slate-400" aria-hidden="true">|</span>
            <Link href="/admin" className="text-slate-300 hover:text-[#CBA135] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-1 flex items-center gap-1 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-3 h-3">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
              Admin
            </Link>
          </div>
          <p className="text-xs text-slate-300">
            Registered Office: Greenacre, London Road, West Kingsdown, Sevenoaks, Kent, TN15 6ER
          </p>
          {/* Production Version and Last Update - Discreet Display */}
          <div className="mt-4 text-center space-y-1">
            <div>
              <span className="text-xs text-slate-400" title={`Build version: ${appVersion}`}>
                Version: {appVersion}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400" title={`Last updated: ${lastUpdate}`}>
                Last updated: {lastUpdate}
              </span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700 flex flex-wrap justify-center gap-4 text-xs text-slate-300">
            <span>Partners:</span>
            <a href="https://policestationrepukdirectory.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              Find a Police Station Rep
            </a>
            <span>•</span>
            <a href="https://policestationrepuk.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              Police Station Rep UK
            </a>
            <span>•</span>
            <a href="https://policestationrepuk.com/StationsDirectory" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
              UK Custody Suites
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
