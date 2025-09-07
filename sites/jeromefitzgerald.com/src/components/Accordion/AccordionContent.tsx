'use client'

import type { AccordionContentProps } from '@radix-ui/react-accordion'

import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

import { cx } from '@/utils/cx'

interface AccordionContentPropsImpl extends AccordionContentProps {
  children?: any
  className?: any
}

const AccordionContent = forwardRef(
  ({ children, className, ...props }: AccordionContentPropsImpl, forwardedRef) => (
    <Accordion.Content
      className={cx(
        'overflow-hidden bg-gray-2 text-[15px] text-gray-11 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
        className,
      )}
      {...props}
      // @ts-ignore
      ref={forwardedRef}
    >
      <div className="px-5 py-[15px]">{children}</div>
    </Accordion.Content>
  ),
)

export { AccordionContent }
