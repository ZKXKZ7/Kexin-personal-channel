/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#2B3674',
        ink: '#37352F',
        mist: '#F1F1EF',
        hairline: '#E9E9E8',
        callout: '#FBF3DB',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      animation: {
        drift: 'drift 12s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(-3deg)' },
          '50%': { transform: 'translate(8px, -6px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};
