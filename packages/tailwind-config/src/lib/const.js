const radixColors = [
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

/**
 * @note(radix) These colors should have `black` text instead of `white`
 * ref: https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#steps-910-solid-backgrounds
 */
const foregroundTextBlack = ['sky', 'mint', 'lime', 'yellow', 'amber']
const excludes = ['white', 'black']

module.exports = { excludes, foregroundTextBlack, radixColors }
