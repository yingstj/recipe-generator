/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'recipe-primary': '#10B981',
        'recipe-secondary': '#3B82F6',
        'waste-red': '#EF4444',
        'waste-yellow': '#F59E0B',
        'waste-green': '#10B981',
      },
    },
  },
  plugins: [],
}