/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Event, Show, Venue } from '@jeromefitz/notion/schema'
import { TZ } from '@jeromefitz/shared/src/lib/constants'
import _parseISO from 'date-fns/parseISO'
import { formatInTimeZone as _formatInTimeZone } from 'date-fns-tz'
import _orderBy from 'lodash/orderBy'
import { ContentNodes } from 'next-notion/src/app'
import { Suspense } from 'react'

import { Anchor } from '~components/Anchor'
import { Debug } from '~components/Debug'
import { Meta } from '~components/Meta'
import { notionConfig } from '~config/index'
import { HOST_API, GENERATE } from '~lib/constants'
// @todo(next) https://github.com/vercel/next.js/issues/46756
// import { Icon } from '~ui/Icon'
import { ExternalLinkIcon as ExternalLink } from '~ui/Icon/Icon.list'
import { PageHeading } from '~ui/PageHeading'
import { cx } from '~utils/cx'
import { getNotionData, preload } from '~utils/getNotionData'

import { Listing } from './Listing'

// import { log } from '~utils/log'

// const DEBUG_KEY = '(notion)/events/[[..catchAll]]/page.tsx >> '
// @todo(types)
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

export function generateStaticParams() {
  return GENERATE.events.map((event) => ({
    catchAll: [...event],
  }))
}

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
          <ExternalLink />
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
