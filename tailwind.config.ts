import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        //keep in mind that this fade in effect has a delay of 0.3 seconds
        fadeIn: {
          '0%, 30%': { opacity: '0' }, // Opacity stays at 0 for 30% of the animation time
          '100%': { opacity: '1' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out', // Total duration now includes the delay
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      handwriting: ['var(--font-mali)', 'sans-serif'],
      sans: [
        'var(--font-inter)',
        'ui-sans-serif',
        'system-ui',
        ...defaultTheme.fontFamily.sans,
      ],
      serif: [
        'var(--font-source-serif)',
        'Georgia',
        ...defaultTheme.fontFamily.serif,
      ],
      mono: ['ui-monospace', 'SFMono-Regular', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
}
export default config
