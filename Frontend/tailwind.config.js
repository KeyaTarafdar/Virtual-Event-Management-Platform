/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 1s ease-in-out",
        slideOut: "slideOut 1s ease-in-out",
        slideBelow: "slideBelow 1s ease-in-out",
        slideUp: "slideUp 1s ease-in-out",
        assembleText: "assembleText 1s ease-out",
      },

      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },

        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },

        slideBelow: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },

        slideUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },

        assembleText: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8) translateY(20px)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(1.05) translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
      },

      boxShadow: {
        "3xl": "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        "4xl":
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      },

      screens: {
        xs: "320px",
        xds: "420px",
      },
    },
  },
  plugins: [scrollbarHide],
};
