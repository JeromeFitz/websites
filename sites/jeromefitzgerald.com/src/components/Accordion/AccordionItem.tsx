'use client'

import type { AccordionItemProps } from '@radix-ui/react-accordion'

import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

import { cx } from '@/utils/cx'

const AccordionItem = forwardRef(
  // @todo(types) radix
  // @ts-ignore
  ({ children, className, ...props }: AccordionItemProps, forwardedRef) => (
    <Accordion.Item
      className={cx(
        'focus-within:shadow-accent-12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_0.25px]',
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
