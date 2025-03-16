import {
  ArrowTopRightIcon,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  TagIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getPageDataFromNotion } from '@jeromefitz/shared/notion/utils/index'

// import * as Portal from '@radix-ui/react-portal'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Portal } from '@radix-ui/themes/dist/esm/components/portal.js'
import { Skeleton } from '@radix-ui/themes/dist/esm/components/skeleton.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
// import { Suspense } from 'react'

import type { PageObjectResponseVenue } from '@/app/(notion)/_config/index'

import { getEventData, getPropertyTypeDataVenue } from '@/app/(notion)/_config/index'

function CTA({ href, isDisabled = false }) {
  const title = isDisabled ? 'Event Has Passed' : 'Buy Tickets'
  const Component = isDisabled ? Text : NextLink

  return (
    <Flex asChild className="group" justify="between" py="4" width="100%">
      <Button
        asChild
        className={cx(
          'hover:-translate-y-1',
          'data-[disabled="true"]:bg-gray-2 data-[disabled="true"]:hover:cursor-not-allowed',
          // 'data-[disabled="true"]:pointer-events-none',
          'data-[disabled="true"]:hover:translate-y-0',
          'data-[disabled="true"]:hidden',
        )}
        color="green"
        disabled={isDisabled}
        radius="small"
        size="4"
        variant="solid"
      >
        <Component href={href}>
          <Text className={cx(isDisabled && 'line-through')}>{title}</Text>
          <ArrowTopRightIcon
            className={cx(
              'bg-blackA-9 group-hover:bg-blackA-10 rounded-3 size-6 p-1 text-inherit !opacity-100 transition-colors',
            )}
          />
        </Component>
      </Button>
    </Flex>
  )
}

async function DataList__VenueIndividual({ id, title }) {
  const item: PageObjectResponseVenue = await getPageDataFromNotion(id)
  if (!item) return <DataList__VenueIndividualWithSkeleton title={title} />
  const { properties } = item

  const addressStreet = getPropertyTypeDataVenue(properties, 'Address.Street')
  const addressCity = getPropertyTypeDataVenue(properties, 'Address.City')
  const addressNeighborhood = getPropertyTypeDataVenue(
    properties,
    'Address.Neighborhood',
  )
  const addressState = getPropertyTypeDataVenue(properties, 'Address.State')?.name
  const addressPostalCode = getPropertyTypeDataVenue(properties, 'Address.ZipCode')

  const street = addressStreet
  const city = `${addressCity}, ${addressState} ${addressPostalCode}`
  const neighborhood = addressNeighborhood

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
  title,
}) {
  return (
    <DataList.Item>
      <DataList.Label
        className="flex flex-row items-center justify-start"
        minWidth="88px"
      >
        <HomeIcon />
        <Text className="font-mono" ml="1" size="1">
          Venue
        </Text>
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

function EventSlugHeaderData({ properties }) {
  const {
    // dateIso,
    dayOfMonthOrdinal,
    dayOfWeek,
    isEventOver,
    monthName,
    tags,
    ticketUrl,
    time,
    timezone,
    title,
    venues,
    venueTitle,
  } = getEventData(properties)

  const venueId = venues[0]?.id

  return (
    <>
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
            'py-6 pr-1 pl-4',
            'gap-x-[var(--space-3)] md:!gap-x-[var(--space-1)]',
            'w-full',
          )}
          size="2"
        >
          {isEventOver && (
            <DataList.Item align="start">
              <DataList.Label
                className="flex flex-row items-center justify-start"
                minWidth="88px"
              >
                <InfoCircledIcon />
                <Text className="font-mono" ml="1" size="1">
                  Note
                </Text>
              </DataList.Label>
              <DataList.Value className="font-mono">
                _ Event Has Passed _
              </DataList.Value>
            </DataList.Item>
          )}
          <DataList.Item align="start" className="hidden">
            <DataList.Label
              className="flex flex-row items-center justify-start"
              minWidth="88px"
            >
              <IdCardIcon />
              <Text className="font-mono" ml="1" size="1">
                Title
              </Text>
            </DataList.Label>
            <DataList.Value className="font-mono">{title}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="start">
            <DataList.Label
              className="flex flex-row items-center justify-start"
              minWidth="88px"
            >
              <CalendarIcon />
              <Text className="font-mono" ml="1" size="1">
                Date
              </Text>
            </DataList.Label>
            <DataList.Value className="font-mono">
              {dayOfWeek},{` `}
              <br className="hidden md:inline" /> {monthName} {dayOfMonthOrdinal}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item align="start">
            <DataList.Label
              className="flex flex-row items-center justify-start"
              minWidth="88px"
            >
              <ClockIcon />
              <Text className="font-mono" ml="1" size="1">
                Time
              </Text>
            </DataList.Label>
            <DataList.Value className="font-mono">
              {time} {timezone}
            </DataList.Value>
          </DataList.Item>
          <DataList__VenueIndividual id={venueId} title={venueTitle} />
          {!!tags && (
            <DataList.Item align="start">
              <DataList.Label
                className="flex flex-row items-center justify-start"
                minWidth="88px"
              >
                <TagIcon />
                <Text className="font-mono" ml="1" size="1">
                  Type
                </Text>
              </DataList.Label>
              <DataList.Value
                className={cx(
                  'flex flex-none flex-row flex-wrap place-content-start items-start gap-2 md:gap-3',
                  'before:[content:initial]',
                  'before:table',
                  '',
                )}
              >
                <>
                  {tags.length === 0 && (
                    <Badge className="lowercase" color="amber" size="2">
                      <Code variant="ghost">comedy</Code>
                    </Badge>
                  )}
                  {tags.map(({ color, id, name }) => (
                    <Badge className="lowercase" color={color} key={id} size="2">
                      <Code variant="ghost">{name}</Code>
                    </Badge>
                  ))}
                </>
              </DataList.Value>
            </DataList.Item>
          )}
        </DataList.Root>
      </Flex>
      <div
        className={cx(
          'drop-shadow-md transition-all hover:drop-shadow-lg',
          'relative h-auto w-full flex-none',
          'fixed bottom-0 left-0 inline',
          'md:fixed md:bottom-0 md:left-0 md:flex md:h-min',
          // @note(ui) this moved to Portal for mobile (hydration error)...
          'hidden',
        )}
        id="header-bottom"
        style={{ opacity: 1, transform: 'perspective(1200px)' }}
      >
        <div className={cx('contents')}>
          <div className={cx('ml-0.5 w-full pb-2')}>
            <CTA href={ticketUrl} isDisabled={isEventOver} />
          </div>
        </div>
      </div>
      {!isEventOver && (
        // @todo(next) NICE-117 causes hydration error on direct links
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Portal asChild>
          <Box
            bottom="0"
            className="z-40"
            display={{ md: 'none' }}
            id="portal--header--cta"
            left="0"
            position="fixed"
            width="100%"
          >
            <CTA href={ticketUrl} isDisabled={isEventOver} />
          </Box>
        </Portal>
      )}
    </>
  )
}

export { EventSlugHeaderData }
