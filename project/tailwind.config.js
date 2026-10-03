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
        primary: {
          50: '#FBF5F0',
          100: '#F3E5D8',
          200: '#E7CDB6',
          300: '#D6BFA7',
          400: '#B8895A',
          500: '#8B5E3C',
          600: '#7A5236',
          700: '#68452E',
          800: '#573927',
          900: '#462D1F',
        },
        accent: {
          50: '#FBF6EE',
          100: '#F5E8CC',
          200: '#EFD29A',
          300: '#DDB564',
          400: '#C8A165',
          500: '#B8894F',
          600: '#9E7242',
          700: '#7E5A36',
          800: '#5E4329',
          900: '#3F2D1C',
        },
        beige: '#D6BFA7',
        cream: '#F8F7F4',
        charcoal: '#2C2C2C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
