/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

const AccordionItem = forwardRef(
  // @ts-ignore
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cx(
        'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_0.25px] focus-within:shadow-[var(--accent-12)]',
        className,
      )}
      {...props}
      // @ts-ignore
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
)

export { AccordionItem }
