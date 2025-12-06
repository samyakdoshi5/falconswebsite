/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          900: '#0f172a',
          800: '#1e293b',
          accent: '#3b82f6',
          glow: '#06b6d4',
          gold: "#E3AF64",
        },
        brand: {
          highlight: '#e3af64', // gold highlight
          midLight: '#516AC8',  // midtone light
          midDark: '#26428B',   // midtone dark
          deep: '#0F1939',      // dark
        }
      },
      backgroundImage: theme => ({
        // diagonal full-site gradient
        'site-gradient': 'linear-gradient(135deg, #e3af64 0%, #516AC8 40%, #26428B 70%, #0F1939 100%)',
        // softer section gradient (lighter feel)
        'section-gradient': 'linear-gradient(180deg, rgba(81,106,200,0.08) 0%, rgba(38,66,139,0.06) 100%)',
        // card/button accent subtle gradient
        'card-gradient': 'linear-gradient(135deg, rgba(226,175,100,0.14) 0%, rgba(81,106,200,0.08) 60%)',
      }),
      keyframes: {
        'gradient-pan': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        'gradient-pan-slow': 'gradient-pan 20s ease infinite',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
