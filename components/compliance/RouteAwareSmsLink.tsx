"use client";

import Link from "next/link";

type Props = {
  className?: string;
  /** Kept for API compatibility — digits are never published. */
  forceHideDigits?: boolean;
  body?: string;
  children?: React.ReactNode;
  variant?: "footer" | "sticky" | "inline";
};

/**
 * Never publish firm SMS digits. Always route to Contact pathways.
 */
export default function RouteAwareSmsLink({
  className,
  forceHideDigits: _forceHideDigits = false,
  body: _body,
  children,
  variant = "inline",
}: Props) {
  void _forceHideDigits;
  void _body;

  if (variant === "sticky") {
    return (
      <Link
        href="/contact"
        data-event="contact_click"
        className={
          className ||
          "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[#2563eb]"
        }
        aria-label="Contact pathways — request representation"
      >
        <span className="text-[11px] font-bold uppercase tracking-wide">Path</span>
        <span className="text-sm font-black leading-none">Contact</span>
      </Link>
    );
  }

  return (
    <Link
      href="/contact"
      data-event="contact_click"
      className={
        className ||
        (variant === "footer"
          ? "text-sky-300 hover:text-sky-200 font-medium"
          : "inline-flex items-center font-medium")
      }
      aria-label="Contact pathways — request representation"
    >
      {children || "Contact pathways"}
    </Link>
  );
}
