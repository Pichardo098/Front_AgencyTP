/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bkg_blue: "#A5E2FF",
        blue_header: "#1A91DD",
        black_header: "#0C0C0C",
        btn_red: "#D93F3F",
        btn_hover: "#ED8F8F",
        txt_blue: "#6CA4A2",
        txt_gray: "#333333",
        txt_black: "#000000",
      },
    },
  },
  plugins: [],
};
