/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // for Vite/React
  ],
  theme: {
    extend: {},
  },
  darkMode:'class',
  plugins: [require("tailwindcss-animate"),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  
}
