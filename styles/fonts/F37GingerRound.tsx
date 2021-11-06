import { getFontFace, templateWoff2 } from '~styles/fonts'

const info = {
  crossOrigin: 'anonymous',
  display: 'swap',
  id: 'f37gingerRound',
  name: 'F37 Ginger Round',
  weights: {
    400: [
      {
        weight: '400',
        type: 'font/woff2',
        href: '/noprecache/fonts/f37-ginger-round/F37GingerRound-Regular.woff2',
        preload: true,
      },
    ],
    700: [
      {
        weight: '700',
        type: 'font/woff2',
        href: '/noprecache/fonts/f37-ginger-round/F37GingerRound-Bold.woff2',
        preload: true,
      },
    ],
  },
}

const fontFace = getFontFace(templateWoff2, info)

export { info, fontFace }
