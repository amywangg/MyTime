module.exports = {
  mode: "jit",
  purge: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#4AC036",
        secondary: "#289816",
        tertiary: "#aae1a1",
        text: "#000000",
        subText: "#7D7C7C",
        secondaryButton: "#2e3646",
        bg: "#ebf8e9",
        nav: "#E8FEE8",
        ghost: "#F8F8FF",
        smoke: "#f4f4f4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin")],
};
