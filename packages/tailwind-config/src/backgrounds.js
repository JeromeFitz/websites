/**
 * @note(radix)
 * https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale
 *
 */
/** biome-ignore-all lint/style/useTemplate: migrate */
import { excludes, radixColors } from './colors'

const backgrounds = {}

radixColors.map((_color) => {
  let color = _color
  if (excludes.includes(color)) {
    color = `${color}A`
  }
  backgrounds['.' + color + '-bg'] = {
    backgroundColor: `var(--${color}3)`,
  }
  backgrounds['.' + color + '-bg-int'] = {
    backgroundColor: `var(--${color}3)`,
  }
  backgrounds['.' + color + '-bg-int:hover'] = {
    backgroundColor: `var(--${color}4)`,
  }
  backgrounds['.' + color + '-bg-int:focus'] = {
    backgroundColor: `var(--${color}5)`,
  }
  backgrounds['.' + color + '-cta'] = {
    backgroundColor: `var(--${color}4)`,
  }
  backgrounds['.' + color + '-cta-text'] = {
    color: `var(--${color}11)`,
  }
  backgrounds['.' + color + '-cta-int'] = {
    backgroundColor: `var(--${color}4`,
  }
  backgrounds['.' + color + '-cta-int:hover'] = {
    backgroundColor: `var(--${color}5)`,
  }
  backgrounds['.' + color + '-cta-int:focus'] = {
    backgroundColor: `var(--${color}6)`,
  }
  backgrounds['.' + color + '-border'] = {
    borderColor: `var(--${color}6)`,
  }
  backgrounds['.' + color + '-border-int'] = {
    borderColor: `var(--${color}7)`,
  }
  backgrounds['.' + color + '-border-int:hover'] = {
    borderColor: `var(--${color}8)`,
  }
  backgrounds['.' + color + '-solid'] = {
    backgroundColor: `var(--${color}9)`,
  }
  backgrounds['.' + color + '-solid-int'] = {
    backgroundColor: `var(--${color}9)`,
  }
  backgrounds['.' + color + '-solid-int:hover'] = {
    backgroundColor: `var(--${color}10)`,
  }
})

export default { backgrounds }
