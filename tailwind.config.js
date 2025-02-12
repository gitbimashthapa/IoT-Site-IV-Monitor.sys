/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          50: '#171717',
          100: '#1A1A1A',
          200: '#1E1E1E',
          300: '#262626',
          400: '#2E2E2E',
          500: '#363636',
          600: '#3E3E3E',
          700: '#464646',
          800: '#4E4E4E',
          900: '#565656'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};