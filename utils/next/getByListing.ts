/* eslint-disable prefer-const */
import _map from 'lodash/map'
import _omit from 'lodash/omit'

import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getPagesById from '~lib/notion/api/getPagesById'
import { normalizerContent } from '~lib/notion/getCatchAll'
import getImages from '~lib/notion/getImages'
import { DATABASES, PROPERTIES, SEO } from '~utils/notion/helper'

const getByRouteType = async ({ pathVariables, routeType }) => {
  let content = null,
    info = null,
    items = null
  const dateTimestamp = new Date().toISOString()
  // @todo(date-fns) make this the first date of the year dynamically
  const dateTimestampBlog = new Date('2020-01-01').toISOString()

  const info2 = await getPagesById({ pageId: SEO[routeType] })
  // eslint-disable-next-line prefer-const
  info = info2.object === 'page' && normalizerContent(info2)
  // eslint-disable-next-line prefer-const
  content = await getBlocksByIdChildren({ blockId: info.id })
  const items2: any = await getDatabasesByIdQuery({
    databaseId: DATABASES[routeType],
    filter: {
      and: [
        {
          property:
            routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
          date: {
            on_or_after: routeType === 'events' ? dateTimestamp : dateTimestampBlog,
          },
        },
      ],
    },
  })
  const items2Data = {}
  _map(items2.results, (item) => (items2Data[item.id] = normalizerContent(item)))
  const items2Omit = _omit(items2, 'results')
  items2Omit.results = items2Data
  items = _omit(items2Omit, 'data')

  let data = { info, content, items, images: {} }
  const images = !!data ? await getImages({ data, pathVariables }) : {}
  data = { ...data, images }

  return data
}

export default getByRouteType
