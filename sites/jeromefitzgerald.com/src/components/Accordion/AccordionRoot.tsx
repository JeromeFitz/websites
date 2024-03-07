/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import type { AccordionImplSingleProps } from '@radix-ui/react-accordion'

import { Accordion as AccordionRoot } from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

interface AccordionRootPropsImpl extends AccordionImplSingleProps {
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
