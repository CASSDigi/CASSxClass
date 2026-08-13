/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1E3D",
          deep: "#081530",
          light: "#12294F",
        },
        ivory: "#F7F4EC",
        gold: {
          DEFAULT: "#C6A15B",
          light: "#DCC48A",
          dark: "#9C7B3E",
        },
        silver: "#C9CFD6",
        charcoal: "#161616",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Jost", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};
