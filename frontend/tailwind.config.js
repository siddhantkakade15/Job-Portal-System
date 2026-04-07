/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#2563EB',
        'brand-primary-hover': '#1D4ED8',
        'brand-secondary': '#0EA5E9',
        'brand-success': '#10B981',
        'brand-warning': '#F59E0B',
        'brand-danger': '#EF4444',
        'bg-base': '#F8FAFC',
        'bg-surface': '#FFFFFF',
        'bg-muted': '#F1F5F9',
        'border-default': '#E2E8F0',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'text-muted': '#94A3B8',
        'dark-bg-base': '#0B1120',
        'dark-bg-surface': '#111827',
        'dark-bg-muted': '#1E2A3B',
        'dark-border-default': '#1F2D3D',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
