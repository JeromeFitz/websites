const getInfoType = (item: any, routeType) => {
  const date = item.data?.date?.start.slice(0, 10)
  const slug = item.data?.slug

  const [year, month, day] = date.split('-')

  let as = ''
  const href = `/[...catchAll]`

  switch (routeType) {
    case 'blog':
    case 'events':
      as = `/${routeType}/${year}/${month}/${day}/${slug}`
      break
    case 'people':
    case 'podcasts':
    case 'shows':
    case 'users':
    case 'venues':
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
