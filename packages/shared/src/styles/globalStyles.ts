import { darkTheme } from '@jeromefitz/design-system'

import { Gradients } from './const'

/**
 * @lol(inter) this was ... not working before!?
 */
const globalCss = {
  '@font-face': {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '100 900',
    src: "url(/static/fonts/inter/inter-var.woff2) format('woff2')",
    fontDisplay: 'optional',
  },
  // '@font-face': {
  //   fontFamily: 'Inter',
  //   fontStyle: 'normal',
  //   fontWeight: '100 900',
  //   src: "url(/static/fonts/inter/inter-var-full.woff2) format('woff2')",
  //   fontDisplay: 'optional',
  // },
  // '@font-face': {
  //   fontFamily: 'Inter',
  //   fontStyle: 'italic',
  //   fontWeight: '100 900',
  //   src: "url(/static/fonts/inter/inter-var-italic.woff2) format('woff2')",
  //   fontDisplay: 'optional',
  // },

  '::selection': {
    backgroundColor: '$colors$slateA5',
    color: '$colors$slate12',
  },

  body: {
    fontFeatureSettings: '"calt","zero","ss03","cv01","cv05","cv08","cv09","cv10"',
    fontVariantNumeric: 'unset !important',
    fontVariationSettings: '"wght" 625, "slnt" 0',
    letterSpacing: '-0.045em',
  },

  'h1, h2, h3, h4, h5': {
    fontWeight: 800,
    fontFeatureSettings: '"calt","zero","ss03","cv01","cv05","cv08","cv09","cv10"',
    fontVariantNumeric: 'unset !important',
    fontVariationSettings: '"wght" 625, "slnt" 0',
    letterSpacing: '-0.045em',
  },

  'p, span': {
    fontWeight: 500,
    fontFeatureSettings:
      '"calt","kern","zero","ss03","cv01","cv05","cv08","cv09","cv10"',
    fontVariantNumeric: 'unset !important',
    fontVariationSettings: '"wght" 625, "slnt" 0',
    letterSpacing: '-0.06em !important',
  },

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
    backgroundImage: Gradients.light.active,
  },
  [`.${darkTheme} #nprogress .bar`]: {
    backgroundImage: Gradients.dark.active,
  },
}

const globalRoot = {
  // '--fonts-sans': 'Inter',
  // '--colors-body': 'yellow',
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
}

const globalStyles = {
  ':root': {
    ...globalRoot,
  },
  ...globalCss,
}

export { globalStyles }
