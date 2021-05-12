import { colors } from './color-palette'

module.exports = {
  prefix: 'tw-',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
