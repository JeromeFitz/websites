"use client";

import type { AccordionContentProps } from "@radix-ui/react-accordion";
import * as Accordion from "@radix-ui/react-accordion";
import type { FC, ReactNode, Ref } from "react";

import { cx } from "@/utils/cx";

interface AccordionContentPropsImpl extends AccordionContentProps {
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const AccordionContentRC = Accordion.Content as FC<AccordionContentPropsImpl>;

const AccordionContent = ({ children, className, ref, ...props }: AccordionContentPropsImpl) => (
  <AccordionContentRC
    className={cx(
      "data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown bg-gray-2 text-gray-11 overflow-hidden text-[15px]",
      className,
    )}
    {...props}
    ref={ref}
  >
    <div className="px-5 py-3.75">{children}</div>
  </AccordionContentRC>
);

export { AccordionContent };
