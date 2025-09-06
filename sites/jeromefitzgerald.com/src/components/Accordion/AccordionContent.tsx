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
        'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp bg-gray-2 text-gray-11 overflow-hidden text-[15px]',
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
