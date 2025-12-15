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
        sf: {
          bg: '#0b0c0d',
          panel: '#0f1113',
          surface: '#131418',
          text: '#e6e6e6',
          muted: '#9ea3a6',
          accent: '#FFD400',
          'accent-strong': '#E6C200',
          silver: '#BFC6C9',
        },
        primary: '#E6E6E6',
        accent: '#FFD400',
        night: '#0b0c0d',
      },
    },
  },
  plugins: [],
} satisfies Config;
