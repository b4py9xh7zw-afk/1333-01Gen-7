/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050D1A',
          900: '#0A1628',
          800: '#122442',
          700: '#1E3A5F',
          600: '#2A4D7A',
          500: '#3D6A9C',
        },
        steel: {
          50: '#F4F7FB',
          100: '#E6ECF4',
          200: '#C8D5E5',
          300: '#A8C5DA',
          400: '#7DA0C2',
          500: '#6B7C93',
          600: '#4A5A73',
          700: '#364258',
        },
        security: {
          green: '#1B7A4E',
          greenLight: '#2E9E68',
          orange: '#D4691F',
          orangeLight: '#E8833F',
          red: '#C0392B',
          redLight: '#D9534F',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(168, 197, 218, 0.15), 0 4px 24px rgba(0, 0, 0, 0.4)',
        'inset-line': 'inset 0 0 0 1px rgba(168, 197, 218, 0.2)',
        'glow-orange': '0 0 20px rgba(212, 105, 31, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
