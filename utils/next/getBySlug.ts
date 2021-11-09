/* eslint-disable prefer-const */
import _filter from 'lodash/filter'

import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import { deepFetchAllChildren, normalizerContent } from '~lib/notion/getCatchAll'
import getImages from '~lib/notion/getImages'
import { DATABASES, QUERIES } from '~utils/notion/helper'

const getBySlug = async ({ pathVariables, routeType, slug }) => {
  let content = null,
    info = null,
    items = null
  const info1: any = await getDatabasesByIdQuery({
    databaseId: DATABASES[routeType],
    filter: {
      and: [
        {
          ...QUERIES.slug,
          text: { equals: slug },
        },
      ],
    },
  })
  const info1a = info1?.object === 'list' && info1.results[0]
  info = normalizerContent(info1a)
  content = await getBlocksByIdChildren({ blockId: info.id })

  const blocks = [...(await deepFetchAllChildren(content.results))]
  content = blocks

  if (!!items) {
    items.results = _filter(items.results, { data: { published: true } })
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
