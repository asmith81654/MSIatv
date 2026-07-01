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
        atv: {
          red: "#E60012",
          dark: "#1A1A1A",
          gold: "#D4A843",
          gray: "#F5F5F5",
          light: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans TC", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
