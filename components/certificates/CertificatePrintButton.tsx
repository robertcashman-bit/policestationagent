'use client';

export function CertificatePrintButton() {
  return (
    <div className="print:hidden text-center">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Print / save as PDF
      </button>
    </div>
  );
}
