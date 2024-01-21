import { ButtonLink } from '@jeromefitz/ds/components/Button'
import {
  // CalendarIcon,
  // ClockIcon,
  ExternalLinkIcon,
  // LocationMarkerIcon,
} from '@jeromefitz/ds/components/Icon'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  Tags,
} from '@jeromefitz/ds/components/Section'
import { cx } from '@jeromefitz/ds/utils/cx'
import {
  getDataFromCache,
  getDatabaseQuery,
  getDatabaseQueryByDateRange,
} from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { draftMode } from 'next/headers'
// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { notFound } from 'next/navigation'
import { getPropertyTypeData } from 'next-notion/utils'

import { getEventData, getPageData, CONFIG } from '~app/(notion)/_config'

import {
  AccordionDemo,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Event.Listing.Accordion'
// import type { PageObjectResponseEvent } from './Event.types'

const { DATABASE_ID } = CONFIG.EVENTS

const description = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, omnis? Quod, enim fugit doloribus qui culpa odit. Eveniet, cupiditate qui alias nihil similique tempora fugit?`

function ListingTemp({ items, defaultValue = null }) {
  return (
    // wrapper
    <div>
      {/* search/filter here */}
      {/* list */}
      <div>
        <AccordionDemo defaultValue={defaultValue}>
          {items.map((item) => {
            if (!item.id) return null
            // const { properties } = item
            // const {
            //   dayOfWeek,
            //   dayOfWeekAbbr,
            //   dayOfMonth,
            //   dayOfMonthOrdinal,
            //   month,
            //   monthName,
            //   href,
            //   seoDescription,
            //   title,
            //   time,
            //   ticketUrl,
            // } = getEventData(properties)
            const {
              dayOfWeek,
              dayOfWeekAbbr,
              dayOfMonth,
              dayOfMonthOrdinal,
              isEventOver,
              month,
              monthName,
              href,
              id,
              seoDescription,
              tags,
              title,
              time,
              ticketUrl,
            } = item
            // const dateMobile = `${dayOfWeekAbbr.toUpperCase()}, ${month}/${dayOfMonth}<br/>${time}`

            const key = `items-item-${id}`
            return (
              // @note(types) Property 'value' does not exist on type
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <AccordionItem key={key} value={id}>
                <AccordionTrigger>
                  <div className="flex w-full flex-row items-center justify-start px-2">
                    <div className="flex w-6/12 min-w-0 grow-0 items-center  text-left text-base font-bold leading-tight md:w-9/12 md:text-2xl lg:w-8/12">
                      <p className="font-sans">{title}</p>
                    </div>
                    <div className="w-6/12 px-2 text-right text-sm font-medium leading-tight md:w-3/12 md:text-xl lg:w-4/12 lg:text-left">
                      <span className="visible inline font-sans lg:invisible lg:hidden">
                        {dayOfWeekAbbr?.toUpperCase()}, {month}/{dayOfMonth}
                        <br />
                        {time}
                      </span>
                      <span className="invisible hidden font-sans lg:visible lg:inline">
                        {dayOfWeek}, {monthName} {dayOfMonthOrdinal}
                        <br />@ {time}
                      </span>
                    </div>
                    {/* <div className="lg:w-['calc(50% - 2rem)'] hidden lg:ml-auto lg:mr-2 lg:flex lg:grow-0 lg:cursor-pointer lg:flex-row lg:overflow-hidden">
                      IMG
                    </div> */}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-row flex-wrap">
                    <div className="mb-2 w-full pb-2 md:mb-4 md:pb-4">
                      <p className="text-2xl">{seoDescription || description}</p>
                    </div>
                    <div className="flex w-full flex-row flex-wrap justify-center md:flex-nowrap">
                      <div className="w-full justify-start px-4 text-left md:-mt-4">
                        <Tags tags={tags} classNameTag="px-3 py-2 mb-4 mr-4" />
                      </div>
                      <div
                        className={cx(
                          // 'items-center align-middle',
                          'mr-1 w-full justify-end text-right md:w-6/12 lg:mr-4',
                          'flex flex-col',
                        )}
                      >
                        {/* @todo(types) */}
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <ButtonLink
                          aria-label={`Read more detailed information for ${title}`}
                          href={href}
                          className={cx(
                            'justify-center',
                            isEventOver ? 'pink-button-outline' : 'pink-button-cta',
                          )}
                        >
                          Detailed Info
                        </ButtonLink>
                        {!!ticketUrl && !isEventOver && (
                          // @todo(types)
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          <ButtonLink
                            href={ticketUrl}
                            className={cx(
                              'pink-button-outline',
                              'flex-row items-center justify-center gap-1',
                            )}
                          >
                            <>Buy Tickets</>
                            <ExternalLinkIcon />
                          </ButtonLink>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </AccordionDemo>
      </div>
    </div>
  )
}

function Events({ data }) {
  const { isEnabled } = draftMode()
  const draft = isEnabled
  const items = data.results.map((item) => {
    const { properties } = item
    const itemData: any = getEventData(properties)
    if (!itemData?.id) return null
    if (!itemData?.isPublished) return null
    if (itemData?.isEventOver) return null
    return itemData
  })

  /**
   * @todo(notion) filter out past events in listing
   */
  const events = _orderBy(
    _filter(items, draft ? {} : { isPublished: true }),
    ['dateIso'],
    ['asc'],
  )

  const defaultValue = events[0]?.id || null
  return <ListingTemp items={events} defaultValue={defaultValue} />
}

function EventsPast({ data }) {
  const { isEnabled } = draftMode()
  const draft = isEnabled

  const MAX = 10
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
  const { isEnabled } = draftMode()
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

  const { seoDescription } = getPageData(data?.page?.properties) || ''

  return (
    <>
      {/* Hero */}
      {/* <SectionHero title={title} /> */}
      {/* Content */}
      <SectionWrapper>
        <SectionHeader className="hidden md:flex">
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent>{seoDescription}</SectionHeaderContent>
        </SectionHeader>
        <SectionContent className="w-full">
          {/* <Blocks data={data?.blocks} /> */}
          {/* @todo(notion) Show */}
          {hasData && <Events data={eventsData} />}
        </SectionContent>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader className="hidden md:flex">
          <SectionHeaderTitle>Select Past Events</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent className="w-full">
          {/* <Blocks data={data?.blocks} /> */}
          {/* @todo(notion) Show */}
          {hasData && <EventsPast data={eventsData} />}
        </SectionContent>
      </SectionWrapper>
      {/* Info */}
      {/* <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Info</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper> */}
    </>
  )
}

export { Listing }
