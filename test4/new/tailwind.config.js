/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['DM Sans', 'sans-serif'],
      'bebas-neue': ['Bebas Neue', 'sans-serif'],
    }
    ,
    extend: {
        fontFamily: {
          'body': ['DM Sans', 'sans-serif']
        },
        backgroundImage: {
          'back-g': "url('C:\Users\Dell\Desktop\quiz\test4\new\src\bg.png')",
        }
    },
  },
  plugins: [],
}