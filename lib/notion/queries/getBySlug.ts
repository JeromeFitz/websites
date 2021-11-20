/* eslint-disable prefer-const */
import _filter from 'lodash/filter'
import _omit from 'lodash/omit'

import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import { deepFetchAllChildren } from '~lib/notion/getCatchAll'
import getImages from '~lib/notion/getImages'
import dataNormalized from '~lib/notion/queries/dataNormalized'
import dataSorted from '~lib/notion/queries/dataSorted'
import { DB, QUERIES } from '~utils/notion/helper'

const getBySlug = async ({ pathVariables, routeType, slug }) => {
  let content = null,
    info = null,
    items = null
  const infoInit: any = await getDatabasesByIdQuery({
    databaseId: DB[routeType.toUpperCase()].database_id,
    filter: {
      and: [
        {
          ...QUERIES.slug,
          text: { equals: slug },
        },
      ],
    },
  })

  const _info = infoInit?.object === 'list' && infoInit.results[0]
  info = _omit(_info, 'properties')
  info['properties'] = dataSorted(dataNormalized(_info, routeType, info.id))

  content = await getBlocksByIdChildren({ blockId: info.id })

  const blocks = [...(await deepFetchAllChildren(content.results))]
  content = blocks

  if (!!items) {
    items.results = _filter(items.results, { data: { isPublished: true } })
  }

  let data = { info, content, items, images: {} }
  // console.dir(`data`)
  // console.dir(data)
  // console.dir(`pathVariables`)
  // console.dir(pathVariables)
  const images = !!data ? await getImages({ data, pathVariables }) : {}
  // console.dir(`images`)
  // console.dir(images)
  data = { ...data, images }

  return data
}

export default getBySlug
