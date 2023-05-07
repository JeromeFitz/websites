const radixColors = require('@radix-ui/colors')
const plugin = require('tailwindcss/plugin')

const { backgrounds, buttons } = require('./src/index')

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
const radixPlugin = plugin.withOptions(
  function (options) {
    return function ({ addComponents, addBase }) {
      let radixStyles = {}
      let lightColors = {}
      let darkColors = {}
      let radix = options.colors ?? []
      radix.forEach((color) => {
        const light = { ...radixColors[color] }
        Object.keys(light).forEach(
          (oldKey) =>
            delete Object.assign(light, {
              ['--' + oldKey]: light[oldKey],
            })[oldKey]
        )
        const lightA = { ...radixColors[color + 'A'] }
        Object.keys(lightA).forEach(
          (oldKey) =>
            delete Object.assign(lightA, {
              ['--' + oldKey]: lightA[oldKey],
            })[oldKey]
        )
        const dark = { ...radixColors[color + 'Dark'] }
        Object.keys(dark).forEach(
          (oldKey) =>
            delete Object.assign(dark, {
              ['--' + oldKey]: dark[oldKey],
            })[oldKey]
        )
        const darkA = { ...radixColors[color + 'DarkA'] }
        Object.keys(darkA).forEach(
          (oldKey) =>
            delete Object.assign(darkA, {
              ['--' + oldKey]: darkA[oldKey],
            })[oldKey]
        )
        darkColors = { ...darkColors, ...dark, ...darkA }
        lightColors = { ...lightColors, ...light, ...lightA }
        radixStyles = { ...radixStyles, ...backgrounds, ...buttons }
      })
      addBase({
        ':root': {
          ...lightColors,
        },
        '.dark': {
          ...darkColors,
        },
      })
      addComponents(radixStyles)
    }
  },
  function (options) {
    const chosen = options.colors ?? []
    const filtered = Object.keys(radixColors)
      .filter(
        (color) =>
          chosen.includes(color) && !color.includes('A') && !color.includes('Dark')
      )
      .reduce((obj, key) => {
        Object.keys(radixColors[key]).forEach(
          (color) => (obj[color] = `var(--${color})`)
        )
        return obj
      }, {})
    const filteredA = Object.keys(radixColors)
      .filter(
        (color) =>
          !chosen.includes(color) && color.includes('A') && !color.includes('Dark')
      )
      .reduce((obj, key) => {
        Object.keys(radixColors[key]).forEach(
          (color) => (obj[`${color}`] = `var(--${color})`)
        )
        return obj
      }, {})
    return {
      theme: {
        extend: {
          colors: {
            radix: {
              ...filtered,
              ...filteredA,
            },
          },
        },
      },
    }
  }
)

module.exports = radixPlugin
