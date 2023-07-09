/**
 * @note(tailwind) each site may _not_ want _every_ color
 */
const isDev = process.env.NODE_ENV === 'development'
const siteColors = [
  'black',
  // 'gray',
  'orange',
  'pink',
  'purple',
  'slate',
  'white',
  // '',
]

const _radixColors = [
  'tomato',
  'red',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'grass',
  'orange',
  'brown',
  // bright
  'sky',
  'mint',
  'lime',
  'yellow',
  'amber',
  // grays
  'gray',
  'mauve',
  'slate',
  'sage',
  'olive',
  'sand',
  // metals
  'gold',
  'bronze',
  // overlays
  'black',
  'white',
]
const radixColors = !isDev ? _radixColors : siteColors
/**
 * @note(radix) These colors should have `black` text instead of `white`
 * ref: https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#steps-910-solid-backgrounds
 */
const foregroundTextBlack = ['sky', 'mint', 'lime', 'yellow', 'amber']
const excludes = ['white', 'black']

module.exports = { excludes, foregroundTextBlack, radixColors }
