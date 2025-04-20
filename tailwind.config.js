/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './context/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        bakeryPink: '#fcd6e0',
        bakeryBrown: '#a07855',
        peach: '#ffe5b4',
      },
    },
  },
  plugins: [],
}

