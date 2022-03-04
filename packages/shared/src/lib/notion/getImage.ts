import Slugger from 'github-slugger'

import { CACHE_TYPES } from '../constants'

import { getCache, setCache } from './getCache'

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
  const cache = await getCache({ cacheType, key })

  if (cache) {
    return cache
  }

  let data: any = {}
  const { getPlaiceholder } = await import('plaiceholder')
  const { base64, img } = await getPlaiceholder(url)
  data = { base64, id, img, url }

  setCache({ cacheType, data, key })

  return data
}

export { getImage }
