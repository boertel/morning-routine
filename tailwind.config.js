module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./ui/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Inter var", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          200: "rgba(255, 220, 156, var(--tw-bg-opacity))",
          DEFAULT: "rgba(250, 165, 73, var(--tw-bg-opacity))",
          600: "rgba(179, 128, 35, var(--tw-bg-opacity))",
        },
        secondary: "rgba(186, 200, 211, var(--tw-bg-opacity))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
