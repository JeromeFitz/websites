"use client";

import { ChevronDownIcon } from "@jeromefitz/ds/components/icon";
import type { AccordionTriggerProps } from "@radix-ui/react-accordion";
import * as Accordion from "@radix-ui/react-accordion";
import type { FC, ReactNode, Ref } from "react";

import { cx } from "@/utils/cx";

interface AccordionTriggerPropsImpl extends AccordionTriggerProps {
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}

const AccordionHeaderRC = Accordion.Header as FC<{
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLHeadingElement>;
}>;

const AccordionTriggerRC = Accordion.Trigger as FC<AccordionTriggerPropsImpl>;

const AccordionTrigger = ({ children, className, ref, ...props }: AccordionTriggerPropsImpl) => (
  <AccordionHeaderRC className="flex">
    <AccordionTriggerRC
      className={cx(
        "group text-accent-11 shadow-gray-5 hover:bg-gray-2 flex h-11.25 flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-(--leading-none) shadow-[0_1px_0] outline-hidden dark:bg-black/95",
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className="text-accent-10 transition-transform group-data-[state=open]:rotate-180"
      />
    </AccordionTriggerRC>
  </AccordionHeaderRC>
);

export { AccordionTrigger };
