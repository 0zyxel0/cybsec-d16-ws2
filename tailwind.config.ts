import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0B0F19',
          card: '#151D30',
          border: '#1E2942',
          primary: '#10B981', // Emerald green
          accent: '#3B82F6', // Blue
          warn: '#F59E0B',   // Amber
          danger: '#EF4444', // Red
          text: '#93C5FD'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    }
  },
  plugins: []
} satisfies Config