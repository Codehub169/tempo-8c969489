/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#A3B18A', // Muted Sage Green
          secondary: '#DAD7CD', // Light Neutral Grey
          accent: '#D4A373',    // Warm Terracotta
          background: '#FEFAE0', // Off-White
          text: '#3A3B3C',       // Charcoal
        },
        status: {
          success: '#609966',
          warning: '#F2C94C',
          error: '#EB5757',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.text'),
            a: {
              color: theme('colors.brand.accent'),
              '&:hover': {
                color: theme('colors.brand.accent'),
                opacity: 0.8,
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.brand.text'),
            },
            h1: {
              fontWeight: '600',
            },
            h2: {
              fontWeight: '600',
            },
            h3: {
              fontWeight: '500',
            },
            strong: {
              color: theme('colors.brand.text'),
            },
          },
        },
      }),
      animation: {
        'logo-reveal': 'logo-reveal 1.5s ease-out forwards',
        'scroll-indicator-bounce': 'scroll-indicator-bounce 2s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'pop-out': 'pop-out 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
      },
      keyframes: {
        'logo-reveal': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-indicator-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-out': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card': '0 8px 20px rgba(0, 0, 0, 0.07)',
        'focus-ring': '0 0 0 3px rgba(212, 163, 115, 0.4)', // Accent color with opacity
      },
      borderRadius: {
        'soft': '12px',
        'medium': '8px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};