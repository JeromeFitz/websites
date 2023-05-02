import { cx } from '../../utils/cx'

import type { Variant } from './Button.types'

export const commonStyles = cx(
  'group inline-flex transition-all duration-500',
  'm-1.5 p-2',
  ''
)

export const variantStyles = {
  default: cx(
    'bg-radix-mauve1 text-radix-mauve12',
    'hocus:bg-radix-mauve12 hocus:text-radix-mauve1',
    'ring-radix-mauve3 ring-1 ring-inset dark:ring-0',
    'text-3xl font-black'
  ),
  empty: cx(),
  ghost: cx('', '', ''),
  primary: cx(
    'bg-radix-blue3 text-radix-blue11',
    'hocus:bg-radix-blue4 hocus:text-radix-blue12',
    ''
  ),
  secondary: cx(),
  tertiary: cx(),
  text: cx('text-radix-mauve12', 'hocus:bg-radix-mauve2 dark:hocus:bg-radix-mauve7'),
} satisfies Record<Variant, string>
