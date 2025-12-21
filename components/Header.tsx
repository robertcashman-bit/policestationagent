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
    <header className="bg-white shadow-sm border-b relative z-50">
      {/* Top Strip */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-center sm:text-left">
              Free legal advice at police station interviews – England & Wales
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
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors"
              aria-label="Police Station Agent home page"
            >
              Police Station Agent
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {/* Police Interviews Dropdown */}
            <div className="relative group">
              <button
                className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50 flex items-center gap-1"
                onClick={() => handleDropdownToggle('interviews')}
                aria-expanded={openDropdown === 'interviews'}
                aria-haspopup="true"
              >
                Police Interviews
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'interviews' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50"
                  onMouseLeave={closeDropdowns}
                >
                  <ul role="menu">
                    <li>
                      <Link 
                        href="/voluntary-police-interview" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Voluntary Police Interviews
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/article-interview-under-caution" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Interview Under Caution Explained
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/article-police-caution-before-interview" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Legal Advice Before Interview
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/after-a-police-interview" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        What Happens After a Police Interview
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Arrest & Custody Dropdown */}
            <div className="relative group">
              <button
                className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50 flex items-center gap-1"
                onClick={() => handleDropdownToggle('arrest')}
                aria-expanded={openDropdown === 'arrest'}
                aria-haspopup="true"
              >
                Arrest & Custody
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'arrest' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50"
                  onMouseLeave={closeDropdowns}
                >
                  <ul role="menu">
                    <li>
                      <Link 
                        href="/arrested-at-police-station" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Arrested at a Police Station
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/what-is-a-criminal-solicitor" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Duty Solicitor Advice
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/your-rights-in-custody" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Rights in Police Custody
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/police-bail-explained" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Police Bail Explained
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Process & Rights Dropdown */}
            <div className="relative group">
              <button
                className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50 flex items-center gap-1"
                onClick={() => handleDropdownToggle('process')}
                aria-expanded={openDropdown === 'process'}
                aria-haspopup="true"
              >
                Process & Rights
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'process' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50"
                  onMouseLeave={closeDropdowns}
                >
                  <ul role="menu">
                    <li>
                      <Link 
                        href="/what-is-a-police-station-rep" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        What Is Police Station Representation
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/freelegaladvice" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Free Legal Advice Explained
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/article-rights-kent-police-station-2025" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Your Rights at the Police Station
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/after-a-police-interview" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        What Happens After Police Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* About */}
            <Link 
              href="/about" 
              className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50"
            >
              About
            </Link>

            {/* Articles Dropdown */}
            <div className="relative group">
              <button
                className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50 flex items-center gap-1"
                onClick={() => handleDropdownToggle('articles')}
                aria-expanded={openDropdown === 'articles'}
                aria-haspopup="true"
              >
                Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'articles' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50"
                  onMouseLeave={closeDropdowns}
                >
                  <ul role="menu">
                    <li>
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Latest Articles
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Browse by Topic
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Voluntary Interviews
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Arrest & Custody
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        Your Rights
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog" 
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors font-semibold border-t border-slate-200 mt-1 pt-2"
                        role="menuitem"
                        onClick={closeDropdowns}
                      >
                        View All Articles
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
          
          {/* Desktop Call Now Button */}
          <div className="hidden lg:flex items-center">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 rounded-md px-8 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold shadow-lg"
              aria-label="Call now for legal advice"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Now
            </a>
          </div>
          
          {/* Mobile: Call Now Button + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-bold h-10 px-4 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md"
              aria-label="Call now for legal advice"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="hidden sm:inline">Call Now</span>
            </a>
            <button
              className="flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            {/* Police Interviews */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-interviews')}
              >
                Police Interviews
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-interviews' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/voluntary-police-interview" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Voluntary Police Interviews
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/article-interview-under-caution" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Interview Under Caution Explained
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/article-police-caution-before-interview" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Legal Advice Before Interview
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/after-a-police-interview" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      What Happens After a Police Interview
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Arrest & Custody */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-arrest')}
              >
                Arrest & Custody
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-arrest' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/arrested-at-police-station" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Arrested at a Police Station
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/what-is-a-criminal-solicitor" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Duty Solicitor Advice
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/your-rights-in-custody" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Rights in Police Custody
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/police-bail-explained" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Police Bail Explained
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Process & Rights */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-process')}
              >
                Process & Rights
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-process' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/what-is-a-police-station-rep" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      What Is Police Station Representation
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/freelegaladvice" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Free Legal Advice Explained
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/article-rights-kent-police-station-2025" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Your Rights at the Police Station
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/after-a-police-interview" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      What Happens After Police Contact
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* About */}
            <Link 
              href="/about" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {/* Articles */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
                onClick={() => handleDropdownToggle('mobile-articles')}
              >
                Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'mobile-articles' && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Latest Articles
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Browse by Topic
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Voluntary Interviews
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Arrest & Custody
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      Your Rights
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md font-semibold"
                      onClick={() => { setMobileMenuOpen(false); closeDropdowns(); }}
                    >
                      View All Articles
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
