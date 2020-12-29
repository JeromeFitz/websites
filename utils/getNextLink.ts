const getNextLink = (url: string) => {
  let [, routeType] = url.split('/')
  let link: any = {}

  switch (routeType) {
    case 'blog':
    case 'events':
    case 'people':
    case 'podcasts':
    case 'shows':
    case 'users':
    case 'venues':
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
