import _isEqual from 'lodash/isEqual'
import _map from 'lodash/map'
import _noop from 'lodash/noop'
import _uniqWith from 'lodash/uniqWith'

import asyncForEach from '~lib/asyncForEach'
import getCatchAll from '~lib/notion/getCatchAll'

const getStaticPathsDefault = ({ items, routeType }) => {
  const data = []
  // console.dir(`getStaticPathsDefault: ${routeType}`)
  switch (routeType) {
    case 'blog':
    case 'events':
      const dates = []
      _map(items, (item) => {
        const date =
          routeType === 'events'
            ? item.data.date.start
            : item.data.datePublished.start
        const [year, month, day] = date.slice(0, 10).split('-')
        data.push(`/${routeType}/${year}/${month}/${day}/${item?.data?.slug}`)
        dates.push(`/${routeType}/${year}/${month}/${day}`)
        dates.push(`/${routeType}/${year}/${month}`)
        dates.push(`/${routeType}/${year}`)
      })
      _uniqWith(dates, _isEqual).map((route) => data.push(route))
      break
    case 'episodes':
      _map(items, (item) => {
        // @todo(notion) what if there is more than two? make dynamic please
        const podcastSlug =
          item?.data?.podcasts[0] === 'fff1042d-3403-4210-991e-678c6820fe68'
            ? 'knockoffs'
            : 'jer-and-ky-and-guest'
        data.push(`/podcasts/${podcastSlug}/${item?.data?.slug}`)
      })
      break
    default:
      _map(items, (item) => data.push(`/${routeType}/${item?.data?.slug}`))
      break
  }
  return data
}

const routeTypes = ['blog', 'episodes', 'events', 'podcasts', 'shows']

const getStaticPathsCatchAll = async () => {
  const paths = []
  paths.push('/colophon')

  await asyncForEach(routeTypes, async (routeType: any) => {
    if (routeType !== 'episodes') paths.push(`/${routeType}`)
    const catchAll = [routeType]
    const data = await getCatchAll({
      preview: false,
      cache: false,
      clear: false,
      catchAll,
    })
    const items = data?.items?.results
    const slugs = getStaticPathsDefault({ items, routeType })
    paths.push(...slugs)
  }).catch(_noop)

  // console.dir(`paths:`)
  // console.dir(paths)

  return {
    paths,
    fallback: 'blocking',
  }
}

export default getStaticPathsCatchAll
