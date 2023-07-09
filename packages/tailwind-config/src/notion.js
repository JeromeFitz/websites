const notionColors = [
  // 'default',
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'gray_background',
  'brown_background',
  'orange_background',
  'yellow_background',
  'green_background',
  'blue_background',
  'purple_background',
  'pink_background',
  'red_background',
]

const notion = {}
notionColors.map((color) => {
  // @note(radix-ui) map gray to slate
  let radixColor = color.split('_')[0]
  if (radixColor === 'gray') radixColor = 'slate'
  if (color.includes('_background')) {
    notion['.notion-' + color] = {
      backgroundColor: `var(--${radixColor}4)`,
    }
  } else {
    notion['.notion-' + color] = {
      color: `var(--${radixColor}11)`,
    }
  }
})

module.exports = { notion, notionColors }
