/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scale :{
        '1.009' : '1.009'
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        scaleHover: 'scaleHover 0.102s ease-in-out forwards', // Custom scale hover animation
      },
      keyframes: {
        scaleHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' }, // Scale to 102%
        },
      },
    },
  },
  plugins: [],
};
