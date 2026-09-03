/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        coral: {
          50: '#fff5f3',
          100: '#ffe8e3',
          200: '#ffd0c7',
          300: '#ffb0a0',
          400: '#ff8e7a',
          500: '#ff6f61',
          600: '#f04e3e',
          700: '#c93a2c',
          800: '#a52e22',
          900: '#82261c',
        },
        gold: {
          300: '#e8cd8e',
          400: '#d4af5f',
          500: '#c19a3e',
          600: '#a07e2e',
        },
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'floaty': 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
