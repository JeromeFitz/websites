import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { format } from 'date-fns'

import type { Venue } from '@/lib/drizzle/schemas/cache-venues/types'

import { ImageNotion } from '@/components/Image/Image.Notion'
import { segment } from '@/lib/drizzle/schemas/cache-venues/queries'

export function Venue({ item }: { item: Venue }) {
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
      <section>
        <Heading as="h2" highContrast size="5">
          “{item.title}”
        </Heading>
        <Heading as="h3" highContrast size="4">
          {item.slugPreview}
        </Heading>
        <hr className="my-2 w-full" />
        <Text size="1">ISO: {format(item.datePublished, 'yyyy-MM-dd')}</Text>
        <hr className="my-2 w-full" />
        <Flex>
          <ImageNotion item={item} segment={segment} />
        </Flex>
      </section>
    </Flex>
  )
}
