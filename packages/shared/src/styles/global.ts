import { Gradients } from './const'

const global = {
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    margin: 0,
    color: '$colors$gray12',

    // fontFamily: '$f37bella',
    // fontFamily: '$f37bolton',
    // fontFamily: '$f37ginger',
    // fontFamily: '$f37gingerRound',
    // fontFamily: '$inter',
    // fontFamily: '$name',
    fontFamily: '$sans',

    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',

    backgroundColor: '$colors$gray1',
    '.dark-theme &': {
      backgroundColor: '$colors$gray1',
    },
  },

  svg: {
    display: 'block',
    verticalAlign: 'middle',
  },

  'pre, code': {
    margin: 0,
    fontFamily: '$mono',
  },

  '::selection': {
    backgroundColor: '$slateA5',
    color: '$slate12',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },

  'h1, h2, h3, h4, h5': { fontWeight: 700 },

  'html.nprogress-busy': {
    cursor: 'wait',
  },

  '#nprogress': {
    pointerEvents: 'none',
  },

  '#nprogress .bar': {
    // backgroundColor: '$hiContrast',
    position: 'fixed',
    zIndex: '1001',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
  },
  '.light-theme #nprogress .bar': { backgroundImage: Gradients.light.active },
  '.dark-theme #nprogress .bar': { backgroundImage: Gradients.dark.active },

  ':root': {
    '--colors-spotify-black': '#191414',
    '--colors-spotify-green': '#1DB954',
    '--colors-spotify-white': '#ffffff',
    '--width-1_3': '33.333333%',
    '--width-2_3': '66.666667%',
    '--width-1_4': '25%',
    '--width-2_4': '50%',
    '--width-3_4': '75%',
    '--width-1_5': '20%',
    '--width-2_5': '40%',
    '--width-3_5': '60%',
    '--width-4_5': '80%',
    '--width-1_12': '8.33333333%',
    '--width-2_12': '16.66666667%',
    '--width-3_12': '25%',
    '--width-4_12': '33.33333333%',
    '--width-5_12': '41.66666667%',
    '--width-6_12': '50%',
    '--width-7_12': '58.33333333%',
    '--width-8_12': '66.66666667%',
    '--width-9_12': '75%',
    '--width-10_12': '83.33333333%',
    '--width-11_12': '91.66666667%',
    '--width-full': '100%',
    '--shadow-color': 'var(--local-shadow-color, 45deg 5% 80%)',
  },

  '.hi2ri': {
    '& > path': {
      strokeWidth: '1.5 !important',
    },
  },
}

export default global
