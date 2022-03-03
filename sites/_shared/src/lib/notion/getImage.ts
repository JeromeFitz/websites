import Slugger from 'github-slugger'

import { CACHE_TYPES } from '../constants'

import { getCacheJson, setCacheJson, setCacheRedis, getCacheRedis } from './getCache'

const keyPrefix = 'image'
const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL
/**
 * @hack(!cache)
 *
 * - if two urls are the same
 * - we _do_ want same slug
 *
 */
const getImage = async (url: string) => {
  const id = Slugger.slug(url)
  const key = `${keyPrefix}/${id}`.toLowerCase()

  let cache: any
  let data: any = {}

  if (cacheType === CACHE_TYPES.REMOTE) {
    // console.dir(`@cache(get) redis`)
    cache = await getCacheRedis(key)
    // cache = await JSON.parse(cache)
    if (cache) {
      return cache
    }
  } else {
    // console.dir(`@cache(get) json`)
    cache = await getCacheJson(key)
    if (cache) {
      return cache
    }
  }

  // console.dir(`@cache(get) plaiceholder`)
  const { getPlaiceholder } = await import('plaiceholder')
  const { base64, img } = await getPlaiceholder(url)
  data = { base64, id, img, url }

  if (cacheType === CACHE_TYPES.REMOTE) {
    // console.dir(`@cache(set) redis`)
    setCacheRedis(data, key)
  } else {
    // console.dir(`@cache(set) json`)
    setCacheJson(data, key)
  }

  return data
}

export { getImage }
