/* eslint-disable @typescript-eslint/no-var-requires */
const {
  backgroundImage,
  boxShadow,
  colors,
  fontFamily,
  lineHeight,
  spacing,
} = require('tailwindcss/defaultTheme')
const colorsTailwind = require('tailwindcss/colors')
const _pick = require('lodash/pick')

const themeColors = colorsTailwind
// const themeColors = _pick(colorsTailwind, [
//   // 'primary',
//   // 'secondary',
//   'gray',
//   'green',
//   'yellow',
//   'violet',
// ])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function px(pixels) {
  return `${pixels / 16}rem`
}

module.exports = {
  darkMode: 'class',
  future: {
    applyComplexClasses: true,
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    enabled: false,
    options: {
      safelist: [
        /ngop/,
        /^bg-error/,
        /^bg-info/,
        /^bg-success/,
        /^bg-warning/,
        'outline-none',
      ],
      keyframes: false,
      fontFace: false,
    },
  },
  theme: {
    backgroundImage: {
      ...backgroundImage,
      'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      'gradient-conic-t': 'conic-gradient(at top, var(--tw-gradient-stops))',
      'gradient-conic-r': 'conic-gradient(at right, var(--tw-gradient-stops))',
      'gradient-conic-b': 'conic-gradient(at bottom, var(--tw-gradient-stops))',
      'gradient-conic-l': 'conic-gradient(at left, var(--tw-gradient-stops))',
      'gradient-conic-tr': 'conic-gradient(at top right, var(--tw-gradient-stops))',
      'gradient-conic-tl': 'conic-gradient(at top left, var(--tw-gradient-stops))',
      'gradient-conic-br':
        'conic-gradient(at bottom right, var(--tw-gradient-stops))',
      'gradient-conic-bl':
        'conic-gradient(at bottom left, var(--tw-gradient-stops))',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'var(--primary)',
      'primary-2': 'var(--primary-2)',
      secondary: 'var(--secondary)',
      'secondary-2': 'var(--secondary-2)',
      hover: 'var(--hover)',
      'hover-1': 'var(--hover-1)',
      'hover-2': 'var(--hover-2)',
      'accents-0': 'var(--accents-0)',
      'accents-1': 'var(--accents-1)',
      'accents-2': 'var(--accents-2)',
      'accents-3': 'var(--accents-3)',
      'accents-4': 'var(--accents-4)',
      'accents-5': 'var(--accents-5)',
      'accents-6': 'var(--accents-6)',
      'accents-7': 'var(--accents-7)',
      'accents-8': 'var(--accents-8)',
      'accents-9': 'var(--accents-9)',
      violet: 'var(--violet)',
      'violet-light': 'var(--violet-light)',
      pink: 'var(--pink)',
      cyan: 'var(--cyan)',
      blue: 'var(--blue)',
      green: 'var(--green)',
      red: 'var(--red)',
      //
      black: {
        DEFAULT: 'var(--black)',
        // ...colors.black,
      },
      white: {
        DEFAULT: 'var(--white)',
        // ...colors.white,
      },
      info: {
        DEFAULT: 'var(--accents-8)',
        lighter: 'var(--accents-6)',
        light: 'var(--accents-7)',
        dark: 'var(--accents-9)',
      },
      error: {
        DEFAULT: 'var(--error)',
        lighter: 'var(--error-lighter)',
        light: 'var(--error-light)',
        dark: 'var(--error-dark)',
      },
      success: {
        DEFAULT: 'var(--success)',
        lighter: 'var(--success-lighter)',
        light: 'var(--success-light)',
        dark: 'var(--success-dark)',
      },
      warning: {
        DEFAULT: 'var(--warning)',
        lighter: 'var(--warning-lighter)',
        light: 'var(--warning-light)',
        dark: 'var(--warning-dark)',
      },
      ...colors,
      ...themeColors,
      // black: colors.black,
      // white: colors.white,
      // gray: colors.coolGray,
      // red: colors.red,
      // yellow: colors.amber,
      // blue: colors.blue,
      // pink: colors.pink,
    },
    // textColor: {
    //   base: 'var(--text-base)',
    //   primary: 'var(--text-primary)',
    //   secondary: 'var(--text-secondary)',
    // },
    boxShadow: {
      'outline-2': '0 0 0 2px var(--accents-2)',
      magical:
        'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      ...boxShadow,
    },
    lineHeight: {
      'extra-loose': '2.2',
      ...lineHeight,
    },
    // scale: {
    //   120: '1.2',
    // },
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
        '3xl': {
          css: {
            fontSize: '1.875rem',
            // h1: {
            //   fontSize: '4rem',
            // },
          },
        },
        '4xl': {
          css: {
            fontSize: '2rem',
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
      pointerEvents: ['hover', 'focus'],
      ringColor: ['dark'],
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
    require('@plaiceholder/tailwindcss'),
  ],
}
