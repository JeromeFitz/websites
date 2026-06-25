"use client";

import { Box, Flex, Heading, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";

import type { Blog } from "@/lib/drizzle/schemas/cache-blogs/types";

function List({ items }: { items: Blog[] }) {
  return (
    <Wrapper>
      <>
        {items.map((item) => {
          return (
            <Flex
              align="start"
              asChild
              direction="column"
              gap="1"
              justify="between"
              key={item.id}
              my="4"
              py="2"
              width="100%"
            >
              <li>
                <Heading as="h2" highContrast size="5">
                  “{item.title}”
                </Heading>
                <Heading as="h3" highContrast size="4">
                  {item.slugPreview}
                </Heading>
                <hr className="my-2 w-full" />
                <Text size="1">ISO: {item.dateISO}</Text>
                <Link asChild highContrast>
                  <NextLink href={item.slugPreview}>{item.slugPreview}</NextLink>
                </Link>
              </li>
            </Flex>
          );
        })}
      </>
    </Wrapper>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Box asChild m="0">
        <ul>{children}</ul>
      </Box>
    </Box>
  );
}

export { List };
