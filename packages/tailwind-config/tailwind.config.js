const { mauveA, mauveDarkA, blackA, whiteA } = require('@radix-ui/colors')
const { colors } = require('tailwindcss/colors')
const theme = require('tailwindcss/defaultTheme')
const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default

const hocusPlugin = require('./hocus.plugin')

// function px(pixels) {
//   return `${pixels / 16}rem`
// }

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// ref: https://github.com/fergusmeiklejohn/framer-recipes
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    newVars,
  })
}

function addRadixOverlays({ addBase, theme }) {
  // let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries([blackA, whiteA, mauveA]).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    newVars,
  })
}

/** @type {import('tailwindcss').Config} */
const config = ({}) => ({
  content: [
    './node_modules/@plaiceholder/ui/**/*.{ts,tsx}',
    './node_modules/next-notion/src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/playground/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  // future: {
  //   removeDeprecatedGapUtilities: true,
  //   purgeLayersByDefault: true,
  // },
  // purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...theme,
    colors,
    // colors: {},
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      animation: {
        // accordion
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        // alert-dialog, dialog
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        // dropdown, hovercard, popover, tooltip
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        // navigation-menu
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        // toast
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
      boxShadow: {
        slider: '0 0 0 5px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        ...colors,
        brand: {
          50: '#f3f3f3',
          100: '#e7e7e7',
          200: '#c4c4c4',
          300: '#a0a0a0',
          400: '#585858',
          500: '#111111',
          600: '#0f0f0f',
          700: '#0d0d0d',
          800: '#0a0a0a',
          900: '#080808',
          DEFAULT: '#111111',
        },
        current: 'current',
        inherit: 'inherit',
        transparent: 'transparent',
        //
        black: '#0f0f0f',
        white: '#f4f4f4',
        // social
        github: '#000000',
        instagram: '#c32aa3',
        linkedin: '#0a66c2',
        spotify: '#1ed760',
        'spotify-dark': '#1db954',
        twitter: '#1da1f2',
        //
        // contrast: {
        //   lo: 'var(--contrast-lo)',
        //   hi: 'var(--contrast-hi)',
        // },
      },
      fontFamily: {
        sans: [
          ['var(--font-inter)', ...theme.fontFamily.sans],
          {
            // https://rsms.me/inter/lab/?feat-cv01=1&feat-ss01=1&feat-ss02=1&feat-ss03=1&invert-colors=1&wght=900
            fontFeatureSettings:
              '"calt", "zero", "cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv08", "cv09", "cv10", "cv11"',
            // fontFeatureSettings:
            //   '"case", "zero", "ss04", "ss05", "ss07", "ss11", "ss12"',
          },
        ],
      },
      keyframes: {
        // accordion
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // alert-dialog, dialog
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        // hovercard, popover, tooltip
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        // navigation-menu
        enterFromRight: {
          from: { opacity: 0, transform: 'translateX(200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: 'translateX(-200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        // toast
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0))' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      letterSpacing: {
        'widest-extra': '0.125em',
        tightest: '-0.075em',
      },
      lineHeight: {
        'loose-extra': '2.125',
        tighter: '1.125',
      },
    },
  },
  plugins: [
    hocusPlugin,
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    // require('@plaiceholder/tailwindcss'),
    require('@tailwindcss/forms'),
    require('radix-colors-for-tailwind')({
      colors: [
        'tomato',
        'red',
        'crimson',
        'pink',
        'plum',
        'purple',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'grass',
        'orange',
        'brown',
        // bright
        'sky',
        'mint',
        'lime',
        'yellow',
        'amber',
        // grays
        'gray',
        'mauve',
        'slate',
        'sage',
        'olive',
        'sand',
        // metals
        'gold',
        'bronze',
        // overlays
        'blackA',
        'whiteA',
      ],
    }),
    require('tailwindcss-radix')({ variantPrefix: 'radix' }),
    addVariablesForColors,
    addRadixOverlays,
  ],
  variants: {
    extend: {
      backgroundColor: [
        'dark',
        'even',
        'first',
        'group-hover',
        'group-hocus',
        'hocus',
        'hover',
        'last',
        'odd',
      ],
      backgroundOpacity: ['dark'],
      borderColor: ['dark'],
      borderWidth: ['group-hover', 'group-hocus', 'first', 'last'],
      boxShadow: ['dark'],
      opacity: ['group-hover', 'group-hocus'],
      pointerEvents: ['hover', 'focus', 'hocus'],
      ringColor: ['dark'],
      scale: ['group-hover', 'group-hocus'],
      transform: ['group-hover', 'group-hocus'],
      translate: ['group-hover', 'group-hocus'],
    },
    typography: ['dark'],
  },
})

module.exports = config
