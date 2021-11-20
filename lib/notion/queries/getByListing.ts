/* eslint-disable prefer-const */
import _map from 'lodash/map'
import _omit from 'lodash/omit'

import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getPagesById from '~lib/notion/api/getPagesById'
import getImages from '~lib/notion/getImages'
import dataNormalized from '~lib/notion/queries/dataNormalized'
import dataSorted from '~lib/notion/queries/dataSorted'
import { PROPERTIES } from '~lib/notion/schema'
import { DB } from '~utils/notion/helper'

const getByRouteType = async ({ pathVariables, routeType }) => {
  let content = null,
    info = null,
    items = null
  const dateTimestamp = new Date().toISOString()
  // @todo(date-fns) make this the first date of the year dynamically
  const dateTimestampBlog = new Date('2020-01-01').toISOString()

  const infoInit = await getPagesById({ pageId: DB[routeType.toUpperCase()].seo })
  if (infoInit.object === 'page') {
    info = _omit(infoInit, 'properties')
    info['properties'] = dataSorted(dataNormalized(infoInit, routeType, info.id))
  }

  content = await getBlocksByIdChildren({ blockId: info.id })
  const itemsInit: any = await getDatabasesByIdQuery({
    databaseId: DB[routeType.toUpperCase()].database_id,
    filter: {
      and: [
        {
          property:
            routeType === 'events'
              ? PROPERTIES.dateEvent.notion
              : PROPERTIES.datePublished.notion,
          date: {
            on_or_after: routeType === 'events' ? dateTimestamp : dateTimestampBlog,
          },
        },
      ],
    },
  })
  const _itemData = []
  _map(itemsInit.results, (item) => {
    let itemInit = item
    itemInit = _omit(itemInit, 'properties')
    itemInit['properties'] = dataSorted(dataNormalized(item, routeType, item.id))
    _itemData.push(itemInit)
  })
  const _items = _omit(itemsInit, 'results')
  _items.results = _itemData
  items = _items

  let data = { info, content, items, images: {} }
  const images = !!data ? await getImages({ data, pathVariables }) : {}
  data = { ...data, images }

  return data
}

export default getByRouteType
