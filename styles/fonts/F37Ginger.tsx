import { getFontFace, templateWoff2 } from '~styles/fonts'

const info = {
  crossOrigin: 'anonymous',
  display: 'swap',
  fontFace: true,
  id: 'f37ginger',
  name: 'F37 Ginger',
  weights: {
    400: [
      {
        weight: '400',
        type: 'font/woff2',
        href: '/noprecache/fonts/f37-ginger/F37Ginger-Regular.woff2',
        preload: true,
      },
    ],
    700: [
      {
        weight: '700',
        type: 'font/woff2',
        href: '/noprecache/fonts/f37-ginger/F37Ginger-Bold.woff2',
        preload: true,
      },
    ],
  },
}

const fontFace = getFontFace(templateWoff2, info)

export { info, fontFace }
