import _map from 'lodash/map'

/**
 * @note Remnant from when ther were
 *  mutliple fonts to choose from.
 */

const templateWoff2 = `@font-face {
  font-display: optional;
  font-family: '#name#';
  font-style: normal;
  font-weight: #weight#;
  src: url(#woff2#) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}`
// const templateWoff = `@font-face {
//   font-family: '#name#';
//   font-weight: #weight#;
//   font-display: swap;
//   src: url(#woff2#) format('woff2'), url(#woff#) format('woff');
// }`
const getFontFace = (template, info) => {
  const { fontFace, name, weights } = info
  return fontFace
    ? _map(
        weights,
        (file) =>
          template
            .replace('#name#', name)
            .replace('#weight#', file[0].weight)
            .replace('#woff2#', file[0].href)
        // .replace('#woff#', file[1].href)
      ).join(' ')
    : ''
}

export { getFontFace, templateWoff2 }
