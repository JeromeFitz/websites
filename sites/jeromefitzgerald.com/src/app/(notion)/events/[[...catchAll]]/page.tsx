/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Event, Show, Venue } from '@jeromefitz/notion/schema'
import { TZ } from '@jeromefitz/shared/src/lib/constants'
// import { ExternalLinkIcon } from '@radix-ui/react-icons'
import _parseISO from 'date-fns/parseISO'
import { formatInTimeZone as _formatInTimeZone } from 'date-fns-tz'
// import _filter from 'lodash/filter'
// import _isEmpty from 'lodash/isEmpty'
// import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
// import _size from 'lodash/size'
// import _union from 'lodash/union'
// import _uniqWith from 'lodash/uniqWith'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Anchor } from '~components/Anchor'
import { Debug } from '~components/Debug'
import { Meta } from '~components/Meta'
import { notionConfig } from '~config/index'
// import { notionConfig, TAGS } from '~config/index'
// import { Icon } from '~ui/Icon'
// import { GENERATE } from '~lib/constants'
import { HOST_API } from '~lib/constants'
import { PageHeading } from '~ui/PageHeading'
import { cx } from '~utils/cx'
import { formatDateForSlug } from '~utils/formatDateForSlug'
import { getNotionData, preload } from '~utils/getNotionData'
import { filterForEventsInFuture } from '~utils/isEventInFuture'
// import { log } from '~utils/log'

// const DEBUG_KEY = '(notion)/events/[[..catchAll]]/page.tsx >> '
// @ts-ignore
const { slug: ROUTE_TYPE } = notionConfig.NOTION.EVENTS

// export const dynamicParams = true

// @ts-ignore
async function getCast(id) {
  // log(`id`, id)
  const res = await fetch(`${HOST_API}/pages/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch cast information')
  }
  return res.json()
}

async function getVenueAddress(id) {
  // log(`id`, id)
  const res = await fetch(`${HOST_API}/pages/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch venue information')
  }
  return res.json()
}

// export function generateStaticParams() {
//   // return [{ catchAll: ['alex-o-jerome'] }, { catchAll: ['jerome-and'] }]
//   return GENERATE.events.map((event) => ({
//     catchAll: [...event],
//   }))
// }

function Rollup({ title, items }) {
  // log(`${DEBUG_KEY} title`, title)
  const isTickets = title === 'Tickets'
  return (
    <div
      className={cx(
        'mb-4 flex flex-col md:mb-8',
        isTickets
          ? 'col-span-6 md:col-start-[span_2]'
          : 'col-span-3 md:col-start-[span_2]'
      )}
    >
      <h4
        className={cx(
          'border-t-[1px] border-solid py-3 font-extrabold uppercase tracking-tight',
          'mauve-border'
        )}
      >
        {title}
      </h4>
      <ul>
        {!!items &&
          items.map((item, i) => {
            return (
              <li className="my-2 md:my-0.5" key={`events--rollup--${i}`}>
                <p className="text-base font-normal tracking-tight md:text-xl">
                  {item}
                </p>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

function Listing({ data, pathVariables }) {
  // @ts-ignore
  const { routeType } = pathVariables
  // @ts-ignore
  const { content, images, info, items } = data
  // @ts-ignore
  const { properties }: { properties: Event } = info
  // @ts-ignore
  const { title } = properties

  // log(`${DEBUG_KEY} properties`, properties)
  // log(`${DEBUG_KEY} items`, items)

  const events = _orderBy(filterForEventsInFuture(items?.results), [
    'properties.dateEvent.start',
  ])
  // log(`${DEBUG_KEY} events`, events)

  // @ts-ignore
  const temp = [
    { title: 'Date', items: ['Friday, February 24th'] },
    { title: 'Venue', items: ['Friday, February 24th'] },
    {
      title: 'Tickets',
      items: ['via ShowClix'],
    },
  ]
  return (
    <>
      <div className="mauve-border my-2 border-b-[1px] border-solid md:my-8">
        <ul>
          <li
            className={cx(
              'group',
              'hidden md:grid',
              'grid-cols-2 gap-2',
              'text-sm font-bold uppercase',
              'border-radix-mauve12 border-b-2',
              'my-4 py-4 md:my-2 md:p-4'
            )}
          >
            <div>Title</div>
            <div className={cx('text-right')}>Venue</div>
          </li>
          {events.map((event) => {
            const { properties }: { properties: Event } = event
            const { dateEvent, rollupEvents__Venues, slug, title } = properties

            const yyyymmdd = formatDateForSlug(dateEvent.start)
            const url = `/events/${yyyymmdd}/${slug}`
            // @ts-ignore
            const t = `${title} (${yyyymmdd})`

            const venue = rollupEvents__Venues[0]
            const iso = _parseISO(dateEvent?.start)
            const date1 = _formatInTimeZone(iso, TZ, 'EEEE, MMMM')
            const date1b = _formatInTimeZone(iso, TZ, 'do')
            const date2 = _formatInTimeZone(iso, TZ, `'@' hh:mma`)
            const date2b = _formatInTimeZone(iso, TZ, `z`)

            // const { rollupTags, rollupTagsSecondary } = properties
            // const tags =
            //   _map(
            //     _union(rollupTags, rollupTagsSecondary),
            //     (tag: string) => TAGS[tag]?.title
            //   ).join(', ') || 'Comedy'
            // log(`${DEBUG_KEY} tags`, tags)

            return (
              <li
                key={event.id}
                className={cx(
                  'group',
                  'my-4 py-4 md:my-2 md:p-4',
                  // 'border-l-2 px-2 md:px-0 md:border-0',
                  // 'bg-radix-mauve1',
                  'border-radix-mauve12 border-b',
                  'hover:bg-black/10',

                  'last-of-type:border-0'
                )}
              >
                <Anchor
                  href={url}
                  className={cx('grid grid-cols-12', 'gap-y-4  md:gap-1')}
                >
                  <div
                    className={cx(
                      'col-span-12 md:col-span-8',
                      'text-xl font-bold',
                      'md:text-4xl md:font-extrabold'
                    )}
                  >
                    {title}
                    {/* <span
                      className={cx(
                        'hidden md:inline-grid',
                        'text-sm font-normal',
                        'text-ellipsis'
                      )}
                    >
                      {properties?.seoDescription}
                    </span> */}
                  </div>
                  <div
                    className={cx(
                      'col-span-12 md:col-span-4',
                      'md:text-right',
                      'text-sm slashed-zero'
                    )}
                  >
                    <span className={cx('text-base font-bold')}>{venue}</span>
                    <br />
                    <span
                      className={cx('')}
                      style={
                        {
                          // fontFeatureSettings: '"ordn","ss02"',
                        }
                      }
                    >
                      {date1}
                    </span>
                    <span
                      className={cx(' ')}
                      style={{
                        fontFeatureSettings: '"ordn"',
                      }}
                    >
                      {` `}
                      {date1b}
                    </span>
                    <br />
                    <span
                      className={cx('')}
                      style={{
                        fontFeatureSettings: '""',
                      }}
                    >
                      {date2}
                    </span>
                    <span
                      className={cx('text-sm')}
                      style={{
                        fontFeatureSettings: '"sups"',
                      }}
                    >
                      {` `}
                      {date2b}
                    </span>
                  </div>
                </Anchor>
              </li>
            )
          })}
        </ul>
        {/* <p
          className={cx(
            'my-2 py-2',
            'md:my-6 md:py-6',
            'font-semibold',
            'border-t-[0px] border-solid mauve-border',
            'text-xl leading-tight',
            'md:text-4xl md:leading-tight'
          )}
        >
          Though primarily based in Pittsburgh, occasionally he will venture out into
          the wide world and do shows elsewhere.
        </p>

        <div
          style={{
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
          className="m-auto grid grid-cols-6 gap-8 border-b-[1px] mauve-border"
        >
          {temp.map((d, i) => (
            <Rollup key={`events--wrapper--rollup-${i}`} {...d} />
          ))}
        </div> */}
      </div>
      {/* <Meta data={data} key={`${info?.id}--meta`} routeType={routeType} /> */}
    </>
  )
}

async function Slug({ data, pathVariables }) {
  const { routeType } = pathVariables
  // @ts-ignore
  const { content, images, info, items } = data
  const { properties }: { properties: Event } = info

  const iso = _parseISO(properties?.dateEvent?.start)
  const date1 = _formatInTimeZone(iso, TZ, 'EEEE, MMMM do')
  const date2 = _formatInTimeZone(iso, TZ, `'@' hh:mma z `)
  // const date1 = _formatInTimeZone(iso, TZ, 'EEEE, MMMM')
  // const date1b = _formatInTimeZone(iso, TZ, 'do')
  // const date2 = _formatInTimeZone(iso, TZ, `'@' hh:mma`)
  // const date2b = _formatInTimeZone(iso, TZ, 'z')

  const ticketUrl = properties?.ticketUrl
  // @ts-ignore
  const rollupTags = properties?.rollupTags
  // log(`ticketUrl`, ticketUrl)
  // log(`rollupTags`, rollupTags)
  const venue = properties?.rollupEvents__Venues
  const venueId = properties?.relationEvents__Venues[0]
  const venueInfo: Venue = await getVenueAddress(venueId)
  const showId = properties?.relationEvents__Shows[0]
  const showInfo: Show = await getVenueAddress(showId)
  // @hack(meta)
  const foo = {
    info: {
      id: 'non',
      properties: showInfo,
    },
  }
  // log(`venue`, venue)
  // log(`venueInfo`, venueInfo)
  // log(`showInfo`, showInfo)
  // log(`routeType`, routeType)

  const {
    addressCity,
    // addressLatitude,
    // addressLongitude,
    addressNeighborhood,
    // addressState,
    addressStreet,
    addressZipCode,
  } = venueInfo
  // log(`addressState`, addressState[0])

  const temp = [
    { title: 'Date', items: [date1, date2] },
    {
      title: 'Venue',
      items: [
        venue,
        addressNeighborhood,
        addressStreet,
        `${addressCity}, PA ${addressZipCode}`,
      ],
    },
    {
      title: 'Tickets',
      items: [
        <Anchor
          className={cx(
            'flex flex-row items-center gap-1',
            'underline-offset-4',
            'underline',
            'decoration-radix-mauve4 hover:decoration-radix-mauve5',
            // 'text-radix-mauve11 hover:text-radix-mauve12',
            'transition-all duration-200 ease-in',
            '',
            'rounded-lg p-4',
            'border-radix-green7 hover:border-radix-green8 border-4',
            'bg-black/75 text-white hover:bg-black',
            'dark:hover:bg-radix-mauve12 dark:bg-white dark:text-black'
          )}
          href={ticketUrl}
          style={{
            boxShadow:
              '-15px 0 30px -10px var(--colors-orangeA7), 0 0 30px -10px var(--colors-pinkA7), 15px 0 30px -10px var(--colors-violetA7)',
          }}
        >
          <>Available via ShowClix</>
          {/* <ExternalLinkIcon /> */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Anchor>,
      ],
    },
  ]

  return (
    <>
      <div className="mauve-border my-2 border-b-[1px] border-solid md:my-8">
        <p
          className={cx(
            'my-2 py-2',
            'md:my-6 md:py-6',
            'font-extrabold',
            'mauve-border border-t-[0px] border-solid',
            'text-2xl leading-tight',
            'md:text-4xl md:leading-tight'
            // 'hidden'
          )}
        >
          Info
        </p>

        <div
          style={{
            '& ul': { listStyle: 'none', margin: '0', padding: '0' },
          }}
          className={cx(
            'mauve-border m-auto grid grid-cols-6 gap-8 border-b-[0px]',
            'grid-rows-[1fr_min-content]'
          )}
        >
          {temp.map((d, i) => (
            <Rollup key={`event--wrapper--rollup-${i}`} {...d} />
          ))}
        </div>
        <Meta
          data={data}
          key={`${info?.id}--meta-1`}
          isTitleHidden
          routeType={routeType}
        />
        <Meta
          data={foo}
          key={`${info?.id}--meta-2`}
          isTitleHidden
          routeType={routeType}
        />
      </div>
    </>
  )
}

export async function generateMetadata({ ...props }) {
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)
  const { metadata } = await getNotionData({
    catchAll,
  })
  return metadata
}

export default async function Page({ preview = false, ...props }) {
  // log(`${DEBUG_KEY} props`, props)
  const catchAll = [ROUTE_TYPE]
  !!props.params?.catchAll && catchAll.push(...props.params?.catchAll)

  preload({ catchAll })
  const { data, pathVariables } = await getNotionData({
    catchAll,
  })
  const { isIndex } = pathVariables
  const { content, images, info } = data
  const { properties }: { properties: Event } = info
  const { title } = properties

  const Component = isIndex ? Listing : Slug

  // log(`properties`, properties)

  return (
    <>
      <Debug data={data} pathVariables={pathVariables} />
      <PageHeading
        overline={ROUTE_TYPE}
        title={isIndex ? 'Upcoming Events' : title}
      />
      {}
      {/* @ts-ignore */}
      <Component data={data} pathVariables={pathVariables} />
      {!isIndex && (
        <Suspense fallback={<p>Loading...</p>}>
          <ContentNodes content={content} images={images} />
        </Suspense>
      )}
    </>
  )
}
