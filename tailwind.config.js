/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070A0F',
          900: '#0B0F15',
          850: '#101622',
          800: '#172030',
          700: '#233048',
          600: '#324566',
        },
        gold: {
          300: '#F0D69A',
          400: '#E1BF73',
          500: '#C5A880',
          600: '#B08E58',
          700: '#8A6D3B',
        },
        surface: {
          DEFAULT: '#0E141E',
          card: '#121926',
          border: '#1E293B',
          hover: '#192336',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 15px -3px rgba(197, 168, 128, 0.15)',
        'gold-md': '0 0 25px -5px rgba(197, 168, 128, 0.25)',
      }
    },
  },
  plugins: [],
};
