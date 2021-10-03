// const _pick = require('lodash/pick')
const colorsTailwind = require('tailwindcss/colors')
const {
  backgroundImage,
  boxShadow,
  colors,
  fontFamily,
  fontSize,
  lineHeight,
  spacing,
} = require('tailwindcss/defaultTheme')

const themeColors = colorsTailwind
// const themeColors = _pick(colorsTailwind, [
//   // 'primary',
//   // 'secondary',
//   'gray',
//   'green',
//   'yellow',
//   'violet',
// ])

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function px(pixels) {
//   return `${pixels / 16}rem`
// }

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
        /^tooltip/,
        '.tooltip',
        'tooltip',
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
        // // ...colors.black,
      },
      white: {
        DEFAULT: 'var(--white)',
        // // ...colors.white,
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
      // // black: colors.black,
      // // white: colors.white,
      // // gray: colors.coolGray,
      // // red: colors.red,
      // // yellow: colors.amber,
      // // blue: colors.blue,
      // // pink: colors.pink,
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
    // @todo(merge from default)
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1.125' }],
      '6xl': ['3.75rem', { lineHeight: '1.25' }],
      '7xl': ['4.5rem', { lineHeight: '1.25' }],
      '8xl': ['6rem', { lineHeight: '1.25' }],
      '9xl': ['8rem', { lineHeight: '1.25' }],
    },
    lineHeight: {
      'extra-loose': '2.2',
      ...lineHeight,
    },
    minWidth: {
      0: '0',
      xs: '10%',
      sm: '15%',
      '1/4': '25%',
      '1/3': '33%',
      '1/2': '50%',
      '2/3': '66%',
      '3/4': '75%',
      full: '100%',
    },
    // scale: {
    //   120: '1.2',
    // },
    extend: {
      backgroundSize: {
        'size-100': '100% 100%',
        'size-125': '125% 125%',
        'size-150': '150% 150%',
        'size-175': '175% 175%',
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-25': '25% 25%',
        'pos-50': '50% 50%',
        'pos-75': '75% 75%',
        'pos-100': '100% 100%',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        // sans: ['Inter'],
      },
      lineHeight: {
        'leading-tighter': '1.125',
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
      zIndex: {
        '-1': -1,
      },
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
    // zIndex: ['before', 'hover', 'active'],
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
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-underline-utils'),
    // require('@plaiceholder/tailwindcss'),
    require('./patches/@plaiceholder/tailwindcss/dist/plugin'),
  ],
}
