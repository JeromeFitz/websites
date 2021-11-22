import cx from 'clsx'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import React from 'react'
import { useSound } from 'use-sound'

import { useUI } from '~context/ManagedUIContext'
import getInfoType from '~utils/notion/getInfoType'
import { ROUTE_TYPES } from '~utils/notion/helper'

const Emoji = dynamic(() => import('~components/Emoji'), {
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

const ListingItem = ({ item, routeType }) => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  if (item?.properties?.slug === null || item?.properties?.slug === undefined) {
    return null
  }

  const { seoDescription, title } = item?.properties
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
        </div>
      </a>
    </NextLink>
  )
}

const Listing = ({ images, items, routeType }) => {
  const itemsSize = _size(items?.results)

  // console.dir(`> Listing`)
  // console.dir(`> itemsSize: ${itemsSize}`)
  // console.dir(items)

  if (itemsSize === 0) return null

  let itemsData

  if (itemsSize > 0) {
    switch (routeType) {
      case ROUTE_TYPES.events:
        itemsData = _orderBy(items.results, ['properties.dateEvent.start'], ['asc'])
        break
      case ROUTE_TYPES.podcasts:
        itemsData = _orderBy(
          items.results,
          ['properties.season', 'properties.episode'],
          ['desc', 'desc']
        )
        break
      default:
        itemsData = items.results
        break
    }
  }

  if (routeType === ROUTE_TYPES.podcasts && itemsData.length > 0) {
    // console.dir(`> itemsData`)
    // console.dir(itemsData)
    // @todo(what) this if statement is not correct.
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
          {_map(itemsData, (item, itemIndex) => (
            <ListingItem item={item} key={itemIndex} routeType={routeType} />
          ))}
        </ul>
      )}
    </>
  )
}

export default Listing
