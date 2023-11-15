/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./app/**/*.{js,jsx,tsx}', './lib/**/*.{js,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         fontFamily: {
            satoshi: 'Satoshi-Bold'
         },
         colors: {
            main: {
               500: '#7965FF',
               400: '#DB92FD',
               300: '#362b48',},
            stone: {
               350: '#cecbc9'
            },
            darkMode:{
               900: '#131313'
            }
         }
      }
   },
   plugins: []
};

