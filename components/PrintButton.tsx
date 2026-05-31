"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mt-6 rounded-lg bg-slate-800 text-white px-4 py-2 text-sm font-semibold"
    >
      Print this guide
    </button>
  );
}
