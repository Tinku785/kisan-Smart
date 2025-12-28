/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kisan-green': '#2E7D32', // Custom green color
        'kisan-light-green': '#E8F5E9',
      }
    },
  },
  plugins: [],
}