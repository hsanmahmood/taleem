/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#1a1a1a",
          primary: "#ffffff",
          secondary: "#a0a0a0",
          border: "rgba(255, 255, 255, 0.1)",
          accent: "oklch(60% 0.15 250)",
        },
      },
      borderRadius: { "20": "20px" },
      boxShadow: { premium: "0 8px 32px 0 rgba(0, 0, 0, 0.37)" },
    },
  },
  plugins: [],
}

