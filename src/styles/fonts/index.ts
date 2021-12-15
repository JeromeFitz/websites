import _map from 'lodash/map'

const templateWoff2 = `@font-face {
  font-family: '#name#';
  font-weight: #weight#;
  font-display: swap;
  src: url(#woff2#) format('woff2');
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
