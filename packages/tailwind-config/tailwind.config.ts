/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

import { radixThemePreset } from 'radix-themes-tw'
import theme from 'tailwindcss/defaultTheme'

import hocusPlugin from './hocus.plugin.js'

// const safelist = ['cursor-pointer', 'hidden', 'md:hidden']

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getConfig = ({ useTailwind = true }): Config => ({
  content: [
    /**
     * @note(tailwind) lol, if we do this, can we avoid the hack
     *  in app/design-system/page ?
     */
    '../../packages/design-system/src/**/*.{ts,tsx}',
    '../../packages/next-notion/src/**/*.{ts,tsx}',
    '../../packages/shared/src/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/playground/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
    // './node_modules/@radix-ui/themes/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  // future: {
  //   removeDeprecatedGapUtilities: true,
  //   purgeLayersByDefault: true,
  // },
  plugins: [
    hocusPlugin,
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  presets: [radixThemePreset],
  // safelist: [
  //   ...safelist,
  //   // {
  //   //   pattern: /bg-+/,
  //   // },
  //   // {
  //   //   pattern: /radix-+/,
  //   // },
  //   // {
  //   //   pattern: /text-+/,
  //   // },
  // ],
  theme: {
    // ...theme,
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
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        // toast
        hide: 'hide 100ms ease-in',
        // alert-dialog, dialog
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        // navigation-menu
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        // accordion
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        // dropdown, hovercard, popover, tooltip
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        // text based
        sweep: 'sweep calc(var(--width)*6ms) infinite alternate ease-in-out',
        swipeOut: 'swipeOut 100ms ease-out',
        // sweep: 'sweep 1s infinite alternate ease-in-out',
      },
      backgroundImage: {
        breeze: 'linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))',
        // candy: 'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))',
        // crimson: 'linear-gradient(140deg, rgb(255, 99, 99), rgb(115, 52, 52))',
        // falcon: 'linear-gradient(140deg, rgb(189, 227, 236), rgb(54, 54, 84))',
        // meadow: 'linear-gradient(140deg, rgb(89, 212, 153), rgb(160, 135, 45))',
        // midnight: 'linear-gradient(140deg, rgb(76, 200, 200), rgb(32, 32, 51))',
        // raindrop: 'linear-gradient(140deg, rgb(142, 199, 251), rgb(28, 85, 170))',
        // sunset: 'linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))',
        // // @note(tailwind) hard-coded reverse
        'breeze-r': 'linear-gradient(140deg, rgb(106, 61, 236), rgb(207, 47, 152))',
        // 'candy-r': 'linear-gradient(140deg, rgb(233, 191, 248), rgb(165, 142, 251))',
        // 'crimson-r': 'linear-gradient(140deg, rgb(115, 52, 52), rgb(255, 99, 99))',
        // 'falcon-r': 'linear-gradient(140deg, rgb(54, 54, 84), rgb(189, 227, 236))',
        // 'meadow-r': 'linear-gradient(140deg, rgb(160, 135, 45), rgb(89, 212, 153))',
        // 'midnight-r': 'linear-gradient(140deg, rgb(32, 32, 51), rgb(76, 200, 200))',
        // 'raindrop-r':
        //   'linear-gradient(140deg, rgb(28, 85, 170), rgb(142, 199, 251))',
        // 'sunset-r': 'linear-gradient(140deg, rgb(255, 122, 47), rgb(255, 207, 115))',
      },
      borderWidth: {
        1: '1px',
      },
      boxShadow: {
        slider: '0 0 0 5px rgba(0, 0, 0, 0.3)',
      },
      /* eslint-disable perfectionist/sort-objects */
      colors: {
        /**
         * App
         */
        // // Gray 00, 100
        // black: '#000000',
        // white: '#ffffff',

        // Gray 01, 99
        black: '#030303',
        white: '#fcfcfc',

        // // Gray 02, 98
        // black: '#050505',
        // white: '#fafafa',

        // // Gray 06, 94
        // black: '#0f0f0f',
        // white: '#f4f4f4',

        /**
         * Social
         */
        bluesky: '#3399FF', // #87CEEB
        github: 'var(--black-a1)',
        'github-dark': 'var(--white-a1)',
        inherit: 'inherit',
        instagram: '#c32aa3',
        linkedin: '#0a66c2',
        spotify: '#1ed760',
        'spotify-dark': '#1db954',
        threads: '#c32aa3',
        twitter: '#1da1f2',
        /**
         * Other
         */
        current: 'current',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        transparent: 'transparent',
        //
        // contrast: {
        //   lo: 'var(--contrast-lo)',
        //   hi: 'var(--contrast-hi)',
        // },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', ...theme.fontFamily.mono],
        // ],
        sans: ['var(--font-geist-sans)', ...theme.fontFamily.sans],
        // sans: [
        //   ['var(--font-inter)', ...theme.fontFamily.sans],
        //   {
        //     /**
        //      * @note(font) INTER
        //      *
        //      * ref: https://rsms.me/inter/lab/?feat-cv01=1&feat-ss01=1&feat-ss02=1&feat-ss03=1&invert-colors=1&wght=900
        //      *
        //      */
        //     fontFeatureSettings:
        //       '"calt", "zero", "cv01", "cv02", "cv03", "cv04", "cv05", "cv06", "cv08", "cv09", "cv10", "cv11"',
        //     fontVariationSettings: '"opsz" 32',
        //   },
        // ],
      },
      keyframes: {
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        // navigation-menu
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        // toast
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        // alert-dialog, dialog
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        // accordion
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        // hovercard, popover, tooltip
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0))' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      letterSpacing: {
        tightest: '-0.075em',
        'widest-extra': '0.125em',
      },
      lineHeight: {
        'loose-extra': '2.125',
        tighter: '1.125',
      },
      transitionDuration: {
        125: '125ms',
        250: '250ms',
      },
    },
  },
  // variants: {
  //   extend: {
  //     backgroundColor: [
  //       'dark',
  //       'even',
  //       'first',
  //       'group-hover',
  //       'group-hocus',
  //       'hocus',
  //       'hover',
  //       'last',
  //       'odd',
  //     ],
  //     backgroundOpacity: ['dark'],
  //     borderColor: ['dark'],
  //     borderWidth: ['group-hover', 'group-hocus', 'first', 'last'],
  //     boxShadow: ['dark'],
  //     opacity: ['group-hover', 'group-hocus'],
  //     pointerEvents: ['hover', 'focus', 'hocus'],
  //     ringColor: ['dark'],
  //     scale: ['group-hover', 'group-hocus'],
  //     transform: ['group-hover', 'group-hocus'],
  //     translate: ['group-hover', 'group-hocus'],
  //   },
  //   typography: ['dark'],
  // },
})

export default getConfig
