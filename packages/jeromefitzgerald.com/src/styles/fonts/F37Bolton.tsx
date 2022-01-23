import { getFontFace, templateWoff2 } from '~styles/fonts'

const info = {
  crossOrigin: 'anonymous',
  display: 'swap',
  fontFace: true,
  id: 'f37bolton',
  name: 'F37 Bolton',
  weights: {
    400: [
      {
        weight: '400',
        type: 'font/woff2',
        href: '/noprecache/fonts/f37-bolton/F37Bolton-Regular.woff2',
        preload: true,
      },
    ],
    700: [
      {
        weight: '700',
        type: 'font/woff2',
        href: '/noprecache/fonts/f37-bolton/F37Bolton-Bold.woff2',
        preload: true,
      },
    ],
  },
}

const fontFace = getFontFace(templateWoff2, info)

export { info, fontFace }
