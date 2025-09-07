/** biome-ignore-all lint/style/useTemplate: migrate */
/** biome-ignore-all lint/suspicious/noAssignInExpressions: migrate */
import radixColors from '@radix-ui/colors'
import { withOptions } from 'tailwindcss/plugin'

// biome-ignore lint/correctness/noUnusedImports: migrate
import { backgrounds, buttons, notion, notionColors } from './src/index'

/**
 * @debug
 */
// console.dir(`> radixColors`)
// console.dir(radixColors)
// console.dir(`> backgrounds`)
// console.dir(backgrounds)
// console.dir(`> buttons`)
// console.dir(buttons)
// console.dir(`> notion`)
// console.dir(notion)
/**
 * @note(tailwind) radix-colors-for-tailwind
 *
 * ref: https://github.com/samrobbins85/radix-colors-for-tailwind
 *
 * This is a rework which may be a PR submission
 * I think it would be ideal to pass `A` for people
 * But all of this is very opinionated
 * And we can do more with Buttons I guess :shrug:
 *
 *
 */
const radixPlugin = withOptions(
  function (options) {
    return function ({ addBase, addComponents }) {
      let radixStyles = {}
      let lightColors = {}
      let darkColors = {}
      const radix = options.colors ?? []
      radix.forEach((color) => {
        const light = { ...radixColors[color] }
        Object.keys(light).forEach(
          (oldKey) =>
            delete Object.assign(light, {
              ['--' + oldKey]: light[oldKey],
            })[oldKey],
        )
        const lightA = { ...radixColors[color + 'A'] }
        Object.keys(lightA).forEach(
          (oldKey) =>
            delete Object.assign(lightA, {
              ['--' + oldKey]: lightA[oldKey],
            })[oldKey],
        )
        const dark = { ...radixColors[color + 'Dark'] }
        Object.keys(dark).forEach(
          (oldKey) =>
            delete Object.assign(dark, {
              ['--' + oldKey]: dark[oldKey],
            })[oldKey],
        )
        const darkA = { ...radixColors[color + 'DarkA'] }
        Object.keys(darkA).forEach(
          (oldKey) =>
            delete Object.assign(darkA, {
              ['--' + oldKey]: darkA[oldKey],
            })[oldKey],
        )
        darkColors = { ...darkColors, ...dark, ...darkA }
        lightColors = { ...lightColors, ...light, ...lightA }
        radixStyles = { ...radixStyles, ...backgrounds, ...buttons, ...notion }
      })
      addBase({
        ':root': {
          ...lightColors,
        },
        '.dark': {
          ...darkColors,
        },
      })
      // console.dir(`>> radixStyles > notions`)
      // console.dir(notion)
      addComponents(radixStyles)
    }
  },
  function (options) {
    const chosen = options.colors ?? []
    const filtered = Object.keys(radixColors)
      .filter(
        (color) =>
          chosen.includes(color) && !color.includes('A') && !color.includes('Dark'),
      )
      .reduce((obj, key) => {
        Object.keys(radixColors[key]).forEach(
          (color) => (obj[color] = `var(--${color})`),
        )
        return obj
      }, {})
    const filteredA = Object.keys(radixColors)
      .filter(
        (color) =>
          !chosen.includes(color) && color.includes('A') && !color.includes('Dark'),
      )
      .reduce((obj, key) => {
        Object.keys(radixColors[key]).forEach(
          (color) => (obj[`${color}`] = `var(--${color})`),
        )
        return obj
      }, {})
    // const filteredNotion = {}
    // notionColors.map((n) => {
    //   filteredNotion[n] = n.includes('_background')
    //     ? `var(--${n.split('_')[0]}6)`
    //     : `var(--${n}11)`
    // })

    const radix = {
      ...filtered,
      ...filteredA,
      // ...filteredNotion,
    }
    // console.dir(`>> radix > filteredNotion`)
    // console.dir(filteredNotion)
    return {
      theme: {
        extend: {
          colors: {
            radix,
          },
        },
      },
    }
  },
)

export default radixPlugin
