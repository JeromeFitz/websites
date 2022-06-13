import { darkTheme } from '@jeromefitz/design-system'
import { Gradients } from '@jeromefitz/shared/src/styles/const'
import { getFontFace } from '@jeromefitz/shared/src/styles/fonts'

const sans = 'Inter'
const fontSans: any = getFontFace(sans)

const fonts = {
  mono: '$fonts$fallback-mono',
  serif: '$fonts$fallback-serif',
  sans: `${fontSans.fontFamily}, $fonts$fallback-sans`,
}

const globalCss = {
  // '@font-face': {
  //   fontFamily: fontSans.fontFamily,
  //   fontStyle: fontSans.fontStyle,
  //   fontWeight: fontSans.fontWeight,
  //   src: `url('${fontSans.href}') format('${fontSans.fontType}')`,
  //   fontDisplay: fontSans.fontDisplay,
  // },
  // '@font-face': {
  //   fontFamily: sans,
  //   fontStyle: 'italic',
  //   fontWeight: '100 900',
  //   src: "url(/static/fonts/inter/inter-var-italic.woff2) format('woff2')",
  //   fontDisplay: 'swap',
  // },

  '::selection': {
    backgroundColor: '$colors$slateA5',
    color: '$colors$slate12',
  },

  // https://rsms.me/inter/lab/?feat-cv01=1&feat-ss01=1&feat-ss02=1&feat-ss03=1&invert-colors=1&wght=900
  body: {
    fontFeatureSettings:
      '"calt", "zero", "ss03", "cv01", "cv05", "cv08", "cv09", "cv10", "salt"',
  },

  'html.nprogress-busy': {
    cursor: 'wait',
  },

  '#nprogress': {
    pointerEvents: 'none',
  },

  '#nprogress .bar': {
    position: 'fixed',
    zIndex: '$max',
    top: 0,
    left: 0,
    width: '100%',
    height: '$spaces$1',
    backgroundImage: Gradients.light.active,
  },
  [`.${darkTheme} #nprogress .bar`]: {
    backgroundImage: Gradients.dark.active,
  },
}

const globalRoot = {
  '--colors-spotify-black': '#191414',
  '--colors-spotify-green': '#1DB954',
  '--colors-spotify-white': '#ffffff',
  '--fonts-mono': fonts.mono,
  '--fonts-sans': fonts.sans,
  '--fonts-serif': fonts.serif,
  '--shadow-color': 'var(--local-shadow-color, 45deg 5% 80%)',
}

const globalStyles = {
  ':root': {
    ...globalRoot,
  },
  ...globalCss,
}

export { globalStyles }
