'use client'

import type { Venue } from '@/lib/drizzle/schemas/cache-venues/types'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import NextLink from 'next/link'

function List({ items }: { items: Venue[] }) {
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
                <Text size="1">ISO: {item.datePublished}</Text>
                <Text size="1">ISO: {item.updatedAt.toString()}</Text>
                <Link asChild highContrast>
                  <NextLink href={item.slugPreview}>{item.slugPreview}</NextLink>
                </Link>
              </li>
            </Flex>
          )
        })}
      </>
    </Wrapper>
  )
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Box asChild m="0">
        <ul>{children}</ul>
      </Box>
    </Box>
  )
}

export { List }
