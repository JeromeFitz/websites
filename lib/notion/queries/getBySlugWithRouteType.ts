import _omit from 'lodash/omit'
import _size from 'lodash/size'

import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getQuery from '~lib/notion/getQuery'
import addTime from '~lib/notion/queries/addTime'
import dataNormalized from '~lib/notion/queries/dataNormalized'
import dataSorted from '~lib/notion/queries/dataSorted'
import { PROPERTIES } from '~lib/notion/schema'
import { DB, QUERIES, ROUTE_TYPES } from '~utils/notion/helper'

// complexity 14
// eslint-disable-next-line complexity
const getBySlugWithRouteType = async ({ meta, routeType, slug }) => {
  let content = null,
    info = null,
    items = null
  const dateTimestamp = new Date().toISOString()

  if (routeType === ROUTE_TYPES.podcasts) {
    const [podcastSlug, episodeSlug] = meta
    const hasEpisode = _size(meta) === 2
    const info4__p: any = await getDatabasesByIdQuery({
      databaseId:
        DB[hasEpisode ? ROUTE_TYPES.episodes.toUpperCase() : routeType.toUpperCase()]
          .id,
      filter: {
        and: [
          {
            ...QUERIES.slug,
            text: { equals: hasEpisode ? episodeSlug : podcastSlug },
          },
        ],
      },
    })

    const info4__pa = info4__p?.object === 'list' && info4__p.results[0]
    info = _omit(info4__pa, 'properties')
    info['properties'] = dataSorted(dataNormalized(info4__pa, routeType, info.id))
    content = await getBlocksByIdChildren({ blockId: info.id })

    content = await getBlocksByIdChildren({ blockId: info.id })
    // @hack(podcasts)
    if (!hasEpisode) {
      let items4__p = null
      if (routeType === ROUTE_TYPES.podcasts) {
        items4__p = await getQuery({
          reqQuery: {
            podcasts: info.id,
            databaseType: ROUTE_TYPES.episodes,
          },
        })
        items = items4__p
      }
    }
  }
  if ([ROUTE_TYPES.blog, ROUTE_TYPES.events].includes(routeType)) {
    const [year, month, day] = meta
    const timestampQuery = new Date(
      `${!!year ? year : dateTimestamp.slice(0, 4)}-${!!month ? month : '01'}-${
        !!day ? day : '01'
      }`
    )
    const info4__be: any = await getDatabasesByIdQuery({
      databaseId: DB[routeType.toUpperCase()].id,
      filter: {
        and: [
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              on_or_after: addTime(timestampQuery, ''),
            },
          },
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              before: addTime(timestampQuery, 'day'),
            },
          },
          {
            ...QUERIES.slug,
            text: { equals: slug },
          },
        ],
      },
    })

    const info4__bea = info4__be?.object === 'list' && info4__be.results[0]
    info = _omit(info4__bea, 'properties')
    info['properties'] = dataSorted(dataNormalized(info4__bea, routeType, info.id))
    content = await getBlocksByIdChildren({ blockId: info.id })
  }
  return {
    content,
    info,
    items,
  }
}

export default getBySlugWithRouteType
