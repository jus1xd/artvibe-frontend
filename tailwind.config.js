const colors = require('tailwindcss/colors')

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      title: "#111439",
      accent: "#635BFF",
      dark: "#222222",
      border: "#22222280",
      inputBorder: "#22222240",
      light: "#697386",
      red: "#FF5B5B",
      white: "#FFFFFF",
      black: "#000000",
      redpal: colors.red
    },
  },
  plugins: [],
};
