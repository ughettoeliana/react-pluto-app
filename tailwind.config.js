/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkGrey: '#292929',
        blue: '#1D67BE',
        lightBlue: '#90BEFF',
      }
    },  },
  darkMode: "class",
};
