import { getFontFace, templateWoff2 } from '~styles/fonts'

const info = {
  crossOrigin: 'anonymous',
  display: 'swap',
  fontFace: true,
  id: 'name',
  name: 'Name Sans',
  weights: {
    400: [
      {
        weight: '400',
        type: 'font/woff2',
        href: '/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Regular.woff2',
        preload: true,
      },
    ],
    700: [
      {
        weight: '700',
        type: 'font/woff2',
        href: '/noprecache/fonts/name-sans/statics/Name_Sans_Standard-Bold.woff2',
        preload: true,
      },
    ],
  },
}

const fontFace = getFontFace(templateWoff2, info)

export { info, fontFace }
