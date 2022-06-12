const fonts = {
  inter: {
    fontDisplay: 'optional',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '100 900',
    src: "url('/static/fonts/inter/inter-var.woff2') format('woff2')",
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    //
    href: '/static/fonts/inter/inter-var.woff2',
    preload: true,
    type: 'woff2',
  },
}

const getFontFace = (type: string) => {
  const font = fonts[type.toLowerCase()]
  return !!font
    ? {
        fontFace: `
        @font-face {
          font-display: '${font.fontDisplay}';
          font-family: '${font.fontFamily}';
          font-style: '${font.fontStyle}';
          font-weight: '${font.fontWeight}';
          src: url('${font.href}') format('${font.type}');
        }`,
        ...font,
      }
    : {}
}

export { getFontFace }
