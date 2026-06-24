/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF0FB',
          100: '#D7DCF5',
          200: '#AFB9EB',
          400: '#3A4BC4',
          600: '#0E19AE',
          700: '#0B1387',
          800: '#080F67',
          900: '#030526',
        },
        forest: {
          50: '#EAF4EE',
          100: '#CDE6D6',
          300: '#6FAE85',
          500: '#1C7A45',
          600: '#15633A',
          700: '#0F4D2E',
          900: '#082A19',
        },
        amber: {
          50: '#FEF6E3',
          100: '#FCE9B8',
          300: '#F7CB5C',
          500: '#F2A900',
          600: '#D69200',
          700: '#A66F00',
        },
        violet: {
          50: '#F2EBF7',
          100: '#E0CCEE',
          300: '#A86BC9',
          500: '#7C3FA8',
          600: '#5B2A86',
          700: '#42206A',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          100: '#F4F1E8',
          200: '#ECE7D8',
        },
        ink: '#1A1B22',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.75rem',
      },
      boxShadow: {
        soft: '0 8px 30px -8px rgba(8,15,103,0.18)',
        glow: '0 4px 24px rgba(242,169,0,0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
