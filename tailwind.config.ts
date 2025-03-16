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
        // night: "#0C1713",
        secondary: "#360A14",
        mint: "#4FB286",
        10: "#0e79b2",
        blue: "#0e79b2;",
      },
    },
  },
  plugins: [],
} satisfies Config;
