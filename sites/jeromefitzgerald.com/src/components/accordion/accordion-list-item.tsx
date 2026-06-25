import NextLink from "next/link";
import type { FC, ReactNode } from "react";

import { cx } from "@/utils/cx";

function AccordionListItem({
  children,
  href,
  icon,
  ...props
}: {
  children: ReactNode;
  href: string;
  icon: FC<{ "aria-hidden"?: boolean; className?: string; label: string }>;
  [key: string]: unknown;
}) {
  const Icon = icon;
  return (
    <NextLink
      className={cx("cursor-pointer text-inherit no-underline")}
      href={href}
      {...(props as any)}
    >
      <li
        className={cx(
          "cursor-pointer no-underline",
          "text-gray-11",
          "flex w-full flex-row items-center justify-start select-none",
          "transition-colors",
          "my-1 gap-2 py-1",
          "md:my-1 md:gap-3 md:py-2",
          "hover:bg-gray-4 hover:text-gray-12 rounded",
        )}
      >
        <Icon
          aria-hidden
          className={cx("ml-1 size-4 min-w-4 text-[currentColor] md:ml-2")}
          label={""}
        />
        <span className="truncate">{children}</span>
      </li>
    </NextLink>
  );
}

export { AccordionListItem };
