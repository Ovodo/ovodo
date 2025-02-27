import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "500px",
      },
      colors: {
        // primary: "#0C1713",
        // night: "#F1EDE4",
        primary: "#F1EDE4",
        night: "#070D0B",
        secondary: "#360A14",
        mint: "#4FB286",
        10: "#0e79b2",
        res_primary: "#19273c",
        res_secondary: "#c4881c",
        dark_brown: "#433E0E",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
