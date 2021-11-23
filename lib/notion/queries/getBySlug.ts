/* eslint-disable prefer-const */
import _filter from 'lodash/filter'
import _omit from 'lodash/omit'

import { NOTION } from '~config/websites'
import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import deepFetchAllChildren from '~lib/notion/deepFetchAllChildren'
import getImages from '~lib/notion/getImages'
import { QUERIES } from '~lib/notion/helper'
import dataNormalized from '~lib/notion/queries/dataNormalized'
import dataSorted from '~lib/notion/queries/dataSorted'

const getBySlug = async ({ pathVariables, routeType, slug }) => {
  let content = null,
    info = null,
    items = null

  const DB_TYPE = routeType?.toUpperCase()
  const isValid = Object.keys(NOTION).includes(DB_TYPE)
  if (!isValid) return { info, content, items, images: {} }

  const infoInit: any = await getDatabasesByIdQuery({
    databaseId: NOTION[DB_TYPE].database_id,
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
  // @refactor(404)
  if (!_info) {
    return {}
  }
  info = _omit(_info, 'properties')
  info['properties'] = dataSorted(dataNormalized(_info, pathVariables, info.id))

  content = await getBlocksByIdChildren({ blockId: info.id })

  const blocks = [...(await deepFetchAllChildren(content.results))]
  content = blocks

  if (!!items) {
    items.results = _filter(items.results, { properties: { isPublished: true } })
  }

  let data = { info, content, items, images: {} }
  // console.dir(`data`)
  // console.dir(data)
  // console.dir(`pathVariables`)
  // console.dir(pathVariables)

  const images = !!data ? await getImages({ data, pathVariables }) : {}
  // console.dir(`images`)
  // console.dir(images)
  // data = { ...data }
  data = { ...data, images }

  return data
}

export default getBySlug
