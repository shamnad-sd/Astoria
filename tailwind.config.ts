import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        surface: {
          DEFAULT: "#111111",
          elevated: "#161616",
          glass: "rgba(17, 17, 17, 0.75)",
        },
        primary: {
          DEFAULT: "#FFFFFF",
          muted: "#E2E2E2",
        },
        accent: {
          DEFAULT: "#D4AF37", // Metallic Champagne / Gold
          glow: "#F3E08B",
          dark: "#AA8822",
        },
        muted: {
          DEFAULT: "#A3A3A3",
          dark: "#666666",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "serif"],
        sans: ["var(--font-sans)", "Inter", "Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3E08B 0%, #D4AF37 50%, #997A15 100%)",
        "radial-dark": "radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, rgba(9, 9, 9, 0) 70%)",
        "glass-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
