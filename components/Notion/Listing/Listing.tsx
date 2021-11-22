import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import React from 'react'

import { ROUTE_TYPES } from '~lib/notion/helper'

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
const ListingFallback = dynamic(
  () => import('~components/Notion/Listing/ListingFallback'),
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
      {itemsSize > 0 && <ListingFallback items={itemsData} routeType={routeType} />}
    </>
  )
}

export default Listing
