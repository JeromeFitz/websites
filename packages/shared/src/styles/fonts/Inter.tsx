import { getFontFace, templateWoff2 } from './index'

const info = {
  crossOrigin: 'anonymous',
  display: 'optional',
  fontFace: false,
  id: 'inter',
  name: 'Inter',
  weights: {
    400: [
      {
        weight: '100 900',
        type: 'font/woff2',
        // @note(shared) this needs to exist in public
        href: '/static/fonts/inter/inter-var.woff2',
        preload: true,
      },
    ],
  },
}

const fontFace = getFontFace(templateWoff2, info)

export { info, fontFace }
