/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in-nav": "fadeIn 1s ease-out",
        "fade-in-title": "fadeIn 2s ease-out",
        "fade-in-para": "fadeIn 4s ease-out",
        "slide-up": "slideUp 2.5s ease-out",
        'slide-in-left': 'slide-in-left 1s ease-out',
        'slide-in-right': 'slide-in-right 1s ease-out',
        "circle-change": "circleChange 10s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        circleChange: {
          "0%": { backgroundColor: "#004d40" },
          "50%": { backgroundColor: "#00695c" },
          "100%": { backgroundColor: "#004d40" },
        },
      },
      colors: {
        "custom-gray": "#d3d3d3",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #004d40, #2e003e)",
      },
    },
  },
  plugins: [],
};
