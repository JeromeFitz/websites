import { getFontFace, templateWoff2 } from '~styles/fonts'

const info = {
  crossOrigin: 'anonymous',
  display: 'swap',
  fontFace: true,
  id: 'iiIncrementalSans',
  name: 'II Incremental Sans',
  weights: {
    400: [
      {
        weight: '400',
        type: 'font/woff2',
        href: '/noprecache/fonts/ii-incremental-sans/lite/ii-increments-sans-regular.woff2',
        preload: true,
      },
    ],
    700: [
      {
        weight: '700',
        type: 'font/woff2',
        href: '/noprecache/fonts/ii-incremental-sans/lite/ii-increments-sans-bold.woff2',
        preload: true,
      },
    ],
  },
}

const fontFace = getFontFace(templateWoff2, info)

export { info, fontFace }
