/* eslint-disable prefer-const */
import _filter from 'lodash/filter'
import _omit from 'lodash/omit'

import getBlocksByIdChildren from '@jeromefitz/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '@jeromefitz/notion/api/getDatabasesByIdQuery'
import deepFetchAllChildren from '@jeromefitz/notion/deepFetchAllChildren'
import getImages from '@jeromefitz/notion/getImages'
import { QUERIES } from '@jeromefitz/notion/helper'
import dataNormalized from '@jeromefitz/notion/queries/dataNormalized'
import dataSorted from '@jeromefitz/notion/queries/dataSorted'

import { NOTION } from '~config/websites'

const getNotionSlug = async ({ pathVariables, routeType, slug }) => {
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

export default getNotionSlug
