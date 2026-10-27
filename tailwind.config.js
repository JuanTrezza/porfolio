/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Halo del punto de estado: crece y se desvanece
        statusPulse: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '70%, 100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        statusPulse: 'statusPulse 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
