import { Box, Button, Flex, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import type { ReactNode } from "react";

import type { NotionColor } from "@/lib/drizzle/schemas/_notion/types";
import { cx } from "@/utils/cx";

import { CurrentlyItem } from "./currently.item";

/**
 * @todo(api) book
 */
function CurrentlyItemWrapper({
  titleSub,
  ...c
}: {
  color: NotionColor;
  href: string;
  icon: ReactNode;
  id: string;
  prefetch: boolean;
  title: string;
  titleSub: string;
}) {
  const { color, href, icon, id, prefetch, title } = c;
  const propsParent = { color, href, icon, id, prefetch, title };

  const isLoading = false;
  const headline = isLoading ? "" : titleSub[0];
  const subline = isLoading ? "" : titleSub[1];

  const props = {
    headline,
    id,
    isLoading,
    subline,
  };

  return (
    <CurrentlyWrapper {...propsParent}>
      <CurrentlyItem {...props} />
    </CurrentlyWrapper>
  );
}

function CurrentlyWrapper({
  children,
  ...c
}: {
  children: ReactNode;
  color: NotionColor;
  href: string;
  icon: ReactNode;
  id: string;
  prefetch: boolean;
  title: string;
}) {
  const color = c.color;
  const href = c.href;
  const prefetch = c.prefetch;
  const title = c.title;
  const icon = c?.icon;

  return (
    <Flex
      align="end"
      className={cx("rounded-sm! shadow-none! transition-all! duration-300 hover:-translate-y-2!")}
      flexBasis="0px"
      flexGrow="1"
      flexShrink="0"
      height={{ initial: "100%", md: "calc(var(--spacing) * 64)" }}
      position="relative"
      style={{ opacity: 1, transform: "none" }}
      width="100%"
    >
      <Box className={cx("contents h-[inherit] w-[inherit]")}>
        <Flex
          align="end"
          asChild
          className=""
          direction="column"
          gap={{ initial: "1", md: "3" }}
          height="100%"
          justify="between"
          position="relative"
          pb={{ initial: "5", md: "5" }}
          pt={{ initial: "1", md: "5" }}
          px={{ initial: "0", md: "0" }}
          width="100%"
          wrap="nowrap"
        >
          <Button
            asChild
            className={cx(
              "group content-end",
              "shadow-[inset_0_0_0_1px_var(--accent-a7)]!",
              "hover:shadow-[inset_0_0_0_1px_var(--accent-a8)]!",
            )}
            color={color}
            radius="large"
            variant="soft"
          >
            <NextLink className={cx("")} href={href} prefetch={prefetch}>
              <Box mr="3" position="relative" right="0">
                {icon}
              </Box>
              <Flex
                className="place-content-start items-start"
                direction="column"
                gap="1"
                height="min-content"
                justify="start"
                pl="6"
                position="relative"
                pr="3"
                py="0"
                width="100%"
                wrap="nowrap"
              >
                <Text
                  align="left"
                  className={cx("font-mono font-medium uppercase")}
                  highContrast
                  mb="2"
                  size="1"
                >
                  {title}
                </Text>
                {children}
              </Flex>
            </NextLink>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export { CurrentlyItemWrapper, CurrentlyWrapper };
