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
        // Brand Colors
        navy: {
          DEFAULT: "#1a3a5c",
          dark: "#152e4a",
        },
        accent: {
          DEFAULT: "#e67635",
          dark: "#d56025",
        },
        // Text Colors
        text: {
          primary: "#333333",
          secondary: "#666666",
          muted: "#999999",
        },
        // Background Colors
        bg: {
          light: "#f5f5f5",
          white: "#ffffff",
        },
        // Border Colors
        border: {
          DEFAULT: "#e0e0e0",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          "Meiryo",
          "sans-serif",
        ],
      },
      fontSize: {
        // Headings - PC
        "h1": ["48px", { lineHeight: "1.4", fontWeight: "700" }],
        "h2": ["36px", { lineHeight: "1.4", fontWeight: "700" }],
        "h3": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "h4": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        // Headings - SP
        "h1-sp": ["32px", { lineHeight: "1.4", fontWeight: "700" }],
        "h2-sp": ["28px", { lineHeight: "1.4", fontWeight: "700" }],
        "h3-sp": ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        "h4-sp": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
        // Body
        "body-lg": ["18px", { lineHeight: "1.8", fontWeight: "400" }],
        "body": ["16px", { lineHeight: "1.7", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        "caption": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      spacing: {
        // Section spacing
        "section-y": "120px",
        "section-y-sp": "80px",
        "section-inner": "60px",
        "section-inner-sp": "40px",
      },
      maxWidth: {
        "container": "1200px",
        "narrow": "800px",
      },
      borderRadius: {
        "btn": "4px",
      },
      boxShadow: {
        "header": "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card": "0 2px 8px rgba(0, 0, 0, 0.06)",
        "fixed-cta": "0 -2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
