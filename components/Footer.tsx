import Link from 'next/link';
import { getFormattedVersion, getLastUpdateDateTime } from '@/lib/version';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appVersion = getFormattedVersion();
  const lastUpdate = getLastUpdateDateTime();
  
  return (
    <footer className="bg-slate-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 text-sm">
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
                  <Link href="/what-is-a-police-station-rep" className="text-slate-200 hover:text-white transition-colors text-sm">
                    What is a Police Station Rep?
                  </Link>
                </li>
                <li>
                  <Link href="/what-is-a-criminal-solicitor" className="text-slate-200 hover:text-white transition-colors text-sm">
                    What is a Criminal Solicitor?
                  </Link>
                </li>
                <li>
                  <Link href="/police-station-interviews-kent-rights" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Police Station Interview Rights
                  </Link>
                </li>
                <li>
                  <Link href="/your-rights-in-custody" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Your Rights in Custody
                  </Link>
                </li>
                <li>
                  <Link href="/after-a-police-interview" className="text-slate-200 hover:text-white transition-colors text-sm">
                    After a Police Interview
                  </Link>
                </li>
                <li>
                  <Link href="/voluntary-police-interview-risks" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Voluntary Interview Risks
                  </Link>
                </li>
                <li>
                  <Link href="/arrestednow" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Emergency Help - Family Member Arrested
                  </Link>
                </li>
                <li>
                  <Link href="/freelegaladvice" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Is Police Station Advice Free?
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-200 hover:text-white transition-colors text-sm">
                    Legal Advice Blog
                  </Link>
                </li>
                <li className="pt-2 mt-2 border-t border-slate-700">
                  <h4 className="font-semibold mb-2 text-white text-xs">Legal Guides</h4>
                  <ul className="space-y-1.5">
                    <li>
                      <Link href="/pace-code-c" className="text-slate-300 hover:text-white transition-colors text-xs">
                        PACE Code C (Custody & Interview Rules)
                      </Link>
                    </li>
                    <li>
                      <Link href="/custody-time-limits" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Custody Time Limits
                      </Link>
                    </li>
                    <li>
                      <Link href="/no-comment-interview" className="text-slate-300 hover:text-white transition-colors text-xs">
                        No Comment Interview
                      </Link>
                    </li>
                    <li>
                      <Link href="/prepared-statements" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Prepared Statements
                      </Link>
                    </li>
                    <li>
                      <Link href="/adverse-inference" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Adverse Inferences
                      </Link>
                    </li>
                    <li>
                      <Link href="/released-under-investigation" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Released Under Investigation (RUI)
                      </Link>
                    </li>
                    <li>
                      <Link href="/police-bail-explained" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Police Bail Explained
                      </Link>
                    </li>
                    <li>
                      <Link href="/appropriate-adult" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Appropriate Adult
                      </Link>
                    </li>
                    <li>
                      <Link href="/youth-custody-rights" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Youth Custody Rights
                      </Link>
                    </li>
                    <li>
                      <Link href="/can-police-take-my-phone" className="text-slate-300 hover:text-white transition-colors text-xs">
                        Can Police Take My Phone?
                      </Link>
                    </li>
                    <li>
                      <Link href="/dna-fingerprints-police-station" className="text-slate-300 hover:text-white transition-colors text-xs">
                        DNA & Fingerprints
                      </Link>
                    </li>
                  </ul>
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
                  <Link href="/locations" className="text-slate-200 hover:text-white transition-colors font-medium text-sm">
                    Locations Hub (All Towns & Pages)
                  </Link>
                </li>
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
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm">
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
