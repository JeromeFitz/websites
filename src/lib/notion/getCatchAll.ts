import { Client, utils } from '@jeromefitz/notion'
import _filter from 'lodash/filter'

import { getCache, setCache } from '@jeromefitz/temp/getCache'
// import { Client } from '@jeromefitz/temp/package/index'
// import getImages from '@jeromefitz/temp/package/utils/getImages'

import { notionConfig as config } from '~config/websites'
import { nextWeirdRoutingSkipData } from '~lib/constants'

const notion = new Client({ auth: process.env.NOTION_API_KEY, config })
const { getImages } = utils

const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

// @todo(next) preview
// @todo(complexity) 19
// eslint-disable-next-line complexity
const getCatchAll = async ({
  cache = false,
  catchAll,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear,
  pathVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview,
  retrieveImages = true,
}) => {
  // console.dir(`> pathVariables`)
  // console.dir(pathVariables)

  const isCache = useCache && cache
  const { slug } = pathVariables
  if (nextWeirdRoutingSkipData.includes(slug)) return null

  // console.dir(`isCache: ${isCache}`)

  let data
  /**
   * @cache pre
   */
  if (isCache) {
    const url = catchAll.join('/')
    const cacheData = await getCache(url)
    if (!!cacheData) {
      data = cacheData
    }
  }

  if (!data || data === undefined) {
    let content = null,
      images = null,
      info = null,
      items = null

    const { dataType, routeType, slug } = pathVariables

    if (notion.dataTypes[dataType]) {
      const DATATYPE_DATA: any = await notion.dataTypes[dataType]({
        pathVariables,
        routeType,
        slug,
      })
      content = DATATYPE_DATA?.content || null
      images = DATATYPE_DATA?.images || null
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }

    if (!!items) {
      items.results = _filter(items.results, { properties: { isPublished: true } })
    }

    data = { info, content, items, images }

    if (retrieveImages && !images) {
      const images = !!data ? await getImages({ data, pathVariables }) : {}
      data = { ...data, images }
    }

    /**
     * @cache post
     */
    if (isCache) {
      // console.dir(`*** useCache x1 ***`)
      const url = catchAll.join('/')
      // console.dir(url)
      const isCacheExists = await getCache(url)
      // console.dir(isCacheExists)
      if (!isCacheExists || isCacheExists === undefined) {
        setCache(data, url)
      }
    }
  }
  return data
}

export default getCatchAll
