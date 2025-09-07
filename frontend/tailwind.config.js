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
          50: '#f0f9ff',   // milk white
          100: '#e0f2fe',  // light blue
          200: '#bae6fd',  // soft blue
          300: '#7dd3fc',  // medium blue
          400: '#38bdf8',  // blue
          500: '#0ea5e9',  // primary blue
          600: '#0284c7',  // dark blue
          700: '#0369a1',  // darker blue
          800: '#075985',  // deep blue
          900: '#0c4a6e',  // navy blue
        },
        secondary: {
          50: '#fefdf8',   // milk white
          100: '#fdf6e3',  // light beige
          200: '#f4e4bc',  // soft beige
          300: '#e6d3a3',  // medium beige
          400: '#d4c4a8',  // beige
          500: '#c4b5a0',  // primary beige
          600: '#a68b5b',  // warm beige
          700: '#8b7355',  // dark beige
          800: '#6b5b47',  // deeper beige
          900: '#4a3f35',  // dark brown-beige
        },
        accent: {
          50: '#f0fdf4',   // milk white
          100: '#dcfce7',  // light green
          200: '#bbf7d0',  // soft green
          300: '#86efac',  // medium green
          400: '#4ade80',  // green
          500: '#22c55e',  // primary green
          600: '#16a34a',  // dark green
          700: '#15803d',  // deeper green
          800: '#166534',  // forest green
          900: '#14532d',  // dark forest
        },
        neutral: {
          50: '#fefefe',   // pure white
          100: '#fafafa',  // milk white
          200: '#f5f5f5',  // light gray
          300: '#e5e5e5',  // soft gray
          400: '#d4d4d4',  // medium gray
          500: '#a3a3a3',  // gray
          600: '#737373',  // dark gray
          700: '#525252',  // darker gray
          800: '#404040',  // deep gray
          900: '#262626',  // charcoal
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
