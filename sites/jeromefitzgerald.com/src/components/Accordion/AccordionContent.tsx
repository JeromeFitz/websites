"use client";

import type { AccordionContentProps } from "@radix-ui/react-accordion";
import * as Accordion from "@radix-ui/react-accordion";

import { cx } from "@/utils/cx";

interface AccordionContentPropsImpl extends AccordionContentProps {
  children?: any;
  className?: any;
  ref?: any;
}

const AccordionContent = ({ children, className, ref, ...props }: AccordionContentPropsImpl) => (
  // @ts-ignore
  <Accordion.Content
    className={cx(
      "data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown bg-gray-2 text-gray-11 overflow-hidden text-[15px]",
      className,
    )}
    {...props}
    ref={ref}
  >
    <div className="px-5 py-3.75">{children}</div>
  </Accordion.Content>
);

export { AccordionContent };
