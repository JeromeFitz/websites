/**
 * @note(radix)
 * https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale
 *
 */
/** biome-ignore-all lint/style/useTemplate: migrate */
import { excludes, foregroundTextBlack, radixColors } from './colors'

const buttons = {}
const types = ['', '-cta', '-outline', '-solid', '-transparent']
const buttonTypes = []

radixColors.map((color) => {
  if (excludes.includes(color)) {
    return
  }
  types.map((type) => {
    const base = `${color}-button`
    buttonTypes.push(`${base}${type}`)
  })
  /**
   * @note(radix) Steps 3–5: Component backgrounds
   */
  buttons['.' + color + '-button'] = {
    '&:active': {
      '--tw-ring-color': `var(--${color}12)`,
      backgroundColor: `var(--${color}5)`,
      color: `var(--${color}12)`,
    },
    '&:focus': {
      '--tw-ring-color': `var(--${color}12)`,
      backgroundColor: `var(--${color}6)`,
    },
    '&:hover': {
      '--tw-ring-color': `var(--${color}11)`,
      backgroundColor: `var(--${color}4)`,
      color: `var(--${color}11)`,
    },
    backgroundColor: `var(--${color}3)`,
    color: `var(--${color}11)`,
  }
  /**
   * @note(radix) Steps 3–5: Component backgrounds
   */
  // @note(a11y) Radix-UI uses `4`, but Page Insights warns
  buttons['.' + color + '-button-cta'] = {
    '&:active': {
      '--tw-ring-color': `var(--${color}12)`,
      backgroundColor: `var(--${color}6)`,
      color: `var(--${color}12)`,
    },
    '&:focus': {
      '--tw-ring-color': `var(--${color}12)`,
      backgroundColor: `var(--${color}7)`,
    },
    '&:hover': {
      '--tw-ring-color': `var(--${color}11)`,
      backgroundColor: `var(--${color}5)`,
      color: `var(--${color}11)`,
    },
    backgroundColor: `var(--${color}3)`,
    color: `var(--${color}11)`,
  }
  /**
   * @note(radix) Steps 6–8: Borders
   */
  buttons['.' + color + '-button-outline'] = {
    '--tw-ring-color': `var(--${color}6)`,
    '&:active': {
      '--tw-ring-color': `var(--${color}8)`,
      backgroundColor: `var(--${color}2)`,
      borderColor: `var(--${color}8)`,
      color: `var(--${color}12)`,
    },
    '&:focus': {
      '--tw-ring-color': `var(--${color}9)`,
      borderColor: `var(--${color}9)`,
    },
    '&:hover': {
      '--tw-ring-color': `var(--${color}7)`,
      borderColor: `var(--${color}7)`,
    },
    backgroundColor: `var(--${color}1)`,
    borderColor: `var(--${color}6)`,
    borderWidth: `2px`,
    color: `var(--${color}11)`,
  }
  /**
   * @note(radix) Steps 9–10: Solid backgrounds
   */
  buttons['.' + color + '-button-solid'] = {
    '&:active': {
      '--tw-ring-color': `var(--${color}12)`,
      backgroundColor: `var(--${color}11)`,
    },
    '&:focus': {
      '--tw-ring-color': `var(--${color}12)`,
      // backgroundColor: `var(--${color}12)`,
    },
    '&:hover': {
      '--tw-ring-color': `var(--${color}11)`,
      backgroundColor: `var(--${color}10)`,
    },
    backgroundColor: `var(--${color}9)`,
    color: foregroundTextBlack.includes(color) ? `black` : `white`,
  }
  /**
   * @note(radix) Transparent backgrounds
   */
  buttons['.' + color + '-button-transparent'] = {
    '&:active': {
      '--tw-ring-color': `var(--${color}12)`,
      backgroundColor: `var(--${color}5)`,
      color: `var(--${color}12)`,
    },
    '&:focus': {
      '--tw-ring-color': `var(--${color}12)`,
      backgroundColor: `var(--${color}6)`,
    },
    '&:hover': {
      '--tw-ring-color': `var(--${color}11)`,
      backgroundColor: `var(--${color}4)`,
      color: `var(--${color}11)`,
    },
    backgroundColor: `transparent`,
    color: `var(--${color}11)`,
  }
})

export default { buttons, buttonTypes }
