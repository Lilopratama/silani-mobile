/** @type {import('tailwindcss').Config} */

module.exports = {
   content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            RedHatRegular: ["RedHatDisplay_400Regular"],
            RedHatMedium: ["RedHatDisplay_500Medium"],
            RedHatBold: ["RedHatDisplay_700Bold"],
         },
         colors: {
            primary: "#D1F249",
            secondary: "#FBFFE6",
            dark: "#252525",
         },
      },
   },
   plugins: [],
};
// RedHatDisplay_400Regular,
// RedHatDisplay_500Medium,
// RedHatDisplay_700Bold,
