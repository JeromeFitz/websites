/** biome-ignore-all lint/style/useTemplate: migrate */
// import radixColors from '@radix-ui/colors'

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

/**
 * @note(tailwind) you have lost your mind
 */
const globalNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const globalHack = []
const globalDark = []

const notion = {}
notionColors.map((color) => {
  const radixColor = color.split('_')[0]
  // // @note(radix-ui) map gray to slate
  // if (radixColor === 'gray') radixColor = 'slate'

  if (color.includes('_background')) {
    notion['.notion-' + color] = {
      // @note(a11y) Radix-UI uses `4`, but Page Insights warns
      backgroundColor: `var(--${radixColor}3)`,
    }
  } else {
    notion['.notion-' + color] = {
      color: `var(--${radixColor}11)`,
    }

    // globalNumbers.map((n) => {
    //   globalHack.push(
    //     `--${radixColor}${n}: ${radixColors[radixColor][`${radixColor}${n}`]};`
    //   )
    //   globalDark.push(
    //     `--${radixColor}${n}: ${
    //       radixColors[`${radixColor}Dark`][`${radixColor}${n}`]
    //     };`
    //   )
    // })
  }
})

// console.dir(`globalHack:`)
// globalHack.map((g) => console.dir(g))
// console.dir(`globalDark:`)
// globalDark.map((g) => console.dir(g))
// console.dir(`----`)

export default { notion, notionColors }
