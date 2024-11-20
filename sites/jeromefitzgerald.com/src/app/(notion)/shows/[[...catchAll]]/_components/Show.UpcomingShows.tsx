import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getPageDataFromNotion } from '@jeromefitz/shared/notion/utils/index'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _size from 'lodash/size.js'
import { Suspense } from 'react'

import type { PageObjectResponseEvent } from '@/app/(notion)/_config/index'

import { getEventData, getPropertyTypeDataShow } from '@/app/(notion)/_config/index'
// import { RelationLoading } from '@/components/Relations/index'

function UpcomingShows({ properties }) {
  // const items = properties['Relation.Events.Primary']
  const items = getPropertyTypeDataShow(properties, 'Relation.Events.Primary')
  if (!items) return null
  const itemsCount = _size(items)
  if (itemsCount === 0)
    return (
      <Box asChild display="inline-block">
        <Text size={{ initial: '4', md: '7' }}>No Upcoming Shows</Text>
      </Box>
    )
  return (
    <>
      <>
        <ul>
          {Array(itemsCount)
            .fill(0)
            .map((_, i) => {
              const item = items[i]
              const { id } = item

              return (
                <Box asChild my={{ initial: '2', md: '1' }}>
                  <li className={cx('my-2 md:my-0.5')} key={id}>
                    {/* @todo(notion) loading component will break, has been reworked */}
                    {/* <Suspense fallback={<RelationLoading />}> */}
                    <Suspense fallback={null}>
                      <UpcomingShowsIndividual id={id} />
                    </Suspense>
                  </li>
                </Box>
              )
            })}
        </ul>
      </>
    </>
  )
}

async function UpcomingShowsIndividual({ id }) {
  const item: PageObjectResponseEvent = await getPageDataFromNotion(id)
  if (!item) return null
  const { properties } = item
  const {
    // dateIso,
    dayOfMonth,
    dayOfWeek,
    href,
    monthName,
    time,
    timezone,
    title,
    venueTitle,
    year,
    // ...props
  } = getEventData(properties)

  return (
    <Anchor href={href}>
      <Text size="8" weight="bold">
        {title}
      </Text>
      <Heading as="h5">
        {dayOfMonth} {monthName} {year}
      </Heading>
      <Text size="7">
        <Text as="span">
          {time} {timezone}
        </Text>
        <br />
        <Text as="span">{dayOfWeek}</Text>
      </Text>
      <Text size="7"> at {venueTitle}</Text>
    </Anchor>
  )
}

export { UpcomingShows }
