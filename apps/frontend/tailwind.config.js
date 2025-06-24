/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: '#3EB489',
          light: '#6FD1B3',
          dark: '#2B7A6B',
        },
        indigo: {
          DEFAULT: '#4B6CB7',
          light: '#7A94D6',
          dark: '#2E3E7E',
        },
        violetPastel: '#B9AEDC',
        yellowGold: '#FFD166',
      },
      spacing: {
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
      },
      borderRadius: {
        'lg': '0.75rem',
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0,0,0,0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
