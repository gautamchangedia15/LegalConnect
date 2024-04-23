/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {  
    extend: {},
    
  },
  
    daisyui: {
      themes: [],
    
 },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
})