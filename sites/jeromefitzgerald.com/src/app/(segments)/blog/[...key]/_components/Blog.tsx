import { TZDate } from '@date-fns/tz'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

import type { Blog } from '@/lib/drizzle/schemas/cache-blogs/types'

import { ImageNotion } from '@/components/Image/Image.Notion'
import { segment } from '@/lib/drizzle/schemas/cache-blogs/queries'

const timestampFormatISO = `yyyy-MM-dd'T'HH:mm:ss.ms'Z'`
const timestampFormat = `yyyy-MM-dd HH:mma z`

export function BlogComponent({ item }: { item: Blog }) {
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
          {item.title}
        </Heading>
        <hr className="my-2 w-full" />
        <Text size="1">Release Date: {format(item.dateISO, 'yyyy-MM-dd')}</Text>
        <Text size="1">Author: {item.title}</Text>
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
