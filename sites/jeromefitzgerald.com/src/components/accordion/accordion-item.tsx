"use client";

import type { AccordionItemProps } from "@radix-ui/react-accordion";
import * as Accordion from "@radix-ui/react-accordion";
import type { FC, ReactNode, Ref } from "react";

import { cx } from "@/utils/cx";

interface AccordionItemPropsImpl extends AccordionItemProps {
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const AccordionItemRC = Accordion.Item as FC<AccordionItemPropsImpl>;

const AccordionItem = ({ children, className, ref, ...props }: AccordionItemPropsImpl) => (
  <AccordionItemRC
    className={cx(
      "focus-within:shadow-accent-12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_0.25px]",
      className,
    )}
    {...props}
    ref={ref}
  >
    {children}
  </AccordionItemRC>
);

export { AccordionItem };
