import { ROUTE_TYPES } from '~utils/notion/helper'

const getNextLink = (url: string) => {
  const [, routeType] = url.split('/')
  let link: any = {}

  switch (routeType) {
    case ROUTE_TYPES.blog:
    case ROUTE_TYPES.events:
    case ROUTE_TYPES.people:
    case ROUTE_TYPES.podcasts:
    case ROUTE_TYPES.shows:
    case ROUTE_TYPES.users:
    case ROUTE_TYPES.venues:
      link = {
        as: url,
        // href: !slug ? `/${routeType}` : `/${routeType}/[slug]`,
        href: `/[...catchAll]`,
      }
      break
    default:
      /* @note Must be a page. */
      link = {
        as: url,
        href: url === '/' ? '/' : `/[...catchAll]`,
      }
      break
  }
  return link
}

export default getNextLink
