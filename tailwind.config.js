/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          elevated: 'hsl(var(--surface-elevated))',
          muted: 'hsl(var(--surface-muted))',
        },
        border: 'hsl(var(--border))',
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        clinical: {
          teal: '#0d9488',
          cyan: '#06b6d4',
          navy: '#0f172a',
          ink: '#0b0f19',
          slate: '#1e293b',
        },
        status: {
          verified: '#10b981',
          pending: '#f59e0b',
          unverified: '#94a3b8',
          expired: '#ef4444',
          recalled: '#dc2626',
          suspicious: '#f97316',
          rejected: '#64748b',
        },
        severity: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#f59e0b',
          low: '#3b82f6',
          info: '#64748b',
        },
        ai: {
          DEFAULT: '#8b5cf6',
          muted: '#7c3aed',
          glow: 'rgba(139, 92, 246, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

