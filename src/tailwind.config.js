/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './templates/**/*.html',           // HTML templates
      './src/**/*.py',                   // Python views/templates if using template tags
      './static/src/**/*.css',           // Tailwind input file
      './node_modules/flowbite/**/*.js'  // Flowbite components
    ],
    plugins: [
      require('flowbite/plugin')
    ],
  }