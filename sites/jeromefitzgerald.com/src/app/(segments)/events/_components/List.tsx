// import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
// import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { isAfter } from 'date-fns/isAfter'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import _take from 'lodash/take.js'
import NextLink from 'next/link'

// import type { NotionTag } from '@/lib/drizzle/schemas/_notion/types'
import type { Event } from '@/lib/drizzle/schemas/types'

import { DataList__Info } from '@/app/(segments)/events/[...key]/_components/Event.Data.List'
import { HeaderFull } from '@/components/Header/Header.Full'
import { ExternalLinkIcon } from '@/components/Icon/index'
import { getImageKeyValue } from '@/lib/drizzle/schemas/cache-images/queries'
import { getImageKeySlug } from '@/lib/drizzle/utils/getImageKeySlug'
import { cx } from '@/utils/cx'

import { AccordionClient } from './List.Client'

function ListWrapper({ events }: { events: Event[] }) {
  return (
    <Box>
      <Grid
        columns={{ initial: '1', md: '2' }}
        gapX={{ initial: '1', md: '3' }}
        gapY={{ initial: '6', md: '6' }}
        role="list"
        width="100%"
      >
        {events.map(async (event) => {
          if (!event.isPublished) return null
          const seoImage: any = event.seoImage
          const imageUrl = seoImage[seoImage?.type]?.url
          const { key } = getImageKeySlug(imageUrl)
          const imageKeyValue = await getImageKeyValue({ key })
          const image: any = imageKeyValue[0].value[0]

          return (
            <Box
              className="group rounded-sm bg-scroll"
              key={event.id}
              position="relative"
              role="listitem"
              width="100%"
            >
              <Grid
                align="start"
                asChild
                className={cx(
                  // 'bg-accent-6',
                  'md:border-1 border-gray-7 hover:border-gray-8',
                  'rounded-sm',
                  'transition-all duration-500',
                  // 'group-hover:transform-[translate(0px,_-1em)]',
                  // 'shadow-xs group-hover:shadow-lg',
                  // 'dark:shadow-accent-4',
                )}
                flow="row"
                gap="3"
                height="100%"
                width="100%"
              >
                <Box>
                  <Box
                    height={{ initial: '275px', md: '500px' }}
                    overflow="hidden"
                    position="relative"
                  >
                    <NextLink href={event.slugPreview}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="d"
                        className={cx(
                          'absolute inline-block size-full',
                          'inset-[0%_0%_auto]',
                          'rounded-t-sm',
                          'max-w-full object-cover align-middle',
                          'transition-all duration-700 hover:scale-[1.05]',
                        )}
                        src={image.src}
                      />
                    </NextLink>
                  </Box>
                  <Grid
                    align="start"
                    data-name={`Container: ${event.slugPreview}`}
                    flow="row"
                    gap="3"
                    height="100%"
                    justify="start"
                  >
                    <Flex
                      align="start"
                      data-name="Info"
                      direction="column"
                      gap="3"
                      // height="12rem"
                      height="100%"
                      justify="start"
                      mb="3"
                      p="3"
                    >
                      <Heading as="h2" size="6">
                        {event.title}
                      </Heading>
                      <Text
                        className="md:line-clamp-3 md:min-h-[75px]"
                        mr={{ initial: '1', md: '3' }}
                      >
                        {event.seoDescription}
                      </Text>
                      {/* <Flex
                        align="end"
                        className="bg-transparent"
                        direction="row"
                        gap={{ initial: '2', md: '3' }}
                        height="100%"
                        width="100%"
                        wrap="nowrap"
                      >
                        <>
                          {event?.tags.length === 0 && (
                            <Badge className="lowercase" color="amber" size="2">
                              <Code variant="ghost">comedy</Code>
                            </Badge>
                          )}
                          {event.tags.map(({ color, id, name }: NotionTag) => (
                            <Badge
                              className="lowercase"
                              color={color}
                              key={id}
                              size="2"
                            >
                              <Code variant="ghost">{name}</Code>
                            </Badge>
                          ))}
                        </>
                      </Flex> */}
                    </Flex>
                    <Flex
                      align="start"
                      className="z-50"
                      data-name="Credits"
                      direction="column"
                      gap="3"
                      height="100%"
                      justify="start"
                      mb="3"
                      p="3"
                    >
                      <DataList__Info isEventOver={false} item={event} />
                    </Flex>
                    <Flex
                      align="start"
                      className="z-50"
                      data-name="Links"
                      direction="row"
                      gap="3"
                      height="100%"
                      justify="end"
                      mb="3"
                      p="3"
                      width="100%"
                    >
                      <Button
                        asChild
                        className={cx(
                          'hover:!transform-[translate(0px,_-0.125em)] !transition-all',
                          'hover:!shadow-[inset_0_0_0_1px_var(--accent-a8)]',
                          '!drop-shadow-lg hover:!drop-shadow-lg',
                          '!shadow-[inset_0_0_0_1px_var(--accent-a7)]',
                        )}
                        variant="surface"
                      >
                        <NextLink href={event.slugPreview}>More Info</NextLink>
                      </Button>
                      <Button
                        asChild
                        className={cx(
                          'hover:!transform-[translate(0px,_-0.125em)] !transition-all',
                          '!text-black',
                          '!drop-shadow-lg hover:!drop-shadow-lg',
                        )}
                        color="green"
                      >
                        <a href={event.urlTicket}>
                          Buy Tickets
                          <ExternalLinkIcon
                            className={cx(
                              // 'bg-blackA-9 group-hover:bg-blackA-10',
                              'rounded-3 p-0-5 size-5 text-inherit !opacity-95 transition-colors group-hover:!opacity-100',
                              '!transition-all',
                            )}
                          />
                        </a>
                      </Button>
                    </Flex>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

function Listing({ items }: { items: Event[] }) {
  const dateNow = Date.now()
  const eventsUpcoming = _orderBy(
    _filter(items, (item: Event) => !isAfter(dateNow, item.dateIso)),
    (item: Event) => [item.dateIso],
    ['asc'],
  )
  const eventsPast = _take(
    _orderBy(
      _filter(items, (item: Event) => isAfter(dateNow, item.dateIso)),
      (item: Event) => [item.dateIso],
      ['desc'],
    ),
    10,
  )

  return (
    <Flex direction="column">
      <HeaderFull count={eventsUpcoming.length} overline="" title="Events" />
      <Flex
        direction="column"
        gap="9"
        mb={{ initial: '4', md: '6' }}
        pb={{ initial: '4', md: '6' }}
      >
        <Flex direction="column" gap="3">
          <Text size={{ initial: '3', md: '5' }}>
            Upcoming Events that feature comedian Jerome Fitzgerald.{' '}
            <Em>
              Though primarily based in Pittsburgh, occasionally he will venture out
              into the wide world and do shows elsewhere.
            </Em>{' '}
            <Strong>(And he is always very game to do so.)</Strong>
          </Text>
        </Flex>
      </Flex>
      <ListWrapper events={eventsUpcoming} />
      <HeaderFull count={eventsPast.length} overline="" title="Past Events" />

      <AccordionClient items={eventsPast} />
    </Flex>
  )
}

export { Listing }
