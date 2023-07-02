'use client'
import { ButtonLink } from '@jeromefitz/ds/components/Button'
import { ExternalLinkIcon as ExternalLink } from '@jeromefitz/ds/components/Icon'
import type { Event } from '@jeromefitz/notion/schema'
import { TZ } from '@jeromefitz/shared/src/lib/constants'
import { cx } from '@jeromefitz/shared/src/utils'
import { isObject } from '@jeromefitz/utils'
import _parseISO from 'date-fns/parseISO'
import { formatInTimeZone as _formatInTimeZone } from 'date-fns-tz'

// import { HOST_API } from '~lib/constants'
import { Meta } from '~components/Meta'
// @todo(next) https://github.com/vercel/next.js/issues/46756
// import { Icon } from '@jeromefitz/ds/components/Icon'
import { useNotion } from '~hooks/useNotion'
import { isEventInPast } from '~utils/isEventInPast'
// import { log } from '~utils/log'

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

function Slug({ data, pathVariables }) {
  const { routeType } = pathVariables
  const { info } = data
  const { properties }: { properties: Event } = info

  const iso = _parseISO(properties?.dateEvent?.start)
  const date1 = _formatInTimeZone(iso, TZ, 'EEEE, MMMM do')
  const date2 = _formatInTimeZone(iso, TZ, `'@' hh:mma z `)
  // const date1 = _formatInTimeZone(iso, TZ, 'EEEE, MMMM')
  // const date1b = _formatInTimeZone(iso, TZ, 'do')
  // const date2 = _formatInTimeZone(iso, TZ, `'@' hh:mma`)
  // const date2b = _formatInTimeZone(iso, TZ, 'z')

  const ticketUrl = properties?.ticketUrl
  // const rollupTags = properties?.rollupTags
  // log(`ticketUrl`, ticketUrl)
  // log(`rollupTags`, rollupTags)
  const venue = properties?.rollupEvents__Venues
  const venueId = properties?.relationEvents__Venues[0]
  const showId = properties?.relationEvents__Shows[0]

  const { data: venueInfo } = useNotion(`pages/${venueId}`, {
    fallbackData: {
      addressCity: '...',
      addressLatitude: '...',
      addressLongitude: '...',
      addressNeighborhood: '...',
      addressState: '..',
      addressStreet: '...',
      addressZipCode: '.....',
    },
  })
  const { data: showInfo, isLoading: showInfoIsLoading } = useNotion(
    `pages/${showId}`,
    {}
  )

  const {
    addressCity,
    // addressLatitude,
    // addressLongitude,
    addressNeighborhood,
    addressState,
    addressStreet,
    addressZipCode,
  } = venueInfo
  // log(
  //   `addressState`,
  //   !!addressState && addressState[Object.keys(addressState)[0]].name
  // )

  const isPast = !!properties && isEventInPast(properties?.dateEvent?.start)

  const temp = [
    { title: 'Date', items: [date1, date2] },
    {
      title: 'Venue',
      items: [
        venue,
        addressNeighborhood,
        addressStreet,
        `${addressCity}, ${
          isObject(addressState)
            ? // @todo(types) unknown
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              addressState[Object.keys(addressState)[0]].name
            : addressState
        } ${addressZipCode}`,
      ],
    },
    {
      title: 'Tickets',
      items: [
        isPast ? (
          <>
            <p>Need a time machine.</p>
          </>
        ) : (
          <ButtonLink
            className={cx('orange-button-outline', 'flex-row items-center gap-1')}
            href={ticketUrl}
          >
            <>Available via ShowClix</>
            <ExternalLink />
          </ButtonLink>
        ),
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
        {!showInfoIsLoading && (
          <Meta
            data={{
              info: {
                id: 'non',
                properties: showInfo,
              },
            }}
            key={`${info?.id}--meta-2`}
            isTitleHidden
            routeType={routeType}
          />
        )}
      </div>
    </>
  )
}

export { Slug }
