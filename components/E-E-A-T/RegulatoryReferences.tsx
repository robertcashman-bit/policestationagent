import React from "react";

interface RegulatoryReferencesProps {
  className?: string;
}

/**
 * Regulatory References Component
 * 
 * Displays regulatory framework and compliance information
 * for E-E-A-T signals
 */
export function RegulatoryReferences({ className = "" }: RegulatoryReferencesProps) {
  return (
    <div className={`bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg ${className}`}>
      <h3 className="text-lg font-bold text-slate-900 mb-3">Regulatory Framework</h3>
      <p className="text-slate-700 mb-3">
        This service operates under:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-700">
        <li>
          <strong>Police and Criminal Evidence Act 1984 (PACE)</strong> - Primary legislation governing police powers and procedures
        </li>
        <li>
          <strong>PACE Code C</strong> - Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers
        </li>
        <li>
          <strong>Legal Aid Agency regulations</strong> - Framework for free legal advice at police stations
        </li>
        <li>
          <strong>Solicitors Regulation Authority (SRA) standards</strong> - Professional conduct and quality standards
        </li>
        <li>
          <strong>Jurisdiction:</strong> England & Wales
        </li>
      </ul>
      <p className="text-slate-700 mt-4 text-sm">
        Legal services are provided by <strong>Tuckers Solicitors LLP (SRA ID: 127795)</strong>. Robert Cashman is a qualified solicitor and accredited duty solicitor regulated by the SRA.
      </p>
    </div>
  );
}
