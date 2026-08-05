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
          elevated: "#181515",
          glass: "rgba(17, 17, 17, 0.75)",
          espresso: "#5C4B4B",
        },
        primary: {
          DEFAULT: "#FFFFFF",
          muted: "#E2E2E2",
          beige: "#B7A99A",
        },
        secondary: {
          DEFAULT: "#5C4B4B", // Espresso Brown
          light: "#786565",
          dark: "#3D3131",
        },
        accent: {
          DEFAULT: "#B7A99A", // Warm Stone Beige
          glow: "#E6DDD4",
          dark: "#8E7E6E",
        },
        muted: {
          DEFAULT: "#A3A3A3",
          dark: "#666666",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Cormorant Garamond", "serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Roboto", "system-ui", "sans-serif"],
        bohemy: ["var(--font-bohemy)", "Cormorant Garamond", "serif"],
        "bohemy-script": ["var(--font-bohemy-script)", "Cormorant Garamond", "cursive"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E6DDD4 0%, #B7A99A 50%, #8E7E6E 100%)",
        "beige-gradient": "linear-gradient(135deg, #E6DDD4 0%, #B7A99A 50%, #5C4B4B 100%)",
        "espresso-gradient": "linear-gradient(135deg, #5C4B4B 0%, #3D3131 100%)",
        "radial-dark": "radial-gradient(circle at center, rgba(183, 169, 154, 0.1) 0%, rgba(9, 9, 9, 0) 70%)",
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
