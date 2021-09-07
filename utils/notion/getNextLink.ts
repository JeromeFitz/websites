const getNextLink = (url: string) => {
  const urlTemp = url
    .replace('https://jeromefitzgerald.com', '')
    // .replace('/playground/notion', '')
    .replace('//', '/')
  const [, routeType] = urlTemp.split('/')
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
