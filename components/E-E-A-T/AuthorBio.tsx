import React from "react";

interface AuthorBioProps {
  className?: string;
  showFull?: boolean;
}

/**
 * E-E-A-T Author Bio Component
 * 
 * Displays Robert Cashman's credentials and experience
 * for trust and authority signals
 */
export function AuthorBio({ className = "", showFull = true }: AuthorBioProps) {
  const shortVersion = (
    <p className="text-slate-700">
      <strong>Robert Cashman</strong> is a qualified solicitor and accredited duty solicitor with 35+ years experience in police station representation. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).
    </p>
  );

  const fullVersion = (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
      <h3 className="text-lg font-bold text-slate-900 mb-3">About Robert Cashman</h3>
      <p className="text-slate-700 mb-3">
        <strong>Robert Cashman</strong> is a qualified solicitor and accredited duty solicitor with 35+ years experience in police station representation. He has handled over 21,000 cases and is a Higher Court Advocate qualified to practice in the Crown Court.
      </p>
      <p className="text-slate-700 mb-3">
        Legal services are provided by <strong>Tuckers Solicitors LLP (SRA ID: 127795)</strong>. Robert Cashman is regulated by the Solicitors Regulation Authority (SRA) and operates under SRA standards and the Legal Aid Agency regulations.
      </p>
      <p className="text-slate-700">
        This service operates in <strong>England & Wales</strong> under the Police and Criminal Evidence Act 1984 (PACE), PACE Code C (detention, treatment and questioning), and Legal Aid Agency regulations.
      </p>
    </div>
  );

  return (
    <div className={className}>
      {showFull ? fullVersion : shortVersion}
    </div>
  );
}
