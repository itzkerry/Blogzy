/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // for Vite/React
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
