import _isEqual from 'lodash/isEqual'
import _map from 'lodash/map'
import _noop from 'lodash/noop'
import _uniqWith from 'lodash/uniqWith'

import { NOTION, PAGES, ROUTE_TYPES } from '~config/websites'
import asyncForEach from '~lib/asyncForEach'
import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'

const isDev = process.env.NODE_ENV !== 'production'

const getStaticPathsDefault = ({ items, routeType }) => {
  const data = []
  // console.dir(`getStaticPathsDefault: ${routeType}`)
  switch (routeType) {
    case NOTION.BLOG.routeType:
    case NOTION.EVENTS.routeType:
      const dates = []
      _map(items, (item) => {
        const date =
          routeType === 'events'
            ? item.properties.dateEvent.start
            : item.properties.datePublished.start
        const [year, month, day] = date.slice(0, 10).split('-')
        data.push(`/${routeType}/${year}/${month}/${day}/${item?.properties?.slug}`)
        dates.push(`/${routeType}/${year}/${month}/${day}`)
        dates.push(`/${routeType}/${year}/${month}`)
        dates.push(`/${routeType}/${year}`)
      })
      _uniqWith(dates, _isEqual).map((route) => data.push(route))
      break
    case NOTION.EPISODES.routeType:
      _map(items, (item) => {
        // @todo(notion) what if there is more than two? make dynamic please
        const podcastSlug =
          item?.properties?.relationEpisodes__Podcast[0] ===
          '24f593ca-1ea5-4f2f-9e5f-39bd44342021'
            ? 'knockoffs'
            : 'jer-and-ky-and-guest'
        !!podcastSlug &&
          data.push(
            `/${NOTION.PODCASTS.routeType}/${podcastSlug}/${item?.properties?.slug}`
          )
      })
      break
    default:
      _map(items, (item) => {
        data.push(`/${routeType}/${item?.properties?.slug}`)
      })
      break
  }
  return data
}

const getStaticPathsCatchAll = async () => {
  const paths = []

  // @note(next) yo, this was KILLING local development. only on builds please.
  if (!isDev) {
    // @todo(notion) api this up somehow please
    _map(PAGES, (p) => paths.push(`/${p}`))
    // const routeTypesSingular = [routeType]
    await asyncForEach(ROUTE_TYPES, async (routeType: string) => {
      if (routeType !== 'episodes') paths.push(`/${routeType}`)
      const catchAll = [routeType]
      const pathVariables = getPathVariables(catchAll)
      const data = await getCatchAll({
        cache: false,
        catchAll,
        clear: false,
        pathVariables,
        preview: false,
      })
      const items = data?.items?.results
      const slugs = getStaticPathsDefault({ items, routeType })
      paths.push(...slugs)
    }).catch(_noop)
  }
  // console.dir(`paths:`)
  // console.dir(paths)

  return {
    paths,
    fallback: 'blocking',
  }
}

export default getStaticPathsCatchAll
