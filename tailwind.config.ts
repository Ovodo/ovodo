import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F1EDE4",
        night: "#0C1713",
        secondary: "#360A14",
        10: "#0e79b2",
      },
    },
  },
  plugins: [],
} satisfies Config;
