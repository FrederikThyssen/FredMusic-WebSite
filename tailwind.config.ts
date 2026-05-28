import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0A0A0D",
          900: "#111317",
          800: "#1D1F23",
        },
        gold: {
          200: "#EAD9B0",
          300: "#D4AF37",
          400: "#B8893C",
          500: "#C89F5A",
        },
        ivory: "#EDEDED",
        warm: {
          50: "#FFFFFF",
          100: "#F8F6F3",
          200: "#F1E9DE",
          300: "#E6D5B8",
          400: "#D4B98C",
          500: "#C89F5A",
          700: "#8A7A63",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "Cambria", "serif"],
        wedding: ["Crimson Pro", "Georgia", "Cambria", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 80px rgba(212, 175, 55, 0.16)",
      },
    },
  },
  plugins: [],
} satisfies Config;
