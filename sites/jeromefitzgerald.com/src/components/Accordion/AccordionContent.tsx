/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

const AccordionContent = forwardRef(
  // @ts-ignore
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={cx(
        'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden bg-[var(--mauve-2)] text-[15px] text-[var(--mauve-11)]',
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
