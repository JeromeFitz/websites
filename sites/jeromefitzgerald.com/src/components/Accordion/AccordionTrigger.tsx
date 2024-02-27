/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { ChevronDownIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

const AccordionTrigger = forwardRef(
  // @ts-ignore
  ({ children, className, ...props }, forwardedRef) => (
    // @ts-ignore
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cx(
          'group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-[var(--leading-none)] text-[var(--accent-11)] shadow-[0_1px_0] shadow-[var(--mauve-6)] outline-none hover:bg-[var(--mauve-2)] dark:bg-black/95',
          className,
        )}
        {...props}
        // @ts-ignore
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="text-[var(--accent-10)] transition-transform group-data-[state=open]:rotate-180"
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
)

export { AccordionTrigger }
