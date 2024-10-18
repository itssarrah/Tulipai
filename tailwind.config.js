/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#154472", // Dark Blue
        "light-blue": "#D6E7EE", // Light Blue
        "sky-blue": "#59C4E4", // Sky Blue
        "medium-blue": "#207FB8", // Medium Blue
        "mint-green": "#89FFD6", // Mint Green
      },
    },
  },
  plugins: [],
};
