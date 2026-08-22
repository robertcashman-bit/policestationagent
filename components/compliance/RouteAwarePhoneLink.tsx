"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { PATH_CONTACT } from "@/config/enquiry-paths";

type Props = {
  variant: "header-strip" | "header-button" | "footer" | "sticky";
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
  /** Kept for API compatibility — digits are never published. */
  forceHideDigits?: boolean;
};

/**
 * Never publish firm telephone digits in site chrome.
 * Always route to Contact pathways / forms.
 */
export default function RouteAwarePhoneLink({
  variant,
  className,
  ariaLabel,
  children,
  forceHideDigits: _forceHideDigits = false,
}: Props) {
  void _forceHideDigits;
  const safeAria =
    ariaLabel && !/01732|07535|247427|494446/i.test(ariaLabel)
      ? ariaLabel
      : undefined;

  if (variant === "sticky") {
    return (
      <Link
        href={PATH_CONTACT}
        data-event="contact_click"
        className={
          className ||
          "flex flex-col items-center justify-center gap-0.5 py-2.5 text-slate-800"
        }
        aria-label={safeAria || "Choose how to instruct a solicitor"}
      >
        <span className="text-[11px] font-bold uppercase tracking-wide">Instruct</span>
        <span className="text-sm font-black leading-none">Solicitor</span>
      </Link>
    );
  }

  if (variant === "footer") {
    return (
      <Link
        href={PATH_CONTACT}
        className={
          className ||
          "flex items-center gap-1.5 text-white hover:text-blue-300 font-medium"
        }
        title="Choose the right enquiry pathway"
      >
        {children || "Instruct solicitor (Contact)"}
      </Link>
    );
  }

  if (variant === "header-strip") {
    return (
      <Link
        href={PATH_CONTACT}
        className={
          className ||
          "inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap"
        }
        title="Get a solicitor — choose your pathway"
      >
        {children || "Get a solicitor"}
      </Link>
    );
  }

  return (
    <Link
      href={PATH_CONTACT}
      className={
        className ||
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-extrabold min-h-[44px] h-11 px-3 sm:px-4 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md"
      }
      aria-label={safeAria || "Get a solicitor — Contact page"}
    >
      {children || (
        <>
          <span className="sm:hidden">Get help</span>
          <span className="hidden sm:inline font-black">Get a solicitor</span>
        </>
      )}
    </Link>
  );
}
