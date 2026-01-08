/**
 * Font optimization using next/font
 * Replaces blocking Google Fonts import
 */
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents invisible text during font load
  variable: "--font-inter",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ], // Immediate fallback
  adjustFontFallback: true, // Better font metrics
});
