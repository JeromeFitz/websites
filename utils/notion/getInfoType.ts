const getInfoType = (item: any, routeType, meta = null) => {
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
    case 'podcasts':
    case 'episodes':
      as = `/${meta.join('/')}/${slug}`
      break
    case 'people':

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
