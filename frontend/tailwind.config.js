/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#22C55E',
        background: '#FFFFFF',
        text_main: '#000000',
        danger: '#FF3333',
        warning: '#FFCC00',
      }
    },
  },
  plugins: [],
}