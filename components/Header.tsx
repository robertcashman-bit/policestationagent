'use client';

import Link from 'next/link';
import { useState } from 'react';

const PHONE_NUMBER = '01732247427';
const PHONE_DISPLAY = '01732 247427';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link 
              href="/voluntary-police-interview" 
              className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50"
            >
              Police Interviews
            </Link>
            
            <Link 
              href="/arrested-at-police-station" 
              className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50"
            >
              If Someone Is Arrested
            </Link>
            
            <Link 
              href="/about" 
              className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50"
            >
              About
            </Link>
            
            <Link 
              href="/blog" 
              className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors rounded-md hover:bg-slate-50"
            >
              Blog
            </Link>
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
            <Link 
              href="/voluntary-police-interview" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Police Interviews
            </Link>
            
            <Link 
              href="/arrested-at-police-station" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              If Someone Is Arrested
            </Link>
            
            <Link 
              href="/about" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              href="/blog" 
              className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
