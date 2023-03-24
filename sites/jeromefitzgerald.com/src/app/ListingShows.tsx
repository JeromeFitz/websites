'use client'
import { Listing } from '~app/(notion)/shows/[[...catchAll]]/Listing'
import { useNotion } from '~hooks/useNotion'

const ROUTE_TYPE = 'shows'

function ListingShows({}) {
  const { ...showsProps } = useNotion(ROUTE_TYPE)
  const shows = showsProps?.isLoading ? [] : showsProps?.data?.items?.results

  if (!shows) {
    return null
  }
  return <Listing data={showsProps?.data} pathVariables={''} />
}

export { ListingShows }
