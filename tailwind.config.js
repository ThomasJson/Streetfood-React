/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "49": "49%"
      },
      height: {
        "8vh": "67px",
        "84vh": "calc(100vh - 134px)"
      },
      minHeight: {
        "84vh": "calc(100vh - 134px)"
      },
      fontFamily:{
        "Raleway": ["Raleway-Light", "sans-serif"],
        "Rubik": ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
};
