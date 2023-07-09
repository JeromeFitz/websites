import { cx } from '../../utils/cx'

import type { Variant } from './Button.types'

export const commonStyles = cx(
  'group inline-flex transition-all duration-500',
  'm-1.5 rounded-md px-4 py-2',
  'font-sans font-medium',
  'outline-none outline-offset-0 ',
  'hocus:ring-1 ring-0 ring-inset',
  'focus:shadow-md',
  'cursor-default hover:cursor-pointer'
)

export const variantStyles = {
  default: cx(),
  empty: cx(''),
  ghost: cx(),
  primary: cx('tomato-button-cta'),
  secondary: cx('tomato-button-outline'),
  tertiary: cx('tomato-button-solid'),
  text: cx('tomato-button-transparent'),
} satisfies Record<Variant, string>
