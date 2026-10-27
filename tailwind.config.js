/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      colors: {
        cream: "#F3F0E7",
        offwhite: "#F3F0E7",
        "offwhite-dim": "#D8D4C8",
        olive: "#353D2C",
        "olive-dark": "#262C20",
        "olive-deep": "#1B2016",
        "olive-surface": "#3E4734",
        "olive-border": "#4C5740",
        sage: "#9CAF88",
        "sage-light": "#B4C4A3",
        "sage-dim": "#7B8C6C",
        concrete: "#A7A7A7",
        "concrete-light": "#C4C4C4",
        "concrete-dark": "#6B6E67",
        amber: "#CC5500",
        "amber-hover": "#E05E00",
        "amber-light": "#E87325",
        accent: "#CC5500",
        "accent-dim": "#994000",
        "accent-sage": "#9CAF88",
      },
      fontFamily: {
        hn: ['"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"Space Grotesk"', '"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        grotesk: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(4vh) scale(1.03)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out both',
        'rise-in': 'riseIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'line': 'lineGrow 1.1s cubic-bezier(0.76, 0, 0.24, 1) both',
        'marquee': 'marqueeScroll 30s linear infinite',
      },
    },
  },
  plugins: [],
};
