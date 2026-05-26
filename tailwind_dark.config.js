// tailwind.config.js  — add darkMode: "class"
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  // ← THIS LINE enables .dark class strategy
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Syne", "Bricolage Grotesque", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.07)",
        "card-lg": "0 16px 48px rgba(99,102,241,0.14)",
        glow: "0 0 32px rgba(99,102,241,0.4)",
      },
      animation: {
        "fade-up": "fadeUp 0.65s cubic-bezier(0.34,1.2,0.64,1) forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        bounceSlow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
