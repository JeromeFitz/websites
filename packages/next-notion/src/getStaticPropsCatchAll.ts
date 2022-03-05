import { asyncForEach } from '@jeromefitz/utils'
import Slugger from 'github-slugger'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import _noop from 'lodash/noop'
import _size from 'lodash/size'

import { nextWeirdRoutingSkipData, CACHE_TYPES } from './constants'
import { getCache, setCache } from './getCache'
// import { getCatchAll } from './getCatchAll'
// import { getDataReturn } from './getDataReturn'
import { getNotion } from './helper'

/**
 * @ref https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
 */
const isBuildStep = process.env.CI
const isDev = process.env.NODE_ENV === 'development' // && typeof window !== 'undefined'

const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
const cacheOverride =
  process.env.NEXT_PUBLIC__NOTION_USE_CACHE_OVERIDE === 'true' ? true : false
const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL

const getKeysBySlugger = ({ keyData, keyPrefix }) =>
  `${keyPrefix}/${Slugger.slug(keyData)}`.toLowerCase()

const getKeysByJoin = ({ keyData, keyPrefix }) =>
  `${keyPrefix}/${keyData.join('/')}`.toLowerCase()

// eslint-disable-next-line complexity
const getStaticPropsCatchAll = async ({
  catchAll,
  clear,
  notionConfig,
  pathVariables,
  preview,
}) => {
  const { slug } = pathVariables
  if (nextWeirdRoutingSkipData.includes(slug)) return null

  let data

  const key = getKeysByJoin({
    keyData: catchAll,
    keyPrefix: 'notion',
  })

  if ((cache && isBuildStep) || isDev) {
    // console.dir(`cache && isBuildStep: ${cacheType} => ${key}`)
    data = await getCache({ cacheType, key })
  }

  /**
   * @verify
   * - Does the data exist from CACHE
   *
   * Y => Skip, no more to do
   * N => Get latest directly from Notion API, set Cache
   *
   */
  if (!data || data === undefined) {
    data = await getCatchAllDataFromApi({
      catchAll,
      clear,
      key,
      notionConfig,
      pathVariables,
      preview,
    })
  }

  /**
   * @images
   *
   * Not the _best_ but this gets the job done.
   *
   * If `images` object on data has already been cached
   *  along with `notion/...` key we do not have to redo this.
   *
   * Also of note ... any key that starts with `image/`
   *  should always check cache first. We already did
   *  the blurData most likely via plaiceholder
   *
   */
  let images = !!data?.images ? data?.images : {}
  if (_isEmpty(images) || _size(images) === 0) {
    console.dir(`Images: Get from API`)
    images = await getCatchAllImagesFromApi({ data, pathVariables })
  } else {
    console.dir(`Images: Skip, already Cached.`)
  }

  /**
   * @fallback
   */
  if (!images || images === undefined) {
    images = {}
  }

  data = { ...data, images }

  /**
   * @cache
   * - This only gets hit by live app when we are not in `isBuildStep`
   * - Update the cache with latest data from Notion API
   *
   */
  if (cache || cacheOverride) {
    console.dir(
      `getStaticPropsCatchAll => cache || cacheOverride: ${cacheType} => ${key}`
    )
    setCache({ cacheType, data, key })
  }

  return data
}

const getCatchAllImagesFromApi = async ({ data, pathVariables }) => {
  const images = {}
  const keys = []

  const { getImages } = await import('./getImages')
  const urls = await getImages({ data, pathVariables })
  urls.map((url) =>
    keys.push([
      getKeysBySlugger({
        keyData: url,
        keyPrefix: 'image',
      }),
      url,
    ])
  )

  console.dir(`keys:`)
  console.dir(keys)

  if ((cache && isBuildStep) || isDev) {
    // console.dir(`cache && isBuildStep: ${cacheType} => ${key}`)
    await asyncForEach(keys, async ([key, url]) => {
      console.dir(`key: ${key}`)
      console.dir(`url: ${url}`)
      const image: any = await getCache({ cacheType, key })
      if (!!image) {
        images[key] = image
      } else {
        // get IMage and set Cache`
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

const getCatchAllDataFromApi = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catchAll,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear,
  key,
  notionConfig,
  pathVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview,
}) => {
  const notion = getNotion(notionConfig)

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
   * @filter
   * - to ensure only active items (isPublished) appear in results
   */
  if (!!items) {
    items.results = _filter(items.results, { properties: { isPublished: true } })
  }

  const data = { info, content, items, images }

  /**
   * @cache
   * - This only gets hit by live app when we are not in `isBuildStep`
   * - Update the cache with latest data from Notion API
   *
   */
  if (cache || cacheOverride) {
    // console.dir(`cache || cacheOverride: ${cacheType} => ${key}`)
    setCache({ cacheType, data, key })
  }

  return data
}

export { getStaticPropsCatchAll }
