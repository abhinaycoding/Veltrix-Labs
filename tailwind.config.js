/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        accent: {
          DEFAULT: "#ffffff",
          glitch: "#ff0000",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        'glitch-rgb': 'glitch-rgb 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glitch-rgb': {
          '0%': { transform: 'translate(0)', 'text-shadow': 'none' },
          '20%': { transform: 'translate(-2px, 2px)', 'text-shadow': '2px 0 #ff0000, -2px 0 #00ff00' },
          '40%': { transform: 'translate(-2px, -2px)', 'text-shadow': '-2px 0 #ff0000, 2px 0 #00ff00' },
          '60%': { transform: 'translate(2px, 2px)', 'text-shadow': '2px 0 #0000ff, -2px 0 #ff00ff' },
          '80%': { transform: 'translate(2px, -2px)', 'text-shadow': '-2px 0 #0000ff, 2px 0 #ff00ff' },
          '100%': { transform: 'translate(0)', 'text-shadow': 'none' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
