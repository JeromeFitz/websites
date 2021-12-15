import { nextSeo, NOTION } from '~config/websites'

const getNextLink = (url: string) => {
  const urlTemp = url
    .replace(nextSeo.url, '')
    // .replace('/playground/notion', '')
    .replace('//', '/')
  const [, routeType] = urlTemp.split('/')
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
