import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'

import type { As } from '~app/playground/2024/_components/Headline.types'

type WrapperProps = {
  as?: As
  asChild?: boolean
  children: ReactNode
  className?: string
}
function Wrapper({
  as = 'div',
  asChild = false,
  children,
  className,
  ...props
}: WrapperProps) {
  const Component = asChild ? Slot : as
  return (
    <Component
      className={cx(
        'inset-y-0 z-50 flex w-full flex-col items-center',
        'mx-auto max-w-screen-xl',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export { Wrapper }
