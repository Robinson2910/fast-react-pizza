/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono,monospace',
    },
    extend: {
      colors: {
        pizza: '#312',
      },
      height: {
        screen: '100dvh',
        // dynamic viewport height units
      },
    },
  },
  plugins: [],
}
