'use client'

import { Accordion as AccordionRoot } from '@radix-ui/react-accordion'

interface AccordionRootPropsImpl {
  children?: any
  className?: any
  type?: 'multiple' | 'single'
  ref?: any
}

const AccordionRootImpl = ({
  children,
  className,
  type = 'single',
  ref,
  ...props
}: AccordionRootPropsImpl) => (
  <AccordionRoot className={className} {...props} ref={ref} type={type}>
    {children}
  </AccordionRoot>
)

export { AccordionRootImpl as AccordionRoot }
