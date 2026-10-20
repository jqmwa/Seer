import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        seer: {
          purple: {
            main: '#7D33FF',
            mid: '#8F55F7',
            light: '#9C6FF2',
          },
          white: {
            pure: '#FFFFFF',
            soft: '#E9E9F5',
            muted: '#8A8A94',
          },
          black: {
            deep: '#101013',
            mid: '#1A1A1E',
            muted: '#8A8A94',
          },
          // Forecasting Signal Palette: Distinct bluish color for alternative forecasting signals (vs. direct prediction market trading)
          forecast: {
            main: '#38BDF8',
            mid: '#60A5FA',
            deep: '#0284C7',
            soft: '#BAE6FD',
          },
        },
        surface: {
          0: 'rgb(var(--theme-app-bg-rgb) / <alpha-value>)',
          1: 'var(--theme-panel-bg)',
          2: 'rgb(var(--theme-accent-blue-rgb) / <alpha-value>)',
          3: 'rgb(var(--theme-accent-green-rgb) / <alpha-value>)',
        },
        accent: {
          green: 'rgb(var(--theme-accent-green-rgb) / <alpha-value>)',
          yellow: 'rgb(var(--theme-accent-yellow-rgb) / <alpha-value>)',
          red: 'rgb(var(--theme-accent-red-rgb) / <alpha-value>)',
          orange: 'rgb(var(--theme-accent-orange-rgb) / <alpha-value>)',
          blue: 'rgb(var(--theme-accent-blue-rgb) / <alpha-value>)',
          purple: 'rgb(var(--theme-accent-purple-rgb) / <alpha-value>)',
        },
        gba: {
          card: 'rgb(var(--theme-accent-blue-rgb) / <alpha-value>)',
          'card-light': 'rgb(var(--theme-accent-blue-rgb) / <alpha-value>)',
          'card-dark': 'var(--theme-card-border)',
          selected: 'rgb(var(--theme-accent-orange-rgb) / <alpha-value>)',
          'selected-light': 'rgb(var(--theme-accent-orange-rgb) / <alpha-value>)',
          'selected-dark': 'var(--theme-card-selected-border)',
          dialog: 'var(--theme-dialog-bg)',
          'dialog-border': 'var(--theme-dialog-border)',
          teal: 'var(--theme-panel-bg)',
          'teal-dark': 'var(--theme-panel-border)',
          'teal-light': 'rgb(var(--theme-accent-green-rgb) / <alpha-value>)',
          hp: 'rgb(var(--theme-accent-green-rgb) / <alpha-value>)',
          'hp-yellow': 'rgb(var(--theme-accent-yellow-rgb) / <alpha-value>)',
          'hp-red': 'rgb(var(--theme-accent-red-rgb) / <alpha-value>)',
          text: 'var(--theme-app-text)',
          'text-shadow': 'var(--theme-text-inverse)',
        },
      },
      fontFamily: {
        primary: ["'PP Neue Montreal'", 'system-ui', '-apple-system', 'sans-serif'],
        mono: ["'Suisse INTL Mono'", "'Suise INTL Mono'", "'JetBrains Mono'", "'Commit Mono'", 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: 'var(--theme-font-display)',
        body: 'var(--theme-font-body)',
      },
      animation: {
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
