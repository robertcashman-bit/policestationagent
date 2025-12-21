'use client';

import Link from 'next/link';
import { useState } from 'react';

const PHONE_NUMBER = '01732247427';
const PHONE_DISPLAY = '01732 247427';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="bg-white shadow-md border-b border-slate-200/60 relative z-50">
      {/* Top Strip */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-center sm:text-left">
              Free legal advice at police stations – England & Wales
            </div>
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="text-amber-400 hover:text-amber-300 font-semibold whitespace-nowrap"
            >
              Call Now: {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 max-w-[calc(100%-8rem)] sm:max-w-none">
            <Link 
              href="/" 
              className="block hover:text-blue-600 transition-colors group"
              aria-label="Police Station Agent home page"
            >
              <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">Police Station Agent</div>
              <div className="text-[10px] sm:text-xs font-normal text-slate-600 leading-tight mt-0.5 block">Police Station Legal Advice & Representation</div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 flex-nowrap" role="navigation" aria-label="Main navigation">
            {/* Police Station Legal Advice Dropdown */}
            <div 
              className="relative group flex-shrink-0"
              onMouseLeave={closeDropdowns}
            >
              <button
                className={`px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium transition-all rounded-md hover:bg-slate-50 flex items-center gap-1 whitespace-nowrap ${
                  openDropdown === 'advice' ? 'text-blue-700 bg-slate-50' : ''
                }`}
                onClick={() => handleDropdownToggle('advice')}
                aria-expanded={openDropdown === 'advice'}
                aria-haspopup="true"
              >
                Legal Advice
                <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'advice' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'advice' && (
                <div 
                  className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-slate-200/80 py-1.5 z-50"
                  role="region"
                  aria-label="Police Station Legal Advice submenu"
                >
                  <ul>
                    <li>
                      <Link 
                        href="/what-is-a-police-station-rep" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Police Station Representation
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/what-is-a-criminal-solicitor" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Duty Solicitor at the Police Station
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/article-interview-under-caution" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Interview Under Caution
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/what-to-expect-at-a-police-interview-in-kent" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        What Happens at the Police Station
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Police Interviews Dropdown */}
            <div 
              className="relative group flex-shrink-0"
              onMouseLeave={closeDropdowns}
            >
              <button
                className={`px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium transition-all rounded-md hover:bg-slate-50 flex items-center gap-1 whitespace-nowrap ${
                  openDropdown === 'voluntary' ? 'text-blue-700 bg-slate-50' : ''
                }`}
                onClick={() => handleDropdownToggle('voluntary')}
                aria-expanded={openDropdown === 'voluntary'}
                aria-haspopup="true"
              >
                Interviews
                <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'voluntary' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'voluntary' && (
                <div 
                  className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-slate-200/80 py-1.5 z-50"
                  role="region"
                  aria-label="Police Interviews submenu"
                >
                  <ul>
                    <li>
                      <Link 
                        href="/voluntary-police-interview" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Voluntary Police Interviews
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/article-interview-under-caution" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Interviews Under Caution Explained
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/article-police-caution-before-interview" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Legal Advice Before Police Interview
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/after-a-police-interview" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        What Happens After a Police Interview
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Arrest & Police Custody Dropdown */}
            <div 
              className="relative group flex-shrink-0"
              onMouseLeave={closeDropdowns}
            >
              <button
                className={`px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium transition-all rounded-md hover:bg-slate-50 flex items-center gap-1 whitespace-nowrap ${
                  openDropdown === 'arrested' ? 'text-blue-700 bg-slate-50' : ''
                }`}
                onClick={() => handleDropdownToggle('arrested')}
                aria-expanded={openDropdown === 'arrested'}
                aria-haspopup="true"
              >
                Custody
                <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'arrested' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'arrested' && (
                <div 
                  className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-slate-200/80 py-1.5 z-50"
                  role="region"
                  aria-label="Arrest & Police Custody submenu"
                >
                  <ul>
                    <li>
                      <Link 
                        href="/arrested-at-police-station" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Arrested at a Police Station
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/your-rights-in-custody" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Rights in Police Custody
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/police-bail-explained" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Police Bail Explained
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/released-under-investigation" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Release Under Investigation (RUI)
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Your Legal Rights Dropdown */}
            <div 
              className="relative group flex-shrink-0"
              onMouseLeave={closeDropdowns}
            >
              <button
                className={`px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium transition-all rounded-md hover:bg-slate-50 flex items-center gap-1 whitespace-nowrap ${
                  openDropdown === 'rights' ? 'text-blue-700 bg-slate-50' : ''
                }`}
                onClick={() => handleDropdownToggle('rights')}
                aria-expanded={openDropdown === 'rights'}
                aria-haspopup="true"
              >
                Rights
                <svg className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'rights' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'rights' && (
                <div 
                  className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-lg shadow-xl border border-slate-200/80 py-1.5 z-50"
                >
                  <ul role="menu">
                    <li>
                      <Link 
                        href="/what-is-a-criminal-solicitor" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Right to a Solicitor
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/freelegaladvice" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Free Legal Advice Explained
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/article-rights-kent-police-station-2025" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        Your Rights at the Police Station
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/after-a-police-interview" 
                        className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                        onClick={closeDropdowns}
                      >
                        What Happens After Police Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Blog */}
            <Link 
              href="/blog" 
              className="px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium transition-all rounded-md hover:bg-slate-50 whitespace-nowrap"
            >
              Blog
            </Link>

            {/* About */}
            <Link 
              href="/about" 
              className="px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium transition-all rounded-md hover:bg-slate-50 whitespace-nowrap"
            >
              About
            </Link>

            {/* Contact */}
            <Link 
              href="/contact" 
              className="px-3 py-2 text-sm text-slate-700 hover:text-blue-700 font-medium transition-all rounded-md hover:bg-slate-50 whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>
          
          {/* Desktop Call Now Button */}
          <div className="hidden lg:flex items-center ml-2">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 rounded-lg px-6 bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md hover:shadow-lg hover:scale-105"
              aria-label="Call now for legal advice"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Now
            </a>
          </div>
          
          {/* Mobile: Call Now Button + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-bold min-h-[44px] h-11 px-4 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md"
              aria-label="Call now for legal advice"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="hidden sm:inline">Call Now</span>
            </a>
            <button
              className="flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow-md transition-colors"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileMenuOpen) {
                  closeDropdowns();
                }
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white relative z-50 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
            {/* Police Station Legal Advice */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-advice')}
              >
                Police Station Legal Advice
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-advice' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/what-is-a-police-station-rep" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Police Station Representation
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/what-is-a-criminal-solicitor" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Duty Solicitor at the Police Station
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/article-interview-under-caution" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Interview Under Caution
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/what-to-expect-at-a-police-interview-in-kent" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      What Happens at the Police Station
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Police Interviews */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-voluntary')}
              >
                Police Interviews
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-voluntary' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/voluntary-police-interview" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Voluntary Police Interviews
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/article-interview-under-caution" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Interviews Under Caution Explained
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/article-police-caution-before-interview" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Legal Advice Before Police Interview
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/after-a-police-interview" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      What Happens After a Police Interview
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Arrest & Police Custody */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-arrested')}
              >
                Arrest & Police Custody
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-arrested' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/arrested-at-police-station" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Arrested at a Police Station
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/your-rights-in-custody" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Rights in Police Custody
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/police-bail-explained" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Police Bail Explained
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/released-under-investigation" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Release Under Investigation (RUI)
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Your Legal Rights */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-rights')}
              >
                Your Legal Rights
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-rights' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/what-is-a-criminal-solicitor" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Right to a Solicitor
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/freelegaladvice" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Free Legal Advice Explained
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/article-rights-kent-police-station-2025" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Your Rights at the Police Station
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/after-a-police-interview" 
                      className="block px-4 min-h-[44px] flex items-center text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      What Happens After Police Contact
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Blog */}
            <Link 
              href="/blog" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            {/* About */}
            <Link 
              href="/about" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* Contact */}
            <Link 
              href="/contact" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
