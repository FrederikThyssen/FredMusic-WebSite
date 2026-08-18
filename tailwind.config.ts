import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#08090B",
          900: "#111214",
          800: "#1B1C20",
        },
        gold: {
          200: "#F6E6BA",
          300: "#D8B46E",
          400: "#C49A4A",
          500: "#A97832",
          // Darker than 500: keeps AA text contrast (>=4.5:1) on warm-50/100/white backgrounds
          700: "#765326",
        },
        ivory: "#F1EEE7",
        warm: {
          50: "#FFFDF8",
          100: "#F7F1E8",
          200: "#ECE0CE",
          300: "#D9C39C",
          400: "#C6A46B",
          500: "#A77D3E",
          700: "#6F5B3E",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "Cambria", "serif"],
        wedding: ["Crimson Pro", "Georgia", "Cambria", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 70px rgba(199, 161, 91, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
