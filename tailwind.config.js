/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Primary Blue
          container: '#2563EB',
          on: '#FFFFFF',
          'on-container': '#eeefff',
        },
        surface: {
          DEFAULT: '#F9FAFB', // Background
          dim: '#d9dadb',
          bright: '#f8f9fa',
          container: {
            lowest: '#ffffff',
            low: '#f3f4f5',
            DEFAULT: '#edeeef',
            high: '#e7e8e9',
            highest: '#e1e3e4',
          },
          'on': '#191c1d',
          'on-variant': '#434655',
        },
        inverse: {
          surface: '#2e3132',
          'on-surface': '#f0f1f2',
          primary: '#b4c5ff',
        },
        outline: {
          DEFAULT: '#E5E7EB', // Border color
          variant: '#c3c6d7',
        },
        secondary: {
          DEFAULT: '#515f74',
          on: '#ffffff',
          container: '#d5e3fc',
          'on-container': '#57657a',
        },
        error: {
          DEFAULT: '#ba1a1a',
          on: '#ffffff',
          container: '#ffdad6',
          'on-container': '#93000a',
        },
        success: {
          DEFAULT: '#065F46',
          container: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#92400E',
          container: '#FEF3C7',
        },
        danger: {
          DEFAULT: '#991B1B',
          container: '#FEE2E2',
        }
      },
      borderRadius: {
        sm: '0.25rem', // 4px
        DEFAULT: '0.5rem', // 8px
        md: '0.75rem', // 12px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        full: '9999px',
      },
      boxShadow: {
        sm: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        1: '0.25rem', // 4px base unit
        2: '0.5rem',  // 8px
        3: '0.75rem', // 12px
        4: '1rem',    // 16px
        5: '1.25rem', // 20px
        6: '1.5rem',  // 24px
        7: '1.75rem', // 28px
        8: '2rem',    // 32px
      }
    },
  },
  plugins: [],
}
