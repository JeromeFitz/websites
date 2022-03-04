import _filter from 'lodash/filter'

import { nextWeirdRoutingSkipData, CACHE_TYPES } from '../constants'

import { getCacheJson, getCacheRedis, setCacheJson, setCacheRedis } from './getCache'
import { getNotion } from './helper'

const cache =
  process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false || true
const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL

// @todo(next) preview
// @todo(complexity) 16
/**
 * @cache
 *
 *  We can leverage the best of both worlds for speedy build-times
 *   while not hammering Notion's API until it is more production ready.
 *
 * CACHE: Use Remote Redis Cache for initial Data
 * - Avoid direct Notion API on Build Time as Rate Limit is inconsistent:
 * - - ref: https://developers.notion.com/reference/request-limits#rate-limits
 * - Use Remote Cache as the data is most likely up-to-date
 * - - and we can avoid the current rate limitations until Notion is 1.x
 *
 * ISR: On-Demand Incremental Static Regeneration
 * - Next will handle its own internal cache (JSON)
 * - On Build, use the Cache (or Notion API fallback) and then have ISR takeover
 * - - ref: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta
 *
 *
 * SWR: Stale While Revalidate
 * - May not need to rely on SWR anymore to grab the latest API Data w/ ISR
 * - Each RouteType may be unique though:
 * - - Time Sensitive Data? => Direct API over Cache
 * - - Non-Time Sensistive Data? => ISR reliance
 */
// eslint-disable-next-line complexity
const getCatchAll = async ({
  catchAll,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear,
  notionConfig,
  pathVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview,
}) => {
  // console.dir(`> getCatchAll: pathVariables`)
  // console.dir(pathVariables)

  const notion = getNotion(notionConfig)

  // @ref: https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  const isBuildStep = process.env.CI
  // console.dir(`cache:       ${cache}`)
  // console.dir(`cacheType:   ${cacheType}`)
  // console.dir(`isBuildStep: ${isBuildStep}`)

  const { slug } = pathVariables
  if (nextWeirdRoutingSkipData.includes(slug)) return null

  // @todo(types)
  let data
  const url = catchAll.join('/')

  /**
   * @build
   *
   * cache should always be true, but may not for debugging purposes.
   *
   * @todo can we lift this to not have REDIS/JSON logic here?
   *
   */
  if (cache && isBuildStep) {
    console.dir(`isBuildStep: ${cacheType} => ${url}`)
    if (cacheType === CACHE_TYPES.REMOTE) {
      const key = `notion/${url}`.toLowerCase()
      data = await getCacheRedis(key)
    } else {
      data = await getCacheJson(url)
    }
  }

  /**
   * @verify
   *
   * Does the data exist from CACHE
   *
   * Y => Skip, no more to do
   * N => Get latest directly from Notion API, set Cache
   *
   */
  if (!data || data === undefined) {
    let content = null,
      images = {},
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
      images = DATATYPE_DATA?.images || {}
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }

    /**
     * @filter to ensure only active items (isPublished) appear in results
     */
    if (!!items) {
      items.results = _filter(items.results, { properties: { isPublished: true } })
    }

    data = { info, content, items, images }

    /**
     * @cache
     *
     * This only gets hit by live app when we are not in `isBuildStep`
     * Update the cache with latest data from Notion API
     *
     * @todo can we lift this to not have REDIS/JSON logic here?
     *
     */
    if (cache) {
      console.dir(`revalidate: ${cacheType} => ${url}`)
      if (cacheType === CACHE_TYPES.REMOTE) {
        const key = `notion/${url}`.toLowerCase()
        setCacheRedis(data, key)
      } else {
        if (cache) {
          setCacheJson(data, url)
        }
      }
    }
  }

  return data
}

export { getCatchAll }
