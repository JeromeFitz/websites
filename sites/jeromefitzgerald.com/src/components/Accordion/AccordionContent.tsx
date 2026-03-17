'use client'

import type { AccordionContentProps } from '@radix-ui/react-accordion'

import * as Accordion from '@radix-ui/react-accordion'

import { cx } from '@/utils/cx'

interface AccordionContentPropsImpl extends AccordionContentProps {
  children?: any
  className?: any
  ref?: any
}

const AccordionContent = ({
  children,
  className,
  ref,
  ...props
}: AccordionContentPropsImpl) => (
  <Accordion.Content
    className={cx(
      'overflow-hidden bg-gray-2 text-[15px] text-gray-11 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
      className,
    )}
    {...props}
    ref={ref}
  >
    <div className="px-5 py-[15px]">{children}</div>
  </Accordion.Content>
)

export { AccordionContent }
