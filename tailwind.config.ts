import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#F7F5F1',
          100: '#EDE9E2',
          200: '#E0DAD0',
          300: '#C9C0B4',
          400: '#A99E8E',
        },
        slate: {
          500: '#6B7177',
          700: '#4A4F54',
          900: '#23262A',
        },
        gold: {
          300: '#D8C29B',
          400: '#C6A876',
          500: '#B08D57',
          600: '#93733F',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      maxWidth: {
        container: '1440px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
