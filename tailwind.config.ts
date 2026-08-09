import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: "var(--cream)",
        paper: "var(--paper)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          mid: "var(--primary-mid)",
          light: "var(--primary-light)",
          soft: "var(--primary-soft)",
        },
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-dark)",
          light: "var(--accent-light)",
          muted: "var(--accent-muted)",
        },
        "accent-foreground": "var(--accent-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        input: "var(--input)",
        ring: "var(--ring)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["2.75rem", { lineHeight: "1.12", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      maxWidth: {
        measure: "var(--measure)",
        "measure-wide": "var(--measure-wide)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accent-draw": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out both",
        "accent-draw": "accent-draw 0.6s ease-out both",
      },
    },
  },
  plugins: [],
  important: true, // Ensure Tailwind styles override any conflicting styles
};
export default config;
