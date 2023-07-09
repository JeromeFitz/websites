'use client'
import { ChevronDownIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
import * as Accordion from '@radix-ui/react-accordion'
import { forwardRef } from 'react'
import type { ForwardedRef, ReactNode } from 'react'

type ForwardedRefType = ForwardedRef<any>
type PropsChildren = {
  children?: ReactNode
  className?: string
}

const AccordionDemo = ({ children, defaultValue = '' }) => (
  <Accordion.Root
    className="bg-radix-slate6 w-full shadow-xl"
    type="single"
    defaultValue={defaultValue}
    collapsible
  >
    {children}
  </Accordion.Root>
)

const AccordionItem = forwardRef<ForwardedRefType, PropsChildren>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cx(
        'focus-within:shadow-radix-slate12 mt-px overflow-hidden first:mt-0  focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
        className
      )}
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
)

const AccordionTrigger = forwardRef<ForwardedRefType, PropsChildren>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cx(
          'text-radix-pink12 shadow-radix-slate6 hover:bg-radix-pinkA4 bg-radix-pinkA8 group flex flex-1 cursor-default items-center justify-between px-1 py-4 text-[15px] leading-none shadow-[0_1px_0] outline-none md:px-2',
          'transition-all duration-200',
          className
        )}
        {...props}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          className="text-radix-slate12 transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

const AccordionContent = forwardRef<ForwardedRefType, PropsChildren>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={cx(
        'text-radix-slate11 bg-radix-slate2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp w-full overflow-hidden',
        className
      )}
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={forwardedRef}
    >
      <div className="px-5">{children}</div>
    </Accordion.Content>
  )
)

export { AccordionDemo, AccordionItem, AccordionContent, AccordionTrigger }
