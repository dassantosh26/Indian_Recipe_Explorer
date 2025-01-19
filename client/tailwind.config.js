/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-header-color": "#5EAA2E",
      },
    },
  },
  plugins: [],
};
