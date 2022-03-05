import Slugger from 'github-slugger'

import { CACHE_TYPES } from './constants'
import { getCache, setCache } from './getCache'

/**
 * @ref https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
 */
const isBuildStep = process.env.CI
const isDev = process.env.NODE_ENV === 'development' && typeof window !== 'undefined'

const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
const cacheOverride =
  process.env.NEXT_PUBLIC__NOTION_USE_CACHE_OVERIDE === 'true' ? true : false
const cacheType = process.env.NEXT_PUBLIC__NOTION_CACHE || CACHE_TYPES.LOCAL
const keyPrefix = 'image'

/**
 * @note(!cache)
 *
 * - if two urls are the same
 * - we _do_ want same slug
 *
 */
const getImage = async (url: string) => {
  // @todo(types)
  const id = Slugger.slug(url)
  const key = `${keyPrefix}/${id}`.toLowerCase()
  let data

  if ((cache && isBuildStep) || isDev) {
    // console.dir(`cache && isBuildStep: ${cacheType} => ${key}`)
    data = await getCache({ cacheType, key })
  }

  if (!data || data === undefined) {
    const { getPlaiceholder } = await import('plaiceholder')
    const { base64, img } = await getPlaiceholder(url)
    data = { base64, id, img, url }

    if (cache || cacheOverride) {
      // console.dir(`cache || cacheOverride: ${cacheType} => ${key}`)
      setCache({ cacheType, data, key })
    }
  }

  return data
}

export { getImage }
