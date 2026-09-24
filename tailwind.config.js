/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#05070d",
          secondary: "#0b101d",
          surface: "rgba(13, 20, 36, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
          hoverBorder: "rgba(0, 245, 212, 0.45)",
          cyan: "#00f5d4",
          blue: "#38bdf8",
          purple: "#7928ca",
          violet: "#a855f7",
          pink: "#f72585",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Outfit', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
