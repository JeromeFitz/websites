import { asyncForEach } from '@jeromefitz/utils'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import _noop from 'lodash/noop'
import _size from 'lodash/size'

import { nextWeirdRoutingSkipData, CACHE_TYPES } from './constants'
import { getCache, setCache } from './getCache'
import { getNotion } from './helper'
import { getKeysByJoin, getKeysBySlugger } from './utils'
/**
 * @ref https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
 */
// const isBuildStep = process.env.CI
// const isDev = process.env.NODE_ENV === 'development'

/**
 * @question
 * Why do we have `cache` as a variable?
 * Don’t we want to use it all the time?
 *
 * @answer
 * C.R.E.A.M. CACHE RULES EVERYTHING AROUND ME
 *
 * However, this is also an example repo and people may
 *  not want to incur the extra-ness of layering cache
 *  with Next with their CMS of choice.
 *
 * If Notion did not have the rate limiting and occassional
 *  Bad Gateways as a result of too many calls, we probably
 *  would not here. (Though the build times boosts are nice.)
 *
 * Ideally there would be more of an opt-in feature that
 *  would be a tinch more elegant down the line
 *  and someone could pass their cache option (or none)
 *
 */
const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
const cacheOverride =
  process.env.NEXT_PUBLIC__NOTION_USE_CACHE_OVERIDE === 'true' ? true : false
const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE_TYPE || CACHE_TYPES.JSON

// @todo(types) This is likely not portable. A type annotation is necessary.
// @todo(complexity) 17
// eslint-disable-next-line complexity
const getStaticPropsCatchAll: any = async ({
  catchAll,
  notionConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options = {},
  preview,
}: {
  catchAll: any
  notionConfig: any
  options?: any
  preview: any
}) => {
  const notion = getNotion(notionConfig)
  const pathVariables = notion.custom.getPathVariables({ catchAll })
  // console.dir(`>> getStaticPropsCatchAll`)
  // console.dir(`>  catchAll`)
  // console.dir(catchAll)
  // console.dir(`>  pathVariables`)
  // console.dir(pathVariables)

  const { slug } = pathVariables
  if (nextWeirdRoutingSkipData.includes(slug)) return {}

  // @todo(types)
  let data: any
  let shouldUpdateCache = false
  // let shouldUpdateCache = !!options?.revalidate ? true : false
  // console.dir(`>  shouldUpdateCache: ${shouldUpdateCache}`)

  const key = getKeysByJoin({
    keyData: catchAll,
    keyPrefix: `${process.env.NEXT_PUBLIC__SITE}/notion`,
  })

  /**
   * @note(cache)
   * - Only use cache for next build (`isBuildStep`)
   * - As we hand over app cache internally to Next SSG + ISR
   * - - => Exception: development
   *
   */
  // if (((cache && isBuildStep) || isDev) && !preview) {
  //   // console.dir(`cache && isBuildStep: ${cacheType} => ${key}`)
  //   data = await getCache({ cacheType, key })
  // }
  /**
   * @todo(cache) with new data fetching, let us rethink the above
   *
   * ref: https://beta.nextjs.org/docs/data-fetching/revalidating
   *
   * For now, always use cache. And determine how we can revalidate
   *  through API calls, or Timing / Cron.
   *
   */
  // @note(next) this is always false until we figure out ISR => App Dir
  // may end up just doing the old-school pull SSR data from Cache
  // use SWR to pull directly from original data source
  // annoying because i would rather just go direct from cache
  // but have the option to bust it (probably just need to draw it out)
  if (!shouldUpdateCache) {
    data = await getCache({ cacheType, key })
  }
  // console.dir(`>  data (0)`)
  // console.dir(!!data && data)
  // console.dir(options)

  if (!data || data === undefined) {
    shouldUpdateCache = true
    data = await getCatchAllDataFromApi({
      catchAll,
      key,
      notion,
      pathVariables,
      preview,
    })
  }
  // console.dir(`>  data (1)`)
  // console.dir(!!data && data)

  /**
   * @note(cache) Custom check for any images within Notion Content
   *
   * `[website]/image/*` cache is indefinite (that should change, heh)
   *
   * Use `images` key for CMS to lift any images within its content
   *  (`info|content|items`)
   *
   * For each, check against the existing cache to see if `[website]/image/*`
   *  already exists
   *
   * Then update `data.images` object and update `cache`
   *
   * If we have an `images` object already it means we already
   *  cached the additional images information
   *
   */

  let images = !!data?.images ? data?.images : {}
  // console.dir(`>  images (0)`)
  // console.dir(!!images)
  if (_isEmpty(images) || _size(images) === 0) {
    shouldUpdateCache = true
    images = await getCatchAllImagesFromApi({ data, pathVariables })
    // console.dir(`>  images (1)`)
    // console.dir(!!images)
  }

  data = { ...data, images }

  /**
   * @note(cache) Update the cache with latest data
   *
   * This only gets hit by live app when we are not in `isBuildStep`:
   * - SWR is turned off
   * - ISR to occur via webhooks for content updates (i.e., “you are here”)
   *
   */
  if (!data.info || data.info === undefined || preview) {
    shouldUpdateCache = false
  }
  if ((cache || cacheOverride) && shouldUpdateCache) {
    // console.dir(`1) cache || cacheOverride: ${cacheType} => ${key}`)
    // console.dir(data)
    setCache({ cacheType, data, key })
  }

  return { data, pathVariables }
}

const getCatchAllImagesFromApi = async ({ data, pathVariables }) => {
  const images = {}
  const keys = []

  const { getImages } = await import('./getImages')
  const urls = await getImages({ data, pathVariables })

  if (_isEmpty(urls) || _size(urls) === 0) {
    return images
  }

  urls.map((url) =>
    keys.push([
      getKeysBySlugger({
        keyData: url,
        keyPrefix: `${process.env.NEXT_PUBLIC__SITE}/image`,
      }),
      url,
    ])
  )

  if (cache) {
    // console.dir(`cache && isBuildStep: ${cacheType} => ${key}`)
    await asyncForEach(keys, async ([key, url]) => {
      const image: any = await getCache({ cacheType, key })
      if (!!image) {
        images[key] = image
      } else {
        const { getImage } = await import('./getImage')
        const image = await getImage(url)
        if (!!image) {
          images[image.id] = image
        }
      }
    }).catch(_noop)
  }

  return images
}

// eslint-disable-next-line complexity
const getCatchAllDataFromApi = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catchAll,
  key,
  notion,
  pathVariables,
  preview,
}) => {
  let content = null,
    images = {},
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
    images = DATATYPE_DATA?.images || {}
    info = DATATYPE_DATA?.info || null
    items = DATATYPE_DATA?.items || null
  }

  /**
   * @note(filter)
   * - Only return published item (isPublished)
   * - Preview bypass
   *
   */
  if (!info?.properties?.isPublished && !preview) {
    return { info: null, content: null, items: null, images: {} }
  }
  /**
   * @note(filter)
   * - Only return published items (isPublished)
   * - Preview bypass
   *
   */
  if (!!items) {
    items.results = _filter(
      items.results,
      preview ? {} : { properties: { isPublished: true } }
    )
  }

  const data = { info, content, items, images }

  /**
   * @note(cache) Update the cache with latest data
   *
   * This only gets hit by live app when we are not in `isBuildStep`:
   * - SWR is turned off
   * - ISR to occur via webhooks for content updates (i.e., “you are here”)
   *
   */
  if ((cache || cacheOverride) && !preview) {
    // console.dir(`2) cache || cacheOverride: ${cacheType} => ${key}`)
    setCache({ cacheType, data, key })
  }

  return data
}

export { getStaticPropsCatchAll }
