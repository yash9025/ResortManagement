/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit', // Enables Just-In-Time mode for better performance
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './public/index.html',
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), // Enhances form elements
      require('@tailwindcss/typography'), // Provides prose classes for better readability
      require('@tailwindcss/aspect-ratio'), // Helps in maintaining aspect ratios
      require('@tailwindcss/container-queries'), // Enables container queries for responsive layouts
    ],
  };
  