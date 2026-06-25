"use client";

// import { useHover } from '@mantine/hooks'
import { DotFilledIcon } from "@radix-ui/react-icons";
import {
  AspectRatio,
  Button,
  Em,
  Flex,
  Grid,
  Inset,
  Link,
  Popover,
  Strong,
  Text,
} from "@radix-ui/themes";
// import { useEffect, useState } from 'react'
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FC, ReactNode } from "react";
import { useState } from "react";

import { useStore as _useStore, useShallow } from "@/store/index";
import { cx } from "@/utils/cx";

import { ImageClient as NextImage } from "../notion/blocks/image.client";

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      isOverlay: store.isOverlay,
      isOverlaySet: store.isOverlaySet,
    })),
  );
};

const image = {
  alt: "Jerome is wearing a black suit, with a paper mâché head of Charles Entertainment Cheese Junior. A blue duct-tap cap with a yellow “C” resides between two giant rat (mouse?) ears with a cut-out for his face. He is standing pointing an accusatory finger at two poor seated schlubs about to incur his wrath. Due to his stance and finger pointing you cannot see his face under the paper mâché rat head and just see his right ear and side cheek. There is an empty pizza box on a chair behind him.",
  blurDataURL:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVR4nFWOwUrDQABEZ3az2e3awC6VpI3NHxS00KOXtpdKSiSo6bkKBW+evfgNlebuRezJP9EP6K94qJiK4LsNMzAP/I8gAcRJ//GpvsgXYJMPkPC+U17drZ+3m83reJz/FT+jLM2qavn5sasuyyTOJtPqt9bGAGjZdjG/qdd12nHvL2/Xi3sczoy1JI+i6HQwnA3Pi3m+/9qvbh+gtQYgVUDSO3fcPfFJ2ku73ruzwQham1ApIYWQsmWNixPrHNjYkBAUKgxFIAmqMLBRW0jJRpbkNwFLHj/O9IP8AAAAAElFTkSuQmCC",
  // className: 'rounded-3',
  height: 960,
  order: 0,
  // quality: 90,
  sizes: "(max-width: 768px) 90vw, (max-width: 1280px) 50vw, (max-width: 2560px) 61vw, 50vw",
  src: "https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg",
  url: "https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg",
  width: 1280,
};

/**
 * @todo
 *
 * If root -- Popover
 * Anywhere else --- Go To Home
 */

function NavigationButton({ isHomePage = false }: { isHomePage?: boolean }) {
  const router = useRouter();
  return (
    <Button
      // aria-label="Jerome"
      className={cx(
        "hover:bg-accent-2! bg-accent-1! transition-colors",
        '[&>svg]:data-[state="open"]:animate-none',
        "cursor-pointer!",
      )}
      // color={isLoading ? 'accent' : 'gray'}
      color="gray"
      onClick={() => (!isHomePage ? router.push("/") : undefined)}
      radius="full"
      size="3"
      variant="outline"
    >
      <DotFilledIcon
        className={cx("text-pink-11 size-6 animate-pulse transition-all delay-1000", "")}
      />
      <Text>
        <Strong>Jerome</Strong>
      </Text>
    </Button>
  );
}

function NavigationLink({ isHomePage = false }: { isHomePage?: boolean }) {
  return <NavigationButton isHomePage={isHomePage} />;
}

const PopoverRoot = Popover.Root as FC<{
  children?: ReactNode;
  defaultOpen?: boolean;
  modal?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}>;

function NavigationPopOver() {
  const { isOverlaySet } = useStore();
  const [isPopover, isPoperoverSet] = useState(false);
  return (
    <PopoverRoot
      modal={true}
      onOpenChange={() => {
        isOverlaySet();
        isPoperoverSet(!isPopover);
      }}
      open={isPopover}
    >
      <Flex direction="row" gap="3">
        <Popover.Trigger>
          <Button
            className={cx(
              "hover:bg-accent-2! bg-accent-1! transition-colors",
              '[&>svg]:data-[state="open"]:animate-none',
              "cursor-pointer!",
            )}
            color="gray"
            radius="full"
            size="3"
            variant="outline"
          >
            <DotFilledIcon
              className={cx("text-pink-11 size-6 animate-pulse transition-all delay-1000")}
            />
            <Text>
              <Strong>Jerome</Strong>
            </Text>
          </Button>
        </Popover.Trigger>
      </Flex>
      <Popover.Content
        asChild
        // className="!z-[999]"
        size="1"
        style={{ zIndex: "9999" }}
      >
        <Grid
          className={cx(
            "rounded-3 border-gray-7 overflow-hidden! border",
            "w-[calc(var(--radix-popper-available-width)-3px)] min-w-[unset]",
            "md:max-w-52.25",
          )}
          m="0"
          p="0"
          width="calc(var(--radix-popper-available-width) - 13px"
        >
          <Inset mb={{ initial: "6", md: "4" }} p="0" side="top">
            <AspectRatio ratio={4 / 3}>
              <NextImage {...image} />
            </AspectRatio>
          </Inset>

          <Flex
            direction="column"
            display="flex"
            gap="6"
            mb={{ initial: "6", md: "4" }}
            px={{ initial: "3", md: "3" }}
          >
            <Text as="p" size="3" trim="both">
              <Em>Hello, fellow human (or robot).</Em>
            </Text>
            <Text as="p" size="3" trim="both">
              <Strong>
                I‘m Jerome (he/him).
                <br />
                An actor, comedian, & writer.
              </Strong>
            </Text>
            <Text as="p" size="3" trim="both">
              My focus is mainly comedy with the occasional drama or musical number.
            </Text>
            <Text as="p" size="3" trim="both">
              Along with a healthy career in engineering leadership.
            </Text>
            <Text as="p" size="3" trim="both">
              Well,{" "}
              <Link
                asChild
                onClick={() => {
                  isOverlaySet();
                  isPoperoverSet(!isPopover);
                }}
              >
                <NextLink href="/about">click around</NextLink>
              </Link>{" "}
              I guess.
            </Text>
          </Flex>
        </Grid>
      </Popover.Content>
    </PopoverRoot>
  );
}

function NavigationPrimary({ order = 0 }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={cx("", "relative h-auto w-min flex-none")} style={{ opacity: 1, order }}>
      <div className="contents size-full">
        {isHomePage ? <NavigationPopOver /> : <NavigationLink isHomePage={isHomePage} />}
      </div>
    </div>
  );
}

export { NavigationPrimary };
