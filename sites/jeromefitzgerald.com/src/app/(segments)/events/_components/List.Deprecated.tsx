'use client'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import type { NotionText } from '@/lib/drizzle/schemas/_notion/types'
import type { Event } from '@/lib/drizzle/schemas/cache-events/types'

function getRollupText(data: any) {
  if (!data) return []
  const text: string[] = []
  data.map((d: any) => {
    d[d.type].map((d2: NotionText) => {
      text.push(d2.plain_text)
    })
  })
  return text
}

function List({ items }: { items: Event[] }) {
  return (
    <Wrapper>
      <>
        {items.map((item) => {
          if (item.slugPreviewEt === '/events/2025/03/14/the-latchkey-kids') {
            // console.dir(`> item`)
            // console.dir(item.rollup_shows_primary_cast_title)
          }

          // const showsPrimaryCastTitle = getRollupText(item.rollup_shows_primary_cast_title)
          const guests = getRollupText(item.rollupPeopleGuestTitle)
          const venuesSlug = getRollupText(item.rollupVenuesSlug)
          const venuesTitle = getRollupText(item.rollupVenuesTitle)

          const date = `
            ${item.dateDayOfWeek} ${item.dateDayOfMonthOrdinal} ${item.dateDayOfMonthOrdinal},  ${item.dateYear}
          `

          const time = `
            ${item.dateTime} ${item.dateTimeZone}
          `

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
                <Heading as="h2" highContrast size="7">
                  “{item.title}”
                </Heading>
                <Heading as="h3" highContrast size="4">
                  {item.slugPreviewEt}
                </Heading>
                <hr className="my-2 w-full" />
                <Text size="1">ISO: {item.dateIso}</Text>
                <Text size="1">Date: {date}</Text>
                <Text size="1">Time: {time}</Text>
                {guests && <Text size="1">Guest: {guests.join(', ')}</Text>}
                {venuesSlug && <Text size="1">Venues: {venuesSlug.join(', ')}</Text>}
                {venuesTitle && (
                  <Text size="1">Venues Title: {venuesTitle.join(', ')}</Text>
                )}
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
