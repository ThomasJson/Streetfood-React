/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "49": "49%"
      },
      height: {
        "header-desktop": "16vh",
        "header-mobile": "10vh",
        "main-desktop": "84vh",
        "main-mobile": "80vh",
        "footer": "10vh",
      },
      minHeight:{
        "header-desktop": "16vh",
        "header-mobile": "10vh",
        "main-desktop": "84vh",
        "main-mobile": "80vh",
        "footer": "10vh",
      },
      spacing: {
        "main-desktop": "16vh",
        "main-mobile": "10vh",
        "footer": "10vh",
      },
      fontFamily:{
        "Raleway": ["Raleway-Light", "sans-serif"],
        "Rubik": ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
};
