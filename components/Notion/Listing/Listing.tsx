import cx from 'clsx'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import { useSound } from 'use-sound'

import { MetaTags } from '~components/Notion/Meta'
import { useUI } from '~context/ManagedUIContext'
import fetcher from '~lib/fetcher'
import getTimestamp from '~utils/getTimestamp'
import lpad from '~utils/lpad'
import getInfoType from '~utils/notion/getInfoType'
import { ROUTE_TYPES } from '~utils/notion/helper'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
  ssr: false,
})

const ListingEpisodes = dynamic(
  () => import('~components/Notion/Listing/ListingEpisodes'),
  {
    ssr: true,
  }
)
const ListingEvents = dynamic(
  () => import('~components/Notion/Listing/ListingEvents'),
  {
    ssr: true,
  }
)
const ListingShows = dynamic(
  () => import('~components/Notion/Listing/ListingShows'),
  {
    ssr: true,
  }
)

const ListingItemEpisode = ({ item, routeType }) => {
  const { audio } = useUI()
  const router = useRouter()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  if (item.data.slug === null || item.data.slug === undefined) {
    return null
  }

  const { episode, season, seoDescription, title } = item?.data
  const meta = router.asPath.split('/').slice(1)
  const isEpisode = _size(meta) === 2
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = getInfoType(item, routeType, meta)

  const { icon } = item
  const emoji = !!icon?.emoji ? icon.emoji : ''

  return (
    <NextLink as={as} href={href}>
      <a
        className={cx('cursor-pointer')}
        onClick={() => {
          playActive()
        }}
      >
        <div className={cx('listing--container', 'w-full mb-16')}>
          <div className={cx('listing--row', 'flex flex-col')}>
            <div
              className={cx(
                'listing--item',
                'rounded-3xl border',
                'border-gray-300 hover:border-black',
                'md:hover:shadow-lg',
                'dark:border-gray-500 dark:hover:border-white',
                'px-8 py-4',
                ''
              )}
            >
              <div className={cx('listing--date')}>
                {isEpisode ? (
                  <p
                    className={cx(
                      'text-sm font-medium text-gray-600 dark:text-gray-200'
                    )}
                  >
                    S{lpad(season)}E{lpad(episode)}
                  </p>
                ) : (
                  <p className={cx('text-2xl mb-0 pb-0')}>
                    {emoji && <Emoji character={emoji} />}
                  </p>
                )}
              </div>
              <div className={cx('listing--title')}>
                <h2>{title}</h2>
              </div>
              <div className={cx('listing--description')}>
                <p>{seoDescription}</p>
              </div>
              <div className={cx('listing--meta')}>
                <>
                  {/* <MetaTags tagParams={tagParams} /> */}
                  {/* <div className="spacer--h" /> */}
                </>
              </div>
            </div>
          </div>
        </div>
      </a>
    </NextLink>
  )
}

const ListingItemEvent = ({ item, routeType }) => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  const venueParams = `events=${item?.id || ''}`

  const { data: venues } = useSWR(
    ['/api/notion/query/venues', venueParams],
    (url) => fetcher(`${url}?${venueParams}`),
    {}
  )

  if (item.data.slug === null || item.data.slug === undefined) {
    return null
  }

  const {
    date: { start: dateStart },
    seoDescription,
    title,
  } = item?.data
  const timestamp = getTimestamp(dateStart)
  // // console.dir(`item`)
  // // console.dir(item)
  // console.dir(`timestamp`)
  // console.dir(timestamp)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = getInfoType(item, routeType)

  const venue = !!venues && venues?.results[0]?.data
  // console.dir(`venue`)
  // console.dir(venue)

  const tagParams = `events=${item?.id || ''}&shows=${
    item?.data?.shows?.join(',') || ''
  }&eventsLineupShowIds=${item?.data?.eventsLineupShowIds?.join(',') || ''}`

  return (
    <NextLink as={as} href={href}>
      <a
        className={cx('cursor-pointer')}
        onClick={() => {
          playActive()
        }}
      >
        <div className={cx('listing--container', 'w-full mb-16')}>
          <div className={cx('listing--row', 'flex flex-col')}>
            <div
              className={cx(
                'listing--item',
                'rounded-3xl border',
                'border-gray-300 hover:border-black',
                'md:hover:shadow-lg',
                'dark:border-gray-500 dark:hover:border-white',
                'px-8 py-4',
                ''
              )}
            >
              <div className={cx('listing--date')}>
                <p
                  className={cx(
                    'text-sm font-medium text-gray-600 dark:text-gray-200'
                  )}
                >
                  <span className={cx('inline md:hidden')}>
                    {timestamp?.tablet}
                    <br />| {venue?.title}
                  </span>
                  <span className={cx('hidden md:inline')}>
                    {timestamp?.podcast} at {timestamp?.event?.time}
                    <br />| {venue?.title}
                  </span>
                </p>
              </div>
              <div className={cx('listing--title')}>
                <h2>{title}</h2>
              </div>
              <div className={cx('listing--description')}>
                <p>{seoDescription}</p>
              </div>
              <div className={cx('listing--meta')}>
                <>
                  <MetaTags tagParams={tagParams} />
                  {/* <div className="spacer--h" /> */}
                </>
              </div>
            </div>
          </div>
        </div>
      </a>
    </NextLink>
  )
}

const ListingItem = ({ item, routeType }) => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  // const venueParams = `events=${item?.id || ''}`

  // const { data: venues } = useSWR(
  //   ['/api/notion/query/venues', venueParams],
  //   (url) => fetcher(`${url}?${venueParams}`),
  //   {}
  // )

  if (item.data.slug === null || item.data.slug === undefined) {
    return null
  }

  const { seoDescription, title } = item?.data
  const { icon } = item
  const emoji = !!icon?.emoji ? icon.emoji : ''
  // const timestamp = getTimestamp(dateStart)
  // // console.dir(`item`)
  // // console.dir(item)
  // console.dir(`timestamp`)
  // console.dir(timestamp)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, date, href, slug } = getInfoType(item, routeType)

  // const venue = !!venues && venues?.results[0]?.data
  // // console.dir(`venue`)
  // // console.dir(venue)

  const tagParams = `shows=${item?.id || ''}`

  return (
    <NextLink as={as} href={href}>
      <a
        className={cx(
          'cursor-pointer',
          'rounded-3xl border',
          'px-8 py-4 mb-16',
          'border-gray-300 dark:border-gray-500',
          'hover:border-black focus:border-black',
          'focus:shadow-md md:hover:shadow-lg',
          'dark:hover:border-white dark:focus:border-white',
          'hover:bg-gray-100 dark:hover:bg-gray-900',
          'focus:bg-gray-100 dark:focus:bg-gray-900',
          ''
        )}
        onClick={() => {
          playActive()
        }}
      >
        <div className={cx('listing--item')}>
          <div className={cx('listing--date')}>
            <p className={cx('text-2xl mb-0 pb-0')}>
              {emoji && <Emoji character={emoji} />}
            </p>
          </div>
          <div className={cx('listing--title')}>
            <h2>{title}</h2>
          </div>
          <div className={cx('listing--description')}>
            <p>{seoDescription}</p>
          </div>
          <div className={cx('listing--meta')}>
            <>
              <MetaTags tagParams={tagParams} />
              {/* <div className="spacer--h" /> */}
            </>
          </div>
        </div>
      </a>
    </NextLink>
  )
}

const Listing = ({ images, items, routeType }) => {
  const itemsSize = _size(items?.results)

  if (itemsSize === 0) return null

  let itemsData

  if (itemsSize > 0) {
    switch (routeType) {
      case ROUTE_TYPES.events:
        itemsData = _orderBy(items.results, ['data.date.start'], ['asc'])
        break
      case ROUTE_TYPES.podcasts:
        itemsData = _orderBy(
          items.results,
          ['data.season', 'data.episode'],
          ['desc', 'desc']
        )
        break
      default:
        itemsData = items.results
        break
    }
  }

  if (routeType === ROUTE_TYPES.podcasts) {
    // console.dir(itemsData)
    return (
      <>
        <ListingEpisodes images={images} items={itemsData} />
      </>
    )
  }

  if (routeType === ROUTE_TYPES.events) {
    // console.dir(itemsData)
    return (
      <>
        <ListingEvents items={itemsData} />
      </>
    )
  }

  if (routeType === ROUTE_TYPES.shows) {
    // console.dir(itemsData)
    return (
      <>
        <ListingShows images={images} items={itemsData} />
      </>
    )
  }

  return (
    <>
      {itemsSize > 0 && (
        <ul className="my-6 w-full flex flex-col">
          {_map(itemsData, (item, itemIndex) => {
            // const item = itemsData[iIndex]
            switch (routeType) {
              case ROUTE_TYPES.events:
                return (
                  <ListingItemEvent
                    item={item}
                    key={itemIndex}
                    routeType={routeType}
                  />
                )
              case ROUTE_TYPES.podcasts:
                return (
                  <ListingItemEpisode
                    item={item}
                    key={itemIndex}
                    routeType={routeType}
                  />
                )
              default:
                return (
                  <ListingItem item={item} key={itemIndex} routeType={routeType} />
                )
            }
          })}
        </ul>
      )}
    </>
  )
}

export default Listing
