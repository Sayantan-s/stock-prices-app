/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf2ff',
          100: '#dee6ff',
          200: '#c4d0ff',
          300: '#a0b1ff',
          400: '#7a87ff',
          500: '#5b5ff9',
          600: '#4a40ee',
          700: '#3c30d2',
          800: '#312aa9',
          900: '#2d2986',
          950: '#1c184e',
        },
        secondary: {
          50: '#f2f7fc',
          100: '#e1edf8',
          200: '#c9dff4',
          300: '#a4cbec',
          400: '#79b0e1',
          500: '#5992d8',
          600: '#4579cb',
          700: '#3b65ba',
          800: '#355398',
          900: '#2f4779',
          950: '#1a243b',
        },
        neutral: {
          50: '#f7f7f7',
          100: '#ececed',
          200: '#dededf',
          300: '#bdbebf',
          400: '#acadae',
          500: '#97989a',
          600: '#86878a',
          700: '#797a7c',
          800: '#656668',
          900: '#535455',
          950: '#353536',
        },
        tertiary: {
          50: '#f3faf3',
          100: '#e3f5e3',
          200: '#c7ebc9',
          300: '#9cd99f',
          400: '#67bf6b',
          500: '#43a448',
          600: '#338637',
          700: '#2b6a2f',
          800: '#265529',
          900: '#214624',
          950: '#0d260f',
        },
      },
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
