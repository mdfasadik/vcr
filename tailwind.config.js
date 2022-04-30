module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          dark: "#2F2E41",
        },
        darkBody: {
          DEFAULT: "#1f1f1e",
        },
      },
    },
  },
  plugins: [],
};
