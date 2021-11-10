import { ROUTE_TYPES } from '~utils/notion/helper'

const getInfoType = (item: any, routeType, meta = null) => {
  const date = item.data?.date?.start.slice(0, 10)
  const slug = item.data?.slug

  const [year, month, day] = date.split('-')

  let as = ''
  const href = `/[...catchAll]`

  switch (routeType) {
    case ROUTE_TYPES.blog:
    case ROUTE_TYPES.events:
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
