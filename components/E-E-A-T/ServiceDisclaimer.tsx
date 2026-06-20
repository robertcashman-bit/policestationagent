import React from "react";
import Link from "next/link";

interface ServiceDisclaimerProps {
  className?: string;
  whoNotFor?: string[];
}

/**
 * Service Disclaimer Component
 * 
 * Displays "Who This Service is NOT For" and general disclaimers
 * for transparency and E-E-A-T
 */
export function ServiceDisclaimer({
  className = "",
  whoNotFor = [],
}: ServiceDisclaimerProps) {
  const defaultNotFor = [
    "One-off court representation (we focus exclusively on police station work)",
  ];

  const notForList = whoNotFor.length > 0 ? whoNotFor : defaultNotFor;

  return (
    <div className={`bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-lg ${className}`}>
      <h3 className="text-lg font-bold text-slate-900 mb-3">Important Information</h3>
      <p className="text-slate-700 mb-4">
        <strong>Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).</strong> Robert Cashman is a qualified solicitor and accredited duty solicitor. This website provides general information only and does not constitute legal advice. While every care is taken to keep information accurate, errors may occur — please{" "}
        <Link href="/contact" className="text-blue-700 hover:underline font-medium">
          contact us
        </Link>{" "}
        to report a content error. You should seek specific legal advice for your situation.
      </p>
      {notForList.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold text-slate-900 mb-2">This service is not suitable for:</h4>
          <ul className="list-disc pl-6 space-y-1 text-slate-700">
            {notForList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
