/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import type { AccordionTriggerProps } from '@radix-ui/react-accordion'

import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

import { ChevronDownIcon } from '@/components/Icon/index'
import { cx } from '@/utils/cx'

interface AccordionTriggerPropsImpl extends AccordionTriggerProps {
  children?: any
  className?: any
}

const AccordionTrigger = forwardRef(
  ({ children, className, ...props }: AccordionTriggerPropsImpl, forwardedRef) => (
    // @ts-ignore
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cx(
          'hover:bg-gray-2 shadow-gray-5 text-accent-11 outline-hidden group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-[var(--leading-none)] shadow-[0_1px_0] dark:bg-black/95',
          className,
        )}
        {...props}
        // @ts-ignore
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="text-accent-10 transition-transform group-data-[state=open]:rotate-180"
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
)

export { AccordionTrigger }
