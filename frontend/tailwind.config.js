/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fantasy: ["UnifrakturCook", "cursive"],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["dracula"],
    darkTheme: "dracula",
    base: true,
    styled: true,
    utils: true,
  },
};
