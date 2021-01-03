/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily, spacing } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const _pick = require('lodash/pick')

const themeColors = _pick(colors, ['gray', 'green', 'yellow'])

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
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    enabled: false,
    whitelistPatterns: [/ngop/],
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      black: {
        DEFAULT: 'var(--black)',
        // ...colors.black,
      },
      white: {
        DEFAULT: 'var(--white)',
        // ...colors.white,
      },
      info: {
        DEFAULT: 'var(--info)',
        ligther: 'var(--info-lighter)',
        light: 'var(--info-lighter)',
        dark: 'var(--info-dark)',
      },
      error: {
        DEFAULT: 'var(--error)',
        ligther: 'var(--error-lighter)',
        light: 'var(--error-lighter)',
        dark: 'var(--error-dark)',
      },
      success: {
        DEFAULT: 'var(--success)',
        ligther: 'var(--success-lighter)',
        light: 'var(--success-lighter)',
        dark: 'var(--success-dark)',
      },
      warning: {
        DEFAULT: 'var(--warning)',
        ligther: 'var(--warning-lighter)',
        light: 'var(--warning-lighter)',
        dark: 'var(--warning-dark)',
      },
      ...themeColors,
      // black: colors.black,
      // white: colors.white,
      // gray: colors.coolGray,
      // red: colors.red,
      // yellow: colors.amber,
      // blue: colors.blue,
      // pink: colors.pink,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
          },
        },
        dark: {
          css: {
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
          },
        },
      }),
    },
    screens: {
      md: { min: '768px' },
      // sm: { min: '640px', max: '767px' },
      // md: { min: '768px', max: '1023px' },
      // lg: { min: '1024px', max: '1279px' },
      // xl: { min: '1280px', max: '1535px' },
      // '2xl': { min: '1536px' },
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
      backgroundColor: [
        'dark',
        'even',
        'first',
        'group-hover',
        'hover',
        'last',
        'odd',
      ],
      backgroundOpacity: ['dark'],
      borderColor: ['dark'],
      borderWidth: ['group-hover', 'first', 'last'],
      boxShadow: ['dark'],
      opacity: ['group-hover'],
      scale: ['group-hover'],
      transform: ['group-hover'],
      translate: ['group-hover'],
    },
    typography: ['dark'],
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require('@tailwindcss/ui'),
    require('tailwind-underline-utils'),
  ],
}
