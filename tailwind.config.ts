import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDF9',
        charcoal: '#1E1B24',
        lavender: '#F3E8FF',
        mint: '#DCFCE7',
        peach: '#FFEDD5',
        sky: '#E0F2FE',
        blush: '#FCE7F3',
        butter: '#FEF3C7',
        bubble: '#E9D5FF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fredoka', 'Quicksand', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        chunky: '4px 4px 0px #1E1B24',
        'chunky-sm': '3px 3px 0px #1E1B24',
        'chunky-xs': '2px 2px 0px #1E1B24',
        'chunky-lg': '7px 7px 0px #1E1B24',
      },
      borderRadius: {
        blob: '2.5rem',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        bob: 'bob 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
