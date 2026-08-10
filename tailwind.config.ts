import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        "card-foreground": "var(--card-foreground)",
        navy: {
          DEFAULT: "var(--navy)",
          hover: "var(--navy-hover)",
        },
        primary: {
          DEFAULT: "#0B3C5D",
          50: "#e8f2f8",
          100: "#c5dce8",
          200: "#9ec4d6",
          300: "#6fa3bc",
          400: "#3d7a9a",
          500: "#1e5a7a",
          600: "#0B3C5D",
          700: "#092f49",
          800: "#072536",
          900: "#051a28",
        },
        secondary: {
          DEFAULT: "#059669",
          50: "#ecfdf5",
          100: "#d1fae5",
          600: "#059669",
          700: "#047857",
          hover: "#047857",
        },
        accent: {
          DEFAULT: "#f59e0b",
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          hover: "#d97706",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#fdf9e8",
          100: "#f9edc4",
          400: "#e4c04a",
          500: "#D4AF37",
          600: "#b8922d",
          700: "#9a7a24",
          hover: "#c9a132",
        },
        sidebar: {
          bg: "var(--sidebar-bg)",
          text: "var(--sidebar-text)",
          active: "var(--sidebar-active)",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 10px 30px -5px rgb(0 0 0 / 0.12), 0 4px 10px -5px rgb(0 0 0 / 0.08)',
        'elevated': '0 20px 40px -10px rgb(0 0 0 / 0.15)',
        'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'gold': '0 0 0 3px rgba(201, 168, 76, 0.25)',
        'gold-glow': '0 8px 32px -4px rgba(212, 175, 55, 0.45)',
        'navy-glow': '0 8px 32px -4px rgba(11, 60, 93, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
