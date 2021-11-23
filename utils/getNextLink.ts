import { NOTION } from '~config/websites'

const getNextLink = (url: string) => {
  const [, routeType] = url.split('/')
  let link: any = {}

  switch (routeType) {
    case NOTION.BLOG.routeType:
    case NOTION.EVENTS.routeType:
    case NOTION.PEOPLE.routeType:
    case NOTION.PODCASTS.routeType:
    case NOTION.SHOWS.routeType:
    // case NOTION.USERS.routeType:
    case NOTION.VENUES.routeType:
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
