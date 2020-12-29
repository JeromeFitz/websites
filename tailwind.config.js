/* eslint-disable @typescript-eslint/no-var-requires */
const { spacing } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function px(pixels) {
  return `${pixels / 16}rem`
}

module.exports = {
  darkMode: 'class',
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
              code: { color: theme('colors.blue.400') },
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
              code: { color: theme('colors.blue.400') },
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300'),
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32],
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') },
              },
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
          },
        },
      }),
    },
    underlineOffset: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.4rem',
    },
    underlineThickness: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.5rem',
    },
  },
  variants: {
    // backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'dark'],
    extend: {
      backgroundColor: ['dark', 'first', 'last', 'even', 'odd'],
      backgroundOpacity: ['dark'],
      boxShadow: ['dark'],
      borderWidth: ['first', 'last'],
    },
    typography: ['dark'],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/ui'),
    require('tailwind-underline-utils'),
  ],
}
