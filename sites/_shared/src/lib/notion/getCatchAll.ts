import _filter from 'lodash/filter'

import { nextWeirdRoutingSkipData, CACHE_TYPES } from '../constants'

import { getCacheJson, getCacheRedis, setCacheJson, setCacheRedis } from './getCache'
import { getNotion } from './helper'

const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL

// @todo(next) preview
// @todo(complexity) 19
// eslint-disable-next-line complexity
const getCatchAll = async ({
  cache = false,
  catchAll,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear,
  notionConfig,
  pathVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview,
  retrieveImages = true,
  revalidate = false,
}) => {
  console.dir(`> getCatchAll: pathVariables`)
  console.dir(pathVariables)

  const notion = getNotion(notionConfig)

  /**
   * @note
   * At Build Time we want to grab from CACHE
   * - Notion cannot always handle the amount of requests during a Next Build
   * - - 100s of requests per second
   * - - https://developers.notion.com/reference/request-limits#rate-limits
   * - Redis _can_ handle the amount of requests during a Next Build
   * - - And most likely, the Notion Data has not changed
   *
   * For ISR, we can leverage the best of both worlds for speedy build-times
   *  while not hammering Notion's API until it is more production ready.
   *
   * BUILD:
   * - Use Cache
   * ISR:
   * - Use Direct API
   * SWR:
   * - Each RouteType will be unique
   * - - Time Sensitive Data? => Direct API over Cache
   * - - Non-Time Sensistive Data? => ISR reliance
   */
  const isBuildStep = process.env.CI
  const isCache = cache && isBuildStep
  // const isServer = typeof window === 'undefined'
  // console.dir(`cache:      ${cache}`)
  // console.dir(`revalidate: ${revalidate}`)
  // console.dir(`isCache:    ${isCache}`)
  // console.dir(`isServer:   ${isServer}`)
  // if (isBuildStep) {
  //   console.dir(`isBuildStep: ${isBuildStep}`)
  //   console.dir(`isCache:     ${isCache}`)
  // }

  const { slug } = pathVariables
  if (nextWeirdRoutingSkipData.includes(slug)) return null

  let data
  const url = catchAll.join('/')
  // console.dir(`url: `)
  // console.dir(url)

  /**
   * @cache pre
   *
   */
  if (isCache) {
    console.dir(`isCache: ${cacheType} => ${url}`)
    if (cacheType === CACHE_TYPES.REMOTE) {
      const key = `notion/${url}`.toLowerCase()
      data = await getCacheRedis(key)
      // data = await JSON.parse(data)
    } else {
      data = await getCacheJson(url)
    }
  }

  if (!data || data === undefined) {
    let content = null,
      images = null,
      info = null,
      items = null

    const { dataType, routeType, slug } = pathVariables

    if (notion.dataTypes[dataType]) {
      console.dir(`getNotion: ${dataType} => ${routeType}/${slug}`)
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
    if (isCache || revalidate) {
      if (cacheType === CACHE_TYPES.REMOTE) {
        const key = `notion/${url}`.toLowerCase()
        setCacheRedis(data, key)
      } else {
        if (!revalidate) {
          setCacheJson(data, url)
        }
      }
    }
  }

  return data
}

export { getCatchAll }
