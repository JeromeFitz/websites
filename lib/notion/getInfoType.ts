import { ROUTE_TYPES } from '~lib/notion/helper'

const getInfoType = (item: any, routeType, meta = null) => {
  let date = null
  const slug = item.properties?.slug

  let as = ''
  const href = `/[...catchAll]`

  switch (routeType) {
    case ROUTE_TYPES.blog:
    case ROUTE_TYPES.events:
      date = item.properties?.datePublished?.start.slice(0, 10)
      const [year, month, day] = date?.split('-')
      as = `/${routeType}/${year}/${month}/${day}/${slug}`
      break
    case ROUTE_TYPES.podcasts:
    case ROUTE_TYPES.episodes:
      as = `/${meta.join('/')}/${slug}`
      break
    case ROUTE_TYPES.people:

    case ROUTE_TYPES.shows:
    case ROUTE_TYPES.users:
    case ROUTE_TYPES.venues:
    default:
      as = `/${routeType}/${slug}`
      break
  }

  as = as.replace('//', '/')

  return {
    as,
    date,
    href,
    slug,
  }
}

export default getInfoType
