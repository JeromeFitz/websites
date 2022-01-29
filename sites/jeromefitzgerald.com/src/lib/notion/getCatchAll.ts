import Redis from 'ioredis'
import _filter from 'lodash/filter'

import { nextWeirdRoutingSkipData } from '~lib/constants'
import { getCache, setCache, setCacheJson } from '~lib/notion/getCache'
import { notion } from '~lib/notion/helper'

const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE
const redis = new Redis(process.env.REDIS_URL)

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
  // const isServer = typeof window === 'undefined'
  // console.dir(`useCache: ${useCache}`)
  // console.dir(`cache:    ${cache}`)
  // console.dir(`isCache:  ${isCache}`)
  // console.dir(`isServer: ${isServer}`)

  const { slug } = pathVariables
  if (nextWeirdRoutingSkipData.includes(slug)) return null

  // console.dir(`isCache: ${isCache}`)

  let data
  const url = catchAll.join('/')
  // console.dir(`url`)
  // console.dir(url)
  /**
   * @cache pre
   */
  if (isCache) {
    // @cache(get) json
    const cacheData = await getCache(url)
    if (!!cacheData) {
      data = cacheData
    } else {
      // @cache(get) redis
      const key = `notion/${url}`.toLowerCase()
      // console.dir(`getCache: redis => ${key}`)
      const cache = await redis.get(key)
      data = await JSON.parse(cache)
      // @cache(set) json
      if (!!data) {
        // console.dir(`setCache: redis => json (${key})`)
        setCacheJson(data, url)
      }
    }
  }

  if (!data || data === undefined) {
    let content = null,
      images = null,
      info = null,
      items = null

    const { dataType, routeType, slug } = pathVariables

    if (notion.dataTypes[dataType]) {
      // console.dir(`getNotion: ${dataType} => ${routeType}/${slug}`)
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

    /**
     * @refactor
     */
    if (retrieveImages && !images) {
      const images = {}
      data = { ...data, images }
    }

    /**
     * @cache post
     */
    if (isCache) {
      const isCacheExists = await getCache(url)
      // @cache(set) json|redis
      if (!isCacheExists || isCacheExists === undefined) {
        setCache(data, url)
      }
    }
  }

  return data
}

export default getCatchAll
