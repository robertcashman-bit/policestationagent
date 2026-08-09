import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children: ReactNode;
  /** Public default: hide sitewide firm phone in chrome. */
  forceHidePhone?: boolean;
  className?: string;
  mainClassName?: string;
  /** Extra bottom padding for mobile sticky contact bar. */
  withMobilePad?: boolean;
  beforeHeader?: ReactNode;
  afterFooter?: ReactNode;
};

/**
 * Shared public page chrome: navy/gold page background + Header/Footer.
 * Prefer this over duplicating `min-h-screen bg-gradient-to-br from-slate-50 to-blue-50`.
 */
export default function PageShell({
  children,
  forceHidePhone = true,
  className = "",
  mainClassName = "",
  withMobilePad = false,
  beforeHeader,
  afterFooter,
}: Props) {
  return (
    <div
      className={`page-shell min-h-screen bg-background text-foreground flex flex-col ${
        withMobilePad ? "pb-16 lg:pb-0" : ""
      } ${className}`}
    >
      {beforeHeader}
      <Header forceHidePhone={forceHidePhone} />
      <main
        className={`flex-grow relative ${mainClassName}`}
        id="main-content"
        role="main"
      >
        {children}
      </main>
      <Footer forceHidePhone={forceHidePhone} />
      {afterFooter}
    </div>
  );
}
