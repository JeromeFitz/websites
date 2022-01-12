/* eslint-disable prefer-const */
import _map from 'lodash/map'
import _omit from 'lodash/omit'

import getBlocksByIdChildren from '@jeromefitz/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '@jeromefitz/notion/api/getDatabasesByIdQuery'
import getPagesById from '@jeromefitz/notion/api/getPagesById'
import getImages from '@jeromefitz/notion/getImages'
import dataNormalized from '@jeromefitz/notion/queries/dataNormalized'
import dataSorted from '@jeromefitz/notion/queries/dataSorted'
import { PROPERTIES } from '@jeromefitz/notion/schema'

import { NOTION } from '~config/websites'

const getNotionListing = async ({ pathVariables, routeType }) => {
  let content = null,
    info = null,
    items = null
  const dateTimestamp = new Date().toISOString()
  // @todo(date-fns) make this the first date of the year dynamically
  // const year = new Date().getFullYear.toString()
  // const dateTimestampBlog = new Date(`${year}-01-01`).toISOString()
  const dateTimestampBlog = new Date('2020-01-01').toISOString()

  const infoInit = await getPagesById({
    pageId: NOTION[routeType.toUpperCase()].page_id__seo,
  })
  if (infoInit.object === 'page') {
    info = _omit(infoInit, 'properties')
    info['properties'] = dataSorted(dataNormalized(infoInit, pathVariables, info.id))
  }

  content = await getBlocksByIdChildren({ blockId: info.id })
  const itemsInit: any = await getDatabasesByIdQuery({
    databaseId: NOTION[routeType.toUpperCase()].database_id,
    filter: {
      and: [
        {
          property:
            routeType === NOTION.EVENTS.routeType
              ? PROPERTIES.dateEvent.notion
              : PROPERTIES.datePublished.notion,
          date: {
            on_or_after:
              routeType === NOTION.EVENTS.routeType
                ? dateTimestamp
                : dateTimestampBlog,
          },
        },
      ],
    },
  })
  const _itemData = []
  _map(itemsInit.results, (item) => {
    let itemInit = item
    itemInit = _omit(itemInit, 'properties')
    itemInit['properties'] = dataSorted(dataNormalized(item, pathVariables, item.id))
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

export default getNotionListing
