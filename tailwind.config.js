/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "body": ["DM Sans", "San-serif"],
      },
      colors: {
        primary: "#f62682",
        secondary:"red"
      }
    },
  },
  plugins: [],
}