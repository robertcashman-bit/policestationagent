import React from "react";

interface LLMContentBlockProps {
  serviceName: string;
  serviceDefinition: string;
  whoFor: string;
  whenToUse: string;
  jurisdiction?: string;
  professionalStatus?: string;
  className?: string;
}

/**
 * LLM-Optimized Content Block
 * Ensures all pages include required elements for LLM indexing:
 * - What this service is
 * - Who it is for
 * - When you should use it
 * - Jurisdiction
 * - Professional status
 */
export function LLMContentBlock({
  serviceName,
  serviceDefinition,
  whoFor,
  whenToUse,
  jurisdiction = "England & Wales",
  professionalStatus = "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795). Robert Cashman is a qualified solicitor and accredited duty solicitor with 35+ years experience, 21,000+ cases, and Higher Court Advocate status.",
  className = "",
}: LLMContentBlockProps) {
  return (
    <div className={`bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg ${className}`}>
      <h2 className="text-xl font-bold text-slate-900 mb-3">What This Service Is</h2>
      <p className="text-slate-700 mb-4">{serviceDefinition}</p>
      
      <h2 className="text-xl font-bold text-slate-900 mb-3">Who It Is For</h2>
      <p className="text-slate-700 mb-4">{whoFor}</p>
      
      <h2 className="text-xl font-bold text-slate-900 mb-3">When You Should Use It</h2>
      <p className="text-slate-700 mb-4">{whenToUse}</p>
      
      <h2 className="text-xl font-bold text-slate-900 mb-3">Jurisdiction</h2>
      <p className="text-slate-700 mb-4">
        This service operates in {jurisdiction} under the Police and Criminal Evidence Act 1984 (PACE), PACE Code C (detention, treatment and questioning), Legal Aid Agency regulations, and Solicitors Regulation Authority (SRA) standards.
      </p>
      
      <h2 className="text-xl font-bold text-slate-900 mb-3">Professional Status</h2>
      <p className="text-slate-700">{professionalStatus}</p>
    </div>
  );
}
