import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import React from 'react'

import { NOTION } from '~config/websites'

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

const Listing = ({ images, items, routeType }) => {
  const itemsSize = _size(items?.results)

  // console.dir(`> Listing`)
  // console.dir(`> itemsSize: ${itemsSize}`)
  // console.dir(items)

  if (itemsSize === 0) return null

  let itemsData

  if (itemsSize > 0) {
    switch (routeType) {
      case NOTION.EVENTS.routeType:
        itemsData = _orderBy(items.results, ['properties.dateEvent.start'], ['asc'])
        break
      case NOTION.PODCASTS.routeType:
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

  if (routeType === NOTION.PODCASTS.routeType && itemsData.length > 0) {
    // console.dir(`> itemsData`)
    // console.dir(itemsData)
    // @todo(what) this if statement is not correct.
    return (
      <>
        <ListingEpisodes images={images} items={itemsData} />
      </>
    )
  }

  if (routeType === NOTION.EVENTS.routeType) {
    // console.dir(itemsData)
    return (
      <>
        <ListingEvents items={itemsData} />
      </>
    )
  }

  if (routeType === NOTION.SHOWS.routeType) {
    // console.dir(itemsData)
    return (
      <>
        <ListingShows images={images} items={itemsData} />
      </>
    )
  }

  console.dir(`@todo(ListingFallback)`)
  return <>{itemsSize > 0 && null}</>
}

export default Listing
