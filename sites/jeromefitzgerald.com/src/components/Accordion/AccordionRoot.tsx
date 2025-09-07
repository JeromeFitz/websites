'use client'

import { Accordion as AccordionRoot } from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

interface AccordionRootPropsImpl {
  children?: any
  className?: any
  type?: 'multiple' | 'single'
}

const AccordionRootImpl = forwardRef(
  (
    { children, className, type = 'single', ...props }: AccordionRootPropsImpl,
    forwardedRef,
  ) => (
    <AccordionRoot
      className={className}
      {...props}
      // @ts-ignore
      ref={forwardedRef}
      type={type}
    >
      {children}
    </AccordionRoot>
  ),
)

export { AccordionRootImpl as AccordionRoot }
