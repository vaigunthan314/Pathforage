/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        surface: {
          0: '#FFFFFF',
          50: '#F7F7F4',
          100: '#F2F2EE',
          200: '#E8E8E2',
          300: '#D9D9D1',
          400: '#C4C4BA',
        },
        ink: {
          DEFAULT: '#111827',
          secondary: '#667085',
          tertiary: '#98A2B3',
          muted: '#D0D5DD',
        },
        dark: {
          600: '#123028',
          700: '#0C1B17',
          800: '#0A1512',
          900: '#07110F',
          950: '#040A08',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',
        purple: {
          500: '#7C3AED',
          600: '#6D28D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        eyebrow: ['0.75rem', { lineHeight: '1.25rem' }],
      },
      letterSpacing: {
        eyebrow: '0.14em',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(17, 24, 39, 0.05)',
        'card-hover': '0 8px 24px rgba(17, 24, 39, 0.08)',
        'lift': '0 2px 6px rgba(17, 24, 39, 0.06)',
      },
    },
  },
  plugins: [],
}
