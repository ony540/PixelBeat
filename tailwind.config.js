/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
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
      screen: {
        customSc: { min: "390px", max: "720px" },
      },
    },
  },
  plugins: [],
};
