import type { Config } from "tailwindcss";

const config: Config = {
  content:[
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chrysanthemum: {
          purple: "#702963",      // Derin çiçek moru (Primary Actions)
          light: "#E0B0FF",       // Yumuşak mor (Secondary/Background)
          yellow: "#FFD700",      // Sıcak sarı (Accent/Alerts)
          cream: "#FFFDD0",       // Krem/Beyaz (Main Background)
          pink: "#FFB7C5",        // Yumuşak pembe
          earth: "#8B5A2B",       // Toprak tonları
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins:[],
};
export default config;