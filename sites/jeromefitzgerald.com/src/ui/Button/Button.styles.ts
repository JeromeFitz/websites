// import { Fragment } from 'react'

import { cx } from '~utils/cx'

import type { Variant } from './Button.types'

export const commonStyles = cx(
  'group inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold',
  'transition-all duration-500',
  ''
)

export const variantStyles = {
  primary: cx(
    'bg-radix-blue3 text-radix-blue11',
    'hocus:bg-radix-blue4 hocus:text-radix-blue12',
    ''
  ),
  default: cx(
    'bg-radix-mauve1 text-radix-mauve12',
    'hocus:bg-radix-mauve12 hocus:text-radix-mauve1',
    'ring-radix-mauve3 ring-1 ring-inset dark:ring-0'
  ),
  text: cx('text-radix-mauve12', 'hocus:bg-radix-mauve2 dark:hocus:bg-radix-mauve7'),
} satisfies Record<Variant, string>
