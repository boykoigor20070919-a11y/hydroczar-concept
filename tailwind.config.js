/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0E11",
        raised: "#12171B",
        warm: "#F4F1EC",
        muted: "#8B959C",
        faint: "#6B757C",
        accent: "#4FC3DE",
      },
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
