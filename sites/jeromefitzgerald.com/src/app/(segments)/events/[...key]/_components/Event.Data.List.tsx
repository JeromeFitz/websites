// import type { NotionTag } from '@/lib/drizzle/schemas/_notion/types'
import type { Event } from '@/lib/drizzle/schemas/cache-events/types'
import type { Venue } from '@/lib/drizzle/schemas/cache-venues/types'

import { TZDate } from '@date-fns/tz'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import { formatInTimeZone } from 'date-fns-tz'

import {
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  // TagIcon,
} from '@/components/Icon/index'
import { TZ } from '@/config/const'
import {
  getVenue,
  segment as segmentVenue,
} from '@/lib/drizzle/schemas/cache-venues/queries'
import { cx } from '@/utils/cx'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'

async function DataList__VenueIndividual({ item }: { item: Event }) {
  const keyVenue = item.rollupVenuesSlug[0].rich_text[0]?.plain_text
  const venueInit: Venue[] = await getVenue({ key: getKey(segmentVenue, keyVenue) })
  if (isEmpty(venueInit)) return null
  const venue = venueInit[0]
  const street = venue.addressStreet
  const city = `${venue.addressCity}, ${venue.addressState} ${venue.addressPostalCode}`
  const neighborhood = venue.addressNeighborhood
  const title = venue.title

  return (
    <DataList__VenueIndividualWithSkeleton
      city={city}
      isLoading={false}
      neighborhood={neighborhood}
      street={street}
      title={title}
    />
  )
}

function DataList__VenueIndividualWithSkeleton({
  city = '',
  isLoading = true,
  neighborhood = '',
  street = '',
  title = '',
}) {
  return (
    <DataList.Item>
      <DataList.Label
        className="flex flex-row items-center justify-start gap-1"
        minWidth="0px"
      >
        <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
          <HomeIcon />
          <Text className="font-mono md:!sr-only" ml="1" size="1">
            Venue
          </Text>
        </Flex>
      </DataList.Label>
      <DataList.Value>
        <Text size="2">
          <Strong>{title}</Strong>
          <Text size="2">
            <br />
            <Skeleton loading={isLoading}>{street}</Skeleton>
            <br />
            <Skeleton loading={isLoading}>{city}</Skeleton>
            <br />
            <Em>
              <Skeleton loading={isLoading}>{neighborhood}</Skeleton>
            </Em>
          </Text>
        </Text>
      </DataList.Value>
    </DataList.Item>
  )
}

function DataList__Info({
  isEventOver,
  item,
}: {
  isEventOver: boolean
  item: Event
}) {
  const timestampUTC = new TZDate(item.dateIso, 'UTC')
  // const timestampET = timestampUTC.withTimeZone('America/New_York')
  return (
    <Flex
      className={cx(
        'content-center items-center overflow-auto',
        'border-gray-7 border-t-1',
      )}
      direction="column"
      gap="0"
      justify="start"
      p="0"
      position="relative"
      width="100%"
      wrap="nowrap"
    >
      <DataList.Root
        className={cx(
          'py-6 pl-4 pr-1',
          'gap-x-[var(--space-3)] md:!gap-x-[var(--space-2)]',
          'w-full',
        )}
        size="2"
      >
        <DataList.Item align="start" className="!hidden">
          <DataList.Label
            className="flex flex-row items-center justify-start gap-1"
            minWidth="0px"
          >
            <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
              <IdCardIcon />
              <Text className="font-mono md:!sr-only" ml="1" size="1">
                Title
              </Text>
            </Flex>
          </DataList.Label>
          <DataList.Value className="font-mono">{item.title}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="start">
          <DataList.Label
            className="flex flex-row items-center justify-start gap-1"
            minWidth="0px"
          >
            <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
              <CalendarIcon />
              <Text className="font-mono md:!sr-only" ml="1" size="1">
                Date
              </Text>
            </Flex>
          </DataList.Label>
          <DataList.Value className="font-mono">
            {item.dateDayOfWeek},{` `}
            {item.dateMonthNameAbbr} {item.dateDayOfMonthOrdinal}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item align="start">
          <DataList.Label
            className="flex flex-row items-center justify-start gap-1"
            minWidth="0px"
          >
            <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
              <ClockIcon />
              <Text className="font-mono md:!sr-only" ml="1" size="1">
                Time
              </Text>
            </Flex>
          </DataList.Label>
          <DataList.Value className="font-mono">
            {formatInTimeZone(timestampUTC, TZ, 'hh:mma zzz')}
            {/* <br /> */}
            {/* {format(timestampET, 'hh:mma zzz')} */}
          </DataList.Value>
        </DataList.Item>
        <DataList__VenueIndividual item={item} />
        {/* {!!item.rollupShowsPrimaryTags[0]?.multi_select && (
          <DataList.Item align="start">
            <DataList.Label
              className="flex flex-row items-center justify-start gap-1"
              minWidth="0px"
            >
              <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
                <TagIcon />
                <Text className="font-mono md:!sr-only" ml="1" size="1">
                  Type
                </Text>
              </Flex>
            </DataList.Label>
            <Flex
              asChild
              direction="row"
              flexBasis="auto"
              flexGrow="0"
              flexShrink="0"
              gap={{ initial: '2', md: '3' }}
              ml={{ initial: '-2', md: '-3' }}
              wrap="wrap"
            >
              <DataList.Value
                className={cx(
                  'place-content-start items-start',
                  'before:[content:initial]',
                  'before:table',
                  '',
                )}
              >
                <>
                  {item.rollupShowsPrimaryTags[0]?.multi_select.length === 0 && (
                    <Badge className="lowercase" color="amber" size="1">
                      <Code variant="ghost">comedy</Code>
                    </Badge>
                  )}
                  {item.rollupShowsPrimaryTags[0]?.multi_select.map(
                    ({ color, id, name }: NotionTag) => (
                      <Badge className="lowercase" color={color} key={id} size="1">
                        <Code variant="ghost">{name}</Code>
                      </Badge>
                    ),
                  )}
                </>
              </DataList.Value>
            </Flex>
          </DataList.Item>
        )} */}
        {isEventOver && (
          <DataList.Item align="start">
            <DataList.Label
              className="flex flex-row items-center justify-start gap-1"
              minWidth="0px"
            >
              <Flex justify={{ initial: 'start', md: 'start' }} width="100%">
                <InfoCircledIcon />
                <Text className="font-mono md:!sr-only" ml="1" size="1">
                  Note
                </Text>
              </Flex>
            </DataList.Label>
            <DataList.Value className="font-mono">
              <Badge color="amber" size="3">
                <Code variant="ghost">Event Is Over</Code>
              </Badge>
            </DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>
    </Flex>
  )
}

export { DataList__Info }
