module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./ui/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Inter var", "sans-serif"],
    },
    ringColor: {
      primary: "rgba(250, 165, 73, var(--tw-ring-opacity))",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: {
        200: "rgba(255, 220, 156, var(--tw-bg-opacity))",
        DEFAULT: "rgba(250, 165, 73, var(--tw-bg-opacity))",
        600: "rgba(179, 128, 35, var(--tw-bg-opacity))",
      },
    }),
    extend: {
      colors: {
        primary: {
          200: "rgba(255, 220, 156, var(--tw-text-opacity))",
          DEFAULT: "rgba(250, 165, 73, var(--tw-text-opacity))",
          600: "rgba(179, 128, 35, var(--tw-text-opacity))",
        },
        secondary: "rgba(186, 200, 211, var(--tw-bg-opacity))",
        danger: {
          DEFAULT: "rgba(224, 49 49, var(--tw-bg-opacity))",
        },
      },
    },
  },
  variants: {
    extend: {
      padding: ["focus"],
    },
  },
  plugins: [],
};
