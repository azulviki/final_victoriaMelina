/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // le damos un nombre "roboto"
        onav: ['Michroma', 'sans-serif'], // le damos un nombre "onav"
        open: ['Open Sans', 'sans-serif'], // le damos un nombre "open"
    },
  },
  plugins: [],
}
}
