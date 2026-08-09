/**
 * Premium legal typography — Source Sans 3 (UI/body) + Source Serif 4 (display).
 */
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  adjustFontFallback: true,
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
  weight: ["400", "600", "700"],
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
});

/** @deprecated Prefer sourceSans — kept for any residual imports */
export const inter = sourceSans;
