import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0c0c0c',
        body: '#d4d0c8',
        accent: '#e8a44a',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        instrument: ['var(--font-instrument)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
