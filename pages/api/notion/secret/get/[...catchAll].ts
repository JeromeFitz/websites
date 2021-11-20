import _find from 'lodash/find'
import _fromPairs from 'lodash/fromPairs'
import _sortBy from 'lodash/sortBy'
import _startsWith from 'lodash/startsWith'
import _toPairs from 'lodash/toPairs'
import { NextApiRequest, NextApiResponse } from 'next'
import _title from 'title'

import getTypes from '~lib/notion/api/getTypes'
// import { getCache, setCache } from '~lib/notion/getCache'
import getPathVariables from '~lib/notion/getPathVariables'
import { PROPERTIES } from '~lib/notion/schema'
import getByListing from '~utils/next/getByListing'
import getByListingWithDate from '~utils/next/getByListingWithDate'
import getBySlug from '~utils/next/getBySlug'
import getBySlugWithRouteType from '~utils/next/getBySlugWithRouteType'

// @todo(eject)
export const dataSorted = (data: any) => _fromPairs(_sortBy(_toPairs(data)))

// @todo(eject)
export const dataNormalized = (data: any, routeType = null, pageId = null) => {
  if (routeType === null) {
    console.dir(`dataNormalized(routeType is null)`)
  }
  if (pageId === null) {
    console.dir(`dataNormalized(pageId is null)`)
  }

  const { properties } = data

  const KEYS = Object.keys(properties)
  const DATA = {}

  KEYS.map((key) => {
    const found = _find(PROPERTIES, { notion: key })
    if (!found) {
      return
    }

    /**
     * @hack limit possible relations
     */
    if (_startsWith(found.key, 'relation')) {
      if (
        !_startsWith(
          found.key.toUpperCase(),
          `relation${_title(routeType)}__`.toUpperCase()
        )
      )
        return
    }
    /**
     * @hack limit possible rollups
     */
    if (_startsWith(found.key, 'rollup')) {
      if (
        !_startsWith(
          found.key.toUpperCase(),
          `rollup${_title(routeType)}__`.toUpperCase()
        )
      )
        return
    }

    const _data = getTypes[found.type](properties[key], pageId)

    DATA[found.key] = _data
  })

  return DATA
}

// eslint-disable-next-line complexity
const A_GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const preview = req.query?.preview || false
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clear = req.query?.clear || false
    const catchAll = req.query?.catchAll

    // console.dir(`catchAll`)
    // console.dir(catchAll)
    if (catchAll[0] === 'true') return res.status(200).json({})
    /**
     * @cache
     */
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // const cache = !!req.query?.cache ? JSON.parse(req.query?.cache) : true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cache = false

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = getPathVariables(catchAll)
    // console.dir(pathVariables)

    let _newData = null
    let content = null,
      images = null,
      info = null,
      items = null

    const { dataType, routeType, slug } = pathVariables
    if (dataType === 1 || dataType === 5) {
      const DATATYPE_DATA = await getBySlug({ pathVariables, routeType, slug })
      content = DATATYPE_DATA?.content || null
      images = DATATYPE_DATA?.images || null
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }
    if (dataType === 2) {
      const DATATYPE_DATA = await getByListing({ pathVariables, routeType })
      content = DATATYPE_DATA?.content || null
      images = DATATYPE_DATA?.images || null
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }
    if (dataType === 3) {
      const { meta } = pathVariables
      const DATATYPE_DATA = await getByListingWithDate({ meta, routeType, slug })
      content = DATATYPE_DATA?.content || null
      // images = DATATYPE_DATA?.images || null
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }
    if (dataType === 4) {
      const { meta } = pathVariables
      const DATATYPE_DATA = await getBySlugWithRouteType({ meta, routeType, slug })
      content = DATATYPE_DATA?.content || null
      // images = DATATYPE_DATA?.images || null
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }

    // _newData = { content, images, info, items }
    _newData = { info, content, items, images }
    /**
     * @new
     */
    // const data = await getPagesById({ pageId: PAGE_ID })
    // const propertiesNew = dataNormalized(data)

    // const output = _omit(data, 'properties')
    // output['properties'] = dataSorted(propertiesNew)
    // output['_newData'] = _newData

    // res.status(200).json(dataSorted(_newData))
    res.status(200).json(_newData)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    })
  }
}

export default A_GET
