export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-indigo': '#6366F1',
        'brand-violet': '#8B5CF6',
        'brand-green': '#10B981',
        'brand-surface': '#111118',
        'brand-elevated': '#16161F',
        'brand-black': '#0A0A0F',
        'brand-text': '#F1F5F9',
        'brand-secondary': '#94A3B8',
        'brand-muted': '#475569',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
