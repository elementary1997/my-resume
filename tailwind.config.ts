import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          cyan: '#22d3ee',
          green: '#4ade80',
          purple: '#a78bfa',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glitch-1': 'glitch-1 8s infinite',
        'glitch-2': 'glitch-2 8s infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      keyframes: {
        'glitch-1': {
          '0%, 90%, 100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
          '92%': { clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-3px, 1px)' },
          '94%': { clipPath: 'inset(40% 0 30% 0)', transform: 'translate(3px, -1px)' },
          '96%': { clipPath: 'inset(70% 0 5% 0)', transform: 'translate(-2px, 2px)' },
          '98%': { clipPath: 'inset(20% 0 75% 0)', transform: 'translate(2px, -2px)' },
        },
        'glitch-2': {
          '0%, 90%, 100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
          '92%': { clipPath: 'inset(60% 0 10% 0)', transform: 'translate(3px, -1px)' },
          '94%': { clipPath: 'inset(30% 0 40% 0)', transform: 'translate(-3px, 1px)' },
          '96%': { clipPath: 'inset(5% 0 70% 0)', transform: 'translate(2px, -2px)' },
          '98%': { clipPath: 'inset(75% 0 20% 0)', transform: 'translate(-2px, 2px)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(249,115,22,0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(249,115,22,0.8), 0 0 40px rgba(249,115,22,0.3)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-dark': 'linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)',
        'grid-light': 'linear-gradient(rgba(249,115,22,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}

export default config
