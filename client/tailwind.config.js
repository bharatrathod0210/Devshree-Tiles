/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8CF7E',
          dark: '#9A7A2E',
        },
        beige: '#F5F0E8',
        cream: '#FAF7F2',
        marble: '#F8F6F1',
        charcoal: '#1A1A1A',
        deep: '#0D0D0D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
