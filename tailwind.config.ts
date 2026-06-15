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
        // Aksan rengi — yeni lacivert logoya uyumlu çelik mavisi tonları.
        // (Sınıf adı uyumluluğu için 'gold' anahtarı korunuyor.)
        gold: {
          300: '#9AA7B2',
          400: '#6B7C8B',
          500: '#45576A',
          600: '#2E3C49',
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
