const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: theme => ({
        'Header-image': "url('/assets/Header.png')",
      }),

      backgroundColor: theme => ({
        ...theme('colors'),
        bg: '#F1F2F6',
      }),

      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
      },

      theme: {
        screens: {
          tablet: '769px',
        },
      },

      borderColor: theme => ({
        ...theme('colors'),
        selected: '#177AD6',
      }),

      textColor: {
        primary: '#3490dc',
        secondary: '#8AB1D5',
        selected: '#177AD6',
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
