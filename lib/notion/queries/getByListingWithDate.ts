import _map from 'lodash/map'
import _omit from 'lodash/omit'
import _size from 'lodash/size'

import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getPagesById from '~lib/notion/api/getPagesById'
import addTime from '~lib/notion/queries/addTime'
import dataNormalized from '~lib/notion/queries/dataNormalized'
import dataSorted from '~lib/notion/queries/dataSorted'
import { PROPERTIES } from '~lib/notion/schema'
import { DB, QUERIES, ROUTE_TYPES } from '~utils/notion/helper'

// complexity 16
// eslint-disable-next-line complexity
const getByListingWithDate = async ({ meta, routeType, slug }) => {
  let content = null,
    info = null,
    items = null
  const dateTimestamp = new Date().toISOString()

  const info3 = await getPagesById({ pageId: DB[routeType.toUpperCase()].seo })
  // const info3a = info3.object === 'page' && normalizerContent(info3)
  if (info3.object === 'page') {
    info = _omit(info3, 'properties')
    info['properties'] = dataSorted(dataNormalized(info3, routeType, info.id))
  }

  // eslint-disable-next-line prefer-const
  content = await getBlocksByIdChildren({ blockId: info.id })
  /**
   * @filter
   * @note events|blog only for now
   */
  const metaCount = _size(meta)
  const [year3, month3, day3] = meta
  const timestampQuery3 = new Date(
    `${!!year3 ? year3 : dateTimestamp.slice(0, 4)}-${!!month3 ? month3 : '01'}-${
      !!day3 ? day3 : '01'
    }`
  )
  let filter
  const sorts3 = [
    {
      property: PROPERTIES.datePublished.notion,
      direction: 'descending',
    },
  ]

  switch (metaCount) {
    case 1:
      filter = {
        and: [
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              on_or_after: addTime(timestampQuery3, ''),
            },
          },
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              before: addTime(timestampQuery3, 'year'),
            },
          },
        ],
      }
      break
    case 2:
      filter = {
        and: [
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              on_or_after: addTime(timestampQuery3, ''),
            },
          },
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              before: addTime(timestampQuery3, 'month'),
            },
          },
        ],
      }
      break
    case 3:
      filter = {
        and: [
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              on_or_after: addTime(timestampQuery3, ''),
            },
          },
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              before: addTime(timestampQuery3, 'day'),
            },
          },
        ],
      }
      break
    default:
      filter = {
        and: [
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              on_or_after: addTime(timestampQuery3, ''),
            },
          },
          {
            property:
              routeType === ROUTE_TYPES.events
                ? PROPERTIES.dateEvent.notion
                : PROPERTIES.datePublished.notion,
            date: {
              before: addTime(timestampQuery3, 'day'),
            },
          },
          {
            ...QUERIES.slug,
            text: { equals: slug },
          },
        ],
      }
      break
  }
  const items3: any = await getDatabasesByIdQuery({
    databaseId: DB[routeType.toUpperCase()].id,
    filter,
    sorts: sorts3,
  })
  const items3Data = []
  // _map(items3.results, (item) => (items3Data[item.id] = normalizerContent(item)))
  // const items3Omit = _omit(items3, 'results')
  // items3Omit.results = items3Data
  _map(items3.results, (item) => {
    let item2 = item
    item2 = _omit(item2, 'properties')
    item2['properties'] = dataSorted(dataNormalized(item, routeType, item.id))
    // items3Data[item.id] = item2
    items3Data.push(item2)
  })
  const items3Omit = _omit(items3, 'results')
  items3Omit.results = items3Data
  items = items3Omit

  // eslint-disable-next-line prefer-const
  items = _omit(items3Omit, 'data')
  /***
   * @hack
   */
  return {
    content,
    info,
    items,
  }
}

export default getByListingWithDate
