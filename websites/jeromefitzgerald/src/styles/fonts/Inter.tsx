import { getFontFace, templateWoff2 } from '~styles/fonts'

const info = {
  crossOrigin: 'anonymous',
  display: 'swap',
  fontFace: false,
  id: 'inter',
  name: 'Inter',
  weights: {
    400: [
      {
        weight: '400',
        type: 'font/woff2',
        href: '/static/fonts/inter/inter-var-latin.woff2',
        preload: true,
      },
    ],
  },
}

const fontFace = getFontFace(templateWoff2, info)

export { info, fontFace }
