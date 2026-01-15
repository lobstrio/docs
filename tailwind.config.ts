import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',      // zinc-950
        surface: '#18181b',         // zinc-900
        border: '#27272a',          // zinc-800
        text: {
          primary: '#fafafa',       // zinc-50
          secondary: '#d4d4d8',     // zinc-300
          muted: '#71717a',         // zinc-500
        },
        accent: {
          primary: '#ef4444',       // red-500 (main brand color)
          blue: '#3b82f6',          // blue-500
          green: '#10b981',         // emerald-500
          yellow: '#f59e0b',        // amber-500
          red: '#ef4444',           // red-500
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#d4d4d8',
            '--tw-prose-headings': '#fafafa',
            '--tw-prose-lead': '#d4d4d8',
            '--tw-prose-links': '#ef4444',
            '--tw-prose-bold': '#fafafa',
            '--tw-prose-counters': '#71717a',
            '--tw-prose-bullets': '#71717a',
            '--tw-prose-hr': '#27272a',
            '--tw-prose-quotes': '#fafafa',
            '--tw-prose-quote-borders': '#27272a',
            '--tw-prose-captions': '#71717a',
            '--tw-prose-code': '#fafafa',
            '--tw-prose-pre-code': '#fafafa',
            '--tw-prose-pre-bg': '#18181b',
            '--tw-prose-th-borders': '#27272a',
            '--tw-prose-td-borders': '#27272a',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
