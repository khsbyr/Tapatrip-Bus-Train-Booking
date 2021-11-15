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
        Roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: theme => ({
        'Header-image': "url('assets/Header.png')",
      }),

      backgroundColor: theme => ({
        ...theme('colors'),
        bg: '#F1F2F6',
        button: '#F1583C',
        disabled: '#EAEDF4',
        selected: '#0A3761',
        hover: '#F06950',
        down: '#EF5134',
        alert: '#FFF7ED',
        steps: '#177AD6',
        register: '#0A3761',
        seatHover: '#1575CE',
      }),
      theme: {
        screens: {
          tablet: '769px',
        },
      },
      borderColor: theme => ({
        ...theme('colors'),
        selected: '#177AD6',
        alert: '#F7B352',
        bg: '#F1F2F6',
        seat: '#0A3761',
        weather: '#8AB1D5',
        register: '#F1583C',
      }),
      textColor: {
        primary: '#3490dc',
        secondary: '#8AB1D5',
        selected: '#177AD6',
        alert: '#F7B352',
        cardDescColor: '#24C8A7',
        cardDate: '#0A3761',
        direction: '#8AB1D5',
        copyText: '#BFC1DA',
        mobileNav: '#BCC4CC',
      },

      placeholderColor: {
        primary: '#8AB1D5',
      },
      fontSize: {
        small: '10px',
      },
    },
  },
  variants: {
    extend: {},
  },
};
