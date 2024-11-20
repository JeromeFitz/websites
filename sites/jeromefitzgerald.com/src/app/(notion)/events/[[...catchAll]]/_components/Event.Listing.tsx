import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import {
  getDatabaseQuery,
  getDatabaseQueryByDateRange,
  getDataFromCache,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import _remove from 'lodash/remove.js'
import { getPropertyTypeData } from 'next-notion/utils/index'
// import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

// import { CONFIG, getEventData, getPageData } from '@/app/(notion)/_config/index'
import { CONFIG, getEventData } from '@/app/(notion)/_config/index'
import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
// import { ArticleMainCTA } from '@/app/playground/2024/_components/Article.Main.CTA'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
import {
  // HeadlineColumnA,
  // HeadlineContent,
  HeadlineTitle,
} from '@/components/Headline/index'

import { AccordionClient } from './Event.Listing.client'

// import type { PageObjectResponseEvent } from './Event.types'

const { DATABASE_ID } = CONFIG.EVENTS

function Events({ data }) {
  // const { isEnabled } = await draftMode()
  // const draft = isEnabled
  const draft = false
  const items = data.results.map((item) => {
    const { properties } = item
    const itemData: any = getEventData(properties)
    if (!itemData?.id) return null
    if (!itemData?.isPublished) return null
    if (itemData?.isEventOver) return null
    return itemData
  })
  _remove(items, (i) => i === null)

  /**
   * @todo(notion) filter out past events in listing
   */
  const events = _orderBy(
    _filter(items, draft ? {} : { isPublished: true }),
    ['dateIso'],
    ['asc'],
  )

  const defaultValue = events[0]?.id || null

  if (items.length === 0) {
    return (
      <>
        <Text size="5">
          <Anchor href="/shows/jerome-and">Jerome &</Anchor>
          {` `}is taking a break from its monthly gig in{' '}
          <Text as="span" className="font-mono">
            2024
          </Text>
          .
        </Text>
        <Text size="4"> Cooking something special up at the moment.</Text>
        <Text size="4">
          I pop up on shows from time to time, they will be here if I can remember to
          put them up.
        </Text>
        <Text size="4">
          Hit me up if you want a professional moron on your show.
        </Text>
      </>
    )
  }
  return <ListingTemp defaultValue={defaultValue} items={events} />
}

function EventsPast({ data }) {
  // const { isEnabled } = await draftMode()
  // const draft = isEnabled
  const draft = false

  const MAX = 25
  let i = 0
  const items = data.results.map((item) => {
    const { properties } = item
    const itemData: any = getEventData(properties)
    if (!itemData?.id) return null
    if (!itemData?.isPublished) return null
    if (!itemData?.isEventOver) return null
    if (i > MAX) return null
    i++

    return itemData
  })

  /**
   * @todo(notion) filter out past events in listing
   */
  const events = _orderBy(
    _filter(items, draft ? {} : { isPublished: true }),
    ['dateIso'],
    ['desc'],
  )

  return <ListingTemp items={events} />
}

// @todo(complexity) 14
// eslint-disable-next-line complexity
async function Listing({ revalidate, segmentInfo }) {
  // const { isEnabled } = await draftMode()
  const isEnabled = false
  const { slug } = segmentInfo
  // @note(notion) Listing do not pass Database ID
  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })

  const isDynamicListing =
    (segmentInfo.segment === 'blog' || segmentInfo.segment === 'events') &&
    segmentInfo.isIndex
  const noData = isObjectEmpty(data?.blocks || {})

  const is404 = !isDynamicListing && noData
  if (is404) notFound()

  const isPublished = is404
    ? false
    : isDynamicListing ||
      getPropertyTypeData(data?.page?.properties, 'Is.Published') ||
      false

  if (!isPublished) notFound()

  /**
   * @note(notion) GET ITEMS / TODO CACHE + SUSPENSE
   */
  const eventsData: QueryDatabaseResponse = slug.includes('/to/')
    ? await getDatabaseQueryByDateRange({
        database_id: DATABASE_ID,
        segmentInfo,
      })
    : await getDatabaseQuery({
        database_id: DATABASE_ID,
        draft: isEnabled,
        filterType: 'starts_with',
        revalidate,
        segmentInfo,
      })
  // const eventsData: QueryDatabaseResponse = await getDatabaseQuery({
  //   database_id: DATABASE_ID,
  //   draft: isEnabled,
  //   filterType: 'starts_with',
  //   revalidate,
  //   segmentInfo,
  // })

  const hasData = eventsData?.results?.length > 0
  const title = 'Events'

  // const { seoDescription } = getPageData(data?.page?.properties) || ''

  return (
    <ContainerWithSidebar>
      <HeaderSidebar hasBorder={false} title={title} />
      <ArticleMain>
        <Callout size="1" variant="outline" />
        {/* <Blocks data={data?.blocks} /> */}
        {hasData && <Events data={eventsData} />}

        <HeadlineTitle aria-label={title} as="h2">
          <>Select Past Events</>
        </HeadlineTitle>
        {hasData && <EventsPast data={eventsData} />}
      </ArticleMain>
    </ContainerWithSidebar>
  )
}

function ListingTemp({ defaultValue = null, items }) {
  return (
    // wrapper
    <div className="w-full">
      {/* search/filter here */}
      {/* list */}
      <div>
        <AccordionClient defaultValue={defaultValue} items={items} />
      </div>
    </div>
  )
}

export { Listing }
