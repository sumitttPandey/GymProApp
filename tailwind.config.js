/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0B0F14",
        foreground: "#E5E7EB",

        card: "#111827",
        cardForeground: "#E5E7EB",

        border: "#1F2937",

        primary: "#22C55E",
        primaryForeground: "#052E16",

        secondary: "#1F2937",
        muted: "#6B7280",

        accent: "#F97316",
        destructive: "#EF4444",

        chart1: "#22C55E",
        chart2: "#F97316",
        chart3: "#38BDF8",
        chart4: "#A78BFA",
        chart5: "#EC4899",

        sidebar: "#0F172A",
        sidebarForeground: "#E5E7EB",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px"
      }
    }
  },
  plugins: []
}