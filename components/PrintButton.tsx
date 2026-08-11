"use client";

type Props = {
  className?: string;
  label?: string;
};

export default function PrintButton({
  className = "mt-6 rounded-lg bg-slate-800 text-white px-4 py-2 text-sm font-semibold",
  label = "Print this guide",
}: Props) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      {label}
    </button>
  );
}
