const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    './src/**/*.{html,js}', 
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: { 
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'myblue': {
          100: '#0000FF',
          200: '#000080',
          300: '#00008B', 
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
    require('tw-elements/dist/plugin')
  ],
}