import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

import { forwardRef } from 'react'

import type { As } from './Headline.types'

type GridProps = {
  as?: As
  children: ReactNode
  className?: string
}

const Grid = forwardRef(function Grid(
  { as = 'div', children, className }: GridProps,
  forwardedRef,
) {
  const Component: As = as
  return (
    <Component
      className={cx(
        'grid grid-cols-12 gap-2 lg:gap-4',
        'mb-1 mr-1',
        'p-4 lg:p-8',
        'w-full',
        '',
        className,
      )}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={forwardedRef}
    >
      {children}
    </Component>
  )
})

export { Grid }
