import _omit from 'lodash/omit'
import _size from 'lodash/size'

import { NOTION } from '~config/websites'
import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getQuery from '~lib/notion/getQuery'
import { QUERIES } from '~lib/notion/helper'
import addTime from '~lib/notion/queries/addTime'
import dataNormalized from '~lib/notion/queries/dataNormalized'
import dataSorted from '~lib/notion/queries/dataSorted'
import { PROPERTIES } from '~lib/notion/schema'

// @todo(complexity) 16
// eslint-disable-next-line complexity
const getBySlugWithRouteType = async ({ pathVariables, routeType, slug }) => {
  const { meta } = pathVariables
  let content = null,
    info = null,
    items = null
  const dateTimestamp = new Date().toISOString()

  if (routeType === NOTION.PODCASTS.routeType) {
    const [podcastSlug, episodeSlug] = meta
    const hasEpisode = _size(meta) === 2
    const infoInit: any = await getDatabasesByIdQuery({
      databaseId:
        NOTION[
          hasEpisode
            ? NOTION.EPISODES.routeType.toUpperCase()
            : routeType.toUpperCase()
        ].database_id,
      filter: {
        and: [
          {
            ...QUERIES.slug,
            text: { equals: hasEpisode ? episodeSlug : podcastSlug },
          },
        ],
      },
    })

    const _info = infoInit?.object === 'list' && infoInit.results[0]
    // @refactor(404)
    if (!_info) {
      return {}
    }
    info = _omit(_info, 'properties')
    info['properties'] = dataSorted(dataNormalized(_info, pathVariables, info.id))
    content = await getBlocksByIdChildren({ blockId: info.id })

    // @hack(podcasts)
    if (!hasEpisode) {
      if (routeType === NOTION.PODCASTS.routeType) {
        items = await getQuery({
          reqQuery: {
            podcasts: info.id,
            databaseType: NOTION.EPISODES.routeType,
          },
        })
      }
    }
  }
  if ([NOTION.BLOG.routeType, NOTION.EVENTS.routeType].includes(routeType)) {
    const [year, month, day] = meta
    const timestampQuery = new Date(
      `${!!year ? year : dateTimestamp.slice(0, 4)}-${!!month ? month : '01'}-${
        !!day ? day : '01'
      }`
    )
    const info4__be: any = await getDatabasesByIdQuery({
      databaseId: NOTION[routeType.toUpperCase()].database_id,
      filter: {
        and: [
          {
            property:
              routeType === NOTION.EVENTS.routeType
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              on_or_after: addTime(timestampQuery, ''),
            },
          },
          {
            property:
              routeType === NOTION.EVENTS.routeType
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
    if (!!info4__bea) {
      info = _omit(info4__bea, 'properties')
      info['properties'] = dataSorted(
        dataNormalized(info4__bea, pathVariables, info.id)
      )
      content = await getBlocksByIdChildren({ blockId: info.id })
    }
  }

  return {
    content,
    // @todo(images)
    images: null,
    info,
    items,
  }
}

export default getBySlugWithRouteType
