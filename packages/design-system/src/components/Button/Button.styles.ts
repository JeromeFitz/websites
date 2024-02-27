/* eslint-disable tailwindcss/no-custom-classname */
import type { Variant } from './Button.types'

import { cx } from '../../utils/cx'

export const commonStyles = cx(
  'group inline-flex transition-all duration-200',
  'm-1.5 rounded-md px-4 py-2',
  'font-sans font-medium',
  'outline-none outline-offset-0 ',
  'hocus:ring-1 ring-0 ring-inset',
  'focus:shadow-md',
  'cursor-default hover:cursor-pointer',
)

export const variantStyles = {
  default: cx(),
  empty: cx(),
  ghost: cx(),
  primary: cx(),
  secondary: cx(),
  tertiary: cx(),
  text: cx(),
  // @todo(radix-ui) get these custom classes back
  // primary: cx('pink-button-cta'),
  // secondary: cx('pink-button-outline'),
  // tertiary: cx('pink-button-solid'),
  // text: cx('pink-button-transparent'),
} satisfies Record<Variant, string>