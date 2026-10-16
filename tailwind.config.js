/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#1C5D65",
          sienna: "#AF604E",
          navy: "#2C3E50",
          slate: "#798C8D",
          seafoam: "#96C4BE",
          cream: "#FAF7F0",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Roboto",
          "Poppins",
          "-apple-system",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
