/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "9vh": "9vh"
      },
      minHeight: {
        "82vh": "82vh"
      }
    },
  },
  plugins: [],
};
