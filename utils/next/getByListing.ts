/* eslint-disable prefer-const */
import _map from 'lodash/map'
import _omit from 'lodash/omit'

import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getPagesById from '~lib/notion/api/getPagesById'
import getImages from '~lib/notion/getImages'
import { PROPERTIES } from '~lib/notion/schema'
import {
  dataNormalized,
  dataSorted,
} from '~pages/api/notion/secret/get/[...catchAll]'
import { DB } from '~utils/notion/helper'

const getByRouteType = async ({ pathVariables, routeType }) => {
  let content = null,
    info = null,
    items = null
  const dateTimestamp = new Date().toISOString()
  // @todo(date-fns) make this the first date of the year dynamically
  const dateTimestampBlog = new Date('2020-01-01').toISOString()

  const info2 = await getPagesById({ pageId: DB[routeType.toUpperCase()].seo })
  // eslint-disable-next-line prefer-const
  // info = info2.object === 'page' && dataNormalized(info2)
  if (info2.object === 'page') {
    info = _omit(info2, 'properties')
    info['properties'] = dataSorted(dataNormalized(info2, routeType, info.id))
  }

  // eslint-disable-next-line prefer-const
  content = await getBlocksByIdChildren({ blockId: info.id })
  const items2: any = await getDatabasesByIdQuery({
    databaseId: DB[routeType.toUpperCase()].id,
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
  const items2Data = []

  // _map(items2.results, (item) => (items2Data[item.id] = dataNormalized(item)))
  // const items2Omit = _omit(items2, 'results')
  // items2Omit.results = items2Data
  // items = _omit(items2Omit, 'data')

  _map(items2.results, (item) => {
    let item2 = item
    item2 = _omit(item2, 'properties')
    item2['properties'] = dataSorted(dataNormalized(item, routeType, item.id))
    // items2Data[item.id] = item2
    items2Data.push(item2)
  })
  const items2Omit = _omit(items2, 'results')
  items2Omit.results = items2Data
  items = items2Omit

  let data = { info, content, items, images: {} }
  const images = !!data ? await getImages({ data, pathVariables }) : {}
  data = { ...data, images }

  return data
}

export default getByRouteType
