'use client'
import { ChevronDownIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import type { ForwardedRef, ReactNode } from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'

type ForwardedRefType = ForwardedRef<any>
type PropsChildren = {
  children?: ReactNode
  className?: string
}

const AccordionDemo = ({ children, defaultValue }) => (
  // @todo(types) radix
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  <Accordion.Root
    className="w-full rounded-md bg-[var(--slate-6)] shadow-[0_2px_10px] shadow-black/5"
    collapsible
    defaultValue={defaultValue}
    type="single"
  >
    {children}
  </Accordion.Root>
)

const AccordionItem = forwardRef<ForwardedRefType, PropsChildren>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cx(
        'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-[var(--slate-12)]',
        className,
      )}
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
)

const AccordionTrigger = forwardRef<ForwardedRefType, PropsChildren>(
  ({ children, className, ...props }, forwardedRef) => (
    // @todo(types) radix
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cx(
          'group flex flex-1 cursor-pointer items-center justify-between bg-[var(--accent-a8)] px-1 py-4 text-base leading-none text-[var(--accent-12)] shadow-[0_1px_0] shadow-[var(--slate-6)] outline-none hover:bg-[var(--accent-a4)] md:px-2',
          'transition-all duration-200',
          className,
        )}
        {...props}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="mr-2 text-[var(--slate-12)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
)

const AccordionContent = forwardRef<ForwardedRefType, PropsChildren>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={cx(
        'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp w-full overflow-hidden bg-[var(--slate-2)] text-base text-[var(--slate-11)]',
        className,
      )}
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={forwardedRef}
    >
      <div className="p-4">{children}</div>
    </Accordion.Content>
  ),
)

export { AccordionContent, AccordionDemo, AccordionItem, AccordionTrigger }
