/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,tsx,ts}", "./index.html"],
  theme: {
    fontFamily: {
      comfortaa: ["Comfortaa", "sans-serif"],
      baloo: ["Baloo"],
    },
    extend: {
      colors: {
        background: {
          light: "#F4EFE9",
          dark: "#352F4C",
          darker: "#1E1E1E",
        },
        button: {
          primary: "#6B4DE6",
          secondary: "#FCC41D",
          tertiary: "#4DADE6",
          quaternary: "#4DE69E",
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.9) 90%, rgba(255, 255, 255, 1) 100%)",
        "register-gradient":
          "linear-gradient(135deg, #6B4DE6 25%, #FFFFFF 65%)",
      },
      fontSize: {
        label: "16px",
      },
    },
  },
  plugins: [],
};



