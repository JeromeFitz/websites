"use client";

import { Accordion as AccordionRootRadix } from "@radix-ui/react-accordion";
import type { FC, ReactNode, Ref } from "react";

interface AccordionRootPropsImpl {
  children?: ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ref?: Ref<HTMLDivElement>;
  type?: "multiple" | "single";
}

const AccordionRootRC = AccordionRootRadix as FC<AccordionRootPropsImpl>;

const AccordionRootImpl = ({
  children,
  className,
  type = "single",
  ref,
  ...props
}: AccordionRootPropsImpl) => (
  <AccordionRootRC className={className} {...props} ref={ref} type={type}>
    {children}
  </AccordionRootRC>
);

export { AccordionRootImpl as AccordionRoot };
