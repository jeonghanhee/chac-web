/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#111111',
        surface: '#161616',
        accent: '#c8ff00',
        white: '#f0f0f0',
        muted: 'rgba(240, 240, 240, 0.55)',
        dim: 'rgba(240, 240, 240, 0.35)',
        line: 'rgba(240, 240, 240, 0.14)',
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        sans: ['DM Sans', 'Noto Sans KR', 'sans-serif'],
      },
      aspectRatio: {
        '16/8.5': '16 / 8.5',
        '16/10': '16 / 10',
      },
      animation: {
        'ken-burns': 'kenBurns 12s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'breathe': 'breathe 5s ease-in-out infinite',
        'panel-in': 'panelIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        kenBurns: {
          'from': { transform: 'scale(1)' },
          'to': { transform: 'scale(1.08)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.25)', opacity: '0.6' },
        },
        panelIn: {
          'from': { opacity: '0', transform: 'translateX(24px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
