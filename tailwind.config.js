/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "49": "49.6%",
        "33%": "33%",
        "66%": "66%",
        "24%": "23.4%",
        "16%": "16%"
      },
      height: {
        "homeDesktop": "71.6vh",
        "carouselDesktopProductCard": "54.6vh"
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
