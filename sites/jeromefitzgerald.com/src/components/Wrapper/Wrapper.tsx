import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import type { As } from '@/components/Headline/Headline.types'

interface WrapperProps {
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
    <Flex
      asChild
      className={cx('inset-y-0 z-50 items-center', className)}
      direction="column"
      maxWidth="1640px" // screen-xl
      mx="auto"
    >
      <Component {...props}>{children}</Component>
    </Flex>
  )
}

export { Wrapper }
