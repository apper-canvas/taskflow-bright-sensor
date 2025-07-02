/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F3F1FF',
          100: '#E8E4FF',
          500: '#5B47E0',
          600: '#4F3DC7',
          700: '#4333AE',
        },
        secondary: {
          500: '#8B7FE8',
          600: '#7B6FD9',
        },
        accent: {
          500: '#FFB74D',
          600: '#FF9800',
        },
        surface: '#FFFFFF',
        background: '#F7F9FC',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'task-complete': 'task-complete 300ms ease-out forwards',
        'pulse-urgent': 'pulse-urgent 2s ease-in-out infinite',
      },
      keyframes: {
        'task-complete': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.98)', opacity: '0.8' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'pulse-urgent': {
          '0%, 100%': { borderLeftWidth: '4px', borderColor: '#F44336' },
          '50%': { borderLeftWidth: '6px', borderColor: '#FF6B6B' },
        },
      },
    },
  },
  plugins: [],
}