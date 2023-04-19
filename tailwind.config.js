/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "8vh": "8vh"
      },
      minHeight: {
        "84vh": "84vh"
      },
      fontFamily:{
        "Raleway": ["Raleway-Light", "sans-serif"]
      }
    },
  },
  plugins: [],
};
