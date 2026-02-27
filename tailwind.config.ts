import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#070A12',
        panel: '#0E1324',
        accent: '#36E2D5',
        accentSoft: '#7CF6D4',
        text: '#F6F8FF',
        muted: '#A4B0CC',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 50px rgba(54, 226, 213, 0.22)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
} satisfies Config
