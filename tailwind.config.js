const colors = require("tailwindcss/colors");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

var moment = require("moment");
moment().format();

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      title: "#111439",
      accent: "#635BFF",
      accentOpacity: "#635BFF30",
      dark: "#222222",
      border: "#22222280",
      inputBorder: "#22222220",
      light: "#697386",
      red: "#FF5B5B",
      redOpacity: "#FF5B5B30",
      white: "#FFFFFF",
      black: "#000000",
      darkBackground: "#1C1E25",
      darkBlueGray: "#15171C",
      redpal: colors.red,
      blue: colors.blue,
    },
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ["es-us", "ru"],
    }),
  ],
};
