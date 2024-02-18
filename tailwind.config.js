/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "49": "49%",
        "card-mobile": "31.5%",
        "card-desktop": "32.2%"
      },
      height: {
        "header-desktop": "100px",
        "header-mobile": "67px",
        "main-desktop": "calc(100vh - 167px)",
        "main-mobile": "calc(100vh - 134px)"
      },
      spacing: {
        "main-desktop": "100px",
        "main-mobile": "67px"
      },
      fontFamily:{
        "Raleway": ["Raleway-Light", "sans-serif"],
        "Rubik": ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
};
