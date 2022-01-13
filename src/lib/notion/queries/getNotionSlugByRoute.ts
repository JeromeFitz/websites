import _omit from 'lodash/omit'
import _size from 'lodash/size'

import getBlocksByIdChildren from '@jeromefitz/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '@jeromefitz/notion/api/getDatabasesByIdQuery'
import getQuery from '@jeromefitz/notion/getQuery'
import { QUERIES } from '@jeromefitz/notion/helper'
import addTime from '@jeromefitz/notion/queries/addTime'
import dataNormalized from '@jeromefitz/notion/queries/dataNormalized'
import dataSorted from '@jeromefitz/notion/queries/dataSorted'
import { PROPERTIES } from '@jeromefitz/notion/schema'

import { NOTION } from '~config/websites'

// @todo(complexity) 16
// eslint-disable-next-line complexity
const getNotionSlugByRoute = async ({ pathVariables, routeType, slug }) => {
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
            databaseType: NOTION.EPISODES.routeType.toUpperCase(),
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

export default getNotionSlugByRoute
