import { Separator } from '@jeromefitz/ds/components/Separator'
import {
  getDataFromCache,
  getDatabaseQuery,
  getDatabaseQueryByDateRange,
} from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { Link } from '@radix-ui/themes'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import _remove from 'lodash/remove.js'
// import { draftMode } from 'next/headers'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import { getPropertyTypeData } from 'next-notion/utils'

// import { CONFIG, getEventData, getPageData } from '~app/(notion)/_config'
import { CONFIG, getEventData } from '~app/(notion)/_config'
import { Grid } from '~app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '~app/playground/2024/_components/Headline'
import { WIP } from '~components/WIP/index'

import { AccordionClient } from './Event.Listing.client'

// import type { PageObjectResponseEvent } from './Event.types'

const { DATABASE_ID } = CONFIG.EVENTS

function ListingTemp({ defaultValue = null, items }) {
  return (
    // wrapper
    <div>
      {/* search/filter here */}
      {/* list */}
      <div>
        <AccordionClient defaultValue={defaultValue} items={items} />
      </div>
    </div>
  )
}

function Events({ data }) {
  // const { isEnabled } = draftMode()
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
        <p className={'text-2xl tracking-wide '}>
          <Link asChild>
            <NextLink href="/shows/jerome-and">Jerome &</NextLink>
          </Link>
          {` `}is taking a break from its monthly gig in 2024.
          <br />
          Cooking something special up at the moment.
        </p>
        <p className={'text-lg tracking-wide '}>
          I pop up on shows from time to time, they will be here if I can remember to
          put them up.
        </p>
        <p className={'font-medium tracking-normal'}>
          Hit me up if you want a professional moron on your show.
        </p>
      </>
    )
  }
  return <ListingTemp defaultValue={defaultValue} items={events} />
}

function EventsPast({ data }) {
  // const { isEnabled } = draftMode()
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
  // const { isEnabled } = draftMode()
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
    <>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent>
          <WIP />
          {/* <Blocks data={data?.blocks} /> */}
          {hasData && <Events data={eventsData} />}
        </HeadlineContent>
      </Grid>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="p">
            <>Select Past Events</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <Separator className="mb-4 opacity-50" />
          {hasData && <EventsPast data={eventsData} />}
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { Listing }
