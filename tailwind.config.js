module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: { 
      extend: { 
        fontFamily: {
          heading: ['Luckiest Guy', "cursive"],
          sans: ['Montserrat', "sans-serif"]
        }
      } 
    },
    variants: {
      extend: {}
    },
    plugins: []
};