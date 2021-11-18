import { nextSeo } from '~config/websites'
import { ROUTE_TYPES } from '~utils/notion/helper'

const getNextLink = (url: string) => {
  const urlTemp = url
    .replace(nextSeo.url, '')
    // .replace('/playground/notion', '')
    .replace('//', '/')
  const [, routeType] = urlTemp.split('/')
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
        as: `/${urlTemp}`,
        // href: !slug ? `/${routeType}` : `/${routeType}/[slug]`,
        href: `/[...catchAll]`,
      }
      break
    default:
      /* @note Must be a page. */
      link = {
        as: urlTemp,
        href: urlTemp === '/' ? '/' : `/[...catchAll]`,
      }
      break
  }
  return link
}

export default getNextLink
