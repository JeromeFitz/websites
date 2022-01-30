import Slugger from 'github-slugger'

import { getCache, setCacheJson } from '~lib/notion/getCache'
import redis from '~lib/redis'

const keyPrefix = 'image'

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

  // console.dir(`@cache(get) json`)
  cache = await getCache(key)
  if (cache) {
    return cache
  }

  // console.dir(`@cache(get) redis`)
  cache = await redis.get(key)
  if (cache) {
    // console.dir(`@cache(set) json`)
    const data = JSON.parse(cache)
    setCacheJson(data, key)
    return data
  }

  // console.dir(`@cache(get) plaiceholder`)
  const { getPlaiceholder } = await import('plaiceholder')
  const { base64, img } = await getPlaiceholder(url)
  data = { base64, id, img, url }

  // console.dir(`@cache(set) json|redis`)
  setCacheJson(data, key)
  void redis.set(key, JSON.stringify(data))

  return data
}

export default getImage
