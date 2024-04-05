/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        lexend:['Lexend', "sans-serif"]
      },
      fontSize:{
        xsm1:"4px",
        xsm2:"6px",
        xsm3:"8px",
        xsm4:"10px",
        xsm5:"12px",
        xsm6:"14px",
      }
    },
  },
  plugins: [],
}