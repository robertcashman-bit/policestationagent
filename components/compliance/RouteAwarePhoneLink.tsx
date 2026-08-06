"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE_DISPLAY, PHONE_TEL, SOLICITOR_TEL_ARIA } from "@/config/contact";
import { isPhoneAllowlistPath } from "@/config/enquiry-paths";
import { PATH_CONTACT } from "@/config/enquiry-paths";

type Props = {
  variant: "header-strip" | "header-button" | "footer" | "sticky";
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
  /** When true, never publish tel digits. */
  forceHideDigits?: boolean;
};

/**
 * Hide firm telephone digits by default.
 * Show only on allowlisted professional paths (unless forceHideDigits).
 */
export default function RouteAwarePhoneLink({
  variant,
  className,
  ariaLabel,
  children,
  forceHideDigits = false,
}: Props) {
  const pathname = usePathname();
  const allowPhone = !forceHideDigits && isPhoneAllowlistPath(pathname);
  const safeAria =
    ariaLabel && !/01732|07535|247427|494446/i.test(ariaLabel) ? ariaLabel : undefined;
  const telAria = ariaLabel || SOLICITOR_TEL_ARIA;

  if (!allowPhone) {
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
          Instruct solicitor (Contact)
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
          Get a solicitor
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
        <span className="sm:hidden">Get help</span>
        <span className="hidden sm:inline font-black">Get a solicitor</span>
      </Link>
    );
  }

  if (children) {
    return (
      <a href={`tel:${PHONE_TEL}`} className={className} aria-label={telAria}>
        {children}
      </a>
    );
  }

  if (variant === "sticky") {
    return (
      <a
        href={`tel:${PHONE_TEL}`}
        data-event="call_click"
        className={
          className ||
          "flex flex-col items-center justify-center gap-0.5 py-2.5 text-red-700"
        }
        aria-label={telAria}
      >
        <span className="text-[11px] font-bold uppercase tracking-wide">Agency line</span>
        <span className="text-sm font-black leading-none">{PHONE_DISPLAY}</span>
      </a>
    );
  }

  if (variant === "footer") {
    return (
      <a
        href={`tel:${PHONE_TEL}`}
        className={
          className ||
          "flex items-center gap-1.5 text-white hover:text-blue-300 font-medium"
        }
        title="Solicitor and law-firm instructions only"
        aria-label={telAria}
      >
        Agency line {PHONE_DISPLAY}
      </a>
    );
  }

  if (variant === "header-strip") {
    return (
      <a
        href={`tel:${PHONE_TEL}`}
        className={
          className ||
          "inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap"
        }
        title="Solicitor and law-firm instructions only"
        aria-label={telAria}
      >
        Agency: {PHONE_DISPLAY}
      </a>
    );
  }

  return (
    <a href={`tel:${PHONE_TEL}`} className={className} aria-label={telAria}>
      <span className="hidden sm:inline">Agency line</span>
      <span className="hidden sm:inline font-black">{PHONE_DISPLAY}</span>
      <span className="sm:hidden">Call</span>
    </a>
  );
}
