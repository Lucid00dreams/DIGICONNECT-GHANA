import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: "#2196D3",
            light: "#E3F2FD",
            dark: "#1565A8",
          },
          red: {
            DEFAULT: "#E02629",
            light: "#FFEBEE",
          },
          yellow: {
            DEFAULT: "#FFD600",
            light: "#FFFDE7",
          },
          green: {
            DEFAULT: "#006B3F",
            light: "#E8F5E9",
          },
          gold: {
            DEFAULT: "#F59E0B",
            light: "#FEF3C7",
            dark: "#D97706",
          },
          dark: "#1E1E1E",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        digihub: [
          "'Plus Jakarta Sans'",
          "Outfit",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.6s ease-out both",
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in-down": "fadeInDown 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "slide-in-right": "slideInRight 0.45s cubic-bezier(0.16,1,0.3,1) both",
        "slide-in-left": "slideInLeft 0.45s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in": "scaleIn 0.35s cubic-bezier(0.16,1,0.3,1) both",
        "bounce-subtle": "bounceSubtle 0.5s ease both",
        "shimmer": "shimmer 2s linear infinite",
        "progress-fill": "progressFill 1s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-ring": "pulseRing 1.5s ease-out infinite",
        counter: "counterGrow 0.4s ease-out both",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        bounceSubtle: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        progressFill: {
          from: { width: "0%" },
          to: { width: "var(--progress-width, 100%)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        counterGrow: {
          from: { transform: "scale(0.8)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
