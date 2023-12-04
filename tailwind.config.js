/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlack: "#000",
        mainWhite: "#fff",
        mainRed: "#FF5757",
        mainBlue: "#5757FF",
        mainPink: "#FF57FF",
        mainCyan: "#57FFFF",
        mainYellow: "#FFFF57",
        mainGreen: "#72F54A",
      },
    },
  },
  plugins: [],
};
