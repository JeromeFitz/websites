import type { Book as BookType } from '@/lib/drizzle/schemas/cache-books/types'

import { TZDate } from '@date-fns/tz'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

import { ImageNotion } from '@/components/Image/Image.Notion'
import { segment } from '@/lib/drizzle/schemas/cache-books/queries'

const timestampFormatISO = `yyyy-MM-dd'T'HH:mm:ss.ms'Z'`
const timestampFormat = `yyyy-MM-dd HH:mma z`

export function Book({ item }: { item: BookType }) {
  const timestampUTC = new TZDate(item.updatedAt, 'UTC')
  const timestampET = timestampUTC.withTimeZone('America/New_York')

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
          {item.subtitle}
        </Heading>
        <hr className="my-2 w-full" />
        <Text size="1">
          Release Date: {format(item.dateReleasedISO, 'yyyy-MM-dd')}
        </Text>
        <Text size="1">Author: {item.author}</Text>
        <hr className="my-2 w-full" />
        <Code size="1" variant="ghost">
          @: {format(item.updatedAt, timestampFormatISO)}
        </Code>
        <Code size="1" variant="ghost">
          U: {format(timestampUTC, timestampFormatISO)}
        </Code>
        <Code size="1" variant="ghost">
          E: {format(timestampET, timestampFormatISO)}
        </Code>
        <Code size="1" variant="ghost">
          TZ-U: {formatInTimeZone(timestampUTC, 'UTC', timestampFormat)}
        </Code>
        <Code size="1" variant="ghost">
          TZ-E:{` `}
          {formatInTimeZone(timestampUTC, 'America/New_York', timestampFormat)}
        </Code>
        <hr className="my-2 w-full" />
        <Flex>
          <ImageNotion item={item} segment={segment} />
        </Flex>
      </section>
    </Flex>
  )
}
