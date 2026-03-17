'use client'

import type { AccordionItemProps } from '@radix-ui/react-accordion'

import * as Accordion from '@radix-ui/react-accordion'

import { cx } from '@/utils/cx'

interface AccordionItemPropsImpl extends AccordionItemProps {
  children?: any
  className?: any
  ref?: any
}

const AccordionItem = ({
  children,
  className,
  ref,
  ...props
}: AccordionItemPropsImpl) => (
  <Accordion.Item
    className={cx(
      'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_0.25px] focus-within:shadow-accent-12',
      className,
    )}
    {...props}
    ref={ref}
  >
    {children}
  </Accordion.Item>
)

export { AccordionItem }
